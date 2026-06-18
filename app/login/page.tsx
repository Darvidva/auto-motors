'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormValues } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Lock } from 'lucide-react';
import { BarLoader } from '@/components/ui/bar-loader';

export default function AdminLoginPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setServerError(null);

    // simulate auth delay
    await new Promise((r) => setTimeout(r, 500));

    if (data.email && data.password) {
      router.push('/admin');
    } else {
      setServerError('Please enter email and password');
    }
  };

  return (
    <div className="min-h-screen bg-brand-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-1">
            <span className="font-display text-3xl font-bold text-brand-gold">DX</span>
            <div className="w-1.5 h-8 bg-brand-gold/30" />
            <span className="font-display text-3xl font-bold text-brand-dark">STAR</span>
          </Link>
          <p className="text-brand-mid-grey text-sm mt-2 font-medium">Admin Portal</p>
        </div>

        <Card className="bg-white border-brand-border shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-display text-brand-dark">
              Sign In
            </CardTitle>
            <CardDescription className="text-brand-mid-grey">
              Enter your admin credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {serverError && (
                <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{serverError}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-brand-dark-grey">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@dxstaremporium.com"
                  {...register('email')}
                  className="bg-white border-brand-border text-brand-dark placeholder:text-brand-mid-grey"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-brand-dark-grey">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...register('password')}
                  className="bg-white border-brand-border text-brand-dark placeholder:text-brand-mid-grey"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-gold text-white hover:bg-brand-gold-dark"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-3">
                    <BarLoader size="sm" color="bg-white" />
                    Signing in…
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

        <p className="text-center text-brand-mid-grey text-sm mt-6">
          <Link href="/" className="text-brand-gold hover:underline font-medium">
            ← Back to website
          </Link>
        </p>
      </div>
    </div>
  );
}
