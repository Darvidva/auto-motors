'use client';

import { useState } from 'react';
import { mockBusinessSettings } from '@/lib/placeholder-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save, Loader2, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function AdminSettingsPage() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    name: mockBusinessSettings.name,
    tagline: mockBusinessSettings.tagline,
    phone: mockBusinessSettings.phone,
    whatsapp: mockBusinessSettings.whatsapp,
    email: mockBusinessSettings.email,
    address: mockBusinessSettings.address,
  });

  const handleSave = () => {
    setSaving(true);
    setSaved(false);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-brand-dark">Settings</h1>
          <p className="text-brand-mid-grey mt-1">Manage business information and settings</p>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-brand-gold text-white hover:bg-brand-gold-dark"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
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
          <AlertDescription>Settings saved successfully! (Demo mode - changes are not persisted)</AlertDescription>
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
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-white border-brand-border text-brand-dark mt-2"
              />
            </div>

            <div>
              <Label className="text-brand-dark-grey">Tagline</Label>
              <Input
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="bg-white border-brand-border text-brand-dark mt-2"
              />
            </div>
          </div>

          <div>
            <Label className="text-brand-dark-grey">Address</Label>
            <Textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="bg-white border-brand-border text-brand-dark mt-2"
              rows={2}
            />
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
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-white border-brand-border text-brand-dark mt-2"
                placeholder="+234 803 456 7890"
              />
            </div>

            <div>
              <Label className="text-brand-dark-grey">WhatsApp Number</Label>
              <Input
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="bg-white border-brand-border text-brand-dark mt-2"
                placeholder="2348034567890"
              />
              <p className="text-brand-mid-grey text-xs mt-1">Without + sign, for wa.me links</p>
            </div>
          </div>

          <div>
            <Label className="text-brand-dark-grey">Email Address</Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-white border-brand-border text-brand-dark mt-2"
              placeholder="info@dxstaremporium.com"
            />
          </div>
        </CardContent>
      </Card>

      {/* Demo Notice */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4">
          <p className="text-yellow-700 text-sm">
            <strong>Demo Mode:</strong> This is a preview of the admin settings. Changes are not saved to a database and will reset on page reload.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
