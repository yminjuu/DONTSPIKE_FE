const SpikeDot = ({ cx, cy, fill }) => (
  <svg
    x={cx - 12.5} // cx와 cy가 SVG 중앙에 위치하도록 조정
    y={cy - 17.5}
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <text
      x="10" // 텍스트의 x 좌표를 동그라미 중앙으로 맞춤
      y="40" // 텍스트의 y 좌표를 동그라미 위로 배치
      textAnchor="middle"
      fill="#D33F3F"
      fontSize="10"
      dx=".5em"
      dy=".1em"
      fontWeight="bold"
    >
      SPIKE!
    </text>
    <g filter="url(#filter0_i_1404_2810)">
      <circle cx="13" cy="13.6487" r="13" fill="#D33F3F" />
    </g>
    <g filter="url(#filter1_if_1404_2810)">
      <path
        d="M6.53558 14.4451L15.2806 3.929C15.5457 3.61022 16.0598 3.86622 15.9651 4.26988L14.2234 11.6979C14.1685 11.932 14.3348 12.16 14.5745 12.1792L18.2654 12.4744C18.5846 12.5 18.7408 12.8761 18.5336 13.1202L9.83339 23.3721C9.56478 23.6886 9.05272 23.4264 9.15252 23.0235L10.9968 15.5765C11.0582 15.3287 10.8707 15.0892 10.6155 15.0892H6.83764C6.50475 15.0892 6.32273 14.7011 6.53558 14.4451Z"
        fill="#F89E9E"
      />
    </g>
    <defs>
      <filter
        id="filter0_i_1404_2810"
        x="0"
        y="0.648682"
        width="27.375"
        height="27.375"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="1.375" dy="1.375" />
        <feGaussianBlur stdDeviation="1.375" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0" />
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1404_2810" />
      </filter>
      <filter
        id="filter1_if_1404_2810"
        x="6.18337"
        y="3.52493"
        width="12.7047"
        height="21.0302"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1.04238" />
        <feGaussianBlur stdDeviation="0.521191" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0" />
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1404_2810" />
        <feGaussianBlur stdDeviation="0.130298" result="effect2_foregroundBlur_1404_2810" />
      </filter>
    </defs>
  </svg>
);

export default SpikeDot;