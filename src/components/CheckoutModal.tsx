import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Package, MapPin, Phone, User, CreditCard } from 'lucide-react';
import { useState, FormEvent } from 'react';

interface CheckoutModalProps {
  isOpen: boolean;
  total: number;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function CheckoutModal({ isOpen, total, onClose, onSubmit }: CheckoutModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    number: '',
    complement: '',
    payment: 'pix',
    deliveryType: 'entrega' as 'entrega' | 'retirada'
  });

  const deliveryFee = formData.deliveryType === 'entrega' ? 9 : 0;
  const finalTotal = total + deliveryFee;

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [orderNumber, setOrderNumber] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const num = Math.floor(1000 + Math.random() * 9000).toString();
    setOrderNumber(num);
    setStep('success');
    onSubmit({ ...formData, orderId: num, finalTotal });
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
        setStep('form');
        setFormData({ name: '', phone: '', address: '', number: '', complement: '', payment: 'pix', deliveryType: 'entrega' });
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-lg bg-white rounded-[40px] z-[201] overflow-hidden shadow-2xl"
          >
            {step === 'form' ? (
              <div className="flex flex-col max-h-[90vh]">
                <div className="p-8 pb-4 flex items-center justify-between border-b border-gray-100">
                  <div className="flex items-center gap-3 text-brand-tomato">
                    <Package size={28} strokeWidth={2.5} />
                    <h2 className="font-display font-black text-2xl tracking-tight">DADOS DO PEDIDO</h2>
                  </div>
                  <button onClick={handleClose} className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-5">
                  {/* Delivery Type Toggle */}
                  <div className="flex bg-gray-50 p-1 rounded-2xl gap-1">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, deliveryType: 'entrega' })}
                      className={`flex-1 h-12 rounded-xl flex items-center justify-center gap-2 font-display font-black text-sm transition-all ${
                        formData.deliveryType === 'entrega' ? 'bg-white text-brand-tomato shadow-md' : 'text-gray-400'
                      }`}
                    >
                      <MapPin size={18} /> ENTREGA
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, deliveryType: 'retirada' })}
                      className={`flex-1 h-12 rounded-xl flex items-center justify-center gap-2 font-display font-black text-sm transition-all ${
                        formData.deliveryType === 'retirada' ? 'bg-white text-brand-tomato shadow-md' : 'text-gray-400'
                      }`}
                    >
                      <Package size={18} /> RETIRADA
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="relative">
                      <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        required
                        type="text"
                        placeholder="Nome Completo"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-14 bg-gray-50 border-2 border-gray-100 rounded-2xl pl-12 pr-4 focus:border-brand-tomato focus:ring-0 outline-none font-medium text-black transition-all"
                      />
                    </div>

                    <div className="relative">
                      <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        required
                        type="tel"
                        placeholder="Telefone (WhatsApp)"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full h-14 bg-gray-50 border-2 border-gray-100 rounded-2xl pl-12 pr-4 focus:border-brand-tomato focus:ring-0 outline-none font-medium text-black transition-all"
                      />
                    </div>

                    {formData.deliveryType === 'entrega' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="md:col-span-2 relative">
                            <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                              required
                              type="text"
                              placeholder="Endereço"
                              value={formData.address}
                              onChange={e => setFormData({ ...formData, address: e.target.value })}
                              className="w-full h-14 bg-gray-50 border-2 border-gray-100 rounded-2xl pl-12 pr-4 focus:border-brand-tomato focus:ring-0 outline-none font-medium text-black transition-all"
                            />
                          </div>
                          <input
                            required
                            type="text"
                            placeholder="Nº"
                            value={formData.number}
                            onChange={e => setFormData({ ...formData, number: e.target.value })}
                            className="w-full h-14 bg-gray-50 border-2 border-gray-100 rounded-2xl px-4 focus:border-brand-tomato focus:ring-0 outline-none font-medium text-black transition-all"
                          />
                        </div>

                        <input
                          type="text"
                          placeholder="Complemento (Apto, bloco, ponto de ref...)"
                          value={formData.complement}
                          onChange={e => setFormData({ ...formData, complement: e.target.value })}
                          className="w-full h-14 bg-gray-50 border-2 border-gray-100 rounded-2xl px-4 focus:border-brand-tomato focus:ring-0 outline-none font-medium text-black transition-all"
                        />
                      </motion.div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs uppercase tracking-widest font-black text-gray-400 flex items-center gap-2">
                       <CreditCard size={14} /> FORMA DE PAGAMENTO
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {['Dinheiro', 'Pix', 'Cartão'].map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setFormData({ ...formData, payment: method.toLowerCase() })}
                          className={`h-12 rounded-xl font-display font-bold text-xs transition-all border-2 ${
                            formData.payment === method.toLowerCase()
                              ? 'bg-brand-tomato text-white border-brand-tomato'
                              : 'bg-gray-50 text-gray-400 border-gray-100'
                          }`}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="bg-gray-50 p-4 rounded-2xl space-y-2">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Subtotal</span>
                      <span>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    </div>
                    {formData.deliveryType === 'entrega' && (
                      <div className="flex justify-between text-sm text-brand-green font-bold">
                        <span>Taxa de Entrega</span>
                        <span>R$ 9,00</span>
                      </div>
                    )}
                    <div className="flex justify-between font-display font-black text-xl text-brand-tomato border-t border-gray-200 pt-2">
                      <span>TOTAL</span>
                      <span>{finalTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full h-16 bg-brand-green text-white rounded-2xl font-display font-black text-xl shadow-xl shadow-brand-green/30 hover:scale-[1.02] active:scale-95 transition-all"
                    id="confirm-checkout-btn"
                  >
                    CONFIRMAR PEDIDO
                  </button>
                </form>
              </div>
            ) : (
              <div className="p-12 text-center flex flex-col items-center space-y-6">
                <div className="w-24 h-24 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center animate-bounce">
                  <CheckCircle size={56} strokeWidth={2.5} />
                </div>
                <div className="space-y-2">
                  <h2 className="font-display font-black text-3xl text-gray-900 tracking-tight">PEDIDO #{orderNumber} RECEBIDO!</h2>
                  <p className="text-gray-500 font-medium px-4">Acompanhe seu pedido pelo WhatsApp agora mesmo.</p>
                </div>
                <button
                  onClick={handleClose}
                  className="w-full h-14 bg-brand-tomato text-white rounded-2xl font-display font-black tracking-tight hover:bg-brand-tomato/90 transition-colors"
                >
                  VOLTAR AO INÍCIO
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
