import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useAnimation } from 'motion/react';
import { 
  Shield, 
  Menu, 
  X, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ChevronRight, 
  CheckCircle2, 
  Users, 
  Calendar, 
  Lock, 
  Cctv, 
  Key, 
  Zap, 
  Star,
  Quote
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'glass py-4 border-b border-blue-900/30 shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 group">
          <Shield className="w-8 h-8 text-electric-blue" />
          <span className="text-2xl font-bebas tracking-wider text-white">
            TARMAC <span className="text-electric-blue">SECURITY</span> LTD
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className="nav-link">Services</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#why-us" className="nav-link">Why Us</a>
          <a href="#testimonials" className="nav-link">Testimonials</a>
          <a href="#contact" className="nav-link">Contact</a>
          <a href="#contact" className="btn-primary py-2 px-6 text-lg pulse-glow">
            Get a Free Quote
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        initial={false}
        animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden bg-charcoal border-b border-white/10"
      >
        <div className="flex flex-col gap-4 p-6 text-center">
          <a href="#services" onClick={() => setIsOpen(false)} className="nav-link text-xl">Services</a>
          <a href="#about" onClick={() => setIsOpen(false)} className="nav-link text-xl">About</a>
          <a href="#why-us" onClick={() => setIsOpen(false)} className="nav-link text-xl">Why Us</a>
          <a href="#testimonials" onClick={() => setIsOpen(false)} className="nav-link text-xl">Testimonials</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="nav-link text-xl">Contact</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="btn-primary">
            Get a Free Quote
          </a>
        </div>
      </motion.div>
    </nav>
  );
};

const StatItem = ({ number, label, suffix = "" }: { number: number, label: string, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = number;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [inView, number]);

  return (
    <div ref={ref} className="text-center p-6 border-l border-white/10 first:border-l-0">
      <div className="text-5xl md:text-6xl font-bebas text-electric-blue mb-2">
        {count}{suffix}
      </div>
      <div className="text-sm uppercase tracking-widest text-white/60 font-medium">
        {label}
      </div>
    </div>
  );
};

const ServiceCard = ({ icon: Icon, title, description, index }: { icon: any, title: string, description: string, index: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="service-card p-8 group"
    >
      <div className="mb-6 inline-block p-4 bg-navy rounded-sm text-electric-blue ring-1 ring-white/10 group-hover:ring-electric-blue/50 transition-all">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-2xl mb-3">{title}</h3>
      <p className="text-white/60 leading-relaxed text-sm italic">
        {description}
      </p>
      <div className="mt-6 flex items-center text-electric-blue font-bebas tracking-wider uppercase text-sm group-hover:gap-2 transition-all cursor-pointer">
        Learn More <ChevronRight className="w-4 h-4" />
      </div>
    </motion.div>
  );
};

