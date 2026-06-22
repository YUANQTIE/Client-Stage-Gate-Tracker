'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { UserType } from '@/types'

export default function SignUpPage() {
  const router = useRouter()
  const supabase = createClient()
  const MEMBER_TYPES = ['Finance', 'Project Team', 'Product Owner']

  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    jobTitle: '',
    department: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    // phone number: only allow digits
    if (name === 'phoneNumber' && !/^\d*$/.test(value)) return

    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function userSignUp(user: UserType, password: string){
    const supabase = createClient();

    return await supabase.auth.signUp({
        email: user.email,
        password: password,
        phone: user.phone,
        options:
        {
          data:
          {
            first_name: user.first_name ,
            last_name: user.last_name ,
            department_id: user.department_id,
            phone: user.phone,
          },
          emailRedirectTo: 'https//localhost:3000/login',
        }
      });
  }

  const handleSignUp = async () => {
    setError(null)

    // basic validation
    if (!form.email || !form.password || !form.firstName || !form.lastName) {
      setError('Email, password, first name, and last name are required.')
      return
    }
    if (!form.department) {
      setError('Please select a department.')
      return
    }

    setLoading(true)

    const user : UserType = {
        user_id: '',
        first_name: form.firstName,
        last_name: form.lastName,
        phone: form.phoneNumber,
        image_id: '',
        client_id: '', 
        department_id: form.department,
        email: form.email
    };

    const { data, error: signUpError } = await userSignUp(user, form.password);

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    if (data.session) {
      router.push('/login')
      router.refresh()
    } else {
      setError('Account created! Check your email to confirm your account before logging in.')
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Create an Account</h1>

        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>First Name *</label>
            <input
              style={styles.input}
              name="firstName"
              type="text"
              placeholder="John"
              value={form.firstName}
              onChange={handleChange}
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Last Name *</label>
            <input
              style={styles.input}
              name="lastName"
              type="text"
              placeholder="Doe"
              value={form.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Email *</label>
          <input
            style={styles.input}
            name="email"
            type="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Password *</label>
          <input
            style={styles.input}
            name="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Phone Number</label>
          <input
            style={styles.input}
            name="phoneNumber"
            type="text"
            inputMode="numeric"
            placeholder="09123456789"
            value={form.phoneNumber}
            onChange={handleChange}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Job Title</label>
          <input
            style={styles.input}
            name="jobTitle"
            type="text"
            placeholder="Software Engineer"
            value={form.jobTitle}
            onChange={handleChange}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Member Type *</label>
          <select
            style={styles.input}
            name="department"
            value={form.department}
            onChange={handleChange}
          >
            <option value="">Select a type...</option>
            {MEMBER_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {error && (
          <p style={error.startsWith('Account created') ? styles.success : styles.error}>
            {error}
          </p>
        )}

        <button
          style={{ ...styles.button, opacity: loading ? 0.6 : 1 }}
          onClick={handleSignUp}
          disabled={loading}
        >
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>

        <p style={styles.footer}>
          Already have an account?{' '}
          <a href="/login" style={styles.link}>Log in</a>
        </p>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: '24px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '32px',
    width: '100%',
    maxWidth: '480px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  title: {
    fontSize: '22px',
    fontWeight: 600,
    margin: 0,
  },
  row: {
    display: 'flex',
    gap: '12px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    flex: 1,
  },
  label: {
    fontSize: '13px',
    fontWeight: 500,
    color: '#333',
  },
  input: {
    padding: '8px 12px',
    fontSize: '14px',
    color: '#000',
    border: '1px solid #ddd',
    borderRadius: '6px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
  button: {
    padding: '10px',
    fontSize: '14px',
    fontWeight: 600,
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '4px',
  },
  error: {
    fontSize: '13px',
    color: '#c0392b',
    margin: 0,
  },
  success: {
    fontSize: '13px',
    color: '#27ae60',
    margin: 0,
  },
  footer: {
    fontSize: '13px',
    textAlign: 'center',
    color: '#555',
    margin: 0,
  },
  link: {
    color: '#000',
    fontWeight: 500,
  },
}