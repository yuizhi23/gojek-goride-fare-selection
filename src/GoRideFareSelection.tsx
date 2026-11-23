import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * GoRide Fare Selection Hi-Fi Interactive Component
 * Framework: React + Framer Motion (motion.dev)
 * Target Frame: 360 x 800 dp
 * Language: Bahasa Indonesia
 */

// Design System Tokens (CSS Variables reference)
export const TOKENS = {
  primary: '#0B6E4F',
  primarySubtle: '#E8F3EE',
  textPrimary: '#1A1A1A',
  textSecondary: '#5F6368',
  surface: '#FFFFFF',
  surfaceMuted: '#F3F4F6',
  border: '#8D949E',
  warningBg: '#FFF4E0',
  warningText: '#8A5A00',
  error: '#B3261E',
  scrim: 'rgba(0, 0, 0, 0.40)',
};

// Motion Variants (Accessible with prefers-reduced-motion)
const sheetVariants = {
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', damping: 28, stiffness: 300, duration: 0.3 }
  },
  exit: { y: '100%', opacity: 0, transition: { duration: 0.25 } }
};

const cardMotionTransition = { duration: 0.15, ease: 'easeInOut' };

export interface TariffOption {
  id: 'hemat' | 'cepat';
  name: string;
  price: number;
  priceFormatted: string;
  pickupMins: number;
  isPreferred?: boolean;
}

