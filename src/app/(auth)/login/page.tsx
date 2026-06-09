'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Hanken_Grotesk } from 'next/font/google'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/projects/demo/workflows/sprint-1/tickets')
  }

  return (
    <div className={`${hanken.className} flex min-h-screen w-full`}>

      {/* ── Left Panel ── */}
      <div className="flex flex-col w-full lg:w-[58%] bg-[#F8F9FB] px-10 py-10">

        {/* Brand mark */}
        <div>
          <Image
            src="/assets/logo/asceoft-logo-black.svg"
            alt="Asceoft"
            width={91}
            height={18}
            unoptimized
          />
          <p className="text-[9px] font-semibold tracking-[0.18em] text-gray-400 uppercase mt-1.5">
            Studio Portal
          </p>
        </div>

        {/* Form — vertically centred */}
        <div className="flex flex-col justify-center flex-1">
          <div className="w-full max-w-[340px] mx-auto">

            <div className="mb-7">
              <h1 className="text-[22px] font-semibold text-gray-900 leading-snug">Welcome back</h1>
              <p className="text-sm text-gray-400 mt-1">Sign in to your workspace</p>
            </div>

            <form onSubmit={handleSignIn} className="space-y-4">

              {/* Email */}
              <div>
                <Label htmlFor="email" className="mb-1.5">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="text-sm text-indigo-600 hover:text-indigo-500 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    defaultValue="••••••••"
                    className="pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <Button type="submit">Sign In</Button>
            </form>

            <p className="mt-4 text-xs text-gray-400 text-center leading-relaxed">
              You&apos;ll be directed to your role-specific dashboard after signing in
            </p>

            {/* OR divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
                <span className="bg-[#F8F9FB] px-3 text-gray-400">OR</span>
              </div>
            </div>

            <p className="text-center">
              <Link href="#" className="text-sm text-indigo-600 hover:text-indigo-500 transition-colors">
                Sign up for an account
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-[11px] text-gray-400 leading-relaxed">
            By signing in you agree to Asceoft&apos;s{' '}
            <Link href="#" className="underline hover:text-gray-500 transition-colors">Terms of Service</Link>
            {' '}and{' '}
            <Link href="#" className="underline hover:text-gray-500 transition-colors">Privacy Policy</Link>
          </p>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="hidden lg:flex flex-col items-center justify-center flex-1 relative overflow-hidden bg-[#060D1C]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#0f2044_0%,_#060D1C_70%)]" />
        <div className="relative z-10 flex flex-col items-center">
          <Image
            src="/assets/logo/asceoft-logo-white.svg"
            alt="Asceoft"
            width={162}
            height={32}
            unoptimized
          />
          <p className="text-gray-500 text-xs mt-3">[transclucent graphic placeholder]</p>
          <div className="mt-3 w-8 h-[2px] bg-indigo-500 rounded-full" />
        </div>
      </div>

    </div>
  )
}
