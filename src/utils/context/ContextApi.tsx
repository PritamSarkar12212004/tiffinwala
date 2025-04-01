import { createContext, useContext, useEffect, useRef, useState } from "react";
import { BottomSheet } from "@gorhom/bottom-sheet";

interface LocationData {
    latitude: number;
    longitude: number;
    address?: string;
    city?: string;
    state?: string;
    area?: string;
    pincode?: string;
}

interface ContextType {
    bottomSheetRef: React.RefObject<BottomSheet>;
    bottomSheetRef2: React.RefObject<BottomSheet>;
    tempMobileNumber: string;
    setTempMobileNumber: (value: string) => void;
    location: LocationData | null;
    setLocation: (location: LocationData | null) => void;
}

const Context = createContext<ContextType | undefined>(undefined);

export const ContextProvider = ({ children }: any) => {
    // Bottom Sheet Ref
    const bottomSheetRef = useRef<BottomSheet>(null);
    const bottomSheetRef2 = useRef<BottomSheet>(null);

    // auth 
    const [tempMobileNumber, setTempMobileNumber] = useState<string>("");

    // location
    const [location, setLocation] = useState<LocationData | null>(null);

    return (
        <Context.Provider
            value={{
                // Bottom Sheet Ref
                bottomSheetRef,
                bottomSheetRef2,
                // auth
                tempMobileNumber,
                setTempMobileNumber,
                // location
                location,
                setLocation
            }}
        >
            {children}
        </Context.Provider>
    );
};

export const userContext = () => {
    const context = useContext(Context);
    if (context === undefined) {
        throw new Error('userContext must be used within a ContextProvider');
    }
    return context;
};