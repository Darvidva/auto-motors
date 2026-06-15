'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Mock authentication - accepts any credentials
    setTimeout(() => {
      if (email && password) {
        router.push('/admin');
      } else {
        setError('Please enter email and password');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-1">
            <span className="font-display text-3xl font-bold text-brand-gold">DX</span>
            <div className="w-1.5 h-8 bg-brand-gold/30" />
            <span className="font-display text-3xl font-bold text-brand-off-white">STAR</span>
          </Link>
          <p className="text-brand-warm-grey text-sm mt-2">Admin Portal</p>
        </div>

        <Card className="bg-brand-card border-brand-border">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-display text-brand-off-white">
              Sign In
            </CardTitle>
            <CardDescription className="text-brand-warm-grey">
              Enter your admin credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive" className="bg-red-900/20 border-red-900 text-red-400">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-brand-off-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@dxstaremporium.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-brand-surface border-brand-border text-brand-off-white placeholder:text-brand-warm-grey"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-brand-off-white">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-brand-surface border-brand-border text-brand-off-white placeholder:text-brand-warm-grey"
                />
              </div>

              <div className="text-xs text-brand-warm-grey bg-brand-surface p-3 rounded-lg border border-brand-border">
                <p className="font-medium text-brand-gold mb-1">Demo Mode</p>
                Enter any email and password to access the admin panel.
                Data is stored locally and will reset on page reload.
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-gold text-brand-bg hover:bg-brand-gold-light"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Sign In
                  </span>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <p className="text-center text-brand-warm-grey text-sm mt-6">
          <Link href="/" className="text-brand-gold hover:underline">
            ← Back to website
          </Link>
        </p>
      </div>
    </div>
  );
}
