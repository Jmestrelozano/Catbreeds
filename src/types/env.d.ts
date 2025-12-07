declare module '@env' {
  export const CAT_API_KEY: string;
  export const CAT_API_BASE_URL: string;
}

declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

