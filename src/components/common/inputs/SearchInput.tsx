import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BgColor from '@/src/constants/colors/BgColor';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
  onSearch?: () => void;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  placeholder = 'Search...',
  onClear,
  onSearch,
  className = '',
}) => {
  return (
    <View className={`flex-row items-center bg-zinc-700 rounded-xl px-4 py-2 ${className}`}>
      <Ionicons name="search-outline" size={20} color={BgColor.Accent} />
      <TextInput
        className="flex-1 ml-3 text-white"
        placeholder={placeholder}
        placeholderTextColor="#666"
        value={value}
        onChangeText={onChangeText}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={onClear}>
          <Ionicons name="close-circle" size={20} color={BgColor.Accent} />
        </TouchableOpacity>
      )}
      <TouchableOpacity className="ml-2" onPress={onSearch}>
        <Ionicons name="arrow-forward" size={20} color={BgColor.Accent} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput; 