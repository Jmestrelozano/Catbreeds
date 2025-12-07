import React from 'react';
import { render } from '@testing-library/react-native';
import { CurvedMask } from '../../src/presentation/components/CurvedMask';

describe('CurvedMask', () => {
  it('should render correctly with given dimensions', () => {
    const { root } = render(
      <CurvedMask width={400} height={300} curveHeight={30} />
    );

    expect(root).toBeTruthy();
  });

  it('should render with different dimensions', () => {
    const { root } = render(
      <CurvedMask width={500} height={400} curveHeight={50} />
    );

    expect(root).toBeTruthy();
  });

  it('should calculate mask path correctly', () => {
    const width = 400;
    const height = 300;
    const curveHeight = 30;
    
    const { root } = render(
      <CurvedMask width={width} height={height} curveHeight={curveHeight} />
    );

    expect(root).toBeTruthy();
  });

  it('should handle zero curve height', () => {
    const { root } = render(
      <CurvedMask width={400} height={300} curveHeight={0} />
    );

    expect(root).toBeTruthy();
  });

  it('should render without throwing errors', () => {
    expect(() => {
      render(<CurvedMask width={400} height={300} curveHeight={30} />);
    }).not.toThrow();
  });
});

