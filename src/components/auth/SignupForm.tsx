'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { PasswordInput } from '@/components/auth/PasswordInput'

export function SignupForm() {
  const router = useRouter()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault()
    setError(null)

    // UI-level validation
    if (!fullName || !email || !password || !confirmPassword) {
      setError('All fields are required.')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    try {
      // TODO(backend): replace this block with your auth signup call
      // e.g. const { error } = await supabase.auth.signUp({ email, password })
      //      if (error) throw error
      router.push('/login')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Full Name */}
      <div>
        <Label htmlFor="fullname" className="mb-1.5">Full Name</Label>
        <Input
          id="fullname"
          type="text"
          placeholder="Enter your full name"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
        />
      </div>

      {/* Work Email */}
      <div>
        <Label htmlFor="email" className="mb-1.5">Work Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@company.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      {/* Password */}
      <div>
        <Label htmlFor="password" className="mb-1.5">Password</Label>
        <PasswordInput
          id="password"
          placeholder="Create a password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      {/* Confirm Password */}
      <div>
        <Label htmlFor="confirm-password" className="mb-1.5">Confirm Password</Label>
        <PasswordInput
          id="confirm-password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
      </div>

      {/* Error message */}
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      <Button type="submit" className="mt-2" disabled={loading}>
        {loading ? 'Creating account...' : 'Join Workspace'}
      </Button>

      {/* OR divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
          <span className="bg-[#F8F9FB] px-3 text-gray-400">OR</span>
        </div>
      </div>

      {/* Sign in link */}
      <p className="text-center text-sm text-gray-500">
        Already have an account?{' '}
        <Link href="/login" className="text-indigo-600 hover:text-indigo-500 transition-colors">
          Sign in
        </Link>
      </p>

    </form>
  )
}
