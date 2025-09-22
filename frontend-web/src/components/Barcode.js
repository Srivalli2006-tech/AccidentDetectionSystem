import React from "react";
import { QRCode } from "react-qrcode-logo";

const Barcode = ({ value }) => {
  const downloadQRCode = () => {
    const canvas = document.querySelector(`#qr-${value}`);
    if (canvas) {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `QRCode-${value}.png`;
      link.click();
    }
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <QRCode id={`qr-${value}`} value={value} size={100} />
      <button onClick={downloadQRCode} style={{ marginTop: "5px" }}>Download QR</button>
    </div>
  );
};

export default Barcode;
