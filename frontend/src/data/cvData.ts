import type { CVContent } from '../types/cv'

export const cvData: CVContent = {
  hero: {
    name: 'Sergkei Kournosenkov',
    role: 'Web- und Softwareentwickler',
    tagline: 'Full-Stack-Entwicklung mit Schwerpunkt auf performanten Frontends.',
    summary:
      'Seit mehreren Jahren entwickle ich skalierbare Webanwendungen, integriere APIs und verbessere kontinuierlich Qualität, Wartbarkeit und Nutzererlebnis.',
    primaryCtaLabel: 'Karrierekarte öffnen',
    secondaryCtaLabel: 'Zu den Projekten',
  },
  about: {
    title: 'Über mich',
    paragraphs: [
      'Ich arbeite als Full-Stack Software Engineer mit starkem Fokus auf moderne Frontend-Architekturen, saubere Schnittstellen und robuste Backend-Integration.',
      'Mein Schwerpunkt liegt auf Angular, React, SQL-Optimierung, automatisierten Tests und einer kollaborativen Entwicklungsweise mit klaren Code-Standards.',
    ],
  },
  experience: [
    {
      id: 'exp-ecs',
      company: 'ECS GmbH',
      role: 'Software Engineer - Full Stack (Schwerpunkt Frontend)',
      start: '04.2019',
      end: 'Heute',
      summary:
        'Neuentwicklung und Wartung komplexer SPAs, API-Anbindung sowie Performance- und Qualitätsoptimierung über den gesamten Entwicklungszyklus.',
      highlights: [
        'Entwicklung responsiver Oberflächen mit HTML5, SASS/LESS sowie Bootstrap und Tailwind.',
        'Anbindung von RESTful APIs und enge Abstimmung mit Backend-Teams, unter anderem mit Spring Boot.',
        'Einführung von Clean-Code-Richtlinien, SonarQube, ESLint und Prettier zur Verbesserung der Wartbarkeit.',
        'Aufbau und Umsetzung automatisierter Unit-Tests in Frontend und Backend zur Reduktion von Regressionen.',
        'Fachliche Unterstützung der Projektleitung bei Technologie- und Architekturentscheidungen.',
      ],
      placeId: 'place-wuppertal',
    },
    {
      id: 'exp-nonomella',
      company: 'Nonomella GmbH',
      role: 'Web-Software Entwickler und Leitung des IT-Bereichs',
      start: '04.2017',
      end: '03.2019',
      summary:
        'Technische Leitung des IT-Bereichs, Weiterentwicklung der E-Commerce-Landschaft und Full-Stack-Umsetzung neuer Webshop-Funktionen.',
      highlights: [
        'Koordination interner und externer Entwicklungsressourcen.',
        'Betreuung und Ausbau von JTL Shop und JTL Wawi inklusive Schnittstellenmanagement.',
        'Planung und Umsetzung der IT-Infrastruktur für das operative Geschäft.',
        'Feature-Entwicklung im Webshop-Umfeld mit PHP und MySQL.',
      ],
      placeId: 'place-wuppertal',
    },
    {
      id: 'exp-koszewa',
      company: 'Koszewa & Koszewa GbR',
      role: 'Web- und Softwareentwickler (Frontend, Backend, interne Systeme)',
      start: '11.2014',
      end: '03.2017',
      summary:
        'Konzeption und Umsetzung dynamischer Webanwendungen sowie interner Systeme zur Prozessautomatisierung.',
      highlights: [
        'Entwicklung mit jQuery, Bootstrap, HTML, PHP, MySQL und C#.',
        'Aufbau und Pflege relationaler Datenbankstrukturen sowie komplexer SQL-Abfragen.',
        'Second-Level-Support und Fehleranalyse für bestehende Softwarelösungen.',
      ],
      placeId: 'place-wuppertal',
    },
  ],
  projects: [
    {
      id: 'prj-spa',
      name: 'Enterprise-SPA Modernisierung',
      description:
        'Architektur, Umsetzung und laufende Optimierung komplexer Single-Page-Applications in produktiven Unternehmensumgebungen.',
      technologies: ['Angular', 'React', 'TypeScript', 'REST APIs', 'Spring Boot'],
      placeId: 'place-wuppertal',
    },
    {
      id: 'prj-lowcode',
      name: 'Low-Code Business Apps',
      description:
        'Konzeption und Entwicklung von Geschäftsanwendungen mit Mendix zur schnellen Bereitstellung fachlicher Lösungen.',
      technologies: ['Mendix', 'SQL', 'Integrationen', 'Testautomatisierung'],
      placeId: 'place-wuppertal',
    },
    {
      id: 'prj-ecommerce',
      name: 'E-Commerce Plattformentwicklung',
      description:
        'Weiterentwicklung von JTL-gestützten Shop- und Warenwirtschaftsprozessen inklusive technischer Betreuung der Infrastruktur.',
      technologies: ['PHP', 'MySQL', 'JTL Shop', 'JTL Wawi'],
      placeId: 'place-wuppertal',
    },
  ],
  skills: [
    {
      id: 'skills-front',
      label: 'Frontend',
      skills: ['JavaScript', 'Angular', 'React', 'Ajax', 'jQuery', 'HTML', 'CSS', 'SCSS', 'LESS', 'SASS'],
    },
    {
      id: 'skills-backend',
      label: 'Backend & Datenbanken',
      skills: ['PHP (OOP, Smarty)', 'Java (Spring Boot)', 'C#', 'MySQL', 'PostgreSQL', 'SQL Server (T-SQL)'],
    },
    {
      id: 'skills-platform',
      label: 'Plattformen & Tools',
      skills: ['Mendix', 'GitHub', 'GitLab', 'Gitea', 'Subversion', 'Tailwind', 'Bootstrap', 'RESTful/SOAP APIs'],
    },
    {
      id: 'skills-additional',
      label: 'Weitere Kenntnisse',
      skills: ['Flutter/Dart', 'Google APIs', 'SAP (Grundkenntnisse)', 'Salesforce (Grundkenntnisse)', 'Unity', 'Unreal 4'],
    },
  ],
  education: [
    {
      id: 'edu-epirus',
      institution: 'Technological Educational Institute of Epirus',
      program: 'B.Sc. Computer Engineering (Software Engineering)',
      start: '2008',
      end: '2015',
      details:
        'Studium mit Schwerpunkt Software Engineering und fundierter Basis in Systementwicklung.',
      placeId: 'place-ioannina',
    },
    {
      id: 'edu-telecom',
      institution: 'Berufsbildungsinstitut Ioannina',
      program: 'Telekommunikation & Netzwerke',
      start: '2006',
      end: '2007',
      details: 'Praxisnahe Ausbildung im Bereich Netzwerke und Kommunikationstechnik.',
      placeId: 'place-ioannina',
    },
    {
      id: 'edu-abitur',
      institution: 'Griechisches Lyzeum Nürnberg',
      program: 'Abitur',
      start: '2004',
      end: '2004',
      details: 'Allgemeine Hochschulreife.',
      placeId: 'place-nuernberg',
    },
  ],
  contact: {
    email: 'ser.corum@gmail.com',
    phone: '+49 176 80829512',
    location: 'Sedanstr. 55a, 42281 Wuppertal',
    links: [
      { label: 'GitHub', href: 'https://github.com/corum86' },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/sergkei-kournosenkov-10659592/',
      },
    ],
  },
}
