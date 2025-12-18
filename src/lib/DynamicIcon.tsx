import React from 'react';
import { icons } from 'lucide-react';
import type { LucideProps } from 'lucide-react';

interface DynamicIconProps extends Omit<LucideProps, 'ref'> {
  name: string;
  fallback?: React.ReactNode;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ 
  name, 
  fallback = null,
  ...props 
}) => {
  const IconComponent = icons[name as keyof typeof icons];
  
  if (!IconComponent) {
    return <>{fallback}</>;
  }
  
  // Cast to any to avoid TypeScript issues with dynamic icon components
  const Icon = IconComponent as React.ComponentType<LucideProps>;
  return <Icon {...props} />;
};

export default DynamicIcon;
