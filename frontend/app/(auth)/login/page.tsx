"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GoogleIcon } from "@/components/ui/icons"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('email')

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      alert("This is a demo! Supabase auth would trigger here.")
    }, 1500)
  }

  return (
    <div className="container relative flex min-h-screen flex-col items-center justify-center lg:px-0">
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          
          {/* Glass Card Container */}
          <div className="glass-card p-8 rounded-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-col space-y-2 text-center mb-8">
              <h1 className="text-2xl font-semibold tracking-tight text-white">
                Welcome Back
              </h1>
              <p className="text-sm text-gray-400">
                Visualize your perfect look with AI
              </p>
            </div>

            <div className="grid gap-6">
              <form onSubmit={onSubmit}>
                <div className="grid gap-4">
                  {authMethod === 'email' ? (
                    <div className="grid gap-2">
                       <Input
                        id="email"
                        placeholder="name@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isLoading}
                      />
                    </div>
                  ) : (
                    <div className="grid gap-2">
                      <Input
                        id="phone"
                        placeholder="+1 (555) 000-0000"
                        type="tel"
                        autoComplete="tel"
                        disabled={isLoading}
                      />
                    </div>
                  )}
                  
                  <Button disabled={isLoading} className="w-full">
                    {authMethod === 'email' ? 'Sign In with Email' : 'Sign In with Phone'}
                  </Button>
                </div>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#121212] px-2 text-gray-500 rounded-full">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" onClick={() => setAuthMethod(authMethod === 'email' ? 'phone' : 'email')}>
                   {authMethod === 'email' ? 'Phone' : 'Email'}
                </Button>
                <Button variant="outline" disabled={isLoading}>
                  <GoogleIcon className="mr-2 h-4 w-4" />
                  Google
                </Button>
              </div>

              <p className="px-8 text-center text-xs text-gray-500">
                By clicking continue, you agree to our{" "}
                <a href="/terms" className="underline underline-offset-4 hover:text-white">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="underline underline-offset-4 hover:text-white">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
