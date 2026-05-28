'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MapPin, Phone, Clock, Mail, ArrowRight, CheckCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(5, 'Phone number is required'),
  message: z.string().min(10, 'Message is too short'),
});

type FormData = z.infer<typeof formSchema>;

export const GetInTouch = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  const WHATSAPP_NUMBER = '919766180144';

  useEffect(() => {
    if (!sectionRef.current || shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      const words = headingRef.current?.querySelectorAll('.word');
      if (words) {
        gsap.fromTo(
          words,
          { opacity: 0, y: 15, filter: 'blur(4px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      gsap.fromTo(
        formCardRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formCardRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  const onSubmit = async (data: FormData) => {
    setIsSuccess(true);

    setTimeout(() => {
      const text = `Hello Zinnia Team,

I would like to inquire about the villas.

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}

Message:
${data.message}

Please contact me regarding availability and pricing.

Thank you.`;

      const encodedText = encodeURIComponent(text);
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;
      window.open(whatsappUrl, '_blank');

      setTimeout(() => setIsSuccess(false), 3000);
    }, 2000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative flex h-auto w-full flex-col overflow-hidden bg-[#FDFBF7] pt-20 lg:h-[100vh] lg:min-h-[850px] lg:max-h-[1080px] lg:pt-0"
    >
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#FDFBF7]">

        {/* Faint topographic contour lines on far left */}
        <div
          className="absolute top-0 left-0 w-1/3 h-full opacity-5 mix-blend-multiply"
          style={{
            backgroundImage:
              'radial-gradient(circle at 0% 50%, transparent 20%, #1B5E20 21%, transparent 22%, transparent 40%, #1B5E20 41%, transparent 42%, transparent 60%, #1B5E20 61%, transparent 62%, transparent 80%, #1B5E20 81%, transparent 82%)',
            backgroundSize: '200px 200px',
          }}
        />

        {/* Faded blueprint texture on far right */}
        <div
          className="absolute top-0 right-0 w-1/3 h-full opacity-[0.03] mix-blend-multiply"
          style={{
            backgroundImage:
              'linear-gradient(#1B5E20 1px, transparent 1px), linear-gradient(90deg, #1B5E20 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Soft botanical blur */}
        <div className="absolute top-[-5%] left-[-5%] w-[400px] h-[400px] bg-forest/15 blur-[80px] rounded-full mix-blend-multiply" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[500px] h-[500px] bg-sage/20 blur-[100px] rounded-full mix-blend-multiply" />

        {/* Atmospheric gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(253,251,247,0.4)_100%)] z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#FDFBF7] z-10" />
        <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(27,94,32,0.03)] z-10" />

        {/* CENTER IMAGE */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full lg:w-[65%] h-[80%] lg:h-full z-0 flex items-center justify-center opacity-90">
          <div
            className="w-full h-full mix-blend-multiply saturate-50 sepia-[20%] hue-rotate-[70deg]"
            style={{
              backgroundImage:
                'url("https://hiranmayi.org/wp-content/uploads/2025/07/Zinnia-6.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center 40%',
              maskImage:
                'radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%)',
              WebkitMaskImage:
                'radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%)',
              filter: 'contrast(0.95) brightness(1.05)',
            }}
          />
        </div>

        {/* Paper noise texture */}
        <div
          className="absolute inset-0 opacity-[0.25] mix-blend-overlay z-20"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
          }}
        />
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-6 md:px-12 relative z-30 flex-grow flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center h-full">

          {/* LEFT CONTENT AREA */}
          <div className="lg:col-span-5 flex flex-col justify-center h-full pt-10 pb-6 lg:py-0">
            <div className="mb-6">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.1 }}
                className="text-[10px] md:text-xs text-forest/70 font-sans font-medium uppercase tracking-[0.35em] mb-3 flex flex-col items-start gap-3"
              >
                Private Consultation
                <span className="w-12 h-[1px] bg-forest/20" />
              </motion.p>

              <h2
                ref={headingRef}
                className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-forest mb-5 leading-[1.1] -ml-1"
              >
                <span className="word inline-block opacity-0">Begin</span>{' '}
                <span className="word inline-block opacity-0">Your</span>{' '}
                <span className="word inline-block opacity-0">Green</span>
                <br />
                <span className="word inline-block opacity-0">Luxury</span>{' '}
                <span className="word inline-block opacity-0 text-primary font-serif italic font-light">
                  Journey.
                </span>
              </h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.6 }}
                className="text-forest/70 font-sans font-light text-sm md:text-base mb-10 max-w-[90%] leading-[1.8] tracking-wide"
              >
                Discover your dream villa nestled in 17 acres of lush greenery, with a breathtaking waterfall nearby. Our team is here to guide you every step of the way.
              </motion.p>
            </div>

            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.8 }}
              className="flex flex-col w-full max-w-sm"
            >
              {[
                {
                  icon: MapPin,
                  label: 'Project Location',
                  detail: 'Kachurli, Trimbakeshwar,\nNashik, Maharashtra',
                },
                { icon: Phone, label: 'Direct Line', detail: '+91 976 618 0144' },
                {
                  icon: Clock,
                  label: 'Visit Hours',
                  detail: 'Mon – Sat : 10 AM – 7 PM\nBy appointment only',
                },
                { icon: Mail, label: 'Email', detail: 'hiranmayi0422@gmail.com' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-5 group py-4 ${idx !== 0 ? 'border-t border-forest/5' : ''}`}
                >
                  <div className="w-10 h-10 rounded-full bg-mint/30 flex items-center justify-center shrink-0 group-hover:bg-mint/50 transition-colors duration-500">
                    <item.icon
                      className="w-4 h-4 text-forest/70 group-hover:text-forest transition-colors duration-500"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="pt-0.5">
                    <p className="text-xs text-forest/50 uppercase tracking-widest mb-1 font-sans font-semibold">
                      {item.label}
                    </p>
                    <p className="font-sans text-forest/90 text-sm whitespace-pre-line leading-relaxed group-hover:text-primary transition-colors duration-500">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Spacer for center image on desktop */}
          <div className="hidden lg:block lg:col-span-2" />

          {/* RIGHT FORM CARD */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center h-full pb-16 lg:pb-0 relative z-20">
            <div
              ref={formCardRef}
              className="w-full max-w-[480px] bg-[#FDFAF6]/95 backdrop-blur-xl p-8 md:p-10 rounded-none border border-forest/15 shadow-[0_20px_40px_-15px_rgba(27,94,32,0.08)] mt-4 lg:mt-12 text-[#1B5E20]"
            >
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.6 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="mb-8">
                      <img
                        src="https://hiranmayi.org/wp-content/uploads/2025/07/Zinnia-logo-700x412.jpg"
                        alt="Zinnia logo"
                        width={80}
                        height={48}
                        className="mb-6 h-10 w-auto object-contain rounded"
                        loading="lazy"
                      />
                      <h3 className="text-2xl md:text-3xl font-serif text-[#1B5E20] mb-2">
                        Tell us about your dream villa.
                      </h3>
                      <p className="text-[#1B5E20]/80 font-sans text-sm font-light">
                        Our team will get in touch with you shortly.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative group">
                          <input
                            {...register('name')}
                            id="name"
                            placeholder=" "
                            className="peer w-full bg-white border border-forest/20 rounded-none px-4 py-3.5 text-[#1B5E20] text-sm placeholder-transparent focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/15 transition-all duration-300 pt-5 pb-2"
                          />
                          <label
                            htmlFor="name"
                            className="absolute left-4 top-3.5 text-[#1B5E20]/75 text-sm transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-primary peer-[&:not(:placeholder-shown)]:top-1.5 peer-[&:not(:placeholder-shown)]:text-[10px] peer-[&:not(:placeholder-shown)]:text-primary pointer-events-none font-light"
                          >
                            Full Name
                          </label>
                          {errors.name && (
                            <p className="text-red-400 text-xs mt-1 ml-2">{errors.name.message}</p>
                          )}
                        </div>

                        <div className="relative group">
                          <input
                            {...register('phone')}
                            id="phone"
                            placeholder=" "
                            className="peer w-full bg-white border border-forest/20 rounded-none px-4 py-3.5 text-[#1B5E20] text-sm placeholder-transparent focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/15 transition-all duration-300 pt-5 pb-2"
                          />
                          <label
                            htmlFor="phone"
                            className="absolute left-4 top-3.5 text-[#1B5E20]/75 text-sm transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-primary peer-[&:not(:placeholder-shown)]:top-1.5 peer-[&:not(:placeholder-shown)]:text-[10px] peer-[&:not(:placeholder-shown)]:text-primary pointer-events-none font-light"
                          >
                            Phone Number
                          </label>
                          {errors.phone && (
                            <p className="text-red-400 text-xs mt-1 ml-2">{errors.phone.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="relative group">
                        <input
                          {...register('email')}
                          id="email"
                          placeholder=" "
                          className="peer w-full bg-white border border-forest/20 rounded-none px-4 py-3.5 text-[#1B5E20] text-sm placeholder-transparent focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/15 transition-all duration-300 pt-5 pb-2"
                        />
                        <label
                          htmlFor="email"
                          className="absolute left-4 top-3.5 text-[#1B5E20]/75 text-sm transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-primary peer-[&:not(:placeholder-shown)]:top-1.5 peer-[&:not(:placeholder-shown)]:text-[10px] peer-[&:not(:placeholder-shown)]:text-primary pointer-events-none font-light"
                        >
                          Email Address
                        </label>
                        {errors.email && (
                          <p className="text-red-400 text-xs mt-1 ml-2">{errors.email.message}</p>
                        )}
                      </div>

                      <div className="relative group">
                        <textarea
                          {...register('message')}
                          id="message"
                          placeholder=" "
                          rows={3}
                          className="peer w-full bg-white border border-forest/20 rounded-none px-4 py-3.5 text-[#1B5E20] text-sm placeholder-transparent focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/15 transition-all duration-300 pt-6 pb-2 resize-none h-28"
                        />
                        <label
                          htmlFor="message"
                          className="absolute left-4 top-4 text-[#1B5E20]/75 text-sm transition-all duration-300 peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-primary peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-[10px] peer-[&:not(:placeholder-shown)]:text-primary pointer-events-none font-light"
                        >
                          How can we assist you?
                        </label>
                        {errors.message && (
                          <p className="text-red-400 text-xs mt-1 ml-2">{errors.message.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="pt-2">
                      {/* PRIMARY BUTTON */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full relative group/btn overflow-hidden rounded-none bg-gradient-to-r from-primary to-[#43a047] text-white py-3.5 px-6 transition-all duration-500 hover:shadow-[0_8px_20px_-6px_rgba(76,175,80,0.5)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                      >
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                        <span className="font-sans text-sm font-medium tracking-wide relative z-10">
                          {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                        </span>
                        <ArrowRight
                          className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform duration-300"
                          strokeWidth={2}
                        />
                      </button>

                      {/* SECONDARY CTA */}
                      <div className="flex items-center gap-3 my-5">
                        <div className="flex-1 h-[1px] bg-forest/5" />
                        <span className="text-xs font-sans font-semibold text-forest/40 uppercase tracking-widest">
                          Or Connect Instantly
                        </span>
                        <div className="flex-1 h-[1px] bg-forest/5" />
                      </div>

                      <button
                        type="button"
                        onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank')}
                        className="w-full relative group/wa overflow-hidden rounded-none border border-primary/20 bg-white py-3 px-6 transition-all duration-500 hover:border-primary/50 hover:bg-soft/30 flex items-center justify-center gap-2.5"
                      >
                        <svg
                          className="w-4 h-4 text-forest group-hover/wa:text-primary transition-colors duration-300"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                        </svg>
                        <span className="text-forest font-sans text-sm font-medium group-hover/wa:text-primary transition-colors duration-300">
                          Continue on WhatsApp
                        </span>
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-state"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="flex flex-col items-center justify-center h-[400px] text-center space-y-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', bounce: 0.4, delay: 0.2 }}
                      className="w-20 h-20 bg-soft rounded-full flex items-center justify-center"
                    >
                      <CheckCircle className="w-10 h-10 text-primary" strokeWidth={1.5} />
                    </motion.div>

                    <div>
                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-2xl font-serif text-forest mb-2"
                      >
                        Consultation Ready
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="text-forest/60 font-sans text-sm font-light"
                      >
                        Redirecting you to our secure line...
                      </motion.p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
