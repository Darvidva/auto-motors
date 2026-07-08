'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { settingsSchema, type SettingsFormValues } from '@/lib/validations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save, CheckCircle2, Trash2, Plus, Upload, Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BarLoader } from '@/components/ui/bar-loader';
import { Progress } from '@/components/ui/progress';

type UploadState = {
  status: 'idle' | 'uploading' | 'success' | 'error';
  progress: number;
  message: string;
};

const defaultUploadState: UploadState = {
  status: 'idle',
  progress: 0,
  message: '',
};

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
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

  const { fields: teamFields, append: appendTeam, remove: removeTeam } = useFieldArray({
    control,
    name: 'teamMembers',
  });

  const [uploadingImageIndex, setUploadingImageIndex] = useState<number | null>(null);
  const currentTeamMembers = watch('teamMembers') || [];
  const currentHeroImages = watch('heroImages') || { home: '', inventory: '', about: '', contact: '' };
  const [uploadingHeroField, setUploadingHeroField] = useState<string | null>(null);
  const [heroUploadState, setHeroUploadState] = useState<Record<string, UploadState>>({});
  const [teamUploadState, setTeamUploadState] = useState<Record<number, UploadState>>({});
  const heroUploadTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const teamUploadTimers = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  const clearHeroUploadTimer = (field: string) => {
    const timer = heroUploadTimers.current[field];
    if (timer) {
      clearTimeout(timer);
      delete heroUploadTimers.current[field];
    }
  };

  const clearTeamUploadTimer = (index: number) => {
    const timer = teamUploadTimers.current[index];
    if (timer) {
      clearTimeout(timer);
      delete teamUploadTimers.current[index];
    }
  };

  const queueHeroUploadReset = (field: string) => {
    clearHeroUploadTimer(field);
    heroUploadTimers.current[field] = setTimeout(() => {
      setHeroUploadState((prev) => ({ ...prev, [field]: defaultUploadState }));
      delete heroUploadTimers.current[field];
    }, 2500);
  };

  const queueTeamUploadReset = (index: number) => {
    clearTeamUploadTimer(index);
    teamUploadTimers.current[index] = setTimeout(() => {
      setTeamUploadState((prev) => ({ ...prev, [index]: defaultUploadState }));
      delete teamUploadTimers.current[index];
    }, 2500);
  };

  const handleHeroImageUpload = async (field: 'home' | 'inventory' | 'about' | 'contact', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    clearHeroUploadTimer(field);

    if (!file.type.startsWith('image/')) {
      setHeroUploadState((prev) => ({
        ...prev,
        [field]: { status: 'error', progress: 0, message: 'File must be an image.' },
      }));
      queueHeroUploadReset(field);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setHeroUploadState((prev) => ({
        ...prev,
        [field]: { status: 'error', progress: 0, message: 'Image must be less than 5MB.' },
      }));
      queueHeroUploadReset(field);
      return;
    }

    setUploadingHeroField(field);
    setHeroUploadState((prev) => ({
      ...prev,
      [field]: { status: 'uploading', progress: 20, message: 'Preparing upload...' },
    }));

    const formData = new FormData();
    formData.append('file', file);

    try {
      setHeroUploadState((prev) => ({
        ...prev,
        [field]: { status: 'uploading', progress: 55, message: 'Uploading image...' },
      }));

      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const payload = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(payload?.error || 'Upload failed');
      }

      setValue(`heroImages.${field}`, payload.url, { shouldValidate: true });
      setHeroUploadState((prev) => ({
        ...prev,
        [field]: { status: 'success', progress: 100, message: 'Image uploaded successfully.' },
      }));
      queueHeroUploadReset(field);
    } catch (err) {
      console.error(err);
      setHeroUploadState((prev) => ({
        ...prev,
        [field]: {
          status: 'error',
          progress: 100,
          message: err instanceof Error ? err.message : 'Upload failed',
        },
      }));
    } finally {
      setUploadingHeroField(null);
      e.target.value = '';
    }
  };

  const handleImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    clearTeamUploadTimer(index);

    if (!file.type.startsWith('image/')) {
      setTeamUploadState((prev) => ({
        ...prev,
        [index]: { status: 'error', progress: 0, message: 'File must be an image.' },
      }));
      queueTeamUploadReset(index);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setTeamUploadState((prev) => ({
        ...prev,
        [index]: { status: 'error', progress: 0, message: 'Image must be less than 5MB.' },
      }));
      queueTeamUploadReset(index);
      return;
    }

    setUploadingImageIndex(index);
    setTeamUploadState((prev) => ({
      ...prev,
      [index]: { status: 'uploading', progress: 20, message: 'Preparing upload...' },
    }));

    const formData = new FormData();
    formData.append('file', file);

    try {
      setTeamUploadState((prev) => ({
        ...prev,
        [index]: { status: 'uploading', progress: 55, message: 'Uploading image...' },
      }));

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const payload = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(payload?.error || 'Upload failed');
      }

      setValue(`teamMembers.${index}.image`, payload.url, { shouldValidate: true });
      setTeamUploadState((prev) => ({
        ...prev,
        [index]: { status: 'success', progress: 100, message: 'Image uploaded successfully.' },
      }));
      queueTeamUploadReset(index);
    } catch (err) {
      console.error(err);
      setTeamUploadState((prev) => ({
        ...prev,
        [index]: {
          status: 'error',
          progress: 100,
          message: err instanceof Error ? err.message : 'Upload failed',
        },
      }));
    } finally {
      setUploadingImageIndex(null);
      e.target.value = '';
    }
  };

  useEffect(() => {
    return () => {
      Object.values(heroUploadTimers.current).forEach(clearTimeout);
      Object.values(teamUploadTimers.current).forEach(clearTimeout);
    };
  }, []);

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
              heroImages: data.heroImages || { home: '', inventory: '', about: '', contact: '' },
              teamMembers: data.teamMembers || [],
            });
            setIsLoading(false);
            return;
          }
        }
      } catch (err) {
        console.error('Failed to load settings via API', err);
      }

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

      {/* Hero Section Images */}
      <Card className="bg-white border-brand-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-brand-dark">Hero Section Images</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(['home', 'inventory', 'about', 'contact'] as const).map((field) => (
              <div key={field}>
                <Label className="capitalize">{field} Page Hero</Label>
                <div className="flex flex-col gap-3 mt-2">
                  {heroUploadState[field] && heroUploadState[field].status !== 'idle' && (
                    <div
                      className={`rounded-md border p-3 ${heroUploadState[field]?.status === 'error'
                        ? 'border-red-200 bg-red-50 text-red-700'
                        : heroUploadState[field]?.status === 'success'
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                          : 'border-brand-border bg-white text-brand-dark'
                        }`}
                    >
                      <div className="flex items-center gap-2 text-sm font-medium">
                        {heroUploadState[field]?.status === 'error' ? (
                          <AlertCircle className="h-4 w-4" />
                        ) : heroUploadState[field]?.status === 'success' ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Loader2 className="h-4 w-4 animate-spin text-brand-gold" />
                        )}
                        <span>{heroUploadState[field]?.message}</span>
                      </div>
                      <Progress
                        value={heroUploadState[field]?.progress ?? 0}
                        className="mt-3 h-2 bg-brand-surface"
                      />
                    </div>
                  )}
                  <div className="w-full aspect-[21/9] bg-brand-surface border border-brand-border rounded-lg overflow-hidden flex items-center justify-center relative group">
                    {currentHeroImages[field] ? (
                      <>
                        <img src={currentHeroImages[field]} alt={`${field} hero`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Label
                            htmlFor={`hero-upload-${field}`}
                            className={`cursor-pointer bg-white text-brand-dark px-4 py-2 rounded-md text-sm font-medium hover:bg-brand-surface ${uploadingHeroField === field ? 'pointer-events-none opacity-70' : ''
                              }`}
                          >
                            {uploadingHeroField === field ? 'Uploading...' : 'Change Image'}
                          </Label>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Label htmlFor={`hero-upload-${field}`} className="cursor-pointer inline-flex items-center justify-center h-10 px-4 py-2 bg-white border border-brand-border rounded-md text-sm font-medium transition-colors hover:bg-brand-surface">
                          {uploadingHeroField === field ? (
                            <><Loader2 className="w-4 h-4 mr-2 animate-spin text-brand-gold" /> Uploading...</>
                          ) : (
                            <><Upload className="w-4 h-4 mr-2 text-brand-gold" /> Upload Image</>
                          )}
                        </Label>
                        <span className="text-xs text-brand-mid-grey">No image set</span>
                      </div>
                    )}
                  </div>
                  <input
                    id={`hero-upload-${field}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleHeroImageUpload(field, e)}
                    disabled={uploadingHeroField === field}
                  />
                  <input type="hidden" {...register(`heroImages.${field}`)} />
                  {errors.heroImages?.[field] && <p className="text-red-500 text-xs">{errors.heroImages[field]?.message}</p>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team Members Section */}
      <Card className="bg-white border-brand-border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-brand-dark">Team Members</CardTitle>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendTeam({ name: '', role: '', image: '', bio: '' })}
            className="border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white"
          >
            <Plus className="w-4 h-4 mr-1" /> Add Member
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {teamFields.map((field, index) => (
            <div key={field.id} className="p-4 bg-brand-surface border border-brand-border rounded-lg space-y-4 relative">
              <Button type="button" variant="ghost" size="icon" onClick={() => removeTeam(index)} className="absolute top-2 right-2 text-red-500 hover:text-red-600 hover:bg-red-50">
                <Trash2 className="w-4 h-4" />
              </Button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <Input {...register(`teamMembers.${index}.name`)} className="bg-white mt-1" />
                  {errors.teamMembers?.[index]?.name && <p className="text-red-500 text-xs mt-1">{errors.teamMembers[index]?.name?.message}</p>}
                </div>
                <div>
                  <Label>Role</Label>
                  <Input {...register(`teamMembers.${index}.role`)} className="bg-white mt-1" />
                  {errors.teamMembers?.[index]?.role && <p className="text-red-500 text-xs mt-1">{errors.teamMembers[index]?.role?.message}</p>}
                </div>
              </div>
              <div>
                <Label>Image</Label>
                <div className="flex items-center gap-4 mt-1">
                  <div className="w-16 h-16 bg-brand-surface border border-brand-border rounded overflow-hidden flex-shrink-0 flex items-center justify-center">
                    {currentTeamMembers[index]?.image ? (
                      <img src={currentTeamMembers[index].image} alt="Team member" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs text-brand-mid-grey">No image</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <input type="hidden" {...register(`teamMembers.${index}.image`)} />
                    <Label
                      htmlFor={`team-image-upload-${index}`}
                      className={`inline-flex items-center justify-center h-10 px-4 py-2 bg-white border border-brand-border rounded-md text-sm font-medium transition-colors hover:bg-brand-surface cursor-pointer ${uploadingImageIndex === index ? 'pointer-events-none opacity-70' : ''
                        }`}
                    >
                      {uploadingImageIndex === index ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin text-brand-gold" />
                      ) : (
                        <Upload className="w-4 h-4 mr-2 text-brand-gold" />
                      )}
                      {uploadingImageIndex === index ? 'Uploading...' : 'Upload Image'}
                    </Label>
                    <input
                      id={`team-image-upload-${index}`}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(index, e)}
                      disabled={uploadingImageIndex === index}
                    />
                    {teamUploadState[index] && teamUploadState[index].status !== 'idle' && (
                      <div
                        className={`mt-3 rounded-md border p-3 ${teamUploadState[index]?.status === 'error'
                          ? 'border-red-200 bg-red-50 text-red-700'
                          : teamUploadState[index]?.status === 'success'
                            ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                            : 'border-brand-border bg-white text-brand-dark'
                          }`}
                      >
                        <div className="flex items-center gap-2 text-sm font-medium">
                          {teamUploadState[index]?.status === 'error' ? (
                            <AlertCircle className="h-4 w-4" />
                          ) : teamUploadState[index]?.status === 'success' ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <Loader2 className="h-4 w-4 animate-spin text-brand-gold" />
                          )}
                          <span>{teamUploadState[index]?.message}</span>
                        </div>
                        <Progress
                          value={teamUploadState[index]?.progress ?? 0}
                          className="mt-3 h-2 bg-brand-surface"
                        />
                      </div>
                    )}
                    {errors.teamMembers?.[index]?.image && <p className="text-red-500 text-xs mt-1">{errors.teamMembers[index]?.image?.message}</p>}
                  </div>
                </div>
              </div>
              <div>
                <Label>Bio</Label>
                <Textarea {...register(`teamMembers.${index}.bio`)} className="bg-white mt-1" rows={2} />
                {errors.teamMembers?.[index]?.bio && <p className="text-red-500 text-xs mt-1">{errors.teamMembers[index]?.bio?.message}</p>}
              </div>
            </div>
          ))}
          {teamFields.length === 0 && <p className="text-sm text-brand-mid-grey">No team members added yet.</p>}
        </CardContent>
      </Card>
    </form>
  );
}
