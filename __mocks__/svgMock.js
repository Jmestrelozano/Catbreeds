const React = require('react');
const { View } = require('react-native');

// Mock para archivos SVG importados
const SVGComponent = (props) => {
  const { testID, ...restProps } = props;
  return React.createElement(View, { 
    ...restProps, 
    testID: testID || 'svg-mock',
    'data-testid': testID || 'svg-mock'
  });
};

SVGComponent.displayName = 'SVGMock';

module.exports = SVGComponent;
module.exports.default = SVGComponent;

