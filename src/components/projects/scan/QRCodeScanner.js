import { Html5QrcodeScanner } from 'html5-qrcode';
import React, { useEffect, useState, useRef } from 'react';

const QRCodeScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const videoRef = useRef(null);
  const scannerRef = useRef(null);

  useEffect(() => {
    const qrCodeId = 'reader';
    const scanner = new Html5QrcodeScanner(qrCodeId, {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    // Save the scanner instance to the ref
    scannerRef.current = scanner;

    // Define a flag to track whether a successful scan has occurred
    let scanned = false;

    scanner.render(success, error);

    function success(result) {
      if (!scanned) {
        scanned = true;
        scanner.clear();
        setScanResult(result);
        removeVideoElement(qrCodeId);
      }
    }

    function error(err) {
      console.warn(err);
    }

    // Helper function to remove the video element from the DOM
    function removeVideoElement(elementId) {
      const element = document.getElementById(elementId);
      if (element) {
        const videoElement = element.querySelector('video');
        if (videoElement) {
          videoElement.srcObject.getTracks().forEach((track) => track.stop());
        }
        element.removeChild(videoElement);
      }
    }

    // Cleanup when the component unmounts
    return () => {
      scanner.clear();
    };
  }, []);

  // Function to start scanning again
  const startScanningAgain = () => {
    setScanResult(null);
    const scanner = scannerRef.current;
    if (scanner) {
      scanner.render();
    }
  };

  return (
    <div>
      <h1>QR Code Scanning React App</h1>
      {scanResult ? (
        <div>
          Success:{" "}
          <a
            href={scanResult}
            style={{ cursor: "pointer", color: "green" }}
            title="Visit The Site"
            target="_blank"
            //  rel="noopener noreferrer"
          >
            {scanResult}
          </a>

          <br/>
          <div id="reader" ref={videoRef}></div>
          <button className='my-3' onClick={startScanningAgain}>Scan Again</button>
        </div>
      ) : (
        <div>
          <div id="reader" ref={videoRef}></div>
          <button className='my-3' onClick={startScanningAgain}>Scan Again</button>
        </div>
      )}
    </div>
  );
};

export default QRCodeScanner;