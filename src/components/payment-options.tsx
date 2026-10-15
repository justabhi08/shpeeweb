"use client";

import { useState } from "react";
import { Banknote, QrCode, ScanLine, Smartphone, TriangleAlert } from "lucide-react";
import { paymentConfig } from "@/data/payment";

export function PaymentOptions() {
  const [method, setMethod] = useState<"upi" | "cod">("upi");
  const [qrFailed, setQrFailed] = useState(false);

  return (
    <div className="payment-methods">
      <input type="hidden" name="paymentMethod" value={method === "upi" ? "PhonePe UPI" : "Cash on Delivery"} />

      <label className={`payment-option ${method === "upi" ? "selected" : ""}`}>
        <input type="radio" name="paymentChoice" checked={method === "upi"} onChange={() => setMethod("upi")} />
        <span className="payment-option-icon upi"><Smartphone size={21} /></span>
        <span className="payment-option-copy">
          <strong>Pay Online — {paymentConfig.upiApp} UPI</strong>
          <small>Scan the QR code and pay securely with any UPI app</small>
        </span>
        <span className="payment-radio-dot" />
      </label>

      {method === "upi" ? (
        <div className="upi-panel">
          <div className="upi-poster">
            <div className="phonepe-head">
              <span className="phonepe-badge" aria-hidden="true">पे</span>
              <strong>{paymentConfig.upiApp}</strong>
            </div>
            <p className="upi-accepted">ACCEPTED HERE</p>
            <p className="upi-instruction">Scan &amp; Pay Using {paymentConfig.upiApp} App</p>
            <div className="qr-frame">
              {qrFailed ? (
                <div className="qr-fallback">
                  <QrCode size={42} />
                  <span>QR code unavailable</span>
                </div>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={paymentConfig.qrImage} alt={`PhonePe QR code for ${paymentConfig.payeeName}`} onError={() => setQrFailed(true)} />
              )}
            </div>
            <p className="upi-payee">{paymentConfig.payeeName}</p>
          </div>
          <ul className="upi-notes">
            <li><ScanLine size={18} /><span>Open {paymentConfig.upiApp} or any UPI app and scan the QR code.</span></li>
            {paymentConfig.upiId ? <li><QrCode size={18} /><span>UPI ID: <strong>{paymentConfig.upiId}</strong></span></li> : null}
            <li><TriangleAlert size={18} /><span>Enter the UPI reference number below after completing the payment.</span></li>
          </ul>
          <label className="upi-reference">
            <span>UPI Transaction / Reference number</span>
            <input type="text" name="paymentReference" placeholder="e.g. 4152 8364 2190" minLength={6} required={method === "upi"} />
          </label>
        </div>
      ) : null}

      <label className={`payment-option ${method === "cod" ? "selected" : ""}`}>
        <input type="radio" name="paymentChoice" checked={method === "cod"} onChange={() => setMethod("cod")} />
        <span className="payment-option-icon cod"><Banknote size={21} /></span>
        <span className="payment-option-copy">
          <strong>Cash on Delivery</strong>
          <small>Pay securely at the time of delivery</small>
        </span>
        <span className="payment-radio-dot" />
      </label>
    </div>
  );
}
