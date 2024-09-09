import React, { useState } from 'react';

const ZoomComponent = () => {
  const [scale, setScale] = useState(1);

  const zoomIn = () => setScale(prev => prev + 0.1);
  const zoomOut = () => setScale(prev => Math.max(1, prev - 0.1));

  return (
    <div>
      <div style={{ transform: `scale(${scale})`, transformOrigin: '0 0' }}>
        <h1>This content will zoom in/out</h1>
        <p>Some content here</p>
      </div>
      <button onClick={zoomIn}>Zoom In</button>
      <button onClick={zoomOut}>Zoom Out</button>
    </div>
  );
};

export default ZoomComponent;
