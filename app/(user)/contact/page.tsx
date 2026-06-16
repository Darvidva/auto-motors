'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock, CheckCircle2, Send } from 'lucide-react';
import { businessInfo } from '@/lib/placeholder-data';

export default function ContactPage() {
  // TODO: Connect to backend API — GET /api/business-info
  // TODO: Connect to backend API — POST /api/enquiries

  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setFormState('success');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-brand-bg pt-20">
      {/* Hero Section */}
      <div className="relative h-[40vh] sm:h-[50vh] flex items-center justify-center">
        <Image
          src="https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Contact Us"
          fill
          className="object-cover grayscale"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-brand-bg/80" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-off-white mb-4">
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
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-off-white mb-4">
                Contact Information
              </h2>
              <div className="w-16 h-0.5 bg-brand-gold mb-6" />
              <p className="text-brand-warm-grey text-lg leading-relaxed">
                Have questions about a vehicle or piece of machinery?
                We&apos;re here to help. Reach out through any of the channels below,
                and we&apos;ll get back to you within 24 hours.
              </p>
            </div>

            {/* Contact Details Card */}
            <Card className="bg-brand-card border-brand-border p-8 space-y-6">
              {/* Phone */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-brand-surface flex items-center justify-center">
                    <Phone className="w-5 h-5 text-brand-gold" />
                  </div>
                  <span className="text-brand-warm-grey text-sm uppercase tracking-wider">
                    Phone
                  </span>
                </div>
                <a
                  href={`tel:${businessInfo.phone.replace(/\s/g, '')}`}
                  className="text-xl text-brand-off-white hover:text-brand-gold transition-colors"
                >
                  {businessInfo.phone}
                </a>
              </div>

              {/* WhatsApp */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-brand-surface flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-green-500"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <span className="text-brand-warm-grey text-sm uppercase tracking-wider">
                    WhatsApp
                  </span>
                </div>
                <a
                  href={`https://wa.me/${businessInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl text-brand-off-white hover:text-green-500 transition-colors"
                >
                  Message us on WhatsApp
                </a>
              </div>

              {/* Email */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-brand-surface flex items-center justify-center">
                    <Mail className="w-5 h-5 text-brand-gold" />
                  </div>
                  <span className="text-brand-warm-grey text-sm uppercase tracking-wider">
                    Email
                  </span>
                </div>
                <a
                  href={`mailto:${businessInfo.email}`}
                  className="text-xl text-brand-off-white hover:text-brand-gold transition-colors"
                >
                  {businessInfo.email}
                </a>
              </div>

              {/* Address */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-brand-surface flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-brand-gold" />
                  </div>
                  <span className="text-brand-warm-grey text-sm uppercase tracking-wider">
                    Address
                  </span>
                </div>
                <p className="text-lg text-brand-off-white">{businessInfo.address}</p>
              </div>
            </Card>

            {/* Business Hours */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-brand-gold" />
                <h3 className="font-display text-xl font-semibold text-brand-off-white">
                  Business Hours
                </h3>
              </div>
              <div className="bg-brand-card border border-brand-border rounded-lg overflow-hidden">
                {businessInfo.hours.map((day, index) => (
                  <div
                    key={day.day}
                    className={`flex justify-between py-3 px-4 ${
                      index % 2 === 0 ? 'bg-brand-card' : 'bg-brand-surface'
                    }`}
                  >
                    <span className="text-brand-warm-grey">{day.day}</span>
                    <span className="text-brand-off-white">
                      {day.closed ? 'Closed' : `${day.open} - ${day.close}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="aspect-video rounded-lg overflow-hidden bg-brand-surface relative">
              {/* Placeholder for Google Maps embed */}
              <div className="absolute inset-0 flex items-center justify-center text-brand-warm-grey">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-brand-gold mx-auto mb-2" />
                  <p>Google Maps embed will be displayed here</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div>
            <Card className="bg-brand-card border-brand-border p-8 sticky top-24">
              {formState === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-brand-gold/20 flex items-center justify-center mx-auto mb-6 animate-fade-up">
                    <CheckCircle2 className="w-10 h-10 text-brand-gold" />
                  </div>
                  <h3 className="font-display text-2xl text-brand-off-white mb-2">
                    Message Received
                  </h3>
                  <p className="text-brand-warm-grey mb-6">
                    Thank you for reaching out. We&apos;ll be in touch soon.
                  </p>
                  <Button
                    onClick={() => setFormState('idle')}
                    variant="outline"
                    className="border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-bg rounded-md"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-2xl font-bold text-brand-off-white mb-2">
                    Send an Enquiry
                  </h3>
                  <p className="text-brand-warm-grey mb-6">
                    Fill out the form below and we&apos;ll get back to you promptly.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="text-sm text-brand-warm-grey mb-2 block">
                        Your Name *
                      </label>
                      <Input
                        name="name"
                        type="text"
                        placeholder="John Smith"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-brand-surface border-brand-border text-brand-off-white placeholder:text-brand-warm-grey focus:border-brand-gold"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-brand-warm-grey mb-2 block">
                        Email Address *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-brand-surface border-brand-border text-brand-off-white placeholder:text-brand-warm-grey focus:border-brand-gold"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-brand-warm-grey mb-2 block">
                        Phone Number
                      </label>
                      <Input
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-brand-surface border-brand-border text-brand-off-white placeholder:text-brand-warm-grey focus:border-brand-gold"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-brand-warm-grey mb-2 block">
                        Message *
                      </label>
                      <Textarea
                        name="message"
                        placeholder="I'm interested in learning more about..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="bg-brand-surface border-brand-border text-brand-off-white placeholder:text-brand-warm-grey focus:border-brand-gold resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={formState === 'submitting'}
                      className="w-full bg-brand-gold text-brand-bg hover:bg-brand-gold-light rounded-md h-12 text-base"
                    >
                      {formState === 'submitting' ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="animate-spin h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Sending...
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
