'use client';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans py-12">
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-xl border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">V</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Create an account</h1>
          <p className="text-sm text-gray-500 mt-2">Start transforming your videos today.</p>
        </div>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-sm" placeholder="Aliza Smith" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-sm" placeholder="aliza@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-sm" placeholder="••••••••" />
          </div>
          
          <div className="pt-2">
            <Link href="/dashboard" className="w-full block text-center py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-sm shadow-md hover:opacity-90 transition-opacity">
              Sign Up Free
            </Link>
          </div>
        </form>
        
        <p className="text-xs text-center text-gray-400 mt-6">
          By signing up, you agree to our <Link href="/terms" className="underline">Terms</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>.
        </p>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          Already have an account? <Link href="/login" className="text-purple-600 font-bold hover:underline">Log in</Link>
        </div>
      </div>
    </div>
  );
}
