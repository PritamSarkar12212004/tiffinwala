import { createContext, useContext, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { ContextType, LocationData, UserProfile, UserTemLocation, PostData } from "@/src/components/interface/AllInterface";




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

    // user Tem Location
    const [userTemLocation, setUserTemLocation] = useState<UserTemLocation | null>(null)

    // profile post product
    const [product, setProduct] = useState<PostData[]>([]);

    // post product reloader
    const [productReloader, setProductReloader] = useState<any>("")

    // edit page temp information
    const [editTempInformation, seteditTempInformation] = useState<any>()

    // mainData render temp
    const [mainData, setMainData] = useState<any>()

    // all post product Totoal Likes
    const [totalLikes, setTotalLikes] = useState<any>(null)

    // all post product Totoal Views
    const [totalViews, setTotalViews] = useState<any>(null)
    // filter Item Modal
    const [filters, setFilters] = useState({
        priceRange: [0, 5000],
        sortBy: 'rating' as 'rating' | 'price' | 'distance'

    });




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
                setUserProfile,
                // user Tem Location
                userTemLocation,
                setUserTemLocation,
                // profile post reloader for new post
                product,
                setProduct,
                // reloader Product
                productReloader,
                setProductReloader,
                editTempInformation,
                seteditTempInformation,
                // mai data rw render
                mainData,
                setMainData,
                // all post product Totoal Likes
                totalLikes,
                setTotalLikes,
                // all post product Totoal Views
                totalViews,
                setTotalViews,
                // filter Item Modal
                filters,
                setFilters
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