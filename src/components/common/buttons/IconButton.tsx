import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BgColor from '@/src/constants/colors/BgColor';

interface IconButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  size?: number;
  color?: string;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  size = 24,
  color = 'white',
  className = '',
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`p-2 rounded-full ${className}`}
      style={{ backgroundColor: BgColor.Secondary }}
    >
      <Ionicons name={icon} size={size} color={color} />
    </TouchableOpacity>
  );
};

export default IconButton; 