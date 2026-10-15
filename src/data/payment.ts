export const paymentConfig = {
  payeeName: "BABY KUMARI",
  upiApp: "PhonePe",
  upiId: "9771051172@axl",
  qrImage: "/images/payment/phonepe-qr.png",
  methods: [
    {
      id: "upi",
      label: "Pay Online",
      name: "PhonePe UPI",
      description: "Scan & Pay using PhonePe App",
    },
    {
      id: "cod",
      label: "Cash on Delivery",
      name: "Cash on Delivery",
      description: "Pay securely at the time of delivery",
    },
  ],
} as const;
