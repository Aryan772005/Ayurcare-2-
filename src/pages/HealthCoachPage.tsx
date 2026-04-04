import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Activity, Heart, ArrowRight, CheckCircle, Flame, ShieldAlert, Sparkles, User, Target } from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';

export default function HealthCoachPage({ user }: { user: FirebaseUser | null }) {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    age: '25',
    gender: 'Male',
    height: '175',
    weight: '70',
    goal: 'Maintenance',
    activityLevel: 'Medium',
    foodPreference: 'Veg',
    conditions: 'None',
    bpm: '72',
    caloriesToday: '1200',
    skinType: 'Combination',
    hairCondition: 'Normal',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setReport(null);

    try {
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const apiUrl = isLocal ? 'http://localhost:3000/api/health-coach' : '/api/health-coach';
      
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      if (res.ok) {
        setReport(data.report);
      } else {
        setReport(`Error connecting to AI Neural Core: ${data.error || 'Unknown error'}`);
      }
    } catch (err: any) {
      setReport(`Neural network analysis failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Custom markdown parser for a futuristic look
  const renderFormattedReport = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('## ')) {
        return <h2 key={i} className="text-xl font-display font-bold text-emerald-accent mt-8 mb-4 border-b border-emerald-accent/20 pb-2 flex items-center gap-2"><Sparkles size={18} /> {line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('# ')) {
        return <h1 key={i} className="text-2xl font-display font-bold text-cream mt-10 mb-6">{line.replace('# ', '')}</h1>;
      }
      if (line.match(/^[\d]\./)) {
        return <div key={i} className="font-bold text-emerald-accent/80 mt-4 mb-2">{line}</div>;
      }
      if (line.startsWith('- ')) {
        return <li key={i} className="text-cream/80 ml-4 mb-2 list-disc list-inside">{line.replace('- ', '')}</li>;
      }
      if (line.trim() === '' || line.startsWith('====')) return null;
      return <p key={i} className="text-cream/70 mb-3 leading-relaxed">{line}</p>;
    });
  };

  return (
    <div className="min-h-screen pt-28 pb-20 relative overflow-hidden">
      {/* Ambient glowing orbs */}
      <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full filter blur-[100px] opacity-10 pointer-events-none bg-emerald-accent" />
      <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full filter blur-[120px] opacity-[0.05] pointer-events-none bg-amber-500" />
      <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] rounded-full filter blur-[90px] opacity-[0.08] pointer-events-none bg-blue-500" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-block w-20 h-20 rounded-full bg-gradient-to-br from-emerald-accent/20 to-transparent border border-emerald-accent/30 flex items-center justify-center mb-6">
            <Brain size={40} className="text-emerald-accent" />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-display font-bold text-cream mb-4">
            AI Holistic Health Coach
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-emerald-accent/60 max-w-2xl mx-auto">
            Input your biological metrics & lifestyle data. Our neural network will generate a highly personalized, Indian-context wellness blueprint.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT SIDE: Input Form */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-4 space-y-6">
            <div className="bg-moss/40 backdrop-blur-xl border border-white/5 rounded-[32px] p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 pointer-events-none" />
              
              <h2 className="text-xl font-display font-bold text-cream mb-6 flex items-center gap-2">
                <Target size={20} className="text-emerald-accent" /> Parameters
              </h2>
              
              <form onSubmit={handleAnalyze} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-emerald-accent/60 font-bold mb-1">Age</label>
                    <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full bg-forest/50 border border-white/10 rounded-xl px-4 py-3 text-cream focus:border-emerald-accent outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-emerald-accent/60 font-bold mb-1">Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} className="w-full bg-forest/50 border border-white/10 rounded-xl px-4 py-3 text-cream focus:border-emerald-accent outline-none appearance-none transition-colors">
                      <option>Male</option><option>Female</option><option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-emerald-accent/60 font-bold mb-1">Height (cm)</label>
                    <input type="number" name="height" value={formData.height} onChange={handleChange} className="w-full bg-forest/50 border border-white/10 rounded-xl px-4 py-3 text-cream focus:border-emerald-accent outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-emerald-accent/60 font-bold mb-1">Weight (kg)</label>
                    <input type="number" name="weight" value={formData.weight} onChange={handleChange} className="w-full bg-forest/50 border border-white/10 rounded-xl px-4 py-3 text-cream focus:border-emerald-accent outline-none transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-emerald-accent/60 font-bold mb-1">Current Goal</label>
                  <select name="goal" value={formData.goal} onChange={handleChange} className="w-full bg-forest/50 border border-white/10 rounded-xl px-4 py-3 text-cream focus:border-emerald-accent outline-none appearance-none transition-colors">
                    <option>Weight Loss</option><option>Maintenance</option><option>Muscle Gain</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-emerald-accent/60 font-bold mb-1">Activity Level</label>
                  <select name="activityLevel" value={formData.activityLevel} onChange={handleChange} className="w-full bg-forest/50 border border-white/10 rounded-xl px-4 py-3 text-cream focus:border-emerald-accent outline-none appearance-none transition-colors">
                    <option>Low (Sedentary)</option><option>Medium (Active)</option><option>High (Athlete)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-emerald-accent/60 font-bold mb-1">Food Preference</label>
                  <select name="foodPreference" value={formData.foodPreference} onChange={handleChange} className="w-full bg-forest/50 border border-white/10 rounded-xl px-4 py-3 text-cream focus:border-emerald-accent outline-none appearance-none transition-colors">
                    <option>Veg (Budget-friendly)</option><option>Non-Veg</option><option>Vegan</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-emerald-accent/60 font-bold mb-1">Avg BPM</label>
                    <input type="number" name="bpm" value={formData.bpm} onChange={handleChange} className="w-full bg-forest/50 border border-white/10 rounded-xl px-4 py-3 text-cream focus:border-emerald-accent outline-none transition-colors" />
                  </div>
                  <div>
                     <label className="block text-xs uppercase tracking-widest text-emerald-accent/60 font-bold mb-1">Calories</label>
                    <input type="number" name="caloriesToday" value={formData.caloriesToday} onChange={handleChange} className="w-full bg-forest/50 border border-white/10 rounded-xl px-4 py-3 text-cream focus:border-emerald-accent outline-none transition-colors" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-emerald-accent/60 font-bold mb-1">Skin Type</label>
                    <select name="skinType" value={formData.skinType} onChange={handleChange} className="w-full bg-forest/50 border border-white/10 rounded-xl px-4 py-3 text-cream focus:border-emerald-accent outline-none appearance-none transition-colors">
                      <option>Oily</option><option>Dry</option><option>Combination</option><option>Sensitive</option>
                    </select>
                  </div>
                   <div>
                    <label className="block text-xs uppercase tracking-widest text-emerald-accent/60 font-bold mb-1">Hair Issue</label>
                    <select name="hairCondition" value={formData.hairCondition} onChange={handleChange} className="w-full bg-forest/50 border border-white/10 rounded-xl px-4 py-3 text-cream focus:border-emerald-accent outline-none appearance-none transition-colors">
                      <option>Normal</option><option>Hairfall</option><option>Dandruff</option><option>Dryness</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4">
                  <button type="submit" disabled={loading} className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${loading ? 'bg-emerald-accent/20 text-emerald-accent/50 cursor-not-allowed' : 'bg-gradient-to-r from-emerald-accent to-teal-400 text-forest hover:opacity-90 shadow-lg hover:shadow-emerald-accent/20'}`}>
                    {loading ? (
                       <><div className="w-5 h-5 border-2 border-emerald-accent border-t-transparent rounded-full animate-spin" /> Neural Sync...</>
                    ) : (
                       <><Brain size={20} /> Generate AI Blueprint</>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Output Dashboard */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-8">
            <div className="bg-moss/20 backdrop-blur-md border border-white/5 rounded-[32px] p-8 md:p-12 min-h-[800px] shadow-2xl relative">
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center">
                     <div className="w-32 h-32 rounded-full border border-emerald-accent/20 flex items-center justify-center relative">
                        <div className="absolute inset-0 border-2 border-emerald-accent border-t-transparent rounded-full animate-spin" />
                        <div className="absolute inset-4 border border-amber-500/50 border-b-transparent rounded-full animate-spin direction-reverse" style={{ animationDirection: 'reverse', animationDuration: '2s' }} />
                        <Activity size={32} className="text-emerald-accent animate-pulse" />
                     </div>
                     <h3 className="text-xl font-display font-bold text-cream mt-8 mb-2">Analyzing Biomarkers</h3>
                     <p className="text-emerald-accent/60 text-sm max-w-xs text-center">Processing doshas, macronutrients, and metabolic indicators...</p>
                  </motion.div>
                ) : report ? (
                  <motion.div key="report" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-full overflow-y-auto pr-4 custom-scrollbar">
                    <div className="flex items-center gap-3 mb-8 pb-8 border-b border-white/5">
                       <div className="w-12 h-12 rounded-full bg-emerald-accent/20 flex items-center justify-center border border-emerald-accent/30"><CheckCircle className="text-emerald-accent" /></div>
                       <div>
                         <h3 className="text-2xl font-display font-bold text-cream">Analysis Complete</h3>
                         <p className="text-emerald-accent/60 text-sm">Your holistic Ayurvedic & nutritional blueprint is ready.</p>
                       </div>
                    </div>
                    <div className="prose prose-invert prose-emerald max-w-none">
                      {renderFormattedReport(report)}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex flex-col items-center justify-center text-center px-10">
                    <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
                      <ShieldAlert size={40} className="text-white/20" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-cream mb-2">Awaiting Data Input</h3>
                    <p className="text-white/40 max-w-md mx-auto">Fill in your health parameters on the left and initialize the neural network to receive your holistic 13-point Ayurvedic health blueprint.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
