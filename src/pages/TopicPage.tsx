import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Activity, Ribbon, Heart, Scale, Shield, Coffee, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const TOPIC_CONTENT: Record<string, any> = {
  'liver': {
    title: 'Liver Care & Detoxification',
    icon: Activity,
    dosha: 'Pitta Dominant',
    content: `In Ayurveda, the liver (Yakrit) is considered the seat of Pitta dosha—the element of fire and water responsible for digestion, metabolism, and detoxification.

    When Pitta is imbalanced, the liver becomes sluggish, leading to skin inflammation, digestive issues, and anger. 
    
    ### Ayurvedic Remedies for the Liver
    • **Kutki (Picrorhiza kurroa):** A powerful hepatoprotective herb that stimulates bile secretion and protects liver cells.
    • **Bhumi Amla:** Traditionally used to manage liver disorders and support natural detox.
    • **Aloe Vera Juice:** Cooling and soothing for an overheated liver.
    • **Diet:** Favor cooling, bitter, and astringent foods like leafy greens. Avoid alcohol, deep-fried foods, and excessive spicy heat.`,
  },
  'cancer': {
    title: 'Holistic Support for Cellular Health (Cancer)',
    icon: Ribbon,
    dosha: 'Tridoshic Focus',
    content: `Ayurveda views cancer (Arbuda) as an imbalance of all three doshas (Vata, Pitta, Kapha), leading to the accumulation of Ama (toxins) and loss of Ojas (vital immunity).

    *Note: Ayurvedic therapies are complementary and should be used alongside standard oncological treatments, not as a replacement.*
    
    ### Supportive Ayurvedic Practices
    • **Ashwagandha:** An adaptogen that may help manage stress and fatigue associated with treatments.
    • **Turmeric (Curcumin):** Known for its powerful anti-inflammatory and antioxidant properties.
    • **Tulsi (Holy Basil):** Helps purify the blood and support immune function.
    • **Panchakarma:** Gentle detox processes can help remove Ama under the strict guidance of an Ayurvedic doctor.
    • **Diet:** Follow a strict Sattvic (pure, fresh, easily digestible) diet to nourish the tissues (Dhatus) without feeding the toxins.`,
  },
  'sexual-wellness': {
    title: 'Vajikarana: Sexual Wellness & Vitality',
    icon: Heart,
    dosha: 'Shukra Dhatu Focus',
    content: `Vajikarana is a major branch of Ayurveda dedicated to aphrodisiacs, sexual health, vitality, and healthy progeny. It focuses on nourishing the Shukra Dhatu (reproductive tissue).

    ### Ayurvedic Enhancers for Vitality
    • **Shilajit:** A mineral-rich resin known as the "destroyer of weakness," excellent for stamina and vigor.
    • **Safed Musli:** A potent herb for improving male sexual health and performance.
    • **Shatavari:** The premier herb for female reproductive health and hormonal balance.
    • **Ashwagandha & Gokshura:** Used together to boost testosterone, reduce stress, and improve physical endurance.
    • **Lifestyle:** Adequate sleep, stress management, and a nourishing diet containing milk, ghee, and almonds are highly recommended.`,
  },
  'weight': {
    title: 'Weight Management & Metabolism',
    icon: Scale,
    dosha: 'Kapha Pacifying',
    content: `Excess weight (Sthaulya) is primarily seen as an imbalance of Kapha dosha and a slow digestive fire (Agni). When Agni is weak, food turns into Ama (toxins) and fat (Meda dhatu) rather than energy.

    ### Ayurvedic Weight Loss Strategies
    • **Triphala:** A classic blend of three fruits that gently cleanses the colon and supports fat metabolism.
    • **Guggulu:** Renowned for scraping away excess fat and regulating cholesterol levels.
    • **Warm Lemon & Honey Water:** Start your day with this to kickstart digestion and flush toxins.
    • **Diet:** Emphasize warm, light, spicy, and bitter foods. Heavy, cold, sweet, and oily foods (which increase Kapha) should be minimized.
    • **Exercise:** Vigorous exercise (Vyayama) during the Kapha time of day (6 AM - 10 AM) is most effective for weight loss.`,
  },
  'immunity': {
    title: 'Building Ojas (Immunity & Resilience)',
    icon: Shield,
    dosha: 'Ojas Enhancing',
    content: `Immunity in Ayurveda is known as "Ojas," the subtle essence of all bodily tissues. Strong Ojas provides protection against diseases, glowing skin, and a calm mind.

    ### How to Build Ojas
    • **Chyawanprash:** A traditional Ayurvedic jam made from Amla (Indian gooseberry) and dozens of herbs, rich in Vitamin C and antioxidants.
    • **Giloy (Guduchi):** An immunomodulator that helps manage recurrent fevers and infections.
    • **Golden Milk:** Warm milk mixed with turmeric, black pepper, and a pinch of nutmeg before bed promotes restorative sleep and healing.
    • **Diet & Lifestyle:** Consuming fresh, Prana-rich foods (fruits, nuts, whole grains), practicing daily meditation, and maintaining a regular daily routine (Dinacharya).`,
  },
  'hangover': {
    title: 'Ayurvedic Hangover Fix & Recovery',
    icon: Coffee,
    dosha: 'Pitta & Vata Pacifying',
    content: `Alcohol (Madya) is considered heating, drying, and toxic in massive quantities. It heavily aggravates Pitta (causing acidity/liver stress) and Vata (causing dehydration/headaches).

    ### Natural Hangover Remedies
    • **Hydration & Electrolytes:** Coconut water is the ultimate Pitta-pacifying drink that rapidly rehydrates the body and restores electrolytes.
    • **Grape Juice Reset:** Fresh, sweet grape juice or raisins soaked in water overnight help cool the liver and flush out alcohol toxins.
    • **Cumin, Coriander, Fennel (CCF) Tea:** Sipping this warm tea restores the digestive fire (Agni) and clears nausea without acidity.
    • **Aloe Vera:** 2 tablespoons of aloe vera juice helps heal the stomach lining and cool the digestive tract.
    • **Sleep:** Deep rest is essential. Avoid heavy, greasy "hangover foods" which only create more Ama (toxins); instead, eat light, warm soups or Khichdi.`,
  }
};

