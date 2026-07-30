import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  X,
  PackageCheck,
  Search,
  Clock,
  MapPin,
  Download,
  MessageSquare,
  CheckCircle2,
  Truck,
  Building2,
  Banknote,
  ChevronRight,
  ShoppingBag,
} from 'lucide-react';
import { Order } from '../types';

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

export const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({
  isOpen,
  onClose,
  orders,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  // Filter orders by search query
  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.shippingAddress.phone.includes(searchQuery) ||
      order.shippingAddress.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeOrder = selectedOrder || (filteredOrders.length > 0 ? filteredOrders[0] : null);

  const handlePrintInvoice = (orderToPrint: Order) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice #${orderToPrint.id} - Shiv Nursery Manwal</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #064e3b; }
            .header { text-align: center; border-bottom: 2px solid #059669; padding-bottom: 20px; margin-bottom: 30px; }
            .logo { font-size: 28px; font-weight: bold; color: #064e3b; }
            .sublogo { font-size: 14px; color: #059669; text-transform: uppercase; letter-spacing: 2px; }
            .order-meta { display: flex; justify-content: space-between; margin-bottom: 30px; background: #f0fdf4; padding: 15px; border-radius: 8px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            th { background: #064e3b; color: white; text-align: left; padding: 10px; }
            td { border-bottom: 1px solid #e2e8f0; padding: 10px; }
            .totals { float: right; width: 300px; }
            .totals div { display: flex; justify-content: space-between; padding: 5px 0; }
            .grand-total { font-size: 18px; font-weight: bold; color: #064e3b; border-top: 2px solid #059669; padding-top: 10px; }
            .footer { margin-top: 60px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">SHIV NURSERY</div>
            <div class="sublogo">Manwal, Jammu & Kashmir • Contact: +91 8493029963</div>
            <h2 style="margin-top: 15px; color: #0f172a;">Official Plant Purchase Invoice</h2>
          </div>

          <div class="order-meta">
            <div>
              <strong>Order ID:</strong> #${orderToPrint.id}<br/>
              <strong>Order Date:</strong> ${orderToPrint.createdAt}<br/>
              <strong>Payment Status:</strong> ${orderToPrint.paymentMethod === 'cod' ? 'Cash On Delivery' : 'Paid Online (' + orderToPrint.paymentMethod.toUpperCase() + ')'}
            </div>
            <div>
              <strong>Delivery To:</strong><br/>
              ${orderToPrint.shippingAddress.fullName}<br/>
              ${orderToPrint.shippingAddress.address}, ${orderToPrint.shippingAddress.city}<br/>
              ${orderToPrint.shippingAddress.state} - ${orderToPrint.shippingAddress.pincode}<br/>
              Phone: ${orderToPrint.shippingAddress.phone}
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Plant / Sapling</th>
                <th>Category</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${orderToPrint.items
                .map(
                  (item) => `
                <tr>
                  <td>${item.plantName}</td>
                  <td>${item.category}</td>
                  <td>${item.quantity}</td>
                  <td>₹${item.price}</td>
                  <td>₹${item.price * item.quantity}</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>

          <div class="totals">
            <div><span>Subtotal:</span><span>₹${orderToPrint.subtotal}</span></div>
            ${orderToPrint.discount > 0 ? `<div><span>Discount (${orderToPrint.couponCode}):</span><span>-₹${orderToPrint.discount}</span></div>` : ''}
            <div><span>Nursery Delivery Fee:</span><span>${orderToPrint.shippingFee === 0 ? 'FREE' : '₹' + orderToPrint.shippingFee}</span></div>
            <div class="grand-total"><span>Total Amount Paid:</span><span>₹${orderToPrint.totalAmount}</span></div>
          </div>

          <div style="clear: both;"></div>

          <div class="footer">
            Thank you for shopping at Shiv Nursery Manwal!<br/>
            For care guidance or order inquiries, call +91 8493029963 or visit us in Manwal, J&K.
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 300);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-100 flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="bg-emerald-950 text-white p-5 sm:p-6 flex items-center justify-between border-b border-emerald-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-800 flex items-center justify-center text-emerald-300">
              <PackageCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-serif text-white">Track Nursery Orders</h3>
              <p className="text-xs text-emerald-300">
                View order status, invoices, and plant dispatch tracking
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-emerald-300 hover:text-white hover:bg-emerald-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Order ID (e.g. SN-2026-9814) or Phone Number..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-emerald-50/60 text-emerald-950 text-xs font-medium border border-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <ShoppingBag className="w-12 h-12 text-emerald-300 mx-auto" />
              <h4 className="text-base font-bold text-emerald-950">No orders placed yet</h4>
              <p className="text-xs text-emerald-800 max-w-sm mx-auto">
                Explore our plant catalog, add fruit trees, flowering shrubs or indoor palms to your cart, and place an order to track it here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Order List Column */}
              <div className="md:col-span-1 space-y-2 border-r border-emerald-100 pr-2 max-h-[50vh] overflow-y-auto">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                  Recent Orders ({filteredOrders.length})
                </span>

                {filteredOrders.map((order) => (
                  <button
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all space-y-1 ${
                      activeOrder?.id === order.id
                        ? 'bg-emerald-800 text-white border-emerald-900 shadow-md'
                        : 'bg-emerald-50/50 hover:bg-emerald-100/60 text-emerald-950 border-emerald-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold font-mono">#{order.id}</span>
                      <span className="text-[10px] font-semibold opacity-80">
                        ₹{order.totalAmount}
                      </span>
                    </div>

                    <p className={`text-[11px] truncate ${activeOrder?.id === order.id ? 'text-emerald-200' : 'text-emerald-800'}`}>
                      {order.items.map((i) => i.plantName).join(', ')}
                    </p>

                    <div className="flex items-center justify-between text-[10px] pt-1">
                      <span className={activeOrder?.id === order.id ? 'text-emerald-300' : 'text-emerald-600'}>
                        {order.createdAt.split(',')[0]}
                      </span>
                      <span className="font-bold uppercase tracking-wider bg-emerald-700/30 px-1.5 py-0.5 rounded">
                        Confirmed
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Order Detail View Column */}
              <div className="md:col-span-2 space-y-4">
                {activeOrder ? (
                  <div className="space-y-4 p-4 rounded-2xl bg-emerald-50/30 border border-emerald-100">
                    <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
                      <div>
                        <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                          Order Details
                        </span>
                        <h4 className="text-base font-bold font-mono text-emerald-950">
                          #{activeOrder.id}
                        </h4>
                      </div>

                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{activeOrder.status.toUpperCase()}</span>
                      </span>
                    </div>

                    {/* Timeline */}
                    <div className="p-3 bg-white rounded-xl border border-emerald-100 space-y-2">
                      <div className="flex justify-between text-xs font-semibold text-emerald-900">
                        <span>Delivery Speed: {activeOrder.shippingAddress.deliveryType.toUpperCase()}</span>
                        <span>Est: {activeOrder.estimatedDelivery}</span>
                      </div>

                      <div className="grid grid-cols-4 gap-1 text-center pt-1">
                        <div className="space-y-1">
                          <div className="w-full h-1.5 rounded-full bg-emerald-600"></div>
                          <span className="text-[9px] font-bold text-emerald-900 block">Placed</span>
                        </div>
                        <div className="space-y-1">
                          <div className="w-full h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                          <span className="text-[9px] font-bold text-emerald-800 block">Nursery Batch</span>
                        </div>
                        <div className="space-y-1">
                          <div className="w-full h-1.5 rounded-full bg-emerald-200"></div>
                          <span className="text-[9px] text-emerald-600 block">In Transit</span>
                        </div>
                        <div className="space-y-1">
                          <div className="w-full h-1.5 rounded-full bg-emerald-200"></div>
                          <span className="text-[9px] text-emerald-600 block">Delivered</span>
                        </div>
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                      {activeOrder.items.map((item) => (
                        <div
                          key={item.plantId}
                          className="p-2.5 rounded-xl bg-white border border-emerald-100 flex items-center justify-between text-xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <img
                              src={item.imageUrl}
                              alt={item.plantName}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                            <div>
                              <h5 className="font-bold text-emerald-950">{item.plantName}</h5>
                              <p className="text-[10px] text-emerald-700">Qty: {item.quantity} • ₹{item.price} each</p>
                            </div>
                          </div>
                          <span className="font-bold text-emerald-950">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    {/* Shipping Address & Actions */}
                    <div className="p-3 bg-white rounded-xl border border-emerald-100 text-xs space-y-1">
                      <span className="font-bold text-emerald-900 block">Deliver To:</span>
                      <p className="text-emerald-950 font-medium">
                        {activeOrder.shippingAddress.fullName} • {activeOrder.shippingAddress.phone}
                      </p>
                      <p className="text-emerald-800 text-[11px]">
                        {activeOrder.shippingAddress.address}, {activeOrder.shippingAddress.city}, {activeOrder.shippingAddress.state} - {activeOrder.shippingAddress.pincode}
                      </p>
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => handlePrintInvoice(activeOrder)}
                        className="flex-1 py-2.5 rounded-xl bg-emerald-100 text-emerald-900 hover:bg-emerald-200 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Print Invoice</span>
                      </button>

                      <a
                        href={`https://wa.me/918493029963?text=Hello%20Shiv%20Nursery%2C%20I%20am%20inquiring%20about%20Order%20%23${activeOrder.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 rounded-xl bg-emerald-800 text-white hover:bg-emerald-900 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-300" />
                        <span>Ask on WhatsApp</span>
                      </a>
                    </div>

                  </div>
                ) : (
                  <p className="text-xs text-emerald-700 text-center py-8">Select an order on the left to view details.</p>
                )}
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-emerald-100 shrink-0 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};
