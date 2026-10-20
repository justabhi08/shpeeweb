"use client";
import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { OrderCard, type OrderDetails } from "@/components/order-card";
import { orderStatuses, paymentStatuses } from "@/lib/order-status";
type AdminOrder = OrderDetails & { customerName: string; email: string; phone: string; address: string; city: string; state: string; pincode: string; paymentReference: string | null; items: { name: string; quantity: number }[] };
export default function AdminOrders() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [search, setSearch] = useState("");
  async function load() {
    setBusy(true);
    try { const res = await fetch("/api/admin/orders", { cache: "no-store" }); const data = await res.json(); if (!res.ok) throw new Error(data.message); setOrders(data.orders); setMessage(data.orders.length ? "" : "No orders yet."); }
    catch (error) { setMessage(error instanceof Error ? error.message : "Unable to load orders."); }
    finally { setBusy(false); }
  }
  useEffect(() => { void load(); }, []);
  async function save(event: FormEvent<HTMLFormElement>, orderNumber: string) {
    event.preventDefault(); const data = Object.fromEntries(new FormData(event.currentTarget)); setBusy(true); setMessage("");
    try { const res = await fetch("/api/admin/orders", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, orderNumber }) }); const result = await res.json(); if (!res.ok) throw new Error(result.message); setOrders(old => old.map(order => order.orderNumber === orderNumber ? result.order : order)); setMessage(`Updated ${orderNumber}. Customers can see the update on the website.`); }
    catch (error) { setMessage(error instanceof Error ? error.message : "Update failed."); }
    finally { setBusy(false); }
  }
  return <main className="site-container order-dashboard"><div className="order-dashboard-head"><div><h1>Order management</h1><p>Update delivery progress and verify scan-pay payments.</p></div><Link className="outline-button" href="/account">Account / sign in</Link></div>
    <p>Automatic email and SMS updates are not enabled. Contact customers manually until a notification service is connected.</p>
    <div className="account-actions"><input aria-label="Search recent orders" placeholder="Search recent orders by number, email or phone" value={search} onChange={event => setSearch(event.target.value)} /><button disabled={busy} onClick={load}>{busy ? "Loading…" : "Refresh latest 100 orders"}</button></div><p role="status">{message}</p>
    {orders.filter(order => `${order.orderNumber} ${order.email} ${order.phone}`.toLowerCase().includes(search.toLowerCase())).map(order => <section key={order.orderNumber} className="admin-order"><OrderCard order={order} /><p>{order.customerName} · {order.email} · {order.phone}</p><p>{order.address}, {order.city}, {order.state} {order.pincode}</p><p>{order.items.map(item => `${item.name} × ${item.quantity}`).join(", ")}</p>{order.paymentReference && <p>UPI reference: {order.paymentReference}</p>}
      <form className="admin-order-form" onSubmit={event => save(event, order.orderNumber)}>
        <label>Delivery status<select name="status" defaultValue={order.status === "Order placed" ? "Confirmed" : order.status}>{orderStatuses.map(status => <option key={status}>{status}</option>)}</select></label>
        <label>Payment status<select name="paymentStatus" defaultValue={order.paymentStatus}>{paymentStatuses.map(status => <option key={status}>{status}</option>)}</select></label>
        <label>Courier<input name="courier" maxLength={120} defaultValue={order.courier ?? ""} /></label><label>Tracking number<input name="trackingNumber" maxLength={120} defaultValue={order.trackingNumber ?? ""} /></label><label>Expected delivery<input name="estimatedDelivery" type="date" defaultValue={order.estimatedDelivery ?? ""} /></label><label>Customer-visible update<input name="note" maxLength={500} placeholder="e.g. Handed over to courier" /></label><button className="primary-button" disabled={busy}>Save update</button>
      </form></section>)}
  </main>;
}
