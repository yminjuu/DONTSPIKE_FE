import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { modeState } from '../../Recoil';

const CustomLabel = ({ x, y, value }) => {
  const [isHovered, setIsHovered] = useState(false);
  const mode = useRecoilValue(modeState);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  var coreColor = mode !== 'senior' ? '#3053f9' : '#6D986D';
  const isThisMonth = value > 200;
  const bgColor = isHovered ? coreColor : isThisMonth ? coreColor : '#EBEEFF';
  const textColor = isHovered ? '#FFFFFF' : isThisMonth ? '#FFFFFF' : '#707070';

  return (
    <g onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <rect x={x - 20} y={y - 30} width={40} height={20} fill={bgColor} strokeWidth={1} rx={10} ry={10} />
      <text x={x} y={y - 15} fill={textColor} fontSize={13} fontWeight="600" textAnchor="middle">
        {value}
      </text>
    </g>
  );
};

export default CustomLabel;
