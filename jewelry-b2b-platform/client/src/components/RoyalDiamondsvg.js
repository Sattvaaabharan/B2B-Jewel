// RoyalDiamondSvg.js
export const RoyalDiamondSvg = () => (
  <svg width="180" height="120" viewBox="0 0 180 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="90,10 170,55 90,110 10,55" fill="#D4AF37" opacity="0.8"/>
    <polygon points="90,10 130,90 90,110 50,90" fill="#48005E" opacity="0.6"/>
    <polygon points="130,90 170,55 90,110" fill="#0F1951" opacity="0.6"/>
    <polygon points="50,90 10,55 90,110" fill="#0F1951" opacity="0.4"/>
    <animateTransform
      attributeName="transform"
      attributeType="XML"
      type="rotate"
      from="0 90 60"
      to="360 90 60"
      dur="8s"
      repeatCount="indefinite"
    />
  </svg>
);
