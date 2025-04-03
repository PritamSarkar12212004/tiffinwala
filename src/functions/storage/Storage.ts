import { storage } from "@/src/utils/storage/storage";
// Tem Data
const setTemData = (key: string, value: any) => {
  storage.set(key, JSON.stringify(value));
};
const getTemData = (key: string) => {
  const data = storage.getString(key);
  return data ? JSON.parse(data) : null;
};
const removeTemData = (key: string) => {
  storage.delete(key);
};

// Full Data
const setFullData = (key: string, value: any) => {
  storage.set(key, JSON.stringify(value));
};
const getFullData = (key: string) => {
  const data = storage.getString(key);
  return data ? JSON.parse(data) : null;
};
const removeFullData = (key: string) => {
  storage.delete(key);
};

// Location Data
const setLocationData = (key: string, value: any) => {
  storage.set(key, JSON.stringify(value));
};
const getLocationData = (key: string) => {
  const data = storage.getString(key);
  return data ? JSON.parse(data) : null;
};
const removeLocationData = (key: string) => {
  storage.delete(key);
};

export {
  // Tem Data
  setTemData,
  getTemData,
  removeTemData,
  // Full Data
  setFullData,
  getFullData,
  removeFullData,
  // Location Data
  setLocationData,
  getLocationData,
  removeLocationData,
};
