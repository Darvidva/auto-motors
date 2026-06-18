'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormValues } from '@/lib/validations';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock, CheckCircle2, Send } from 'lucide-react';
import { businessInfo } from '@/lib/placeholder-data';
import { BarLoader } from '@/components/ui/bar-loader';

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', phone: '', message: '' },
  });

  const onSubmit = async (_data: ContactFormValues) => {
    setFormState('submitting');

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setFormState('success');
    reset();
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <div className="relative h-[40vh] sm:h-[50vh] flex items-center justify-center">
        <Image
          src="/images/hero/contact.jpg"
          alt="Contact Us"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-white/80" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-dark mb-4">
            Get in Touch
          </h1>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto" />
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-dark mb-4">
                Contact Information
              </h2>
              <div className="w-16 h-0.5 bg-brand-gold mb-6" />
              <p className="text-brand-dark-grey text-lg leading-relaxed">
                Have questions about a vehicle or piece of machinery?
                We&apos;re here to help. Reach out through any of the channels below,
                and we&apos;ll get back to you within 24 hours.
              </p>
            </div>

            {/* Contact Details Card */}
            <Card className="bg-brand-surface border-brand-border p-8 space-y-6">
              {/* Phone */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Phone className="w-5 h-5 text-brand-gold" />
                  </div>
                  <span className="text-brand-mid-grey text-sm uppercase tracking-wider font-medium">
                    Phone
                  </span>
                </div>
                <a
                  href={`tel:${businessInfo.phone.replace(/\s/g, '')}`}
                  className="text-xl text-brand-dark hover:text-brand-gold transition-colors"
                >
                  {businessInfo.phone}
                </a>
              </div>

              {/* WhatsApp */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <svg
                      className="w-5 h-5 text-green-500"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <span className="text-brand-mid-grey text-sm uppercase tracking-wider font-medium">
                    WhatsApp
                  </span>
                </div>
                <a
                  href={`https://wa.me/${businessInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl text-brand-dark hover:text-green-500 transition-colors"
                >
                  Message us on WhatsApp
                </a>
              </div>

              {/* Email */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Mail className="w-5 h-5 text-brand-gold" />
                  </div>
                  <span className="text-brand-mid-grey text-sm uppercase tracking-wider font-medium">
                    Email
                  </span>
                </div>
                <a
                  href={`mailto:${businessInfo.email}`}
                  className="text-xl text-brand-dark hover:text-brand-gold transition-colors"
                >
                  {businessInfo.email}
                </a>
              </div>

              {/* Address */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <MapPin className="w-5 h-5 text-brand-gold" />
                  </div>
                  <span className="text-brand-mid-grey text-sm uppercase tracking-wider font-medium">
                    Address
                  </span>
                </div>
                <p className="text-lg text-brand-dark">{businessInfo.address}</p>
              </div>
            </Card>

            {/* Business Hours */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-brand-gold" />
                <h3 className="font-display text-xl font-semibold text-brand-dark">
                  Business Hours
                </h3>
              </div>
              <div className="bg-brand-surface border border-brand-border rounded-lg overflow-hidden">
                {businessInfo.hours.map((day, index) => (
                  <div
                    key={day.day}
                    className={`flex justify-between py-3 px-4 ${index % 2 === 0 ? 'bg-brand-surface' : 'bg-white'
                      }`}
                  >
                    <span className="text-brand-mid-grey">{day.day}</span>
                    <span className="text-brand-dark font-medium">
                      {day.closed ? 'Closed' : `${day.open} - ${day.close}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Embed */}
            <div className="aspect-video rounded-lg overflow-hidden bg-brand-surface relative border border-brand-border">
              <iframe
                title="Google Maps Location"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(businessInfo.address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              />
            </div>
          </div>

          {/* Right - Contact Form */}
          <div>
            <Card className="bg-white border-brand-border p-8 sticky top-24 shadow-sm">
              {formState === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-brand-gold/20 flex items-center justify-center mx-auto mb-6 animate-fade-up">
                    <CheckCircle2 className="w-10 h-10 text-brand-gold" />
                  </div>
                  <h3 className="font-display text-2xl text-brand-dark mb-2">
                    Message Received
                  </h3>
                  <p className="text-brand-mid-grey mb-6">
                    Thank you for reaching out. We&apos;ll be in touch soon.
                  </p>
                  <Button
                    onClick={() => setFormState('idle')}
                    variant="outline"
                    className="border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white rounded-md"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-2xl font-bold text-brand-dark mb-2">
                    Send an Enquiry
                  </h3>
                  <p className="text-brand-mid-grey mb-6">
                    Fill out the form below and we&apos;ll get back to you promptly.
                  </p>

                  <form onSubmit={hookFormSubmit(onSubmit)} className="space-y-6">
                    <div>
                      <label className="text-sm text-brand-dark-grey mb-2 block font-medium">
                        Your Name *
                      </label>
                      <Input
                        {...register('name')}
                        type="text"
                        placeholder="John Smith"
                        className="bg-white border-brand-border text-brand-dark placeholder:text-brand-mid-grey focus:border-brand-gold"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm text-brand-dark-grey mb-2 block font-medium">
                        Email Address *
                      </label>
                      <Input
                        {...register('email')}
                        type="email"
                        placeholder="john@example.com"
                        className="bg-white border-brand-border text-brand-dark placeholder:text-brand-mid-grey focus:border-brand-gold"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm text-brand-dark-grey mb-2 block font-medium">
                        Phone Number
                      </label>
                      <Input
                        {...register('phone')}
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="bg-white border-brand-border text-brand-dark placeholder:text-brand-mid-grey focus:border-brand-gold"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm text-brand-dark-grey mb-2 block font-medium">
                        Message *
                      </label>
                      <Textarea
                        {...register('message')}
                        placeholder="I'm interested in learning more about..."
                        rows={5}
                        className="bg-white border-brand-border text-brand-dark placeholder:text-brand-mid-grey focus:border-brand-gold resize-none"
                      />
                      {errors.message && (
                        <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={formState === 'submitting'}
                      className="w-full bg-brand-gold text-white hover:bg-brand-gold-dark rounded-md h-12 text-base"
                    >
                      {formState === 'submitting' ? (
                        <span className="flex items-center gap-3">
                          <BarLoader size="sm" color="bg-white" />
                          Sending…
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          Send Message
                        </span>
                      )}
                    </Button>
                  </form>
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
