import React from 'react';

const Popup = () => {
  return (
    <div style={{ width: 300, height: 150 }}>
      <p
        style={{
          textAlign: 'center',
          marginTop: 20,
          fontSize: 14,
          fontFamily: 'Source Sans Pro',
          color: 'white',
        }}
      >
        Press <kbd>⌘+k</kbd> / <kbd>Ctrl+k</kbd> to open kbar.<br></br>This popup window
        wont be used, please close me.
      </p>
    </div>
  );
};

export default Popup;
