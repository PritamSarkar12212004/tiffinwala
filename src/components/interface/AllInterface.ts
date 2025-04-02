import BottomSheet from "@gorhom/bottom-sheet";

interface LocationData {
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
  state?: string;
  area?: string;
  pincode?: string;
}

interface UserProfile {
  User_Name: string;
  email: string;
  User_Phone_Number: string;
  address: string;
  User_Address: {
    address: string;
  };
  User_Image: string;
}

 interface ContextType {
  bottomSheetRef: React.RefObject<BottomSheet>;
  bottomSheetRef2: React.RefObject<BottomSheet>;
  tempMobileNumber: string;
  setTempMobileNumber: React.Dispatch<React.SetStateAction<string>>;
  location: LocationData | null;
  setLocation: React.Dispatch<React.SetStateAction<LocationData | null>>;
  userProfile: UserProfile | null;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}

export { LocationData, UserProfile, ContextType };
