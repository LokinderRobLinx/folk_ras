import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
// import QrReader from 'react-qr-reader';

const QRCodeScanner = () => {
    const [result, setResult] = useState(null);
    const [showScanner, setShowScanner] = useState(false);
  
    const handleScan = (data) => {
      if (data) {
        setResult(data);
      }
    };
  
    const handleError = (err) => {
      console.error(err);
    };
  
    const startScanner = () => {
      setShowScanner(true);
    };
  
    const stopScanner = () => {
      setShowScanner(false);
    };
  
    return (
      <div>
        <h1>QR Code Scanner</h1>
        {result && <p>Scanned QR Code: {result}</p>}
        {showScanner ? (
          <>
            <QrReader
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: '100%' }}
            />
            <button onClick={stopScanner}>Stop Scanning</button>
          </>
        ) : (
          <button onClick={startScanner}>Start Scanning</button>
        )}
      </div>
    );
  };
  
  export default QRCodeScanner;