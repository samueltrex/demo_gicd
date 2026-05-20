import React, { useState } from "react";
import { X, Heart, ShieldCheck, Check, Copy, Award, Briefcase, Mail, Phone, ExternalLink } from "lucide-react";

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DonateModal({ isOpen, onClose }: DonateModalProps) {
  const [amount, setAmount] = useState<string>("10000");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank">("bank");
  const [copiedBank, setCopiedBank] = useState(false);
  const [step, setStep] = useState<"form" | "success">("form");
  const [formData, setFormData] = useState({ name: "", email: "", cardName: "", cardNumber: "", expiry: "", cvv: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleCopyBank = () => {
    navigator.clipboard.writeText("1024567890"); // Placeholder GICD NGO account
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const handleAmountClick = (val: string) => {
    setAmount(val);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setAmount("");
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.email.trim() || !formData.email.includes("@")) newErrors.email = "Valid email is required";
    
    if (paymentMethod === "card") {
      if (!formData.cardName.trim()) newErrors.cardName = "Cardholder Name is required";
      if (!formData.cardNumber.trim() || formData.cardNumber.length < 16) newErrors.cardNumber = "Enter valid 16-digit card number";
      if (!formData.expiry.trim()) newErrors.expiry = "MM/YY is required";
      if (!formData.cvv.trim() || formData.cvv.length < 3) newErrors.cvv = "CVV is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setStep("success");
    }
  };

  const activeAmount = customAmount ? customAmount : amount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" id="donate-modal-overlay">
      <div className="relative w-full max-w-lg overflow-hidden bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col" id="donate-modal-container">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-brand-black text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-brand-yellow fill-brand-yellow text-pulse" />
            <h3 className="font-sans font-bold text-lg text-brand-yellow">Transform a Life in Jos Today</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-800 transition text-gray-400 hover:text-white"
            aria-label="Close dialog"
            id="close-donate-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === "form" ? (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[80vh] flex-1 space-y-5">
            
            {/* Amount Selection */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Select Donation Amount</p>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {[
                  { value: "5000", label: "₦5,000" },
                  { value: "10000", label: "₦10,000" },
                  { value: "25000", label: "₦25,000" },
                  { value: "50000", label: "₦50,000" },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => handleAmountClick(item.value)}
                    className={`py-3 text-sm font-bold rounded-lg border transition ${
                      amount === item.value && !customAmount
                        ? "bg-brand-yellow text-brand-black border-brand-yellow shadow-sm"
                        : "border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-brand-yellow"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500 font-bold text-sm">₦</span>
                <input
                  type="number"
                  placeholder="Enter other custom amount in Naira"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className="w-full pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Payment Method</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("bank")}
                  className={`py-2 text-xs font-semibold rounded-lg border transition flex items-center justify-center gap-2 ${
                    paymentMethod === "bank"
                      ? "bg-gray-100 text-brand-black border-brand-black"
                      : "border-gray-200 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  Bank Transfer / Cash
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`py-2 text-xs font-semibold rounded-lg border transition flex items-center justify-center gap-2 ${
                    paymentMethod === "card"
                      ? "bg-gray-100 text-brand-black border-brand-black"
                      : "border-gray-200 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  Pay Online (Card)
                </button>
              </div>
            </div>

            {/* Donor Personal Information */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Donor Details</p>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samuel David"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-yellow ${
                      errors.name ? "border-red-500" : "border-gray-200"
                    }`}
                  />
                  {errors.name && <span className="text-[10px] text-red-500 mt-0.5 block">{errors.name}</span>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="name@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-yellow ${
                      errors.email ? "border-red-500" : "border-gray-200"
                    }`}
                  />
                  {errors.email && <span className="text-[10px] text-red-500 mt-0.5 block">{errors.email}</span>}
                </div>
              </div>
            </div>

            {/* Conditional Payment Panels */}
            {paymentMethod === "bank" ? (
              <div className="p-4 bg-amber-50/70 border border-amber-100 rounded-xl space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-brand-black">GICD Direct Bank Transfer (Nigeria)</h4>
                    <p className="text-[11px] text-gray-600 mt-0.5">Transfer from any Nigerian mobile bank app. Fast and secure.</p>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-green-600 shrink-0" />
                </div>
                
                <div className="bg-white p-3 rounded-lg border border-amber-200 space-y-1.5 text-xs text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Bank Name:</span>
                    <span className="font-semibold text-brand-black">Zenith Bank PLC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Account Name:</span>
                    <span className="font-semibold text-brand-black">Guardian Initiative Comms Dev</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Account Number:</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-brand-black text-sm">1024567890</span>
                      <button
                        type="button"
                        onClick={handleCopyBank}
                        className="p-1 hover:bg-gray-100 rounded text-amber-600 active:scale-95 transition"
                        title="Copy Account Number"
                      >
                        {copiedBank ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-gray-500 text-center italic">
                  *Please type &quot;GICD Donate&quot; as your transfer note. Send screenshot to info@gicdnigeria.org or submit form below for verification.
                </p>
              </div>
            ) : (
              <div className="p-4 bg-gray-50 rounded-xl space-y-3 border border-gray-100">
                <p className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                  Secure Debit/Credit Checkout <span className="text-[10px] text-green-600 font-normal">● 256-bit SSL</span>
                </p>
                
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="As printed on card"
                      value={formData.cardName}
                      onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-yellow bg-white"
                    />
                    {errors.cardName && <span className="text-[10px] text-red-500 mt-0.5 block">{errors.cardName}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Card Number</label>
                    <input
                      type="text"
                      maxLength={16}
                      placeholder="4123 4567 8901 2345"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value.replace(/\D/g, '') })}
                      className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-yellow font-mono bg-white"
                    />
                    {errors.cardNumber && <span className="text-[10px] text-red-500 mt-0.5 block">{errors.cardNumber}</span>}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        maxLength={5}
                        value={formData.expiry}
                        onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-yellow font-mono text-center bg-white"
                      />
                      {errors.expiry && <span className="text-[10px] text-red-500 mt-0.5 block">{errors.expiry}</span>}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">CVV Security Code</label>
                      <input
                        type="password"
                        placeholder="123"
                        maxLength={3}
                        value={formData.cvv}
                        onChange={(e) => setFormData({ ...formData, cvv: e.target.value.replace(/\D/g, '') })}
                        className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-yellow font-mono text-center bg-white"
                      />
                      {errors.cvv && <span className="text-[10px] text-red-500 mt-0.5 block">{errors.cvv}</span>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-brand-yellow hover:bg-brand-yellow/90 active:scale-[0.98] transition font-sans font-extrabold text-sm text-brand-black py-3 rounded-xl shadow-md uppercase tracking-wider flex items-center justify-center gap-2 mt-4"
              id="submit-donate-btn"
            >
              <span>Verify & Complete Donation of ₦{Number(activeAmount).toLocaleString()}</span>
              <Heart className="w-4 h-4 fill-brand-black" />
            </button>
          </form>
        ) : (
          /* Success Dialog */
          <div className="p-8 text-center flex flex-col items-center justify-center space-y-5 animate-scale-up" id="donate-success-screen">
            <div className="w-16 h-16 bg-brand-yellow/10 rounded-full flex items-center justify-center border border-brand-yellow">
              <Check className="w-8 h-8 text-brand-yellow stroke-[3]" />
            </div>
            
            <div className="space-y-2">
              <h4 className="font-heading font-extrabold text-xl text-brand-black">Thank You For Your Support!</h4>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Dearest <span className="font-bold text-brand-black">{formData.name}</span>, your generosity of 
                <span className="font-bold text-brand-black"> ₦{Number(activeAmount).toLocaleString()}</span> is going directly to 
                grassroots programs in Jos, Plateau State.
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-left w-full space-y-1.5 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Receipt Status:</span>
                <span className="text-green-600 font-semibold">SUCCESSFUL (PENDING PROOF)</span>
              </div>
              <div className="flex justify-between">
                <span>Confirmation ID:</span>
                <span className="font-mono font-bold text-brand-black">GICD-TX-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between">
                <span>Beneficiary Org:</span>
                <span className="font-bold text-brand-black">GICD Nigeria NGO</span>
              </div>
              <div className="flex justify-between">
                <span>Date Recorded:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </div>

            <p className="text-[11px] text-gray-400 italic">
              Official tax-deductible contribution receipt has been dispatched to {formData.email}.
            </p>

            <button
              onClick={() => {
                setStep("form");
                setFormData({ name: "", email: "", cardName: "", cardNumber: "", expiry: "", cvv: "" });
                onClose();
              }}
              className="px-6 py-2.5 bg-brand-black hover:bg-gray-800 transition text-brand-yellow font-bold rounded-lg text-xs tracking-wider uppercase"
              id="dismiss-donate-success-btn"
            >
              Back to Main Website
            </button>
          </div>
        )}

      </div>
    </div>
  );
}




interface VolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VolunteerModal({ isOpen, onClose }: VolunteerModalProps) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", area: "Education & Scholarships", experience: "", motivation: "" });
  const [step, setStep] = useState<"form" | "success">("form");
  const [ticketId] = useState(() => `GICD-VOL-${Math.floor(1000 + Math.random() * 9000)}`);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("success");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in" id="volunteer-modal-overlay">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col" id="volunteer-modal-container">
        
        {/* Header */}
        <div className="px-6 py-4 bg-brand-black text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-brand-yellow" />
            <h3 className="font-sans font-bold text-lg text-brand-yellow">Join GICD Volunteers Squad</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-800 transition text-gray-400 hover:text-white"
            aria-label="Close dialog"
            id="close-volunteer-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === "form" ? (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[80vh] flex-1 space-y-4">
            <p className="text-xs text-gray-500">
              Become the change you want to see. Work with community leaders and professionals on the field in Plateau State to make real social impact.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ibrahim Yusuf"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Phone Number (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +234 803..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Your Main Area of Interest *</label>
                <select
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:outline-none bg-white font-sans text-brand-black"
                >
                  <option>Education & Scholarships</option>
                  <option>Healthcare Outreach & Medical Camp</option>
                  <option>Economic Empowerment & Vocational Training</option>
                  <option>Environmental Sustainability & Tree Planting</option>
                  <option>Youth Core Development & IT Coaching</option>
                  <option>Food Security & Urban Farming Support</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Why do you want to volunteer with GICD in Jos? *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell us a little about your motivation, values, and community connection..."
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:outline-none resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-brand-black hover:bg-gray-900 transition font-sans font-bold text-xs text-brand-yellow py-3 rounded-lg flex items-center justify-center gap-2 uppercase tracking-wide cursor-pointer text-center"
              id="submit-volunteer-btn"
            >
              <span>Submit Volunteer Request</span>
              <Award className="w-4 h-4 text-brand-yellow" />
            </button>
          </form>
        ) : (
          /* Confirmation card */
          <div className="p-8 text-center flex flex-col items-center justify-center space-y-5" id="volunteer-success-screen">
            <div className="w-16 h-16 bg-brand-yellow/10 rounded-full flex items-center justify-center">
              <Award className="w-8 h-8 text-brand-yellow" />
            </div>

            <div className="space-y-1">
              <h4 className="font-sans font-extrabold text-lg text-brand-black">Volunteer Registration Successful!</h4>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                Welcome to the movement, <span className="font-bold text-brand-black">{formData.name}</span>! Our programs team in Rayfield, Jos will review your application.
              </p>
            </div>

            {/* Custom Digital Badge Visualizer */}
            <div className="w-full p-4 bg-gradient-to-br from-brand-black to-slate-900 rounded-xl border border-brand-yellow/40 text-left relative overflow-hidden shadow-lg">
              <div className="absolute right-0 top-0 opacity-10 font-bold font-sans text-6xl text-brand-yellow select-none">
                GICD
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-800">
                <span className="text-[10px] text-brand-yellow uppercase tracking-widest font-black">VOLUNTEER PASS</span>
                <span className="text-[10px] text-gray-400 font-mono">{ticketId}</span>
              </div>
              <div className="space-y-2 mt-3 text-xs">
                <div>
                  <span className="text-[9px] text-gray-400 block uppercase">Name of Volunteer</span>
                  <span className="font-bold text-white text-sm">{formData.name}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[9px] text-gray-400 block uppercase">Department Assign</span>
                    <span className="font-semibold text-brand-yellow line-clamp-1">{formData.area}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-400 block uppercase">Base Location</span>
                    <span className="font-semibold text-white">Jos, Plateau State</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-gray-500 italic max-w-xs">
              Next step: Please watch for a WhatsApp/SMS invitation and an introductory materials packet sent to <span className="underline">{formData.email}</span>.
            </p>

            <button
              onClick={() => {
                setStep("form");
                setFormData({ name: "", email: "", phone: "", area: "Education & Scholarships", experience: "", motivation: "" });
                onClose();
              }}
              className="px-6 py-2 bg-brand-yellow hover:bg-brand-yellow/90 text-brand-black font-extrabold rounded-lg text-xs tracking-wider uppercase transition active:scale-95"
              id="dismiss-volunteer-badge-btn"
            >
              Done, Return Home
            </button>
          </div>
        )}

      </div>
    </div>
  );
}




interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PartnerModal({ isOpen, onClose }: PartnerModalProps) {
  const [formData, setFormData] = useState({ orgName: "", contactName: "", email: "", phone: "", proposalType: "CSR Partnership", msg: "" });
  const [step, setStep] = useState<"form" | "success">("form");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("success");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" id="partner-modal-overlay">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col" id="partner-modal-container">
        
        {/* Header */}
        <div className="px-6 py-4 bg-brand-black text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-brand-yellow" />
            <h3 className="font-sans font-bold text-lg text-brand-yellow">Partner With GICD NGO</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-800 transition text-gray-400 hover:text-white"
            aria-label="Close dialog"
            id="close-partner-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === "form" ? (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[80vh] flex-1 space-y-4">
            <p className="text-xs text-gray-500">
              Maximize your Corporate Social Responsibility (CSR), technical grant, or international development funding with one of Plateau State’s most credible grassroots operations.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Organization / Institution Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chevron Nigeria, Ford Foundation, local agency..."
                  value={formData.orgName}
                  onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Contact Officer Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Juliet Johnson"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Partnership Stream *</label>
                  <select
                    value={formData.proposalType}
                    onChange={(e) => setFormData({ ...formData, proposalType: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:outline-none bg-white font-sans text-brand-black"
                  >
                    <option>CSR Partnership</option>
                    <option>International Technical Grant</option>
                    <option>Local Government Sub-Contract</option>
                    <option>Academic & Scientific Research</option>
                    <option>In-Kind Donations (Medical/Education supplies)</option>
                    <option>Other Advocacy Sponsorships</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Official Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="officer@company.org"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Contact Number (WhatsApp/Direct) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 ..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Partnership Objectives / Message *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Outline key goals, targeted community locations, or grant milestones..."
                  value={formData.msg}
                  onChange={(e) => setFormData({ ...formData, msg: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:outline-none resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-brand-yellow hover:bg-brand-yellow/90 text-brand-black font-extrabold text-xs py-3 rounded-lg flex items-center justify-center gap-2 uppercase tracking-wide cursor-pointer transition active:scale-95"
              id="submit-partnership-btn"
            >
              <span>Initialize Partnership Proposal</span>
              <X className="w-3.5 h-3.5 rotate-45 text-brand-black" />
            </button>
          </form>
        ) : (
          <div className="p-8 text-center flex flex-col items-center justify-center space-y-5" id="partner-success-screen">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center border border-green-200">
              <Check className="w-8 h-8 text-green-600" />
            </div>

            <div className="space-y-1">
              <h4 className="font-sans font-bold text-lg text-brand-black">Proposal Received!</h4>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                Thank you, <span className="font-bold text-brand-black">{formData.contactName}</span> of <span className="font-bold text-brand-black">{formData.orgName}</span>. Your partnership intent ticket is officially registered.
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-left w-full space-y-1.5 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Enquiry Status:</span>
                <span className="text-amber-600 font-semibold">PENDING CHIEF AUDIT</span>
              </div>
              <div className="flex justify-between">
                <span>Case Reference Number:</span>
                <span className="font-mono font-bold text-brand-black">GICD-PT-{Math.floor(100+Math.random()*900)}</span>
              </div>
              <div className="flex justify-between">
                <span>Primary Stream:</span>
                <span>{formData.proposalType}</span>
              </div>
            </div>

            <p className="text-[10px] text-gray-400 max-w-xs">
              Our Executive Directorate and Public Relations team will contact you at <span className="underline">{formData.email}</span> within 48 hours with technical compliance documents and audited reports of past projects.
            </p>

            <button
              onClick={() => {
                setStep("form");
                setFormData({ orgName: "", contactName: "", email: "", phone: "", proposalType: "CSR Partnership", msg: "" });
                onClose();
              }}
              className="px-6 py-2 bg-brand-black text-brand-yellow font-bold rounded-lg text-xs tracking-wider uppercase transition active:scale-[0.97]"
              id="dismiss-partner-success-btn"
            >
              Dismiss Window
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
