'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { settingsSchema, type SettingsFormValues } from '@/lib/validations';
import { mockBusinessSettings } from '@/lib/placeholder-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BarLoader } from '@/components/ui/bar-loader';

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: '',
      tagline: '',
      phone: '',
      whatsapp: '',
      email: '',
      address: '',
    },
  });

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/settings');
        if (res.ok) {
          const data = await res.json();
          if (data) {
            reset({
              name: data.name || '',
              tagline: data.tagline || '',
              phone: data.phone || '',
              whatsapp: data.whatsapp || '',
              email: data.email || '',
              address: data.address || '',
            });
            setIsLoading(false);
            return;
          }
        }
      } catch (err) {
        console.error('Failed to load settings via API', err);
      }
      
      // Fallback if DB is not connected yet
      reset({
        name: mockBusinessSettings.name,
        tagline: mockBusinessSettings.tagline,
        phone: mockBusinessSettings.phone,
        whatsapp: mockBusinessSettings.whatsapp,
        email: mockBusinessSettings.email,
        address: mockBusinessSettings.address,
      });
      setIsLoading(false);
    }
    loadSettings();
  }, [reset]);

  const onSubmit = async (data: SettingsFormValues) => {
    setSaved(false);
    
    try {
      await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.error('Failed to save settings via API', err);
    }
    
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <BarLoader size="lg" color="bg-brand-gold" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-brand-dark">Settings</h1>
          <p className="text-brand-mid-grey mt-1">Manage business information and settings</p>
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-brand-gold text-white hover:bg-brand-gold-dark"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <BarLoader size="sm" color="bg-white" />
              Saving…
            </span>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      {saved && (
        <Alert className="bg-green-50 border-green-200 text-green-700">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>Settings saved successfully!</AlertDescription>
        </Alert>
      )}

      {/* Business Information */}
      <Card className="bg-white border-brand-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-brand-dark">Business Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-brand-dark-grey">Business Name</Label>
              <Input
                {...register('name')}
                className="bg-white border-brand-border text-brand-dark mt-2"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <Label className="text-brand-dark-grey">Tagline</Label>
              <Input
                {...register('tagline')}
                className="bg-white border-brand-border text-brand-dark mt-2"
              />
              {errors.tagline && <p className="text-red-500 text-xs mt-1">{errors.tagline.message}</p>}
            </div>
          </div>

          <div>
            <Label className="text-brand-dark-grey">Address</Label>
            <Textarea
              {...register('address')}
              className="bg-white border-brand-border text-brand-dark mt-2"
              rows={2}
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="bg-white border-brand-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-brand-dark">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-brand-dark-grey">Phone Number</Label>
              <Input
                {...register('phone')}
                className="bg-white border-brand-border text-brand-dark mt-2"
                placeholder="+234 803 456 7890"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <Label className="text-brand-dark-grey">WhatsApp Number</Label>
              <Input
                {...register('whatsapp')}
                className="bg-white border-brand-border text-brand-dark mt-2"
                placeholder="2348034567890"
              />
              {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp.message}</p>}
              <p className="text-brand-mid-grey text-xs mt-1">Without + sign, for wa.me links</p>
            </div>
          </div>

          <div>
            <Label className="text-brand-dark-grey">Email Address</Label>
            <Input
              type="email"
              {...register('email')}
              className="bg-white border-brand-border text-brand-dark mt-2"
              placeholder="info@dxstaremporium.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
