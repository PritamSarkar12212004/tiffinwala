import { createContext, useContext, useEffect, useRef, useState } from "react";
import { BottomSheet } from "@gorhom/bottom-sheet";
const Context = createContext();
export const ContextProvider = ({ children }: any) => {
    const bottomSheetRef = useRef<BottomSheet>(null);

    return (
        <Context.Provider
            value={{
                bottomSheetRef
            }}
        >
            {children}
        </Context.Provider>
    );
};
export const userContext = () => useContext(Context);