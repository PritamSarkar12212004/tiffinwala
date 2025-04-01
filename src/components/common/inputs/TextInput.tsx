import React from 'react';
import { View, TextInput as RNTextInput, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BgColor from '@/src/constants/colors/BgColor';

interface TextInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  icon?: keyof typeof Ionicons.glyphMap;
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  error?: string;
  className?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  icon,
  secureTextEntry = false,
  multiline = false,
  numberOfLines = 1,
  error,
  className = '',
}) => {
  return (
    <View className={`mb-4 ${className}`}>
      {label && (
        <Text className="text-zinc-400 mb-2">{label}</Text>
      )}
      <View className="flex-row items-center bg-zinc-700 rounded-xl px-4 py-3">
        {icon && (
          <Ionicons name={icon} size={20} color={BgColor.Accent} />
        )}
        <RNTextInput
          className={`flex-1 ${icon ? 'ml-3' : ''} text-white`}
          placeholder={placeholder}
          placeholderTextColor="#666"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          numberOfLines={numberOfLines}
        />
      </View>
      {error && (
        <Text className="text-red-500 text-sm mt-1">{error}</Text>
      )}
    </View>
  );
};

export default TextInput; 