import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import BgColor from '@/src/constants/colors/BgColor';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  isLoading = false,
  disabled = false,
  className = '',
}) => {
  return (
    <TouchableOpacity
      className={`bg-blue-500 py-4 rounded-xl ${className} ${
        disabled ? 'opacity-50' : ''
      }`}
      onPress={onPress}
      disabled={disabled || isLoading}
      style={{ backgroundColor: BgColor.Accent }}
    >
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text className="text-white text-center font-semibold text-lg">
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default PrimaryButton; 