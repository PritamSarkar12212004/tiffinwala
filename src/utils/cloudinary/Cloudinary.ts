import { Alert } from "react-native";

const uploadToCloudinary = async (fileUri: any, fileType: any) => {
  try {
    // Extract file extension
    const match = fileUri.match(/\.(\w+)$/);
    const fileExtension = match ? match[1].toLowerCase() : "jpg";

    // MIME type mapping
    const mimeTypes: any = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      mp4: "video/mp4",
      mov: "video/quicktime",
      mp3: "audio/mpeg",
      wav: "audio/wav",
      m4a: "audio/mp4",
    };

    const contentType = mimeTypes[fileExtension] || "application/octet-stream";

    // Cloudinary expects "video" resource type for audio uploads
    const resourceType = fileType === "audio" ? "video" : fileType;

    // Create FormData
    const formData = new FormData();
    formData.append("file", {
      uri: fileUri,
      type: contentType,
      name: `upload_${Date.now()}.${fileExtension}`,
    } as any);
    formData.append("upload_preset", "Chattrix");

    // Upload via fetch (React Native compatible)
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dpstw5idt/${resourceType}/upload`,
      {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const result = await response.json();

    if (result.secure_url) {
      return result.secure_url;
    } else {
      Alert.alert("Upload Failed", "No URL returned");
      return null;
    }
  } catch (error) {
    console.error("Upload Error:", error);
    Alert.alert("Upload Error", "Something went wrong");
    return null;
  }
};

export default uploadToCloudinary;
