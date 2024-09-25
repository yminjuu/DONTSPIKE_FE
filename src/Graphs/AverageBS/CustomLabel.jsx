import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { modeState } from '../../Recoil';

const CustomLabel = ({ x, y, value }) => {
  const [isHovered, setIsHovered] = useState(false);
  const mode = useRecoilValue(modeState);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  var width = 40;
  var height = 20;
  var newX = x;
  var newY = y;
  if (mode === 'senior') {
    width = 60;
    height = 30;
    newX = x - 10;
    newY = y - 8;
  }
  var fontSize = mode === 'senior' ? 20 : 13;
  var coreSubColor = mode === 'senior' ? '#ECF1E7' : '#EBEEFF';
  var coreColor = mode !== 'senior' ? '#3053f9' : '#6D986D';
  const isThisMonth = value > 200;
  const bgColor = isHovered ? coreColor : isThisMonth ? coreColor : coreSubColor;
  const textColor = isHovered ? '#FFFFFF' : isThisMonth ? '#FFFFFF' : '#707070';

  return (
    <g onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <rect x={newX - 20} y={newY - 30} width={width} height={height} fill={bgColor} strokeWidth={1} rx={10} ry={10} />
      <text x={x} y={y - 15} fill={textColor} fontSize={fontSize} fontWeight="600" textAnchor="middle">
        {value}
      </text>
    </g>
  );
};

export default CustomLabel;
