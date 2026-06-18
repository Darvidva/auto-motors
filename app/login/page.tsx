'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Car, Loader2, Lock } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Successful login
      router.push('/admin');
      router.refresh(); // Force refresh to update middleware state on client
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <Car className="w-8 h-8 text-brand-gold" />
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold leading-none text-brand-dark">DX STAR</span>
              <span className="text-[10px] tracking-widest text-brand-mid-grey font-medium uppercase">Emporium</span>
            </div>
          </div>
        </div>

        <Card className="bg-white border-brand-border shadow-lg">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-display text-brand-dark text-center">Admin Portal</CardTitle>
            <CardDescription className="text-center text-brand-mid-grey">
              Sign in to manage inventory and settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive" className="bg-red-50 text-red-600 border-red-200">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-brand-dark">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@dxstaremporium.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-brand-border bg-brand-surface text-brand-dark focus:border-brand-gold"
                  disabled={loading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-brand-dark">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-brand-border bg-brand-surface text-brand-dark focus:border-brand-gold"
                  disabled={loading}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-brand-gold text-brand-bg hover:bg-brand-gold-dark h-11 mt-6"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
