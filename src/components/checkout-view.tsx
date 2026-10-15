"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { CheckCircle2, LockKeyhole } from "lucide-react";
import { displayProductName, formatPrice } from "@/data/catalog";
import { paymentConfig } from "@/data/payment";
import { PaymentOptions } from "./payment-options";
import { useStore } from "./store-context";

type OrderResponse = {
  message?: string;
  order?: { orderNumber: string; status: string };
};

export function CheckoutView() {
  const { cartLines, cartTotal, clearCart } = useStore();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [completedOrder, setCompletedOrder] = useState<string | null>(null);
  const [paymentMethodLabel, setPaymentMethodLabel] = useState<string>(paymentConfig.methods[0].name);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const fields = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          paymentMethod: fields.paymentMethod === "PhonePe UPI" ? "PhonePe UPI" : "Cash on Delivery",
          paymentReference: String(fields.paymentReference ?? "").trim(),
          items: cartLines.map(({ product, quantity }) => ({ productId: product.Id, quantity })),
        }),
      });
      const data = (await response.json()) as OrderResponse;
      if (!response.ok || !data.order) {
        setMessage(data.message ?? "Unable to place your order.");
      } else {
        setPaymentMethodLabel(fields.paymentMethod === "PhonePe UPI" ? "PhonePe UPI" : "Cash on Delivery");
        setCompletedOrder(data.order.orderNumber);
        clearCart();
      }
    } catch {
      setMessage("Unable to place your order right now.");
    } finally {
      setLoading(false);
    }
  }

  if (completedOrder) {
    return (
      <div className="order-success">
        <CheckCircle2 size={60} />
        <h1>Thank you for your order!</h1>
        <p>Your order has been placed successfully.</p>
        <div><span>Order number</span><strong>{completedOrder}</strong></div>
        <p>Keep this order number and your email address to track the order.</p>
        <p className="order-success-note">Payment method: <strong>{paymentMethodLabel}</strong></p>
        <Link href="/track-order" className="primary-button">Track your order</Link>
        <Link href="/products" className="outline-button">Continue shopping</Link>
      </div>
    );
  }

  if (!cartLines.length) {
    return (
      <div className="checkout-empty">
        <h1>Your cart is empty</h1>
        <p>Add products to your cart before proceeding to checkout.</p>
        <Link href="/products" className="primary-button">Start Shopping</Link>
      </div>
    );
  }

  return (
    <form className="checkout-layout" onSubmit={submit}>
      <div className="checkout-form-panel">
        <div className="checkout-heading"><span>1</span><div><h2>Contact information</h2><p>We’ll use these details for your order updates.</p></div></div>
        <div className="checkout-fields form-two-cols">
          <label><span>Full name *</span><input name="customerName" required minLength={2} /></label>
          <label><span>Phone number *</span><input name="phone" type="tel" required minLength={7} /></label>
          <label className="full"><span>Email address *</span><input name="email" type="email" required /></label>
        </div>
        <div className="checkout-heading"><span>2</span><div><h2>Delivery address</h2><p>Enter a complete address for smooth delivery.</p></div></div>
        <div className="checkout-fields form-two-cols">
          <label className="full"><span>Address *</span><textarea name="address" rows={3} minLength={8} required /></label>
          <label><span>City *</span><input name="city" required /></label>
          <label><span>State *</span><input name="state" required /></label>
          <label><span>PIN code *</span><input name="pincode" inputMode="numeric" required minLength={5} /></label>
          <label><span>Country</span><input value="India" readOnly /></label>
        </div>
        <div className="checkout-heading"><span>3</span><div><h2>Payment method</h2><p>Pay online with {paymentConfig.upiApp} UPI or choose Cash on Delivery.</p></div></div>
        <PaymentOptions />
      </div>
      <aside className="order-summary-panel">
        <h2>Order summary</h2>
        <div className="checkout-lines">
          {cartLines.map(({ product, quantity }) => (
            <div className="checkout-line" key={product.Id}>
              <span className="checkout-line-image">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.ProductImage} alt={product.PName} /><b>{quantity}</b>
              </span>
              <p>{displayProductName(product.PName)}</p>
              <strong>{formatPrice(product.DP * quantity)}</strong>
            </div>
          ))}
        </div>
        <div className="summary-totals">
          <p><span>Subtotal</span><strong>{formatPrice(cartTotal)}</strong></p>
          <p><span>Shipping</span><strong>Free</strong></p>
          <div><span>Total</span><strong>{formatPrice(cartTotal)}</strong></div>
        </div>
        <button className="primary-button checkout-button" type="submit" disabled={loading}>{loading ? "PLACING ORDER..." : "PLACE ORDER"}</button>
        <p className="secure-checkout"><LockKeyhole size={15} /> Secure checkout. Your information is protected.</p>
        {message ? <p className="form-response error">{message}</p> : null}
      </aside>
    </form>
  );
}
