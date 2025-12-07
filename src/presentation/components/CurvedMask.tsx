import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { CurvedMaskProps } from '../interfaces/CurvedMaskProps';

export const CurvedMask: React.FC<CurvedMaskProps> = ({ width, height, curveHeight }) => {
  const maskPath = `M0,0 L${width},0 L${width},${height - curveHeight} Q${width / 2},${height} 0,${height - curveHeight} Z`;
  
  return (
    <Svg width={width} height={height}>
      <Path d={maskPath} fill="white" />
    </Svg>
  );
};

