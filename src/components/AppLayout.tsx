import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { IMG } from '@/data/images';

const BOOKING_URL = 'https://famous.ai/api/crm/6a082f1ae9d59dd71e9f600e/calendar/public?calendarId=b334c9f7-21d1-4163-8eaf-b31895858982&view=booking';

const services = [
  { title: 'Bruiloften', img: IMG.outdoorCeremony, desc: 'De dag van jullie leven, zorgvuldig georkestreerd.' },
  { title: 'Op Maat Events', img: IMG.tent, desc: 'Unieke ervaringen, geheel afgestemd op jullie verhaal.' },
  { title: 'Conferenties', img: IMG.conference, desc: 'Strakke organisatie met een warme signatuur.' },
  { title: 'Feesten', img: IMG.cocktail, desc: 'Verjaardagen, jubilea en privé-vieringen met stijl.' },
];

const pillars = [
  { title: 'Persoonlijk', text: 'Geen pakketten, maar een verhaal dat begint bij jullie. We luisteren, voelen en vertalen dat naar een dag die volledig past.' },
  { title: 'Onbezorgd', text: 'Van eerste schets tot laatste dans wij regelen alles. Jullie genieten, wij houden alle details in de hand.' },
  { title: 'Ervaring', text: 'Meer dan 200 events. Een vertrouwd netwerk van topleveranciers. Een team dat weet wat een onvergetelijke dag echt vraagt.' },
];

const testimonials = [
  { name: 'Lotte & Sander', loc: 'Bruiloft, Kasteel de Haar', text: 'Onze dag was magisch. Elk detail klopte. Elise heeft onze visie begrepen op een manier die we niet voor mogelijk hielden.' },
  { name: 'Familie van Dijk', loc: 'Jubileum, Amsterdam', text: 'Stijlvol, warm en perfect tot in de puntjes. Onze gasten praten er nog steeds over.' },
  { name: 'Studio Noord', loc: 'Corporate gala', text: 'Een team dat luxe en professionaliteit moeiteloos combineert. Echt een aanrader.' },
];

const portfolio = [
  { img: IMG.bouquet, cat: 'Bruiloft', title: 'Liefde in detail' },
  { img: IMG.receptionTable, cat: 'Diner', title: 'Een tafel om te koesteren' },
  { img: IMG.firstDance, cat: 'Bruiloft', title: 'De eerste dans' },
  { img: IMG.beach, cat: 'Bestemming', title: 'Aan zee getrouwd' },
  { img: IMG.stationery, cat: 'Styling', title: 'Subtiel goud' },
  { img: IMG.gala, cat: 'Corporate', title: 'Een avond in stijl' },
  { img: IMG.community, cat: 'Community', title: 'Samen aan tafel' },
  { img: IMG.birthday, cat: 'Feest', title: 'Een zoete viering' },
];

