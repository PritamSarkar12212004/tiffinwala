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

export {
  setTemData,
  getTemData,
  removeTemData,
  setFullData,
  getFullData,
  removeFullData,
};
