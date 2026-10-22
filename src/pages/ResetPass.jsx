import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth'

function ResetPass() {
  const [searchParams] = useSearchParams()
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const { register, handleSubmit, watch, formState: { isSubmitting } } = useForm()
  const userId = searchParams.get('userId')
  const secret = searchParams.get('secret')
  const isReset = Boolean(userId && secret)

  const submit = async (data) => {
    setError('')
    setMessage('')

    try {
      if (isReset) {
        await authService.updateRecovery(userId, secret, data.password)
        setMessage('Your password has been reset. You can now log in.')
        window.setTimeout(() => navigate('/login'), 1500)
      } else {
        await authService.createRecovery(data.email)
        setMessage('If an account exists for that email, a recovery link has been sent.')
        
      }
    } catch (err) {
      setError(err.message || 'Unable to complete the password recovery request.')
    }
  }

  return (
    <div className="min-h-screen px-4 py-8 flex justify-center items-start">
      <div className="w-full max-w-md rounded-lg border-2 border-gray-300 bg-slate-50 p-6 shadow-md">
        <h1 className="mb-6 text-center text-3xl font-bold text-black">
          {isReset ? 'Reset password' : 'Forgot password'}
        </h1>

        {error && <p role="alert" className="mb-4 text-red-700">{error}</p>}
        {message && <p role="status" className="mb-4 text-green-700">{message}</p>}

        {isReset ? (
          <form onSubmit={handleSubmit(submit)} className="space-y-4">
            <div>
              <label htmlFor="password" className="mb-1 block">New password</label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                className="w-full border-2 border-black px-2 py-1"
                {...register('password', { required: 'Enter a new password.', minLength: { value: 8, message: 'Password must be at least 8 characters.' } })}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="mb-1 block">Confirm new password</label>
              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                className="w-full border-2 border-black px-2 py-1"
                {...register('confirmPassword', {
                  required: 'Confirm your new password.',
                  validate: (value) => value === watch('password') || 'Passwords do not match.',
                })}
              />
            </div>
            <button className="w-full rounded-lg border-2 border-black bg-slate-300 px-3 py-2 hover:bg-blue-300 disabled:opacity-60" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Updating…' : 'Reset password'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit(submit)} className="space-y-4">
            <p>Enter the email address associated with your account. We’ll send a password reset link if it exists.</p>
            <div>
              <label htmlFor="email" className="mb-1 block">Email</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className="w-full border-2 border-black px-2 py-1"
                {...register('email', { required: 'Enter your email address.' })}
              />
            </div>
            <button className="w-full rounded-lg border-2 border-black bg-slate-300 px-3 py-2 hover:bg-blue-300 disabled:opacity-60" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending…' : 'Send recovery link'}
            </button>
          </form>
        )}

        <p className="mt-6 text-center"><Link className="text-blue-600 hover:text-blue-700" to="/login">Back to login</Link></p>
      </div>
    </div>
  )
}

export default ResetPass
