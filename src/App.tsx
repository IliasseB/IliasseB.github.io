
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  ChevronRight, 
  Mail, 
  Phone, 
  Github, 
  Linkedin,
  ExternalLink,
  Code,
  Shield,
  Database,
  Terminal,
  Globe,
  Cpu,
  Download,
  Send,
  User,
  MessageSquare,
  BookOpen,
  Award
} from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'about', label: 'Présentation' },
    { id: 'skills', label: 'Compétences' },
    { id: 'experience', label: 'Expérience' },
    { id: 'education', label: 'Formation' },
    { id: 'certifications', label: 'Formation Complémentaire' },
    { id: 'projects', label: 'Projets' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section, index) => {
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(navItems[index].id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const handleDownloadCV = () => {
    // Créer un lien de téléchargement fictif
    const link = document.createElement('a');
    link.href = '/CV_Iliasse.pdf'; // Remplacer par le vrai lien du CV
    link.download = 'CV_Iliasse_.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-purple-500/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            Iliasse BELLOUCH
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-6">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                    activeSection === item.id 
                      ? 'text-purple-400' 
                      : 'text-gray-300 hover:text-purple-400'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"
                    />
                  )}
                </motion.button>
              ))}
            </div>
            
            {/* CV Download Button */}
            <motion.button
              onClick={handleDownloadCV}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 text-sm"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={14} />
              <span>CV</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-purple-400"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/40 backdrop-blur-xl border-t border-purple-500/20"
          >
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-3 py-2 text-sm font-medium transition-colors ${
                    activeSection === item.id 
                      ? 'text-purple-400 bg-purple-500/10' 
                      : 'text-gray-300 hover:text-purple-400 hover:bg-purple-500/5'
                  }`}
                  whileHover={{ x: 10 }}
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.button
                onClick={handleDownloadCV}
                className="flex items-center space-x-2 w-full px-3 py-2 mt-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold"
                whileHover={{ x: 10 }}
              >
                <Download size={16} />
                <span>Télécharger CV</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
              Iliasse BELLOUCH
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Étudiant en BUT Informatique & Apprenti Développeur Web
          </motion.p>
          
          <motion.p 
            className="text-lg md:text-xl text-purple-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Passionné par le web et les nouvelles technologies
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12"
        >
          <motion.button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Découvrir mon profil
            <ChevronRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative z-10"
            >
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-1">
                <div className="w-full h-full bg-black rounded-3xl flex items-center justify-center">
                  <img
                    src="/iliasse.jpg"
                    alt="Profile"
                    className="w-72 h-72 object-cover rounded-3xl"
                  />
                </div>
              </div>
            </motion.div>
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-purple-500/20 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-pink-500/20 rounded-full blur-xl" />
          </div>

          <div>
            <motion.h2 
              className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Présentation
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-6 text-gray-300"
            >
              <p>
                Je m'appelle Iliasse BELLOUCH, actuellement étudiant en deuxième année en BUT Informatique à l'Université Sorbonne Paris Nord située à Villetaneuse.
              </p>
              
              <p>
                Le BUT Informatique nécessite plusieurs qualités essentielles comme la logique, la capacité à résoudre des problèmes complexes, l'esprit d'analyse, mais aussi un bon sens de l'organisation. Par ailleurs, l'une des caractéristiques essentielles d'un monde comme celui des technologies de l'information est la veille technologique, en effet être à la page de ces nouvelles technologies est très important. Toutes ces qualités sont à quoi nous sommes formés durant notre cursus scolaire.
              </p>

              <p>
                Mon objectif est plus tard de me spécialiser dans la cybersécurité afin de contribuer à la protection des données et des infrastructures face aux menaces numériques.
              </p>

              <div className="space-y-3 mt-8">
                {[
                  { label: 'Ville', value: 'Sevran' },
                  { label: 'Téléphone', value: '07 55 84 37 27' },
                  { label: 'Email', value: 'IliasseBellouch@outlook.fr' }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <ChevronRight className="text-purple-400" size={16} />
                    <span className="font-semibold text-purple-300">{item.label}:</span>
                    <span>{item.value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Experience = () => {
  const experiences = [
    {
      title: 'Administrateur Réseau Junior',
      company: '3D Copier - Chrysalide',
      period: 'Janvier 2025 - Mars 2025',
      description: 'Stage de 8 semaines effectué à 3D Copier - Chrysalide où j\'ai pu travailler en tant qu\'administrateur réseau junior et résoudre les problèmes réseaux des différents clients.'
    }
  ];

  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Expérience
        </motion.h2>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="flex items-start space-x-6">
                <div className="flex flex-col items-center">
                  <motion.div 
                    className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                    whileHover={{ scale: 1.5 }}
                  />
                </div>
                
                <motion.div 
                  className="flex-1 bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6 hover:border-purple-400/40 transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-xl font-bold text-purple-300 mb-2">{exp.title}</h3>
                  <div className="inline-block px-3 py-1 bg-purple-500/20 rounded-full text-sm text-purple-200 mb-2">
                    {exp.period}
                  </div>
                  <p className="text-purple-200 font-medium mb-3">{exp.company}</p>
                  <p className="text-gray-300">{exp.description}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Education = () => {
  const educations = [
    {
      degree: 'BAC STI2D',
      school: 'Lycée Jean Rostand, Villepinte',
      period: '2020-2022'
    },
    {
      degree: 'BUT Informatique',
      school: 'Université Sorbonne Paris Nord - IUT de Villetaneuse',
      period: '2022-2026'
    },
    {
      degree: 'Master en Cybersécurité',
      school: 'Établissement à définir',
      period: '2026-2028'
    }
  ];

  return (
    <section id="education" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Formation
        </motion.h2>

        <div className="space-y-8">
          {educations.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="flex items-start space-x-6">
                <div className="flex flex-col items-center">
                  <motion.div 
                    className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                    whileHover={{ scale: 1.5 }}
                  />
                  {index < educations.length - 1 && (
                    <div className="w-0.5 h-24 bg-gradient-to-b from-purple-400 to-transparent mt-2" />
                  )}
                </div>
                
                <motion.div 
                  className="flex-1 bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6 hover:border-purple-400/40 transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-xl font-bold text-purple-300 mb-2">{edu.degree}</h3>
                  <div className="inline-block px-3 py-1 bg-purple-500/20 rounded-full text-sm text-purple-200 mb-2">
                    {edu.period}
                  </div>
                  <p className="text-gray-300">{edu.school}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Certifications = () => {
  const certifications = [
    {
      platform: 'OpenClassrooms',
      logo: '📚',
      description: 'J\'utilise OpenClassrooms pour approfondir mon apprentissage du code et découvrir de nouvelles technologies.',
      color: 'from-blue-500 to-blue-700'
    },
    {
      platform: 'Udemy',
      logo: '🌐',
      description: 'Je prends des cours en ligne sur Udemy, notamment pour me perfectionner en JavaScript.',
      color: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <section id="certifications" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Formation Complémentaire
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.platform}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 hover:border-purple-400/40 transition-all duration-300">
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${cert.color}`}>
                    <span className="text-2xl">{cert.logo}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{cert.platform}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Award className="w-4 h-4 text-purple-400" />
                      <span className="text-purple-300 text-sm">Plateforme certifiante</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-300">{cert.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  type Skill = {
  name: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
};

