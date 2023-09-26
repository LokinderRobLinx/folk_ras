import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import axios from 'axios';

const QRCodeScanner = () => {
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (scanned) {
      // Perform API request here with the scanned QR code data
      // Replace with your API endpoint and data handling logic
      axios.post('YOUR_API_ENDPOINT', { qrCodeData: 'YOUR_SCANNED_DATA' })
        .then(response => {
          console.log('QR Code data saved:', response.data);
        })
        .catch(error => {
          console.error('Error saving QR Code data:', error);
        });
    }
  }, [scanned]);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    alert(`Scanned QR Code: ${data}`);
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        onBarCodeRead={handleBarCodeScanned}
        captureAudio={false}
      />
      {!scanned && (
        <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
          <Text style={styles.buttonText}>Scan QR Code</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    margin: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QRCodeScanner;