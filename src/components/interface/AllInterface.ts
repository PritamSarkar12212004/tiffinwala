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
  product: PostData[];
  setProduct: React.Dispatch<React.SetStateAction<PostData[]>>;
  productReloader: boolean;
  setProductReloader: React.Dispatch<React.SetStateAction<boolean>>;
  editTempInformation: any;
  seteditTempInformation: React.Dispatch<React.SetStateAction<any>>;
  mainData: any;
  setMainData: React.Dispatch<React.SetStateAction<any>>;
  totalLikes: number | null;
  setTotalLikes: React.Dispatch<React.SetStateAction<number | null>>;
  totalViews: number | null;
  setTotalViews: React.Dispatch<React.SetStateAction<number | null>>;
  filters: {
    priceRange: [number, number];
    sortBy: "rating" | "price" | "distance";
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      priceRange: [number, number];
      sortBy: "rating" | "price" | "distance";
    }>
  >;
  locationSearch: LocationData | null;
  setLocationSearch: React.Dispatch<React.SetStateAction<LocationData | null>>;
  isAuthNotificationVisible: {
    status: boolean;
    message: string;
  };
  setIsAuthNotificationVisible: React.Dispatch<
    React.SetStateAction<{
      status: boolean;
      message: string;
    }>
  >;
  AddressGeterFunc: () => void;
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

interface PostData {
  title: string;
  description: string;
  price: string;
  foodTypes: string[];
  images: string[];
  address: string;
  latitude: number | null;
  longitude: number | null;
  availableDays: string[];
  mealTypes: string[];
  menuItems: {
    title: string;
    image: string;
    description: string;
  }[];
}

interface PostData2 extends PostData {
  productId: string;
}

export {
  LocationData,
  UserProfile,
  ContextType,
  Profile,
  UserTemLocation,
  PostData,
  PostData2,
};