const SectionEyebrow: React.FC<{ children: React.ReactNode; center?: boolean }> = ({ children, center }) => (
  <div className={`flex items-center gap-4 mb-6 ${center ? 'justify-center' : ''}`}>
    <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#c9a96a]" />
    <p className="kerning-wide text-gold-deep">{children}</p>
    {center && <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#c9a96a]" />}
  </div>
);

const AppLayout: React.FC = () => {
  return (
    <PageLayout>
      {/* HERO — cinematic beach pampas setting */}
      <section className="relative h-screen min-h-[720px] w-full overflow-hidden">
        <img
          src="/hero-home.jpeg"
          alt="Luxueuze outdoor ceremonie met witte draping en blauwe bloemen"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Multi-layer cinematic overlay for guaranteed text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0.45)_100%)]" />

        <div className="relative h-full flex flex-col justify-center items-center text-center px-6 max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-8 fade-up">
            <span className="h-px w-12 bg-gold-soft" />
            <p className="kerning-wide text-gold-soft text-shadow-soft">Luxury Wedding &amp; Event Studio</p>
            <span className="h-px w-12 bg-gold-soft" />
          </div>
          <h1
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-ivory leading-[1.05] mb-10 fade-up text-shadow-hero"
            style={{ animationDelay: '0.15s' }}
          >
            Jouw dag.<br />
            <em className="text-gold-gradient not-italic font-light">Onvergetelijk gemaakt.</em>
          </h1>
          <p
            className="text-ivory text-lg md:text-xl max-w-2xl leading-relaxed mb-12 fade-up text-shadow-soft font-light"
            style={{ animationDelay: '0.3s' }}
          >
            Wij ontwerpen bruiloften en op maat gemaakte events met aandacht voor sfeer,
            organisatie en elke kleine schoonheid die een moment onvergetelijk maakt.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 fade-up" style={{ animationDelay: '0.45s' }}>
            <Link
              to="/contact"
              className="btn-gold px-10 py-4 text-xs tracking-[0.25em] uppercase inline-flex items-center justify-center"
            >
              Plan een kennismaking
            </Link>
            <Link
              to="/diensten"
              className="px-10 py-4 border border-ivory/80 text-ivory text-xs tracking-[0.25em] uppercase hover:bg-ivory hover:text-charcoal hover:border-ivory transition-all duration-500 inline-flex items-center justify-center gap-2 text-shadow-soft"
            >
              Ontdek onze diensten <ArrowRight size={14} />
            </Link>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-gold-soft">
          <span className="text-xs tracking-[0.3em] uppercase text-shadow-soft">Scroll</span>
          <span className="h-10 w-px bg-gradient-to-b from-gold-soft to-transparent" />
        </div>
      </section>

      {/* POSITIONING */}
      <section className="py-32 px-6 lg:px-12 max-w-4xl mx-auto text-center">
        <SectionEyebrow center>Onze belofte</SectionEyebrow>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight mb-8">
          Voor wie zoekt naar meer dan een feest <em className="text-gold-gradient not-italic">een herinnering die blijft.</em>
        </h2>
        <p className="text-lg text-warm-gray leading-relaxed">
          Wij geloven dat de mooiste momenten ontstaan in de details. Daarom werken we met bruidsparen,
          families en bedrijven die waarde hechten aan sfeer, organisatie en elegantie. Geen standaard
          draaiboeken maar events die voelen alsof ze altijd al van jullie waren.
        </p>
        <div className="divider-gold mt-12 max-w-xs mx-auto" />
      </section>

      {/* SERVICES */}
      <section className="bg-cream py-28 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <SectionEyebrow>Diensten</SectionEyebrow>
              <h2 className="font-serif text-4xl md:text-5xl text-charcoal max-w-xl leading-tight">
                Elk event verdient een verhaal op maat.
              </h2>
            </div>
            <Link to="/diensten" className="text-sm tracking-wider text-charcoal hover:text-gold-deep transition-colors inline-flex items-center gap-2 border-b border-gold pb-1 self-start group">
              Bekijk alle diensten <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <Link key={s.title} to="/diensten" className="group block bg-ivory hover-lift border border-transparent hover:border-gold-soft transition-colors duration-500">
                <div className="image-zoom aspect-[4/5]">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-7">
                  <h3 className="font-serif text-2xl text-charcoal mb-2 group-hover:text-gold-deep transition-colors">{s.title}</h3>
                  <div className="divider-gold mb-4 max-w-[40px]" />
                  <p className="text-sm text-warm-gray leading-relaxed mb-4">{s.desc}</p>
                  <span className="text-xs tracking-[0.2em] uppercase text-gold-deep inline-flex items-center gap-2">
                    Ontdek <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WAAROM */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <SectionEyebrow center>Waarom Wedding &amp; Events</SectionEyebrow>
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal max-w-3xl mx-auto leading-tight">
              Drie redenen waarom paren en bedrijven ons vertrouwen.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            {pillars.map((p) => (
              <div key={p.title} className="text-center md:text-left group hover-lift">
                <h3 className="font-serif text-3xl text-charcoal mb-4 transition-colors duration-500 group-hover:text-gold-deep">{p.title}</h3>
                <div className="divider-gold mb-4 max-w-[40px] mx-auto md:mx-0" />
                <p className="text-warm-gray leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDITORIAL */}
      <section className="bg-warm py-28 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="image-zoom aspect-[4/5] overflow-hidden relative">
            <img src={IMG.tent} alt="Avondsfeer onder tent" className="w-full h-full object-cover" />
            <div className="absolute inset-0 ring-1 ring-inset ring-gold/20 pointer-events-none" />
          </div>
          <div className="lg:pl-8">
            <SectionEyebrow>Onze signatuur</SectionEyebrow>
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal leading-tight mb-8">
              Cinematische momenten, met rust ontworpen.
            </h2>
            <p className="text-warm-gray leading-relaxed mb-6 text-lg">
              Wij ontwerpen geen events wij ontwerpen herinneringen. Elke kaars, elke noot,
              elke gang van het diner wordt zorgvuldig op elkaar afgestemd zodat jullie gasten
              voelen wat woorden niet kunnen zeggen.
            </p>
            <p className="text-warm-gray leading-relaxed mb-10">
              Een avond bij ons voelt niet als georganiseerd, maar als vanzelfsprekend.
              En precies dát is het mooiste compliment.
            </p>
            <Link to="/portfolio" className="inline-flex items-center gap-3 text-sm tracking-[0.2em] uppercase text-charcoal border-b border-gold pb-1 hover:text-gold-deep transition-colors group">
              Bekijk ons portfolio <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-32 px-6 lg:px-12 bg-ivory">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SectionEyebrow center>Verhalen</SectionEyebrow>
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal">Wat onze klanten vertellen.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-cream p-10 hover-lift border-t-2 border-gold/40 hover:border-gold transition-colors">
                <div className="text-gold-gradient font-serif text-6xl leading-none mb-4">“</div>
                <p className="text-charcoal leading-relaxed mb-8 font-serif text-xl italic">{t.text}</p>
                <div className="pt-6 border-t border-gold-soft">
                  <p className="text-charcoal font-medium text-sm">{t.name}</p>
                  <p className="text-warm-gray text-xs mt-1">{t.loc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO PREVIEW */}
      <section className="bg-cream py-28 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <SectionEyebrow>Portfolio</SectionEyebrow>
              <h2 className="font-serif text-4xl md:text-5xl text-charcoal max-w-xl leading-tight">
                Een glimp van wat we creëren.
              </h2>
            </div>
            <Link to="/portfolio" className="text-sm tracking-wider text-charcoal hover:text-gold-deep inline-flex items-center gap-2 border-b border-gold pb-1 self-start group">
              Bekijk alles <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {portfolio.map((p, i) => (
              <Link key={i} to="/portfolio" className="group relative image-zoom aspect-square overflow-hidden">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 ring-1 ring-inset ring-gold/0 group-hover:ring-gold/60 transition-all duration-500 pointer-events-none z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5">
                  <p className="kerning-wide text-gold-soft mb-2">{p.cat}</p>
                  <h4 className="font-serif text-xl text-ivory">{p.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CONSULTATION CTA */}
      <section className="relative py-32 px-6 lg:px-12 overflow-hidden">
        <img src={IMG.firstDance} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/65" />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-px w-12 bg-gold-soft" />
            <p className="kerning-wide text-gold-soft text-shadow-soft">Een kennismaking</p>
            <span className="h-px w-12 bg-gold-soft" />
          </div>
          <h2 className="font-serif text-4xl md:text-6xl text-ivory leading-tight mb-8 text-shadow-hero">
            Laten we elkaar leren kennen <em className="text-gold-gradient not-italic">onder het genot van een kop koffie.</em>
          </h2>
          <p className="text-ivory/90 text-lg leading-relaxed mb-12 max-w-2xl mx-auto text-shadow-soft">
            Een vrijblijvend gesprek waarin we luisteren naar jullie verhaal, jullie wensen,
            en samen verkennen wat er mogelijk is. Zonder druk. Met alle tijd.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center justify-center px-12 py-4 text-xs tracking-[0.25em] uppercase"
            >
              Plan direct online
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-12 py-4 border border-ivory/70 text-ivory text-xs tracking-[0.25em] uppercase hover:bg-ivory hover:text-charcoal hover:border-ivory transition-all duration-500 text-shadow-soft"
            >
              Stuur ons een bericht
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AppLayout;
