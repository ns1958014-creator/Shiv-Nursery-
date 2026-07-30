import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  CheckCircle2,
  CreditCard,
  QrCode,
  Building2,
  Banknote,
  Truck,
  ShieldCheck,
  Tag,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  Download,
  MessageSquare,
  PackageCheck,
  ShoppingBag,
  Clock,
  MapPin,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { InquiryItem, Order, PaymentMethod, ShippingAddress } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: InquiryItem[];
  onUpdateQuantity: (plantId: string, delta: number) => void;
  onRemoveItem: (plantId: string) => void;
  onOrderComplete: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onOrderComplete,
}) => {
  const [step, setStep] = useState<'cart' | 'address' | 'payment' | 'processing' | 'success'>('cart');
  
  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent: number; isFreeShip?: boolean } | null>(null);
  const [couponError, setCouponError] = useState('');

  // Shipping Address State
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Jammu',
    state: 'Jammu & Kashmir',
    pincode: '180001',
    deliveryType: 'express',
    notes: '',
  });
  const [addressErrors, setAddressErrors] = useState<Record<string, string>>({});

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiId, setUpiId] = useState('');
  const [isUpiCopied, setIsUpiCopied] = useState(false);

  // Card details state
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  // Net banking state
  const [selectedBank, setSelectedBank] = useState('sbi');

  // Completed Order state
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  // Price calculations
  const subtotal = items.reduce((acc, item) => acc + item.plant.price * item.quantity, 0);
  
  let discountAmount = 0;
  if (appliedCoupon) {
    discountAmount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
  }

  let baseShippingFee = address.deliveryType === 'pickup' ? 0 : subtotal >= 999 || appliedCoupon?.isFreeShip ? 0 : 99;
  const shippingFee = baseShippingFee;
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee);

  // Apply coupon handler
  const handleApplyCoupon = (codeToApply?: string) => {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    setCouponError('');

    if (!code) {
      setCouponError('Please enter a coupon code.');
      return;
    }

    if (code === 'SHIV10') {
      setAppliedCoupon({ code: 'SHIV10', discountPercent: 10 });
      setCouponCode('SHIV10');
    } else if (code === 'WELCOME20') {
      if (subtotal < 800) {
        setCouponError('WELCOME20 requires minimum subtotal of ₹800');
        return;
      }
      setAppliedCoupon({ code: 'WELCOME20', discountPercent: 20 });
      setCouponCode('WELCOME20');
    } else if (code === 'FREESHIP') {
      setAppliedCoupon({ code: 'FREESHIP', discountPercent: 0, isFreeShip: true });
      setCouponCode('FREESHIP');
    } else {
      setCouponError('Invalid coupon code. Try SHIV10 or WELCOME20.');
    }
  };

  // Validate address form
  const validateAddress = () => {
    const errors: Record<string, string> = {};
    if (!address.fullName.trim()) errors.fullName = 'Full name is required';
    if (!address.phone.trim() || address.phone.length < 10) errors.phone = 'Valid 10-digit phone required';
    if (!address.address.trim()) errors.address = 'Street address is required';
    if (!address.city.trim()) errors.city = 'City is required';
    if (!address.pincode.trim()) errors.pincode = 'Pincode is required';

    setAddressErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Process payment
  const handleProcessOrder = () => {
    setStep('processing');

    setTimeout(() => {
      const orderId = `SN-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const orderDate = new Date().toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      const estimatedDeliveryDate = new Date();
      estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + (address.deliveryType === 'pickup' ? 1 : 3));
      const estDelStr = estimatedDeliveryDate.toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      });

      const newOrder: Order = {
        id: orderId,
        createdAt: orderDate,
        items: items.map((item) => ({
          plantId: item.plant.id,
          plantName: item.plant.name,
          price: item.plant.price,
          quantity: item.quantity,
          imageUrl: item.plant.imageUrl,
          category: item.plant.category,
        })),
        shippingAddress: address,
        paymentMethod,
        subtotal,
        discount: discountAmount,
        shippingFee,
        totalAmount,
        status: 'confirmed',
        couponCode: appliedCoupon?.code,
        estimatedDelivery: estDelStr,
      };

      setCompletedOrder(newOrder);
      onOrderComplete(newOrder);
      setStep('success');
    }, 2000);
  };

  // Copy UPI handler
  const handleCopyUpi = () => {
    navigator.clipboard.writeText('8493029963@upi');
    setIsUpiCopied(true);
    setTimeout(() => setIsUpiCopied(false), 2000);
  };

  // Print invoice handler
  const handlePrintInvoice = () => {
    if (!completedOrder) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice #${completedOrder.id} - Shiv Nursery Manwal</title>
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
              <strong>Order ID:</strong> #${completedOrder.id}<br/>
              <strong>Order Date:</strong> ${completedOrder.createdAt}<br/>
              <strong>Payment Status:</strong> ${completedOrder.paymentMethod === 'cod' ? 'Cash On Delivery' : 'Paid Online (' + completedOrder.paymentMethod.toUpperCase() + ')'}
            </div>
            <div>
              <strong>Delivery To:</strong><br/>
              ${completedOrder.shippingAddress.fullName}<br/>
              ${completedOrder.shippingAddress.address}, ${completedOrder.shippingAddress.city}<br/>
              ${completedOrder.shippingAddress.state} - ${completedOrder.shippingAddress.pincode}<br/>
              Phone: ${completedOrder.shippingAddress.phone}
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
              ${completedOrder.items
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
            <div><span>Subtotal:</span><span>₹${completedOrder.subtotal}</span></div>
            ${completedOrder.discount > 0 ? `<div><span>Discount (${completedOrder.couponCode}):</span><span>-₹${completedOrder.discount}</span></div>` : ''}
            <div><span>Nursery Delivery Fee:</span><span>${completedOrder.shippingFee === 0 ? 'FREE' : '₹' + completedOrder.shippingFee}</span></div>
            <div class="grand-total"><span>Total Amount Paid:</span><span>₹${completedOrder.totalAmount}</span></div>
          </div>

          <div style="clear: both;"></div>

          <div class="footer">
            Thank you for shopping at Shiv Nursery Manwal! We guarantee healthy, lush rootstock.<br/>
            For care guidance or order inquiries, call +91 8493029963 or visit us in Manwal, J&K.
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 300);
  };

  // WhatsApp order share handler
  const handleSendWhatsAppOrder = () => {
    if (!completedOrder) return;
    const itemsStr = completedOrder.items
      .map((i) => `• ${i.plantName} x${i.quantity} = ₹${i.price * i.quantity}`)
      .join('\n');

    const msg = encodeURIComponent(
      `Hello Shiv Nursery! I placed Order #${completedOrder.id}.\n\n` +
        `Plants Ordered:\n${itemsStr}\n\n` +
        `Total Amount: ₹${completedOrder.totalAmount}\n` +
        `Payment Method: ${completedOrder.paymentMethod.toUpperCase()}\n` +
        `Delivery Name: ${completedOrder.shippingAddress.fullName}\n` +
        `Delivery City: ${completedOrder.shippingAddress.city}, J&K (${completedOrder.shippingAddress.pincode})\n\n` +
        `Please confirm my dispatch status!`
    );

    window.open(`https://wa.me/918493029963?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-100 flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-emerald-950 text-white p-5 sm:p-6 flex items-center justify-between border-b border-emerald-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/30">
              <ShoppingBag className="w-5 h-5 text-emerald-100" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-serif text-white flex items-center gap-2">
                <span>Shiv Nursery Checkout</span>
                <span className="text-[10px] uppercase font-sans tracking-widest bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded-md font-semibold">
                  Secure
                </span>
              </h3>
              <p className="text-xs text-emerald-300">
                {step === 'cart' && 'Review your plants & coupons'}
                {step === 'address' && 'Enter shipping & delivery location'}
                {step === 'payment' && 'Choose instant payment method'}
                {step === 'processing' && 'Verifying payment with nursery gateway...'}
                {step === 'success' && 'Order placed successfully!'}
              </p>
            </div>
          </div>

          {step !== 'processing' && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-emerald-300 hover:text-white hover:bg-emerald-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Stepper Bar */}
        {step !== 'success' && step !== 'processing' && (
          <div className="bg-emerald-50/70 border-b border-emerald-100 px-6 py-3 shrink-0 flex items-center justify-between text-xs font-bold text-emerald-900">
            <div
              className={`flex items-center gap-1.5 ${
                step === 'cart' ? 'text-emerald-700 font-extrabold' : 'text-emerald-950/50'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-900 flex items-center justify-center text-[11px]">
                1
              </span>
              <span>Cart & Coupons</span>
            </div>
            <ChevronRight className="w-4 h-4 text-emerald-300" />
            <div
              className={`flex items-center gap-1.5 ${
                step === 'address' ? 'text-emerald-700 font-extrabold' : 'text-emerald-950/50'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-900 flex items-center justify-center text-[11px]">
                2
              </span>
              <span>Delivery Address</span>
            </div>
            <ChevronRight className="w-4 h-4 text-emerald-300" />
            <div
              className={`flex items-center gap-1.5 ${
                step === 'payment' ? 'text-emerald-700 font-extrabold' : 'text-emerald-950/50'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-900 flex items-center justify-center text-[11px]">
                3
              </span>
              <span>Payment</span>
            </div>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* STEP 1: CART REVIEW */}
          {step === 'cart' && (
            <div className="space-y-6">
              {items.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <ShoppingBag className="w-12 h-12 text-emerald-300 mx-auto" />
                  <p className="text-base font-bold text-emerald-950">Your shopping cart is empty</p>
                  <p className="text-xs text-emerald-800/70">
                    Add Alphonso Mango, Red Rose, or Areca Palm plants to proceed with checkout.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-2 px-5 py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900"
                  >
                    Explore Plant Catalog
                  </button>
                </div>
              ) : (
                <>
                  {/* Plant items */}
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {items.map((item) => (
                      <div
                        key={item.plant.id}
                        className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={item.plant.imageUrl}
                            alt={item.plant.name}
                            className="w-14 h-14 rounded-xl object-cover shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <h4 className="text-sm font-bold text-emerald-950 truncate">
                              {item.plant.name}
                            </h4>
                            <p className="text-xs text-emerald-700 font-medium">
                              ₹{item.plant.price} each • {item.plant.category}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <div className="flex items-center gap-1.5 bg-white border border-emerald-200 rounded-lg p-1">
                            <button
                              onClick={() => onUpdateQuantity(item.plant.id, -1)}
                              className="px-1.5 text-emerald-800 hover:bg-emerald-100 rounded text-xs font-bold"
                            >
                              -
                            </button>
                            <span className="text-xs font-bold px-1.5 text-emerald-950">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.plant.id, 1)}
                              className="px-1.5 text-emerald-800 hover:bg-emerald-100 rounded text-xs font-bold"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-sm font-bold text-emerald-950 w-16 text-right">
                            ₹{item.plant.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Coupon Discount Section */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-900/5 to-green-900/5 border border-emerald-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-950">
                        <Tag className="w-4 h-4 text-emerald-600" />
                        <span>Apply Nursery Discount Coupon</span>
                      </div>
                      {appliedCoupon && (
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Check className="w-3 h-3" /> {appliedCoupon.code} Applied
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter coupon (e.g. SHIV10)"
                        className="flex-1 px-3.5 py-2 rounded-xl bg-white text-xs font-semibold uppercase text-emerald-950 border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      <button
                        onClick={() => handleApplyCoupon()}
                        className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-colors"
                      >
                        Apply
                      </button>
                    </div>

                    {/* Quick Preset Coupons */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      <button
                        onClick={() => handleApplyCoupon('SHIV10')}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-emerald-100/70 hover:bg-emerald-200 text-emerald-900 transition-colors flex items-center gap-1 border border-emerald-200"
                      >
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        <span>SHIV10 (10% OFF)</span>
                      </button>
                      <button
                        onClick={() => handleApplyCoupon('WELCOME20')}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-emerald-100/70 hover:bg-emerald-200 text-emerald-900 transition-colors flex items-center gap-1 border border-emerald-200"
                      >
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        <span>WELCOME20 (20% OFF over ₹800)</span>
                      </button>
                      <button
                        onClick={() => handleApplyCoupon('FREESHIP')}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-emerald-100/70 hover:bg-emerald-200 text-emerald-900 transition-colors flex items-center gap-1 border border-emerald-200"
                      >
                        <Truck className="w-3 h-3 text-emerald-600" />
                        <span>FREESHIP (Free Delivery)</span>
                      </button>
                    </div>

                    {couponError && (
                      <p className="text-xs font-semibold text-rose-600">{couponError}</p>
                    )}
                  </div>

                  {/* Summary Breakdown */}
                  <div className="p-4 rounded-2xl bg-white border border-emerald-100 space-y-2 text-xs text-emerald-900">
                    <div className="flex justify-between">
                      <span className="text-emerald-800 font-medium">Subtotal ({items.length} plant types):</span>
                      <span className="font-bold">₹{subtotal}</span>
                    </div>

                    {appliedCoupon && discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-700 font-semibold">
                        <span>Discount ({appliedCoupon.code}):</span>
                        <span>-₹{discountAmount}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="text-emerald-800 font-medium">Nursery Express Shipping:</span>
                      <span className="font-bold">
                        {shippingFee === 0 ? (
                          <span className="text-emerald-600 font-bold">FREE</span>
                        ) : (
                          `₹${shippingFee}`
                        )}
                      </span>
                    </div>

                    {subtotal < 999 && address.deliveryType !== 'pickup' && !appliedCoupon?.isFreeShip && (
                      <p className="text-[11px] text-emerald-700 bg-emerald-50 p-2 rounded-lg font-medium">
                        💡 Add ₹{999 - subtotal} more worth of plants to get FREE Express Delivery!
                      </p>
                    )}

                    <div className="pt-2 border-t border-emerald-100 flex justify-between items-center text-sm">
                      <span className="font-bold text-emerald-950">Grand Total Amount:</span>
                      <span className="text-lg font-serif font-bold text-emerald-800">
                        ₹{totalAmount}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* STEP 2: ADDRESS & DELIVERY */}
          {step === 'address' && (
            <div className="space-y-5">
              <h4 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Shipping & Plant Delivery Details</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Full name */}
                <div>
                  <label className="block text-xs font-semibold text-emerald-900 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    placeholder="e.g. Rajesh Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-emerald-50/50 text-xs font-medium text-emerald-950 border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  {addressErrors.fullName && (
                    <p className="text-[11px] text-rose-600 mt-1">{addressErrors.fullName}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-emerald-900 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    placeholder="10-digit phone number"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-emerald-50/50 text-xs font-medium text-emerald-950 border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  {addressErrors.phone && (
                    <p className="text-[11px] text-rose-600 mt-1">{addressErrors.phone}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-emerald-900 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={address.email}
                    onChange={(e) => setAddress({ ...address, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-emerald-50/50 text-xs font-medium text-emerald-950 border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Pincode */}
                <div>
                  <label className="block text-xs font-semibold text-emerald-900 mb-1">
                    Pincode / Postal Code *
                  </label>
                  <input
                    type="text"
                    value={address.pincode}
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                    placeholder="e.g. 180001"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-emerald-50/50 text-xs font-medium text-emerald-950 border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  {addressErrors.pincode && (
                    <p className="text-[11px] text-rose-600 mt-1">{addressErrors.pincode}</p>
                  )}
                </div>
              </div>

              {/* Full street address */}
              <div>
                <label className="block text-xs font-semibold text-emerald-900 mb-1">
                  Street Address & House / Plot No. *
                </label>
                <textarea
                  rows={2}
                  value={address.address}
                  onChange={(e) => setAddress({ ...address, address: e.target.value })}
                  placeholder="e.g. H.No 42, Near Railway Bridge, Gandhi Nagar"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-emerald-50/50 text-xs font-medium text-emerald-950 border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {addressErrors.address && (
                  <p className="text-[11px] text-rose-600 mt-1">{addressErrors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* City */}
                <div>
                  <label className="block text-xs font-semibold text-emerald-900 mb-1">City</label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-emerald-50/50 text-xs font-medium text-emerald-950 border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* State */}
                <div>
                  <label className="block text-xs font-semibold text-emerald-900 mb-1">State</label>
                  <input
                    type="text"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-emerald-50/50 text-xs font-medium text-emerald-950 border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Delivery Speed / Method Radio */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold text-emerald-950">
                  Select Delivery Option
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <label
                    onClick={() => setAddress({ ...address, deliveryType: 'express' })}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      address.deliveryType === 'express'
                        ? 'bg-emerald-100/80 border-emerald-600 shadow-sm'
                        : 'bg-white border-emerald-100 hover:bg-emerald-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Truck className="w-4 h-4 text-emerald-700" />
                      <div>
                        <span className="text-xs font-bold text-emerald-950 block">Express Delivery</span>
                        <span className="text-[10px] text-emerald-700">1-3 Days to Doorstep</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-800">
                      {shippingFee === 0 ? 'FREE' : '₹99'}
                    </span>
                  </label>

                  <label
                    onClick={() => setAddress({ ...address, deliveryType: 'pickup' })}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      address.deliveryType === 'pickup'
                        ? 'bg-emerald-100/80 border-emerald-600 shadow-sm'
                        : 'bg-white border-emerald-100 hover:bg-emerald-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Building2 className="w-4 h-4 text-emerald-700" />
                      <div>
                        <span className="text-xs font-bold text-emerald-950 block">Self-Pickup</span>
                        <span className="text-[10px] text-emerald-700">Collect at Nursery, Manwal</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-700">FREE</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT METHOD */}
          {step === 'payment' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Choose Payment Method</span>
                </h4>
                <span className="text-xs text-emerald-700 font-semibold">
                  Amount: <strong className="text-emerald-950 font-serif text-sm">₹{totalAmount}</strong>
                </span>
              </div>

              {/* Payment Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'upi'
                      ? 'bg-emerald-800 text-white border-emerald-900 shadow-md'
                      : 'bg-emerald-50/50 text-emerald-900 border-emerald-100 hover:bg-emerald-100/50'
                  }`}
                >
                  <QrCode className="w-5 h-5" />
                  <span className="text-xs font-bold">BHIM / UPI</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'card'
                      ? 'bg-emerald-800 text-white border-emerald-900 shadow-md'
                      : 'bg-emerald-50/50 text-emerald-900 border-emerald-100 hover:bg-emerald-100/50'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span className="text-xs font-bold">Debit/Credit</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'netbanking'
                      ? 'bg-emerald-800 text-white border-emerald-900 shadow-md'
                      : 'bg-emerald-50/50 text-emerald-900 border-emerald-100 hover:bg-emerald-100/50'
                  }`}
                >
                  <Building2 className="w-5 h-5" />
                  <span className="text-xs font-bold">Net Banking</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'cod'
                      ? 'bg-emerald-800 text-white border-emerald-900 shadow-md'
                      : 'bg-emerald-50/50 text-emerald-900 border-emerald-100 hover:bg-emerald-100/50'
                  }`}
                >
                  <Banknote className="w-5 h-5" />
                  <span className="text-xs font-bold">Cash on Delivery</span>
                </button>
              </div>

              {/* PAYMENT SUB-PANELS */}
              
              {/* UPI PANEL */}
              {paymentMethod === 'upi' && (
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-4">
                  <div className="text-center space-y-2">
                    <p className="text-xs font-bold text-emerald-950">
                      Scan QR Code via GPay, PhonePe, Paytm, or Amazon Pay
                    </p>
                    
                    {/* Simulated Nursery QR Code */}
                    <div className="w-36 h-36 bg-white p-2.5 mx-auto rounded-2xl border-2 border-emerald-600 shadow-md flex items-center justify-center">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=8493029963@upi%26pn=Shiv%20Nursery%26am=${totalAmount}%26cu=INR`}
                        alt="Nursery UPI QR Code"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex items-center justify-center gap-2 pt-1">
                      <span className="text-xs font-mono font-bold text-emerald-900 bg-white px-3 py-1 rounded-lg border border-emerald-200">
                        8493029963@upi
                      </span>
                      <button
                        onClick={handleCopyUpi}
                        className="p-1.5 bg-emerald-200 text-emerald-900 hover:bg-emerald-300 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                      >
                        {isUpiCopied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{isUpiCopied ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-emerald-200/60">
                    <label className="block text-xs font-semibold text-emerald-900 mb-1">
                      Or Enter Your UPI ID (e.g. mobile@upi)
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. 9876543210@paytm"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white text-xs font-medium text-emerald-950 border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              )}

              {/* CARD PANEL */}
              {paymentMethod === 'card' && (
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-emerald-900 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      maxLength={19}
                      value={cardDetails.number}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          number: e.target.value
                            .replace(/\D/g, '')
                            .replace(/(.{4})/g, '$1 ')
                            .trim(),
                        })
                      }
                      placeholder="4532 •••• •••• 8892"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white text-xs font-mono font-medium text-emerald-950 border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-emerald-900 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        maxLength={5}
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                        placeholder="MM/YY"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white text-xs font-medium text-emerald-950 border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-emerald-900 mb-1">CVV</label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                        placeholder="123"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white text-xs font-medium text-emerald-950 border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-emerald-900 mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                      placeholder="Name on card"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white text-xs font-medium text-emerald-950 border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              )}

              {/* NET BANKING PANEL */}
              {paymentMethod === 'netbanking' && (
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-3">
                  <label className="block text-xs font-semibold text-emerald-900">Select Bank</label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white text-xs font-semibold text-emerald-950 border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="sbi">State Bank of India (SBI)</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="axis">Axis Bank</option>
                    <option value="pnb">Punjab National Bank (PNB)</option>
                    <option value="kotak">Kotak Mahindra Bank</option>
                    <option value="bob">Bank of Baroda</option>
                  </select>
                </div>
              )}

              {/* COD PANEL */}
              {paymentMethod === 'cod' && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2 text-xs text-amber-900">
                  <div className="flex items-center gap-2 font-bold text-amber-950">
                    <Banknote className="w-4 h-4 text-amber-700" />
                    <span>Cash on Delivery Selected</span>
                  </div>
                  <p>
                    You can pay <strong>₹{totalAmount}</strong> in cash or via UPI scan to our delivery rider when your healthy plants arrive at your address in {address.city}.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: PROCESSING STATE */}
          {step === 'processing' && (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-700 rounded-full animate-spin mx-auto"></div>
              <h4 className="text-lg font-bold font-serif text-emerald-950">Processing Plant Order...</h4>
              <p className="text-xs text-emerald-800 max-w-xs mx-auto">
                Securely connecting to Shiv Nursery Manwal Order Desk. Please do not close this window.
              </p>
            </div>
          )}

          {/* STEP 5: SUCCESS & RECEIPT */}
          {step === 'success' && completedOrder && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold font-serif text-emerald-950">Order Placed Successfully!</h3>
                <p className="text-xs text-emerald-800">
                  Thank you for shopping with Shiv Nursery Manwal! Order ID: <strong className="text-emerald-950 font-mono text-sm">#{completedOrder.id}</strong>
                </p>
              </div>

              {/* Order Status Timeline Bar */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-950">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span>Estimated Delivery:</span>
                  </span>
                  <span className="text-emerald-800 font-serif">{completedOrder.estimatedDelivery}</span>
                </div>

                <div className="grid grid-cols-4 gap-1 text-center pt-2">
                  <div className="space-y-1">
                    <div className="w-full h-2 rounded-full bg-emerald-600"></div>
                    <span className="text-[10px] font-bold text-emerald-900 block">Confirmed</span>
                  </div>
                  <div className="space-y-1">
                    <div className="w-full h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[10px] font-bold text-emerald-800 block">Nursery Batch</span>
                  </div>
                  <div className="space-y-1">
                    <div className="w-full h-2 rounded-full bg-emerald-200"></div>
                    <span className="text-[10px] text-emerald-700/60 block">Dispatched</span>
                  </div>
                  <div className="space-y-1">
                    <div className="w-full h-2 rounded-full bg-emerald-200"></div>
                    <span className="text-[10px] text-emerald-700/60 block">Delivered</span>
                  </div>
                </div>
              </div>

              {/* Order Items Summary */}
              <div className="p-4 rounded-2xl bg-white border border-emerald-100 space-y-3 text-xs">
                <h4 className="font-bold text-emerald-950 flex items-center justify-between">
                  <span>Order Items ({completedOrder.items.length})</span>
                  <span>Total Paid: ₹{completedOrder.totalAmount}</span>
                </h4>

                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                  {completedOrder.items.map((item) => (
                    <div key={item.plantId} className="flex items-center justify-between py-1 border-b border-emerald-50">
                      <div className="flex items-center gap-2">
                        <img src={item.imageUrl} alt={item.plantName} className="w-8 h-8 rounded-lg object-cover" />
                        <span className="font-semibold text-emerald-950">{item.plantName} (x{item.quantity})</span>
                      </div>
                      <span className="font-bold text-emerald-900">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Success Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handlePrintInvoice}
                  className="py-3 px-4 rounded-xl bg-emerald-100 text-emerald-900 hover:bg-emerald-200 font-bold text-xs transition-colors flex items-center justify-center gap-2 border border-emerald-200"
                >
                  <Download className="w-4 h-4 text-emerald-700" />
                  <span>Download Tax Invoice</span>
                </button>

                <button
                  onClick={handleSendWhatsAppOrder}
                  className="py-3 px-4 rounded-xl bg-emerald-800 text-white hover:bg-emerald-900 font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-md shadow-emerald-900/20"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-300" />
                  <span>Send Order to WhatsApp</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        {step !== 'processing' && step !== 'success' && (
          <div className="p-4 sm:p-5 bg-white border-t border-emerald-100 flex items-center justify-between shrink-0">
            {step === 'cart' ? (
              <button
                onClick={onClose}
                className="text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors"
              >
                Cancel
              </button>
            ) : (
              <button
                onClick={() => setStep(step === 'payment' ? 'address' : 'cart')}
                className="px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-900 hover:bg-emerald-100 font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            )}

            {step === 'cart' && (
              <button
                disabled={items.length === 0}
                onClick={() => setStep('address')}
                className="px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-emerald-900/20 flex items-center gap-2 transition-all"
              >
                <span>Proceed to Shipping Address</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {step === 'address' && (
              <button
                onClick={() => {
                  if (validateAddress()) setStep('payment');
                }}
                className="px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-md shadow-emerald-900/20 flex items-center gap-2 transition-all"
              >
                <span>Proceed to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {step === 'payment' && (
              <button
                onClick={handleProcessOrder}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Pay ₹{totalAmount} & Place Order</span>
              </button>
            )}
          </div>
        )}

        {step === 'success' && (
          <div className="p-4 bg-white border-t border-emerald-100 shrink-0 text-center">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900"
            >
              Close & Continue Shopping
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
