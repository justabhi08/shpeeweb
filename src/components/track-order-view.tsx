"use client";

import { useState, type FormEvent } from "react";
import { Check, PackageCheck, Search } from "lucide-react";
import { formatPrice } from "@/data/catalog";
import type { OrderLine } from "@/db/schema";

type TrackedOrder = {
  orderNumber: string;
  customerName: string;
  total: string;
  status: string;
  items: OrderLine[];
  paymentMethod: string;
  paymentReference: string | null;
  createdAt: string;
};

export function TrackOrderView() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [order, setOrder] = useState<TrackedOrder | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setOrder(null);
    const data = new FormData(event.currentTarget);
    const params = new URLSearchParams({ order: String(data.get("order") ?? ""), email: String(data.get("email") ?? "") });
    try {
      const response = await fetch(`/api/orders/track?${params.toString()}`);
      const result = (await response.json()) as { message?: string; order?: TrackedOrder };
      if (!response.ok || !result.order) setMessage(result.message ?? "No order found.");
      else setOrder(result.order);
    } catch {
      setMessage("Unable to track the order right now.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="track-order-wrap">
      <div className="track-card">
        <span className="track-icon"><PackageCheck size={34} /></span>
        <h2>Track Your Order</h2>
        <p>Enter the order number and email address used during checkout.</p>
        <form onSubmit={submit}>
          <label><span>Order number</span><input name="order" placeholder="e.g. SKY123456789" required /></label>
          <label><span>Email address</span><input name="email" type="email" placeholder="you@example.com" required /></label>
          <button type="submit" className="primary-button" disabled={loading}><Search size={18} /> {loading ? "Checking..." : "Track Order"}</button>
        </form>
        {message ? <p className="track-message">{message}</p> : null}
      </div>
      {order ? (
        <div className="tracking-result">
          <div className="tracking-result-head"><div><span>Order</span><h3>{order.orderNumber}</h3></div><b>{order.status}</b></div>
          <div className="status-progress">
            {["Order placed", "Processing", "Shipped", "Delivered"].map((status, index) => (
              <div className={index === 0 || order.status.toLowerCase().includes(status.toLowerCase()) ? "active" : ""} key={status}>
                <span><Check size={14} /></span><p>{status}</p>
              </div>
            ))}
          </div>
          <p>Placed on {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
          <div className="tracked-items">
            {order.items.map((item) => (
              <div key={item.productId}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.name} />
                <span><strong>{item.name}</strong><small>Qty: {item.quantity}</small></span>
                <b>{formatPrice(item.price * item.quantity)}</b>
              </div>
            ))}
          </div>
          <div className="tracked-total"><span>Order total</span><strong>{formatPrice(Number(order.total))}</strong></div>
          <div className="tracked-payment"><span>Payment method</span><strong>{order.paymentMethod}</strong></div>
          {order.paymentReference ? <div className="tracked-payment"><span>UPI reference</span><strong>{order.paymentReference}</strong></div> : null}
        </div>
      ) : null}
    </div>
  );
}
