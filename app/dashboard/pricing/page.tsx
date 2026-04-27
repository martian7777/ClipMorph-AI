import { Check, Zap } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  const plans = [
    {
      name: 'Basic',
      price: '$5',
      credits: '200 Credits',
      features: [
        'AI Clip Generation',
        'Auto framing (9:16)',
        'Viral scoring',
        'Standard processing speed',
        'Basic support'
      ]
    },
    {
      name: 'Pro',
      price: '$10',
      credits: '500 Credits',
      popular: true,
      features: [
        'AI Clip Generation',
        'Auto framing (9:16)',
        'Viral scoring',
        'Fast processing speed',
        'Priority support',
        'Custom brand kits',
        'Custom template'
      ]
    },
    {
      name: 'Elite',
      price: '$15',
      credits: '700 Credits',
      features: [
        'AI Clip Generation',
        'Auto framing (9:16)',
        'Viral scoring',
        'Highest processing speed',
        '24/7 Priority support',
        'Custom brand kits',
        'Dedicated account manager',
        'API access'
      ]
    }
  ];

  return (
    <div className="w-full h-full overflow-y-auto bg-slate-50 p-6 md:p-12 lg:p-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Choose the plan that fits your content creation needs. Get more credits to process more videos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.name} 
              className={`bg-white rounded-3xl p-8 border ${plan.popular ? 'border-purple-500 shadow-xl shadow-purple-500/10' : 'border-gray-200'} relative flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-black text-gray-900">{plan.price}</span>
                  <span className="text-gray-500">/mo</span>
                </div>
                <div className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-bold">
                  <Zap className="w-4 h-4 fill-current" />
                  {plan.credits}
                </div>
              </div>

              <div className="flex-1">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className={`w-full py-4 rounded-xl font-bold text-sm transition-all ${
                plan.popular 
                  ? 'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg' 
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}>
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
