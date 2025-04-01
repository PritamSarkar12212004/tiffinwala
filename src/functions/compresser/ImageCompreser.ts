import { Image } from "react-native-compressor";

const compressImage = async (imagePath: any) => {
  const result = await Image.compress(imagePath, {
    progressDivider: 10,
    quality: 0.5,
  });
  return result;
};

export default compressImage;
