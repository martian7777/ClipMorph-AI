'use client';
import Link from 'next/link';
import { ArrowRight, Video, Scissors, Zap, Globe, Shield, Check } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-800 selection:bg-purple-200">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-white font-bold">V</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">ClipMorph AI</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <Link href="#features" className="hover:text-gray-900 transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</Link>
            <Link href="/contact" className="hover:text-gray-900 transition-colors">Contact</Link>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-semibold text-gray-700 hover:text-gray-900">
              Log in
            </Link>
            <Link href="/signup" className="px-5 py-2.5 bg-gray-900 text-white rounded-full text-sm font-bold shadow-md hover:bg-gray-800 transition-colors">
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-bold mb-8">
          <Zap className="w-4 h-4" />
          <span>New: AI Captions in 99+ Languages</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 leading-tight">
          Turn long videos into <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
            viral shorts instantly.
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          The ultimate AI video processor. Upload a podcast or YouTube link, and we'll automatically find the best moments, add captions, and write the SEO blog post.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/signup" className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-lg shadow-xl shadow-purple-500/20 hover:scale-105 transition-transform flex items-center gap-2">
            Try ClipMorph Free <ArrowRight className="w-5 h-5" />
          </Link>
          <span className="text-sm text-gray-500 font-medium">No credit card required.</span>
        </div>

        {/* Hero Image Mockup */}
        <div className="mt-20 relative max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 blur-3xl rounded-[3rem]"></div>
          <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden aspect-video">
             <div className="w-full h-8 bg-gray-100 border-b border-gray-200 flex items-center px-4 gap-2">
               <div className="w-3 h-3 rounded-full bg-red-400"></div>
               <div className="w-3 h-3 rounded-full bg-amber-400"></div>
               <div className="w-3 h-3 rounded-full bg-green-400"></div>
             </div>
             <img src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=1200&q=80" alt="Platform Dashboard" className="w-full h-full object-cover opacity-80" />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Everything you need to grow.</h2>
             <p className="text-lg text-gray-600">One platform to repurpose your content across all channels.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureBlock 
              icon={<Scissors className="w-8 h-8 text-purple-600" />}
              title="AI Clip Extraction"
              desc="Our vision models identify the most engaging moments and extract them into perfect 16:9 or 9:16 shorts."
              color="bg-purple-100"
            />
            <FeatureBlock 
              icon={<Globe className="w-8 h-8 text-pink-600" />}
              title="Auto Captions"
              desc="Highly accurate transcriptions in 99+ languages. Apply your own brand fonts and colors to make them pop."
              color="bg-pink-100"
            />
            <FeatureBlock 
              icon={<Zap className="w-8 h-8 text-amber-600" />}
              title="AI Content Writer"
              desc="Generate SEO-optimized blog posts, show notes, and LinkedIn posts directly from your video's transcript."
              color="bg-amber-100"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-slate-50 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Choose the plan that fits your content creation needs. Get more credits to process more videos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Basic',
                price: '$5',
                credits: '200 Credits',
                features: ['AI Clip Generation', 'Auto framing (9:16)', 'Viral scoring', 'Standard processing speed', 'Basic support']
              },
              {
                name: 'Pro',
                price: '$10',
                credits: '500 Credits',
                popular: true,
                features: ['AI Clip Generation', 'Auto framing (9:16)', 'Viral scoring', 'Fast processing speed', 'Priority support', 'Custom brand kits', 'Custom template']
              },
              {
                name: 'Elite',
                price: '$15',
                credits: '700 Credits',
                features: ['AI Clip Generation', 'Auto framing (9:16)', 'Viral scoring', 'Highest processing speed', '24/7 Priority support', 'Custom brand kits', 'Dedicated account manager', 'API access']
              }
            ].map((plan) => (
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

                <Link href="/signup" className={`w-full text-center py-4 rounded-xl font-bold text-sm transition-all block ${
                  plan.popular 
                    ? 'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg' 
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}>
                  Choose {plan.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 border-b border-gray-800 pb-8">
          <div>
            <div className="flex items-center gap-2 text-white mb-4">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="font-bold text-xs">V</span>
              </div>
              <span className="font-bold">ClipMorph AI</span>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm">
          <p>&copy; {new Date().getFullYear()} ClipMorph AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureBlock({ icon, title, desc, color }: { icon: React.ReactNode, title: string, desc: string, color: string }) {
  return (
    <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${color}`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{desc}</p>
    </div>
  )
}