const TestimonialCard = ({ name, company, quote, rating }: { name: string, company: string, quote: string, rating: number }) => {
  return (
    <div className="bg-navy p-8 border border-white/5 relative group h-full">
      <Quote className="absolute top-4 right-4 w-12 h-12 text-white/5" />
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-electric-blue fill-electric-blue' : 'text-white/20'}`} />
        ))}
      </div>
      <p className="text-lg leading-relaxed text-slate-300 mb-8 italic">
        "{quote}"
      </p>
      <div className="mt-auto">
        <div className="font-bebas text-xl tracking-wider">{name}</div>
        <div className="text-sm text-electric-blue tracking-widest uppercase">{company}</div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const controls = useAnimation();
  
  return (
    <div className="min-h-screen selection:bg-electric-blue selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Layers */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-navy"></div>
          <div className="absolute inset-0 diagonal-bg"></div>
          <div className="absolute inset-0 grid-overlay opacity-20"></div>
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-electric-blue/10 blur-[120px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full py-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 text-electric-blue font-bebas tracking-[0.3em] uppercase mb-6 bg-electric-blue/10 w-fit px-4 py-1 border-l-2 border-electric-blue">
              <Zap className="w-4 h-4" /> Leading Security Specialists
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bebas leading-[0.9] mb-8">
              Protecting What <br />
              <span className="text-electric-blue">Matters Most</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mb-12 font-sans italic border-l border-blue-900/30 pl-6">
              Professional Security Solutions Across Nigeria & West Africa — 24/7, 365 Days a Year. SAS-Level Vigilance and Integrity.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-20">
              <a href="#contact" className="btn-primary py-4 px-10 text-2xl pulse-glow shadow-xl shadow-electric-blue/20 capitalize">
                Request a Free Quote
              </a>
              <a href="#services" className="btn-ghost py-4 px-10 text-2xl capitalize">
                Our Services
              </a>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/10">
              {[
                { label: "Guard Act 1986", sub: "Fully Compliant" },
                { label: "24/7 Response", sub: "Rapid Deployment" },
                { label: "Fully Insured", sub: "Peace of Mind" },
                { label: "4.7\u2605 Rated", sub: "Client Satisfaction" }
              ].map((badge, idx) => (
                <div key={idx} className="group cursor-default">
                  <div className="text-xl font-bebas text-white group-hover:text-electric-blue transition-colors">{badge.label}</div>
                  <div className="text-xs uppercase tracking-widest text-white/40">{badge.sub}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-electric-blue/50 to-electric-blue"></div>
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 rotate-90 origin-left mt-8">Scroll</span>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-charcoal relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div>
              <h2 className="text-electric-blue text-2xl mb-4 tracking-[0.2em] uppercase">Elite Solutions</h2>
              <h3 className="text-5xl md:text-7xl">Our Security Services</h3>
            </div>
            <p className="max-w-md text-white/50 italic border-l border-electric-blue/30 pl-6 text-sm">
              We provide bespoke security frameworks designed to mitigate risk and ensure maximum protection for assets, personnel, and properties.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
              index={0}
              icon={Users}
              title="Manned Guarding"
              description="SIA-licensed guards providing visual deterrence and physical security at your site, 24/7."
            />
            <ServiceCard 
              index={1}
              icon={Shield}
              title="Mobile Patrols"
              description="Regular and random perimeter checks conducted by our fleet of fully equipped response vehicles."
            />
            <ServiceCard 
              index={2}
              icon={Calendar}
              title="Event Security"
              description="Specialized crowd management and VIP protection for high-profile events, concerts, and galas."
            />
            <ServiceCard 
              index={3}
              icon={Key}
              title="Keyholding & Response"
              description="Rapid alarm response services. We hold your keys and react instantly to any security breach."
            />
            <ServiceCard 
              index={4}
              icon={Cctv}
              title="CCTV Monitoring"
              description="Real-time surveillance from our dedicated operations centre, ensuring instant threat detection."
            />
            <ServiceCard 
              index={5}
              icon={Lock}
              title="Retail Security"
              description="Loss prevention experts trained to protect high-value stock and ensure a safe shopping environment."
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us - Stats */}
      <section id="why-us" className="py-24 bg-navy border-y border-blue-900/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatItem number={500} suffix="+" label="Clients Protected" />
            <StatItem number={15} suffix="+" label="Years Experience" />
            <StatItem number={24} suffix="/7" label="Availability" />
            <StatItem number={100} suffix="%" label="Compliance" />
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Bespoke Security Plans", desc: "No two businesses are the same. We tailor every contract to your specific risk profile." },
              { title: "West Africa Coverage", desc: "With regional hubs across Nigeria, we provide rapid deployment anywhere you need us." },
              { title: "Elite Recruitment", desc: "We hire based on integrity and military-grade discipline. Every guard is vetted and trained." }
            ].map((usp, i) => (
              <div key={i} className="flex gap-4">
                <CheckCircle2 className="w-8 h-8 text-electric-blue shrink-0" />
                <div>
                  <h4 className="text-2xl mb-2">{usp.title}</h4>
                  <p className="text-slate-400 text-sm italic">{usp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-navy overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-electric-blue text-2xl mb-4 tracking-[0.2em] uppercase">Who We Are</h2>
            <h3 className="text-5xl md:text-7xl mb-8">Uncompromising <br /> Professionalism</h3>
            <div className="space-y-6 text-slate-300 text-lg leading-relaxed italic">
              <p>
                Founded on the principles of vigilance and integrity, Tarmac Security LTD has evolved into Nigeria's most trusted premium security partner. 
                We combine traditional military-grade discipline with cutting-edge technology to create impenetrable shields for our clients.
              </p>
              <p>
                Our reach extends across major cities including Lagos, Abuja, and Port Harcourt, providing a seamless network of safety that permits businesses to thrive without fear of disruption.
              </p>
            </div>
            
            <div className="mt-12 p-8 border-l-4 border-electric-blue bg-white/5">
              <p className="text-2xl font-bebas text-electric-blue tracking-wide mb-2 italic">Our Promise</p>
              <p className="text-xl text-white italic">"We don't just watch doors; we protect the future of your enterprise with zero margin for error."</p>
            </div>
          </motion.div>

          <div className="relative">
            <div className="aspect-square bg-charcoal border-8 border-white/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-navy via-navy/50 to-transparent z-10"></div>
              <div className="absolute inset-0 grid-overlay opacity-50"></div>
              <div className="absolute bottom-10 left-10 z-20">
                <div className="text-6xl font-bebas text-electric-blue mb-0 leading-none">Vigilance</div>
                <div className="text-2xl font-bebas text-white tracking-[0.5em] uppercase">Integrity • Safety</div>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-electric-blue/10 rounded-full group-hover:scale-110 transition-transform duration-1000"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-electric-blue/20 rounded-full group-hover:scale-90 transition-transform duration-1000"></div>
              <Shield className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 text-electric-blue/5" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-32 bg-charcoal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-electric-blue text-2xl mb-4 tracking-[0.2em] uppercase">Client Trust</h2>
            <h3 className="text-5xl md:text-7xl">Proven Results</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Emmanuel Okon"
              company="Lagos Logistics Hub"
              quote="Tarmac Security transformed our warehouse safety. Their guards are professional, punctual, and highly attentive. Since they took over, we've had zero incidents."
              rating={5}
            />
            <TestimonialCard 
              name="Sarah Adeyemi"
              company="Prestige Events Co."
              quote="Reliability is everything in event management. Tarmac provided the elite security team our high-net-worth clients expect. Truly SAS-level service."
              rating={5}
            />
            <TestimonialCard 
              name="David Williams"
              company="Retail Giant Nigeria"
              quote="The CCTV monitoring team is exceptional. They caught multiple intrusion attempts in real-time and coordinated with the police instantly. Highly recommended."
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 bg-electric-blue relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-20"></div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl text-navy mb-8 leading-none">Ready to Secure Your Business?</h2>
          <p className="text-xl md:text-2xl text-navy/80 mb-12 font-medium italic">
            Get a tailored security plan with a free, no-obligation consultation. Our specialists are standing by.
          </p>
          <a href="#contact" className="bg-navy text-white font-bebas px-12 py-5 rounded-sm text-3xl hover:bg-charcoal transition-all pulse-glow inline-block tracking-wider uppercase">
            Start Your Free Consultation
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-navy">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-electric-blue text-2xl mb-4 tracking-[0.2em] uppercase">Connect With Us</h2>
            <h3 className="text-5xl md:text-7xl mb-12">Let's Discuss <br /> Your Safety</h3>
            
            <div className="space-y-8 mb-12">
              <div className="flex gap-6 items-start group">
                <div className="w-12 h-12 bg-electric-blue/10 rounded-sm flex items-center justify-center text-electric-blue group-hover:bg-electric-blue group-hover:text-white transition-all">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bebas text-xl tracking-wider">Headquarters</div>
                  <div className="text-slate-400 italic">15 Victoria Island Blvd, Lagos, Nigeria</div>
                </div>
              </div>
              <div className="flex gap-6 items-start group">
                <div className="w-12 h-12 bg-electric-blue/10 rounded-sm flex items-center justify-center text-electric-blue group-hover:bg-electric-blue group-hover:text-white transition-all">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bebas text-xl tracking-wider">24/7 Security Hotline</div>
                  <div className="text-white/60 italic">+234 (0) 800-TARMAC-SEC</div>
                </div>
              </div>
              <div className="flex gap-6 items-start group">
                <div className="w-12 h-12 bg-electric-blue/10 rounded-sm flex items-center justify-center text-electric-blue group-hover:bg-electric-blue group-hover:text-white transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bebas text-xl tracking-wider">Email Enquiries</div>
                  <div className="text-white/60 italic">enquiry@tarmacsecurity.com</div>
                </div>
              </div>
              <div className="flex gap-6 items-start group">
                <div className="w-12 h-12 bg-electric-blue/10 rounded-sm flex items-center justify-center text-electric-blue group-hover:bg-electric-blue group-hover:text-white transition-all">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bebas text-xl tracking-wider">Operating Hours</div>
                  <div className="text-white/60 italic">Operations: 24/7/365 | Office: 08:00 - 18:00</div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-charcoal border-l-4 border-electric-blue">
              <div className="text-xl font-bebas mb-2 tracking-wider">Security Awareness</div>
              <p className="text-sm text-white/40 italic">
                All our guards are SIA vetted and undergo rigorous background checks to ensure your absolute safety.
              </p>
            </div>
          </div>

          <div className="bg-charcoal p-10 border border-white/5 relative shadow-2xl">
            <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-electric-blue/30 scale-75 origin-top-right"></div>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/40 font-medium">Full Name</label>
                  <input type="text" className="w-full bg-navy border border-white/10 p-4 focus:border-electric-blue outline-none transition-all placeholder:text-white/10 italic" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/40 font-medium">Email Address</label>
                  <input type="email" className="w-full bg-navy border border-white/10 p-4 focus:border-electric-blue outline-none transition-all placeholder:text-white/10 italic" placeholder="john@company.com" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/40 font-medium">Phone Number</label>
                  <input type="tel" className="w-full bg-navy border border-white/10 p-4 focus:border-electric-blue outline-none transition-all placeholder:text-white/10 italic" placeholder="+234..." />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/40 font-medium">Service Required</label>
                  <select className="w-full bg-navy border border-white/10 p-4 focus:border-electric-blue outline-none transition-all appearance-none italic">
                    <option>Manned Guarding</option>
                    <option>Mobile Patrols</option>
                    <option>Event Security</option>
                    <option>CCTV Monitoring</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/40 font-medium">Message / Enquiry</label>
                <textarea rows={4} className="w-full bg-navy border border-white/10 p-4 focus:border-electric-blue outline-none transition-all placeholder:text-white/10 italic" placeholder="How can we help secure your assets?"></textarea>
              </div>
              <button type="submit" className="w-full btn-primary py-5 text-2xl pulse-glow group">
                Send My Enquiry <ChevronRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy pt-20 pb-10 border-t border-blue-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="lg:col-span-2">
              <a href="#" className="flex items-center gap-2 mb-6">
                <Shield className="w-10 h-10 text-electric-blue" />
                <span className="text-4xl font-bebas tracking-wider text-white">
                  TARMAC <span className="text-electric-blue">SECURITY</span> LTD
                </span>
              </a>
              <p className="text-slate-400 italic max-w-sm mb-8 leading-relaxed">
                Nigeria's premier security partner providing uncompromising protection through vigilance, integrity, and elite training.
              </p>
              <div className="flex gap-4">
                {['FB', 'X', 'LN', 'IG'].map((social) => (
                  <div key={social} className="w-10 h-10 border border-white/10 flex items-center justify-center font-bebas text-sm cursor-pointer hover:border-electric-blue hover:text-electric-blue transition-all">
                    {social}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xl mb-6 tracking-widest">Our Services</h4>
              <ul className="space-y-3 text-sm text-white/40 italic">
                <li className="hover:text-electric-blue cursor-pointer transition-colors">Manned Guarding</li>
                <li className="hover:text-electric-blue cursor-pointer transition-colors">Event Security</li>
                <li className="hover:text-electric-blue cursor-pointer transition-colors">CCTV & Monitoring</li>
                <li className="hover:text-electric-blue cursor-pointer transition-colors">Keyholding Services</li>
                <li className="hover:text-electric-blue cursor-pointer transition-colors">Close Protection</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl mb-6 tracking-widest">Legal</h4>
              <ul className="space-y-3 text-sm text-white/40 italic">
                <li className="hover:text-electric-blue cursor-pointer transition-colors">Privacy Policy</li>
                <li className="hover:text-electric-blue cursor-pointer transition-colors">Terms & Conditions</li>
                <li className="hover:text-electric-blue cursor-pointer transition-colors">Cookie Policy</li>
                <li className="hover:text-electric-blue cursor-pointer transition-colors">Guard Act Compliance</li>
              </ul>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs uppercase tracking-[0.2em] text-white/20">
            <div>\u00a9 2025 Tarmac Security LTD. All Rights Reserved.</div>
            <div className="flex items-center gap-4">
              <span className="text-electric-blue">SIA Approved Contractor</span>
              <span className="w-1 h-1 bg-white/20 rounded-full"></span>
              <span>Guard Act 1986 Compliant</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