type SkillCategory = {
  title: string;
  icon: JSX.Element;
  skills: Skill[];
  color: string;
};
  const skillCategories: SkillCategory[] = [
    {
      title: 'Frontend',
      icon: <Globe className="w-8 h-8" />,
      skills: [
        { name: 'HTML', level: 'Avancé' },
        { name: 'CSS', level: 'Avancé' },
        { name: 'Vue.js', level: 'Débutant' },
        { name: 'JavaScript', level: 'Avancé' },
],
      color: 'from-purple-500 to-purple-700'
    },
    {
      title: 'Backend',
      icon: <Code className="w-8 h-8" />,
      skills: [
        { name: 'Node.js', level: 'Débutant' },
        { name: 'Python', level: 'Intermédiaire' },
        { name: 'Express.js', level: 'Débutant' },
        { name: 'Java', level: 'Intermédiaire' },
        { name: 'PHP', level: 'Intermédiaire' }
      ],

      color: 'from-pink-500 to-pink-700'
    },
    {
      title: 'Base de Données',
      icon: <Database className="w-8 h-8" />,
      skills: [
        { name: 'MySQL', level: 'Intermédiaire' },
        { name: 'PostgreSQL', level: 'Intermédiaire' },
        { name: 'MariaDB', level: 'Intermédiaire' }
      ],
      color: 'from-indigo-500 to-indigo-700'
    },
    {
      title: 'Design',
      icon: <Terminal className="w-8 h-8" />,
      skills: [
        { name: 'Figma', level: 'Avancé' },
        { name: 'Canva', level: 'Avancé' },
        { name: 'WordPress', level: 'Intermédiaire' },
        { name: 'Adobe Photoshop', level: 'Intermédiaire' }
      ],
      color: 'from-green-500 to-green-700'
    },
    {
      title: 'Compétences Humaines',
      icon: <User className="w-8 h-8" />,
      skills: [
        { name: 'Curieux', level: 'Avancé' },
        { name: 'Créatif', level: 'Avancé' },
        { name: 'Adaptabilité', level: 'Avancé' },
        { name: 'Esprit d\'analyse', level: 'Avancé' },
        { name: 'Esprit d\'équipe', level: 'Avancé' },
        { name: 'Esprit critique', level: 'Avancé' }
      ],
      color: 'from-yellow-500 to-yellow-700'
    }
  ];

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Mes Compétences
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 hover:border-purple-400/40 transition-all duration-300">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${category.color} mb-6`}>
                  {category.icon}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-6">{category.title}</h3>
                
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: (index * 0.2) + (skillIndex * 0.1) }}
                      viewport={{ once: true }}
                      className="flex items-center justify-between text-gray-300 hover:text-purple-300 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
                        <span>{skill.name}</span>
                      </div>

                      <span
                          className={`px-3 py-0.5 text-xs font-semibold rounded-full border
                            ${skill.level === 'Avancé' ? ' bg-red-500/20 text-red-400 border-red-500' : ''}
                            ${skill.level === 'Intermédiaire' ? ' bg-yellow-500/20 text-yellow-400 border-yellow-500' : ''}
                            ${skill.level === 'Débutant' ? ' bg-emerald-500/20 text-emerald-400 border-emerald-500' : ''}
                          `}
                        >
                          {skill.level}
                        </span>

                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

