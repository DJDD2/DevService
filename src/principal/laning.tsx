import React, { useState, useEffect } from 'react';
import {
  ChevronDown, Code, Smartphone, Zap, Link, Wrench, Users,
  CheckCircle, ArrowRight, Menu, X, Mail, Phone, MapPin,
  Facebook, Linkedin, Twitter, Send, ExternalLink, Star
} from 'lucide-react';

// Importa tu logo (ajusta la ruta según sea necesario)
import logo from '../assets/lter.svg';

// Interface para los datos del formulario
interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
  service: string;
}

// Clase de servicio para manejar el envío del formulario
class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = 'http://localhost:3001/api';
  }

  async sendContactForm(data: ContactFormData): Promise<{ success: boolean; message?: string }> {
    try {
      // Simulamos el envío a una API (reemplaza con tu endpoint real)
      console.log('Enviando datos:', data);

      //Aquí iría la llamada real a tu API
      const response = await fetch(`${this.baseURL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Simulamos una respuesta exitosa después de 1 segundo
      await new Promise(resolve => setTimeout(resolve, 1000));

      return {
        success: true,
        message: '¡Mensaje enviado correctamente! Te contactaremos pronto.'
      };
    } catch (error) {
      console.error('Error sending contact form:', error);
      return {
        success: false,
        message: 'Error al enviar el mensaje. Por favor, intenta nuevamente.'
      };
    }
  }
}

// Instancia del servicio
const apiService = new ApiService();

const DevServiceLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    message: '',
    service: 'desarrollo-personalizado'
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    setWindowWidth(window.innerWidth);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await apiService.sendContactForm(formData);

      if (result.success) {
        alert(result.message);
        setShowContactForm(false);
        setFormData({
          name: '',
          email: '',
          company: '',
          message: '',
          service: 'desarrollo-personalizado'
        });
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error in form submission:', error);
      alert('Ocurrió un error inesperado. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleSocialClick = (platform: string) => {
    const urls = {
      facebook: 'https://facebook.com/devservice',
      linkedin: 'https://linkedin.com/company/devservice',
      twitter: 'https://twitter.com/devservice'
    };
    window.open(urls[platform as keyof typeof urls], '_blank');
  };

  const handleContactClick = () => {
    setShowContactForm(true);
  };

  const services = [
    {
      icon: <Code className="service-icon" />,
      title: "Desarrollo de sistemas personalizados",
      description: "Creamos software personalizado que se adapta a las necesidades específicas de tu negocio, desde aplicaciones de web hasta sistemas empresariales complejos (CRM).",
      features: ["Análisis de requerimientos", "Arquitectura escalable", "Pruebas exhaustivas"]
    },
    {
      icon: <Smartphone className="service-icon" />,
      title: "Aplicaciones web modernas",
      description: "Desarrollamos aplicaciones web responsivas, usando las últimas tecnologías como React, Node.js y bases de datos no relacionales.",
      features: ["Diseño responsive", "Performance optimizado", "SEO incluido"]
    },
    {
      icon: <Zap className="service-icon" />,
      title: "Automatización de procesos",
      description: "Optimizamos tus operaciones mediante la automatización inteligente de procesos repetitivos, reduciendo costos y mejorando la eficiencia.",
      features: ["Análisis de procesos", "Integración de APIs", "Monitoreo continuo"]
    },
    {
      icon: <Link className="service-icon" />,
      title: "Integración de sistemas",
      description: "Conectamos tus sistemas existentes para crear un ecosistema digital unificado que mejore la comunicación entre departamentos.",
      features: ["APIs RESTful", "Sincronización de datos", "Migración segura"]
    },
    {
      icon: <Wrench className="service-icon" />,
      title: "Soporte y mantenimiento",
      description: "Brindamos soporte continuo 24/7 y mantenimiento proactivo para garantizar el óptimo funcionamiento de tus sistemas.",
      features: ["Soporte 24/7", "Updates regulares", "Monitoreo proactivo"]
    }
  ];

  const features = [
    "Desarrollo ágil y personalizado",
    "Soluciones escalables y robustas",
    "Soporte técnico 24/7",
    "Integración con sistemas existentes",
    "Capacitación y documentación completa"
  ];

  const testimonials = [
    {
      name: "María González",
      company: "Retail Solutions SA",
      text: "Dev Service transformó completamente nuestro sistema de inventarios. Ahora somos 300% más eficientes.",
      rating: 5
    },
    {
      name: "Carlos Mendoza",
      company: "Logística del Norte",
      text: "El equipo de Dev Service entendió perfectamente nuestras necesidades y entregó una solución excepcional.",
      rating: 5
    }
  ];

  // Paleta mejorada - Verde Esmeralda / Turquesa Eléctrico / Dorado Suave
  const colors = {
    primary: {
      50: '#ecfdf5',
      100: '#a7f3d0',
      200: '#6ee7b7',
      300: '#34d399', // Verde esmeralda brillante
      400: '#10b981',
      500: '#059669',
      600: '#047857',
      700: '#065f46',
      800: '#064e3b',
      900: '#022c22',
    },
    accent: {
      400: '#22d3ee', // Turquesa eléctrico
      500: '#06b6d4', // Aqua llamativo
      600: '#0284c7', // Azul intenso más frío
      700: '#0369a1',
      800: '#075985',
    },
    highlight: {
      400: '#facc15', // Dorado suave para contraste
      500: '#eab308',
      600: '#ca8a04'
    },
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    }
  };

  // Estilos mejorados con nueva paleta de colores
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${colors.primary[50]} 0%, ${colors.neutral[50]} 100%)`,
      fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
      lineHeight: 1.6,
      overflowX: 'hidden',
      fontSize: '100%'
    },
    maxWidth: {
      maxWidth: 'min(1280px, 95%)',
      margin: '0 auto',
      padding: '0 clamp(1rem, 4vw, 2rem)'
    },

    // Navigation
    nav: {
      position: 'fixed',
      width: '100%',
      top: 0,
      zIndex: 1000,
      transition: 'all 0.3s ease',
      background: scrollY > 50 ? `rgba(255, 255, 255, 0.98)` : 'transparent',
      backdropFilter: scrollY > 50 ? 'blur(20px)' : 'none',
      boxShadow: scrollY > 50 ? '0 4px 20px rgba(0, 0, 0, 0.08)' : 'none',
      borderBottom: scrollY > 50 ? `1px solid ${colors.neutral[200]}` : 'none'
    },
    navContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 'clamp(0.75rem, 3vw, 1.25rem)',
      maxWidth: 'min(1280px, 95%)',
      margin: '0 auto'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: 'clamp(0.5rem, 2vw, 0.75rem)',
      cursor: 'pointer'
    },
    logoImage: {
      width: 'clamp(2.25rem, 8vw, 3rem)',
      height: 'clamp(2.25rem, 8vw, 3rem)',
      borderRadius: '0.75rem',
      objectFit: 'contain',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
    },
    logoText: {
      fontSize: 'clamp(1.125rem, 4vw, 1.5rem)',
      fontWeight: '700',
      background: `linear-gradient(135deg, ${colors.primary[600]}, ${colors.accent[600]})`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    navMenu: {
      display: 'flex',
      alignItems: 'center',
      gap: 'clamp(1rem, 3vw, 2rem)'
    },
    navLink: {
      color: colors.neutral[700],
      textDecoration: 'none',
      fontWeight: '500',
      transition: 'all 0.3s',
      cursor: 'pointer',
      padding: '0.5rem 0',
      borderBottom: '2px solid transparent',
      fontSize: 'clamp(0.875rem, 2vw, 1rem)'
    },
    ctaButton: {
      background: `linear-gradient(135deg, ${colors.primary[500]}, ${colors.accent[500]})`,
      color: 'white',
      padding: 'clamp(0.625rem, 2vw, 0.75rem) clamp(1rem, 3vw, 1.75rem)',
      borderRadius: '50px',
      border: 'none',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s',
      boxShadow: `0 4px 15px ${colors.primary[200]}`,
      fontSize: 'clamp(0.875rem, 2vw, 1rem)',
      minHeight: '44px',
      minWidth: '44px'
    },

    // Hero Section
    heroSection: {
      paddingTop: 'clamp(5rem, 15vw, 7.5rem)',
      paddingBottom: 'clamp(3.75rem, 10vw, 6.25rem)',
      background: `linear-gradient(135deg, ${colors.primary[50]} 0%, ${colors.neutral[50]} 100%)`,
      position: 'relative',
      overflow: 'hidden'
    },
    heroContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: 'min(80vh, 600px)',
      maxWidth: 'min(1280px, 95%)',
      margin: '0 auto',
      padding: '0 clamp(1rem, 4vw, 2rem)',
      gap: 'clamp(2rem, 6vw, 3.75rem)',
      flexDirection: windowWidth < 1024 ? 'column' : 'row',
      position: 'relative',
      zIndex: 2
    },
    heroContent: {
      flex: '1',
      maxWidth: 'min(600px, 100%)',
      textAlign: windowWidth < 1024 ? 'center' : 'left'
    },
    heroTitle: {
      fontSize: 'clamp(2rem, 6vw, 3.5rem)',
      fontWeight: '800',
      color: colors.neutral[900],
      marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
      lineHeight: '1.1',
      letterSpacing: '-0.02em'
    },
    heroGradientText: {
      background: `linear-gradient(135deg, ${colors.primary[600]}, ${colors.accent[600]})`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      display: 'block'
    },
    heroDescription: {
      fontSize: 'clamp(1rem, 3vw, 1.25rem)',
      color: colors.neutral[600],
      marginBottom: 'clamp(1.5rem, 5vw, 2.5rem)',
      lineHeight: '1.7'
    },
    heroButtons: {
      display: 'flex',
      gap: 'clamp(0.75rem, 2vw, 1rem)',
      flexWrap: 'wrap',
      justifyContent: windowWidth < 1024 ? 'center' : 'flex-start'
    },
    primaryButton: {
      background: `linear-gradient(135deg, ${colors.primary[500]}, ${colors.accent[500]})`,
      color: 'white',
      padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
      borderRadius: '50px',
      border: 'none',
      fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s',
      boxShadow: `0 4px 20px ${colors.primary[200]}`,
      position: 'relative',
      overflow: 'hidden',
      minHeight: '44px',
      minWidth: '44px'
    },
    secondaryButton: {
      border: `2px solid ${colors.primary[500]}`,
      color: colors.primary[600],
      background: 'transparent',
      padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
      borderRadius: '50px',
      fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '44px',
      minWidth: '44px'
    },

    // Services Section
    servicesSection: {
      padding: 'clamp(3.75rem, 10vw, 6.25rem) 0',
      background: 'white',
      position: 'relative'
    },
    sectionTitle: {
      textAlign: 'center',
      marginBottom: 'clamp(2.5rem, 8vw, 5rem)'
    },
    sectionTitleText: {
      fontSize: 'clamp(2rem, 6vw, 3rem)',
      fontWeight: '800',
      color: colors.neutral[900],
      marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
      letterSpacing: '-0.02em'
    },
    sectionDescription: {
      fontSize: 'clamp(1rem, 3vw, 1.25rem)',
      color: colors.neutral[600],
      maxWidth: 'min(600px, 90%)',
      margin: '0 auto',
      lineHeight: '1.7'
    },
    servicesGrid: {
      display: 'grid',
      gridTemplateColumns: windowWidth < 768 ? '1fr' : windowWidth < 1200 ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: 'clamp(1.5rem, 4vw, 2rem)',
      maxWidth: 'min(1280px, 95%)',
      margin: '0 auto',
      padding: '0 clamp(1rem, 4vw, 2rem)'
    },
    serviceCard: {
      background: 'white',
      padding: 'clamp(1.5rem, 4vw, 2.5rem)',
      borderRadius: '1.25rem',
      border: `1px solid ${colors.neutral[200]}`,
      transition: 'all 0.3s',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
    },

    // Modal styles
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: 'clamp(1rem, 4vw, 2rem)'
    },
    modalContent: {
      background: 'white',
      borderRadius: '1.25rem',
      padding: 'clamp(1.5rem, 4vw, 2.5rem)',
      maxWidth: 'min(500px, 90vw)',
      width: '100%',
      maxHeight: '90vh',
      overflowY: 'auto',
      position: 'relative',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)'
    },
    closeButton: {
      position: 'absolute',
      top: 'clamp(0.75rem, 3vw, 1.25rem)',
      right: 'clamp(0.75rem, 3vw, 1.25rem)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '0.5rem',
      borderRadius: '50%',
      transition: 'background 0.3s',
      color: colors.neutral[500],
      minHeight: '44px',
      minWidth: '44px'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'clamp(0.75rem, 3vw, 1.25rem)'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    label: {
      fontSize: 'clamp(0.875rem, 2vw, 1rem)',
      fontWeight: '600',
      color: colors.neutral[700]
    },
    input: {
      padding: 'clamp(0.625rem, 2vw, 0.75rem) clamp(0.75rem, 3vw, 1rem)',
      border: `2px solid ${colors.neutral[200]}`,
      borderRadius: '0.75rem',
      fontSize: 'clamp(0.875rem, 2vw, 1rem)',
      transition: 'all 0.3s',
      fontFamily: 'inherit',
      minHeight: '44px'
    },
    textarea: {
      padding: 'clamp(0.625rem, 2vw, 0.75rem) clamp(0.75rem, 3vw, 1rem)',
      border: `2px solid ${colors.neutral[200]}`,
      borderRadius: '0.75rem',
      fontSize: 'clamp(0.875rem, 2vw, 1rem)',
      minHeight: '6.25rem',
      resize: 'vertical',
      fontFamily: 'inherit'
    },
    select: {
      padding: 'clamp(0.625rem, 2vw, 0.75rem) clamp(0.75rem, 3vw, 1rem)',
      border: `2px solid ${colors.neutral[200]}`,
      borderRadius: '0.75rem',
      fontSize: 'clamp(0.875rem, 2vw, 1rem)',
      background: 'white',
      fontFamily: 'inherit',
      minHeight: '44px'
    },

    // About Section
    aboutSection: {
      padding: 'clamp(3.75rem, 10vw, 6.25rem) 0',
      background: `linear-gradient(135deg, ${colors.primary[700]}, ${colors.accent[700]})`,
      position: 'relative',
      overflow: 'hidden'
    },
    aboutContainer: {
      display: 'flex',
      alignItems: 'center',
      maxWidth: 'min(1280px, 95%)',
      margin: '0 auto',
      padding: '0 clamp(1rem, 4vw, 2rem)',
      gap: 'clamp(2rem, 6vw, 3.75rem)',
      flexDirection: windowWidth < 1024 ? 'column' : 'row',
      position: 'relative',
      zIndex: 2
    },
    aboutContent: {
      flex: '1',
      textAlign: windowWidth < 1024 ? 'center' : 'left'
    },
    aboutTitle: {
      fontSize: 'clamp(2rem, 6vw, 3rem)',
      fontWeight: '800',
      color: 'white',
      marginBottom: 'clamp(1.5rem, 4vw, 2rem)',
      letterSpacing: '-0.02em'
    },
    aboutDescription: {
      fontSize: 'clamp(1rem, 3vw, 1.25rem)',
      color: 'rgba(255, 255, 255, 0.9)',
      marginBottom: 'clamp(1.5rem, 5vw, 2.5rem)',
      lineHeight: '1.7'
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: windowWidth < 768 ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: 'clamp(0.75rem, 2vw, 1rem)'
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      color: 'white',
      gap: 'clamp(0.5rem, 2vw, 0.75rem)',
      padding: '0.5rem 0',
      justifyContent: windowWidth < 1024 ? 'center' : 'flex-start'
    },
    aboutVisual: {
      flex: '1',
      display: 'flex',
      justifyContent: 'center'
    },
    statsCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderRadius: '1.5rem',
      padding: 'clamp(1.5rem, 4vw, 2.5rem)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      textAlign: 'center',
      width: 'min(100%, 400px)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    },

    // CTA Section
    ctaSection: {
      padding: 'clamp(3.75rem, 10vw, 6.25rem) 0',
      background: colors.neutral[900],
      position: 'relative'
    },
    ctaContainer: {
      maxWidth: 'min(800px, 90%)',
      margin: '0 auto',
      textAlign: 'center',
      padding: '0 clamp(1rem, 4vw, 2rem)',
      position: 'relative',
      zIndex: 2
    },
    ctaTitle: {
      fontSize: 'clamp(2rem, 6vw, 3rem)',
      fontWeight: '800',
      color: 'white',
      marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
      letterSpacing: '-0.02em'
    },
    ctaDescription: {
      fontSize: 'clamp(1rem, 3vw, 1.25rem)',
      color: colors.neutral[400],
      marginBottom: 'clamp(2rem, 6vw, 3rem)',
      lineHeight: '1.7'
    },
    socialIcons: {
      display: 'flex',
      gap: 'clamp(0.75rem, 2vw, 1rem)',
      justifyContent: 'center',
      marginTop: 'clamp(1.5rem, 4vw, 2rem)'
    },
    socialIcon: {
      width: 'clamp(2.75rem, 8vw, 3.125rem)',
      height: 'clamp(2.75rem, 8vw, 3.125rem)',
      background: `linear-gradient(135deg, ${colors.primary[500]}, ${colors.accent[500]})`,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      cursor: 'pointer',
      transition: 'all 0.3s',
      boxShadow: `0 4px 15px ${colors.primary[700]}40`,
      minHeight: '44px',
      minWidth: '44px'
    },

    // Footer
    footer: {
      background: colors.neutral[900],
      color: 'white',
      padding: 'clamp(2.5rem, 8vw, 3.75rem) 0 clamp(1.25rem, 4vw, 1.875rem)',
      position: 'relative'
    },
    footerContainer: {
      maxWidth: 'min(1280px, 95%)',
      margin: '0 auto',
      padding: '0 clamp(1rem, 4vw, 2rem)',
      position: 'relative',
      zIndex: 2
    },
    footerGrid: {
      display: 'grid',
      gridTemplateColumns: windowWidth < 768 ? '1fr' : windowWidth < 1024 ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: 'clamp(1.5rem, 5vw, 2.5rem)',
      marginBottom: 'clamp(1.5rem, 5vw, 2.5rem)'
    },
    footerSection: {
      display: 'flex',
      flexDirection: 'column'
    },
    footerTitle: {
      fontSize: 'clamp(1rem, 3vw, 1.125rem)',
      fontWeight: '700',
      marginBottom: 'clamp(0.75rem, 3vw, 1.25rem)',
      color: 'white'
    },
    footerItem: {
      marginBottom: 'clamp(0.5rem, 2vw, 0.75rem)',
      color: colors.neutral[400],
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: 'clamp(0.875rem, 2vw, 1rem)',
      transition: 'color 0.3s'
    },
    footerBottom: {
      borderTop: `1px solid ${colors.neutral[700]}`,
      paddingTop: 'clamp(1.25rem, 4vw, 1.875rem)',
      textAlign: 'center',
      color: colors.neutral[500],
      fontSize: 'clamp(0.875rem, 2vw, 1rem)'
    }
  };

  return (
    <>
      <div style={styles.container}>
        {/* Navigation */}
        <nav style={styles.nav}>
          <div style={styles.navContainer}>
            <div style={styles.logo} onClick={() => scrollToSection('inicio')}>
              <img
                src={logo}
                alt="Dev Service Logo"
                style={styles.logoImage}
              />
              <span
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  background: `linear-gradient(135deg, ${colors.primary[600]}, ${colors.accent[600]})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  userSelect: 'none',
                  display: 'inline-block',
                  lineHeight: '1.2',
                  marginLeft: '0.5rem',
                  textUnderlineOffset: '0.25rem'
                }}
              >
                Dev Service
              </span>
            </div>

            {/* Desktop Menu */}
            <div style={{ ...styles.navMenu, display: windowWidth > 768 ? 'flex' : 'none' }}>
              <a
                style={styles.navLink}
                onClick={() => scrollToSection('inicio')}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = colors.primary[600];
                  e.currentTarget.style.borderBottomColor = colors.primary[600];
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = colors.neutral[700];
                  e.currentTarget.style.borderBottomColor = 'transparent';
                }}
              >
                Inicio
              </a>
              <a
                style={styles.navLink}
                onClick={() => scrollToSection('servicios')}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = colors.primary[600];
                  e.currentTarget.style.borderBottomColor = colors.primary[600];
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = colors.neutral[700];
                  e.currentTarget.style.borderBottomColor = 'transparent';
                }}
              >
                Servicios
              </a>
              <a
                style={styles.navLink}
                onClick={() => scrollToSection('nosotros')}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = colors.primary[600];
                  e.currentTarget.style.borderBottomColor = colors.primary[600];
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = colors.neutral[700];
                  e.currentTarget.style.borderBottomColor = 'transparent';
                }}
              >
                Nosotros
              </a>
              <a
                style={styles.navLink}
                onClick={() => scrollToSection('contacto')}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = colors.primary[600];
                  e.currentTarget.style.borderBottomColor = colors.primary[600];
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = colors.neutral[700];
                  e.currentTarget.style.borderBottomColor = 'transparent';
                }}
              >
                Contacto
              </a>
              <button
                style={styles.ctaButton}
                onClick={handleContactClick}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 8px 25px ${colors.primary[300]}`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 4px 15px ${colors.primary[200]}`;
                }}
              >
                Comenzar Proyecto
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              style={{ ...styles.closeButton, display: windowWidth <= 768 ? 'block' : 'none', background: 'none', border: 'none' }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X style={{ width: '1.5rem', height: '1.5rem', color: colors.neutral[700] }} /> : <Menu style={{ width: '1.5rem', height: '1.5rem', color: colors.neutral[700] }} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div style={{
              background: 'white',
              borderRadius: '0 0 1rem 1rem',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
              padding: '1.25rem',
              borderTop: `1px solid ${colors.neutral[200]}`
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <a onClick={() => scrollToSection('inicio')} style={{ ...styles.navLink, padding: '0.75rem 0' }}>Inicio</a>
                <a onClick={() => scrollToSection('servicios')} style={{ ...styles.navLink, padding: '0.75rem 0' }}>Servicios</a>
                <a onClick={() => scrollToSection('nosotros')} style={{ ...styles.navLink, padding: '0.75rem 0' }}>Nosotros</a>
                <a onClick={() => scrollToSection('contacto')} style={{ ...styles.navLink, padding: '0.75rem 0' }}>Contacto</a>
                <button style={{ ...styles.ctaButton, marginTop: '1rem' }} onClick={handleContactClick}>
                  Comenzar Proyecto
                </button>
              </div>
            </div>
          )}
        </nav>


        {/* Hero Section */}
        <section id="inicio" style={{
          ...styles.heroSection,
          padding: '4rem 1rem',
        }}>
          <div style={{
            ...styles.heroContainer,
            display: 'flex',
            flexDirection: windowWidth > 768 ? 'row' : 'column',
            alignItems: 'center',
            gap: '2rem',
          }}>

            {/* Columna de texto */}
            <div style={{
              flex: 1,
              textAlign: windowWidth > 768 ? 'left' : 'center'
            }}>
              <h1 style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 800,
                lineHeight: 1.2,
                marginBottom: '1.25rem',
                color: colors.neutral[900],
              }}>
                Transformamos
                <span style={{
                  background: `linear-gradient(135deg, ${colors.primary[500]}, ${colors.accent[500]})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                  marginLeft: '0.5rem',
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                }}>
                  ideas en soluciones
                </span>
              </h1>

              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.75,
                color: colors.neutral[600],
                maxWidth: '36rem',
                margin: windowWidth > 768 ? '0 0 2rem 0' : '0 auto 2rem auto'
              }}>
                Somos una <strong style={{ color: colors.primary[600] }}>firma de tecnología</strong> especializada en crear
                <em style={{ fontStyle: 'normal', color: colors.accent[500] }}> software selecto</em>.
                Ayudamos a empresas a innovar con soluciones digitales que transforman procesos y aceleran su crecimiento en el mercado digital.
              </p>

              {/* Botones */}
              <div style={{
                ...styles.heroButtons,
                justifyContent: windowWidth > 768 ? 'flex-start' : 'center'
              }}>
                <button
                  style={styles.primaryButton}
                  onClick={handleContactClick}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = `0 8px 30px ${colors.primary[300]}`;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = `0 4px 20px ${colors.primary[200]}`;
                  }}
                >
                  Comenzar mi proyecto
                  <ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />
                </button>
                <button
                  style={styles.secondaryButton}
                  onClick={() => scrollToSection('servicios')}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = colors.primary[50];
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Ver nuestros servicios
                </button>
              </div>
            </div>

            {/* Columna con imagen */}
            {windowWidth > 768 && (
              <div style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <img
                  src="/src/assets/ses.png"
                  alt="Ilustración Hero"
                  style={{
                    width: '100%',
                    maxWidth: '400px',
                    height: 'auto',
                    objectFit: 'contain',
                    borderRadius: '1.5rem',
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </div>
            )}
          </div>
        </section>

        {/* Services Section */}
        <section id="servicios" style={styles.servicesSection}>
          <div style={styles.maxWidth}>
            <div style={styles.sectionTitle}>
              <h2 style={styles.sectionTitleText}>¿Qué hacemos?</h2>
              <p style={styles.sectionDescription}>
                Ofrecemos soluciones tecnológicas integrales diseñadas para impulsar
                el crecimiento de tu negocio en la era digital.
              </p>
            </div>

            <div style={styles.servicesGrid}>
              {services.map((service, index) => (
                <div
                  key={index}
                  style={styles.serviceCard}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.borderColor = colors.primary[300];
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
                    e.currentTarget.style.borderColor = colors.neutral[200];
                  }}
                >
                  <div style={{ marginBottom: '1.25rem', color: colors.primary[500] }}>
                    {service.icon}
                  </div>
                  <h3 style={{ fontSize: 'clamp(1.125rem, 3vw, 1.5rem)', fontWeight: '700', color: colors.neutral[900], marginBottom: '1rem' }}>
                    {service.title}
                  </h3>
                  <p style={{ color: colors.neutral[600], lineHeight: '1.6', marginBottom: '1.25rem' }}>
                    {service.description}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {service.features.map((feature, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <CheckCircle style={{ width: '1rem', height: '1rem', color: colors.primary[500] }} />
                        <span style={{ fontSize: '0.875rem', color: colors.neutral[600] }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="nosotros" style={styles.aboutSection}>
          <div style={styles.aboutContainer}>
            {/* Contenido */}
            <div style={styles.aboutContent}>
              <h2 style={styles.aboutTitle}>
                Si tienes una idea, nosotros la transformamos en software
              </h2>
              <p style={styles.aboutDescription}>
                Nuestro equipo combina creatividad y tecnología para desarrollar
                soluciones que no solo cumplen con tus expectativas, sino que las superan.
              </p>

              {/* Features */}
              <div style={styles.featuresGrid}>
                {features.map((feature, index) => (
                  <div key={index} style={styles.featureItem}>
                    <CheckCircle
                      style={{
                        width: '1.25rem',
                        height: '1.25rem',
                        color: 'rgba(255, 255, 255, 0.8)'
                      }}
                    />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual / Stats */}
            <div style={styles.aboutVisual}>
              <div style={styles.statsCard}>
                <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                  <Users
                    style={{
                      width: '4rem',
                      height: '4rem',
                      color: 'white',
                      margin: '0 auto 1rem'
                    }}
                  />
                  <h3
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      color: 'white',
                      marginBottom: '0.5rem'
                    }}
                  >
                    Nuestro equipo
                  </h3>
                  <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    Profesionales apasionados por la tecnología
                  </p>
                </div>

                {/* Stats Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1rem'
                  }}
                >
                  <div
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '0.75rem',
                      padding: '1rem',
                      textAlign: 'center'
                    }}
                  >
                    <div
                      style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white' }}
                    >
                      5
                    </div>
                    <div
                      style={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontSize: '0.875rem'
                      }}
                    >
                      Proyectos
                    </div>
                  </div>

                  <div
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '0.75rem',
                      padding: '1rem',
                      textAlign: 'center'
                    }}
                  >
                    <div
                      style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white' }}
                    >
                      98%
                    </div>
                    <div
                      style={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontSize: '0.875rem'
                      }}
                    >
                      Satisfacción
                    </div>
                  </div>

                  <div
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)', // 🔧 corregido "rgza"
                      borderRadius: '0.75rem',
                      padding: '1rem',
                      textAlign: 'center'
                    }}
                  >
                    <div
                      style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white' }}
                    >
                      1
                    </div>
                    <div
                      style={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontSize: '0.875rem'
                      }}
                    >
                      Año
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section style={styles.ctaSection}>
          <div style={styles.ctaContainer}>
            <h2 style={styles.ctaTitle}>
              ¿Listo para transformar tu negocio?
            </h2>
            <p style={styles.ctaDescription}>
              ¡Síguenos para conocer nuestros proyectos, consejos tecnológicos y soluciones para tu negocio!
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
              <button
                style={styles.primaryButton}
                onClick={handleContactClick}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = `0 8px 30px ${colors.primary[700]}60`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 4px 20px ${colors.primary[700]}40`;
                }}
              >
                Contactar ahora
              </button>
              <div style={styles.socialIcons}>
                <div
                  style={styles.socialIcon}
                  onClick={() => handleSocialClick('facebook')}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = `0 8px 20px ${colors.primary[700]}60`;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = `0 4px 15px ${colors.primary[700]}40`;
                  }}
                >
                  <Facebook size={20} />
                </div>
                <div
                  style={styles.socialIcon}
                  onClick={() => handleSocialClick('linkedin')}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = `0 8px 20px ${colors.primary[700]}60`;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = `0 4px 15px ${colors.primary[700]}40`;
                  }}
                >
                  <Linkedin size={20} />
                </div>
                <div
                  style={styles.socialIcon}
                  onClick={() => handleSocialClick('twitter')}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = `0 8px 20px ${colors.primary[700]}60`;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = `0 4px 15px ${colors.primary[700]}40`;
                  }}
                >
                  <Twitter size={20} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contacto" style={styles.footer}>
          <div style={styles.footerContainer}>
            <div style={styles.footerGrid}>
              <div style={styles.footerSection}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
                  <img
                    src={logo}
                    alt="Dev Service Logo"
                    style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      objectFit: 'contain'
                    }}
                  />
                  <span style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    background: `linear-gradient(135deg, ${colors.primary[400]}, ${colors.accent[400]})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    Dev Service
                  </span>
                </div>
                <p style={{ color: colors.neutral[400], marginTop: '1rem' }}>
                  Transformamos ideas en software que impulsa el crecimiento de tu negocio.
                </p>
              </div>

              <div style={styles.footerSection}>
                <h4 style={styles.footerTitle}>Servicios</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={styles.footerItem}>Desarrollo personalizado</li>
                  <li style={styles.footerItem}>Aplicaciones web</li>
                  <li style={styles.footerItem}>Automatización</li>
                  <li style={styles.footerItem}>Integración APIs</li>
                  <li style={styles.footerItem}>Soporte técnico</li>
                </ul>
              </div>

              <div style={styles.footerSection}>
                <h4 style={styles.footerTitle}>Contacto</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={styles.footerItem}>
                    <Mail size={18} />
                    <span>contacto@devservice.com</span>
                  </div>
                  <div style={styles.footerItem}>
                    <Phone size={18} />
                    <span>+52 (844) 3817077</span>
                  </div>
                  <div style={styles.footerItem}>
                    <MapPin size={18} />
                    <span>Saltillo, Coahuila, México</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.footerBottom}>
              <p>&copy; 2025 Dev Service. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>

        {/* Contact Modal */}
        {showContactForm && (
          <div style={styles.modal}>
            <div style={styles.modalContent}>
              <button
                style={styles.closeButton}
                onClick={() => setShowContactForm(false)}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = colors.neutral[100];
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <X size={20} />
              </button>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: colors.neutral[900] }}>
                Contacta con nosotros
              </h2>
              <form style={styles.form} onSubmit={handleFormSubmit}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Nombre completo</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    style={styles.input}
                    onFocus={(e) => {
                      e.target.style.borderColor = colors.primary[500];
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = colors.neutral[200];
                    }}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Correo electrónico</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    style={styles.input}
                    onFocus={(e) => {
                      e.target.style.borderColor = colors.primary[500];
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = colors.neutral[200];
                    }}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Empresa</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    style={styles.input}
                    onFocus={(e) => {
                      e.target.style.borderColor = colors.primary[500];
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = colors.neutral[200];
                    }}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Servicio de interés</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    style={styles.select}
                    onFocus={(e) => {
                      e.target.style.borderColor = colors.primary[500];
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = colors.neutral[200];
                    }}
                  >
                    <option value="desarrollo-personalizado">Desarrollo personalizado</option>
                    <option value="aplicaciones-web">Aplicaciones web</option>
                    <option value="automatizacion">Automatización</option>
                    <option value="integracion">Integración de sistemas</option>
                    <option value="soporte">Soporte y mantenimiento</option>
                  </select>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Mensaje</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    style={styles.textarea}
                    onFocus={(e) => {
                      e.target.style.borderColor = colors.primary[500];
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = colors.neutral[200];
                    }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    ...styles.primaryButton,
                    marginTop: '1rem'
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                  {!isSubmitting && <Send size={18} style={{ marginLeft: '0.5rem' }} />}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DevServiceLanding;