export const GoRideFareSelection: React.FC = () => {
  const [selectedTariff, setSelectedTariff] = useState<'hemat' | 'cepat'>('hemat');
  const [scenario, setScenario] = useState<'normal' | 'loading' | 'edge1' | 'driver'>('normal');
  const [isLoadingOrder, setIsLoadingOrder] = useState<boolean>(false);

  const tariffData: Record<'hemat' | 'cepat', TariffOption> = {
    hemat: {
      id: 'hemat',
      name: 'Hemat',
      price: 7000,
      priceFormatted: 'Rp7.000',
      pickupMins: scenario === 'edge1' ? 12 : 6,
      isPreferred: true,
    },
    cepat: {
      id: 'cepat',
      name: 'Cepat',
      price: 11500,
      priceFormatted: 'Rp11.500',
      pickupMins: 4,
      isPreferred: false,
    },
  };

  const currentSelection = tariffData[selectedTariff];
  const isE1 = scenario === 'edge1';
  const priceDiff = tariffData.cepat.price - tariffData.hemat.price;
  const timeDiff = tariffData.hemat.pickupMins - tariffData.cepat.pickupMins;

  const handleOrder = () => {
    setIsLoadingOrder(true);
    setTimeout(() => {
      setIsLoadingOrder(false);
      setScenario('driver');
    }, 700);
  };

  return (
    <div className="relative w-[360px] h-[800px] bg-white rounded-[36px] overflow-hidden shadow-2xl flex flex-col font-sans border border-slate-700 select-none">
      
      {/* Status Bar */}
      <div className="h-7 px-4 flex justify-between items-center text-[11px] font-semibold text-[#1A1A1A] z-20">
        <span>08:15</span>
        <div className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 22l7.03-4.39C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9z"/></svg>
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4z"/></svg>
          <div className="w-4 h-2.5 border border-[#1A1A1A] rounded-sm p-0.5"><div className="w-2.5 h-1.5 bg-[#1A1A1A] rounded-xs" /></div>
        </div>
      </div>

      {/* Map Background Simulation */}
      <div className="absolute inset-0 bg-[#E8ECE9] z-0">
        <svg className="w-full h-full object-cover" viewBox="0 0 360 800" fill="none">
          <path d="M20 70C50 60 110 80 90 150C70 220 10 210 20 70Z" fill="#D3E7D3"/>
          <path d="M260 110C310 120 350 170 330 230C300 270 240 240 260 110Z" fill="#D3E7D3"/>
          <path d="M-20 210H380" stroke="#FFFFFF" strokeWidth="14"/>
          <path d="M120 10V380" stroke="#FFFFFF" strokeWidth="14"/>
          <path d="M70 160L120 160L120 250L250 250L250 180" stroke="#0B6E4F" strokeWidth="6" strokeDasharray="4 4"/>
          <circle cx="70" cy="160" r="8" fill="#0B6E4F"/>
          <circle cx="250" cy="180" r="8" fill="#DC2626"/>
        </svg>
      </div>

      {/* Floating Back Button */}
      <button 
        onClick={() => setScenario('normal')}
        className="absolute top-9 left-4 z-30 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#1A1A1A] active:bg-[#F3F4F6]"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
      </button>

      {/* Scrim Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

      {/* Main Bottom Sheet (Sepertiga Bawah / Thumb Zone) */}
      <AnimatePresence mode="wait">
        {scenario !== 'driver' ? (
          <motion.div
            key="fare-sheet"
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute bottom-0 inset-x-0 bg-white rounded-t-[16px] shadow-2xl p-4 pb-6 z-20 flex flex-col gap-3"
          >
            {/* Handle Bar */}
            <div className="w-9 h-1 bg-gray-300 rounded-full mx-auto -mt-1 mb-1" />

            {/* Header info */}
            <div className="flex justify-between items-baseline">
              <div className="flex items-center gap-1.5">
                <span className="text-[16px] font-semibold text-[#1A1A1A]">Pilihan Tarif GoRide</span>
                <span className="text-[12px] text-[#5F6368]">• 3.2 km</span>
              </div>
              <button 
                onClick={() => setScenario(isE1 ? 'normal' : 'edge1')}
                className="text-[12px] font-semibold text-[#0B6E4F]"
              >
                {isE1 ? 'Kembali Normal' : 'Simulasi E1'}
              </button>
            </div>

            {/* Warning Banner for Edge Case E1 */}
            <AnimatePresence>
              {isE1 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-[#FFF4E0] border border-[#FCD34D] rounded-lg p-2.5 flex items-start gap-2 text-[11px] text-[#8A5A00] leading-4"
                >
                  <svg className="w-4 h-4 shrink-0 mt-0.5 text-[#8A5A00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                  <span><strong>Jemput Hemat 12 mnt</strong> melewati batas +3 mnt. Kami pilihkan Cepat. (Hemat tetap bisa dipilih).</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Organism: 2 Kartu Opsi Tarif Sejajar (Equal Weight 50-50) */}
            <div className="grid grid-cols-2 gap-2 w-full">
              
              {/* Kartu Hemat */}
              <motion.div
                onClick={() => setSelectedTariff('hemat')}
                whileTap={{ scale: 0.985 }}
                animate={{
                  borderColor: selectedTariff === 'hemat' ? '#0B6E4F' : '#8D949E',
                  borderWidth: selectedTariff === 'hemat' ? 2 : 1,
                }}
                transition={cardMotionTransition}
                className="relative bg-white rounded-lg p-2 flex flex-col justify-between min-h-[104px] cursor-pointer"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[16px] font-semibold text-[#1A1A1A]">Hemat</span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    selectedTariff === 'hemat' ? 'border-[#0B6E4F]' : 'border-[#8D949E]'
                  }`}>
                    {selectedTariff === 'hemat' && <div className="w-2.5 h-2.5 rounded-full bg-[#0B6E4F]" />}
                  </div>
                </div>
                <div className="text-[20px] font-semibold text-[#1A1A1A]">{tariffData.hemat.priceFormatted}</div>
                <div className="text-[12px] text-[#5F6368] flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <span>Jemput {tariffData.hemat.pickupMins} mnt</span>
                </div>
                <div className="mt-1 min-h-[18px]">
                  <span className="inline-block text-[10px] font-semibold text-[#0B6E4F] bg-[#E8F3EE] px-1.5 py-0.5 rounded">
                    Sesuai preferensi
                  </span>
                </div>
              </motion.div>

              {/* Kartu Cepat */}
              <motion.div
                onClick={() => setSelectedTariff('cepat')}
                whileTap={{ scale: 0.985 }}
                animate={{
                  borderColor: selectedTariff === 'cepat' ? '#0B6E4F' : '#8D949E',
                  borderWidth: selectedTariff === 'cepat' ? 2 : 1,
                }}
                transition={cardMotionTransition}
                className="relative bg-white rounded-lg p-2 flex flex-col justify-between min-h-[104px] cursor-pointer"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[16px] font-semibold text-[#1A1A1A]">Cepat</span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    selectedTariff === 'cepat' ? 'border-[#0B6E4F]' : 'border-[#8D949E]'
                  }`}>
                    {selectedTariff === 'cepat' && <div className="w-2.5 h-2.5 rounded-full bg-[#0B6E4F]" />}
                  </div>
                </div>
                <div className="text-[20px] font-semibold text-[#1A1A1A]">{tariffData.cepat.priceFormatted}</div>
                <div className="text-[12px] text-[#5F6368] flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <span>Jemput {tariffData.cepat.pickupMins} mnt</span>
                </div>
                <div className="mt-1 min-h-[18px]" />
              </motion.div>

            </div>

            {/* Molekul: Strip Selisih (Varian Normal & Warning) */}
            <motion.div
              animate={{
                backgroundColor: isE1 && selectedTariff === 'hemat' ? '#FFF4E0' : '#E8F3EE',
                color: isE1 && selectedTariff === 'hemat' ? '#8A5A00' : '#0B6E4F',
              }}
              className="w-full min-h-[36px] rounded-lg px-3 py-2 flex items-center gap-2 text-[13px] font-medium transition-colors"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              <span>
                {selectedTariff === 'hemat'
                  ? `Hemat Rp${priceDiff.toLocaleString('id-ID')}, jemput +${timeDiff} menit`
                  : `Lebih cepat ${timeDiff} menit, selisih +Rp${priceDiff.toLocaleString('id-ID')}`}
              </span>
            </motion.div>

            {/* Payment & Promo Bar */}
            <div className="flex justify-between items-center text-[11px] text-[#5F6368] px-1">
              <div>GoPay • <strong className="text-[#1A1A1A]">Rp54.200</strong></div>
              <div className="text-[#0B6E4F] font-semibold cursor-pointer">Promo 10% aktif ›</div>
            </div>

            {/* Primary Action Button */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleOrder}
              disabled={isLoadingOrder}
              className="w-full h-12 min-h-[48px] rounded-lg bg-[#0B6E4F] hover:bg-[#08523A] active:bg-[#063B29] text-white font-semibold text-[16px] flex items-center justify-center relative overflow-hidden"
            >
              {isLoadingOrder ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <span>Pesan GoRide {currentSelection.name}</span>
              )}
            </motion.button>
          </motion.div>
        ) : (
          /* Layar 5: Driver Ditemukan Bottom Sheet */
          <motion.div
            key="driver-sheet"
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute bottom-0 inset-x-0 bg-white rounded-t-[16px] shadow-2xl p-4 pb-6 z-20 flex flex-col gap-3"
          >
            <div className="w-9 h-1 bg-gray-300 rounded-full mx-auto -mt-1 mb-1" />

            <div className="flex justify-between items-center">
              <div>
                <span className="text-[11px] font-semibold text-[#0B6E4F] bg-[#E8F3EE] px-2 py-0.5 rounded">Driver menuju lokasimu</span>
                <div className="text-[20px] font-bold text-[#1A1A1A] mt-0.5">Tiba dalam 4 menit</div>
              </div>
              <div className="text-right">
                <div className="text-[11px] text-[#5F6368]">Tarif Terpilih</div>
                <div className="text-[16px] font-bold text-[#0B6E4F]">{currentSelection.priceFormatted}</div>
              </div>
            </div>

            {/* Kartu Driver */}
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-3 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#E5E7EB] border-2 border-[#E8F3EE] flex items-center justify-center text-gray-500 font-bold">
                BS
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-[15px] text-[#1A1A1A]">Budi Santoso</span>
                  <span className="text-[13px] font-bold text-[#D97706]">★ 4.9</span>
                </div>
                <div className="font-bold text-[14px] text-[#1A1A1A] tracking-wider">B 1234 GJK</div>
                <div className="text-[12px] text-[#5F6368]">Honda Vario 125 • Hitam</div>
              </div>
            </div>

            {/* Savings Banner */}
            <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-lg p-3 text-[12px] text-[#166534] leading-5">
              <strong>Hebat!</strong> Kamu <strong>hemat Rp4.500</strong> di perjalanan ini dan <strong>Rp36.000</strong> bulan ini dengan opsi Hemat.
            </div>

            {/* Dual Action Buttons */}
            <div className="grid grid-cols-2 gap-2 mt-1">
              <button 
                onClick={() => alert('Membuka chat...')}
                className="h-12 min-h-[48px] rounded-lg border-[1.5px] border-[#0B6E4F] text-[#0B6E4F] font-semibold text-[15px] flex items-center justify-center active:bg-[#E8F3EE]"
              >
                Hubungi
              </button>
              <button 
                onClick={() => alert('Melacak rute driver...')}
                className="h-12 min-h-[48px] rounded-lg bg-[#0B6E4F] text-white font-semibold text-[15px] flex items-center justify-center active:bg-[#08523A]"
              >
                Lacak
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default GoRideFareSelection;