export default function TopicPage() {
  const { id } = useParams<{ id: string }>();
  const topic = id ? TOPIC_CONTENT[id] : null;

  if (!topic) {
    return <Navigate to="/guides" replace />;
  }

  const Icon = topic.icon;

  return (
    <div className="min-h-screen pt-48 pb-20 px-6 max-w-4xl mx-auto">
      <Link to="/guides" className="inline-flex items-center gap-2 text-emerald-accent/60 hover:text-emerald-accent mb-8 transition-colors">
        <ChevronLeft size={20} /> Back to Guides
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-moss/30 border border-white/5 p-8 md:p-12 rounded-[40px] shadow-2xl relative overflow-hidden"
      >
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <div className="flex items-center gap-4 mb-6 relative">
          <div className="w-16 h-16 bg-emerald-accent/20 rounded-2xl flex items-center justify-center border border-emerald-accent/30 shrink-0">
            <Icon className="w-8 h-8 text-emerald-accent" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-accent/60 bg-forest/40 px-3 py-1 rounded-full border border-white/5">{topic.dosha}</span>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-cream mt-3">{topic.title}</h1>
          </div>
        </div>

        <div className="prose prose-invert prose-emerald prose-lg max-w-none mt-8 text-cream/80 relative">
          {topic.content.split('\n').map((line: string, i: number) => {
            if (line.trim().startsWith('###')) {
              return <h3 key={i} className="text-2xl font-display font-bold text-cream mt-8 mb-4">{line.replace('###', '').trim()}</h3>;
            }
            if (line.trim().startsWith('•')) {
              const [bold, rest] = line.split(':**');
              if (rest) {
                return (
                  <p key={i} className="flex gap-3 my-3">
                    <span className="text-emerald-accent mt-1">•</span>
                    <span><strong className="text-cream">{bold.replace('• **', '')}:</strong>{rest}</span>
                  </p>
                );
              }
            }
            if (line.trim().startsWith('*Note:')) {
              return <p key={i} className="text-sm italic text-emerald-accent/60 my-6 bg-forest/40 p-4 border-l-4 border-emerald-accent rounded-r-xl">{line.trim()}</p>;
            }
            return line.trim() ? <p key={i} className="my-4 leading-relaxed">{line.trim()}</p> : null;
          })}
        </div>
      </motion.div>

      {/* Consult CTA */}
      <div className="mt-12 text-center bg-forest border border-white/5 p-10 rounded-[32px]">
        <h3 className="text-2xl font-display font-bold text-cream mb-2">Need Personalized Care?</h3>
        <p className="text-emerald-accent/60 mb-6 max-w-lg mx-auto">Connect with a verified Ayurvedic doctor to get a customized treatment plan for your specific health goals.</p>
        <Link to="/doctors" className="inline-block bg-emerald-accent text-forest px-8 py-4 rounded-2xl font-bold hover:bg-emerald-accent/90 transition-colors shadow-lg shadow-emerald-accent/20">
          Book a ₹1 Consultation
        </Link>
      </div>
    </div>
  );
}
