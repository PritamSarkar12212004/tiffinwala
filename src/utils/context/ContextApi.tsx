import { createContext, useContext, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { ContextType, LocationData, UserProfile } from "@/src/components/interface/AllInterface";




const Context = createContext<ContextType | undefined>(undefined);
export const ContextProvider = ({ children }: any) => {
    // Bottom Sheet Ref
    const bottomSheetRef = useRef<BottomSheet>(null);
    const bottomSheetRef2 = useRef<BottomSheet>(null);

    // auth 
    const [tempMobileNumber, setTempMobileNumber] = useState<string>("");

    // location
    const [location, setLocation] = useState<LocationData | null>(null);

    // user Profile Information 
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null)

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
                setLocation,
                // user Profile Information 
                userProfile,
                setUserProfile
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