import ProjectModal from './components/ProjectModal'; // en haut de App.tsx si pas déjà fait

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const projects = [
    {
      title: 'SAE Calculatrice',
      description: 'Dans ce projet universitaire, nous avons programmé en langage Java à l\'aide du logiciel Visual Studio Code. Nous avons créé une calculatrice et donc créé plusieurs méthodes pour tout genre de calcul, donc des additions, des soustractions, des multiplications et des divisions.',
      image: '/Calculatrice.png',
      tech: ['Java', 'Visual Studio Code']
    },
    {
      title: 'SAE Installation d\'un poste',
      description: 'Ce projet universitaire avait pour objectif d\'installer un environnement de développement avec l\'utilisation d\'un disque dur externe. Nous n\'avions pas particulièrement de cours mais nous avions certains éléments du cours "d\'Introduction aux systèmes" qui ont pu nous aider à mieux avancer dans ce projet.',
      image: '/Poste.png',
      tech: ['Système', 'Installation', 'Configuration']
    },
    {
      title: 'Météo Géographique',
      description: 'Ce projet est un exercice que j\'ai pu effectuer lors de ma formation en ligne via le site Udemy dans lequel nous pouvons choisir une ville de n\'importe quel pays puis le site nous montrera la température de cette ville en question.',
      image: '/Météo.png',
      tech: ['JavaScript', 'API', 'HTML/CSS']
    },
    {
      title: 'SAE Gestion de projet',
      description: 'Durant ce projet universitaire nous avons travaillé sur la modélisation des besoins d\'un projet de construction selon un cahier des charges donné. Nous avons choisi de réaliser les rénovations d\'une chambre en studio afin de pouvoir la louer plus tard.',
      image: '/Gestion.png',
      tech: ['Gestion de projet', 'Modélisation', 'Cahier des charges']
    },
    {
      title: 'SAE 3.01 Développement d\'une application',
      description: 'Dans ce projet de "Référencement de jeux de société", nous avons dû développer une application web qui répertorie près de 17 000 jeux de société, certains datant du XIXe siècle. Sur cette application web il est possible de rechercher, d\'emprunter des jeux de société, les administrateurs auront la tâche de gérer la gestion des droits des utilisateurs sur le site et pouvoir ainsi ajouter des gestionnaires qui vont pouvoir ajouter ou supprimer des jeux de société.',
      image: '/SAE_S3.png',
      tech: ['Web Development', 'Base de données', 'Gestion utilisateurs']
    },
    {
      title: 'SAE 4.01 Développement d\'une application',
      description: 'Ce projet a pour but d\'améliorer le projet précédent de "Référencement de jeux de société" où nous devions analyser le projet précédent afin d\'ajouter certaines fonctionnalités que nous n\'avions pas pu implémenter ou encore de peaufiner le projet en y apportant de nouvelles modifications.',
      image: 'SAE_S4.png',
      tech: ['Amélioration', 'Analyse', 'Nouvelles fonctionnalités']
    }
  ];

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Mes Projets
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              onClick={() => {
                setSelectedProject(project);
                setModalOpen(true);
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="cursor-pointer group relative"
            >


              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl overflow-hidden hover:border-purple-400/40 transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    <ExternalLink className="w-8 h-8 text-white" />
                  </motion.div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-purple-300 mb-3">{project.title}</h3>
                  <p className="text-gray-300 mb-4 line-clamp-3">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-purple-500/20 text-purple-200 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <ProjectModal
  isOpen={modalOpen}
  onClose={() => setModalOpen(false)}
  project={selectedProject}
/>

    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuler l'envoi du formulaire
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Créer le lien mailto
    const mailtoLink = `mailto:IliasseBellouch@outlook.fr?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    
    window.location.href = mailtoLink;
    
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: 'Email',
      value: 'IliasseBellouch@outlook.fr',
      href: 'mailto:IliasseBellouch@outlook.fr'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: 'Téléphone',
      value: '07 55 84 37 27',
      href: 'tel:0755843727'
    }
  ];

  const socialLinks = [
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: 'LinkedIn',
      href: '#'
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: 'GitHub',
      href: '#'
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      href: 'mailto:IliasseBellouch@outlook.fr'
    }
  ];

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Contactez-moi
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Formulaire de contact */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-purple-300 mb-8">Envoyez-moi un message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="name" className="block text-sm font-medium text-purple-300 mb-2">
                    Nom complet
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:border-purple-400/40 focus:outline-none transition-all duration-300"
                      placeholder="Votre nom"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-purple-300 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:border-purple-400/40 focus:outline-none transition-all duration-300"
                      placeholder="votre@email.com"
                    />
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <label htmlFor="subject" className="block text-sm font-medium text-purple-300 mb-2">
                  Sujet
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:border-purple-400/40 focus:outline-none transition-all duration-300"
                  placeholder="Sujet de votre message"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <label htmlFor="message" className="block text-sm font-medium text-purple-300 mb-2">
                  Message
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-4 text-purple-400 w-5 h-5" />
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full pl-12 pr-4 py-3 bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:border-purple-400/40 focus:outline-none transition-all duration-300 resize-none"
                    placeholder="Votre message..."
                  />
                </div>
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Envoyer le message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Informations de contact */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-purple-300 mb-8">Mes coordonnées</h3>
              <div className="space-y-6">
                {contactInfo.map((contact, index) => (
                  <motion.a
                    key={contact.label}
                    href={contact.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 10 }}
                    className="flex items-center space-x-4 p-4 bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-xl hover:border-purple-400/40 transition-all duration-300 group"
                  >
                    <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl group-hover:scale-110 transition-transform">
                      {contact.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-purple-300">{contact.label}</p>
                      <p className="text-gray-300">{contact.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-purple-300 mb-8">Réseaux sociaux</h3>
              <div className="grid grid-cols-3 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center justify-center p-6 bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-xl hover:border-purple-400/40 transition-all duration-300 group"
                  >
                    <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl mb-3 group-hover:scale-110 transition-transform">
                      {social.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-300 group-hover:text-purple-300 transition-colors">
                      {social.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-purple-500/20">
      <div className="max-w-6xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-gray-400"
        >
          © {new Date().getFullYear()} Iliasse BELLOUCH. Tous droits réservés.
        </motion.p>
      </div>
    </footer>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-pink-900/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      </div>

      <div className="relative z-10">
        <Navigation />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Certifications />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;