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
  _id: string;
  name: string;
  email: string;
  phone: string;
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
  userTemLocation: UserTemLocation | null;
  setUserTemLocation: React.Dispatch<
    React.SetStateAction<UserTemLocation | null>
  >;
}

interface Profile {
  name: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
  gender: string;
  profileImage: string | null;
  latitude: number | null;
  longitude: number | null;
}
interface UserTemLocation {
  longitude: number;
  latitude: number;
  address: string;
  formattedAddress: string;
}

export { LocationData, UserProfile, ContextType, Profile, UserTemLocation };
