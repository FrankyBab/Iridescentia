"use client";

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation'; // Importer useRouter de next/navigation
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Image from 'next/image';
import logo from './logoiri.png';
import spiral from './spiral.png';
import francois from './francois.png';
import nodal from './nodal.png';
import iri from './iri.png';
import dsih from './dsih.png';
import apssis from './apssis.png';
import cotious from './cotious.png';
import cursorImage from './spiral.png'; 
import vinc from './vinc.jpg';
import mehdi from './mehdi.png';
import guigz from './guigz.png';

gsap.registerPlugin(ScrollToPlugin);

export default function Home() {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]); // Références des sections
  const currentSection = useRef(0); // L'index de la section actuelle
  const [isAnimating, setIsAnimating] = useState(false); // Évite le double scroll pendant l'animation
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null); // Timeout pour limiter la sensibilité
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 }); // État pour la position du curseur personnalisé

  const router = useRouter(); // Utiliser le hook useRouter

  // Fonction qui redirige vers la page2.tsx
  const handleContactClick = () => {
    router.push('/page2'); // Redirige vers la route de la page2
  };

  useEffect(() => {
    // Gérer la position du curseur personnalisé
    const handleMouseMove = (event: MouseEvent) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    // Écoute l'événement 'mousemove' pour mettre à jour la position du curseur
    window.addEventListener('mousemove', handleMouseMove);

    // Nettoie l'événement lorsque le composant est démonté
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (isAnimating || scrollTimeout) return; // Si une animation est déjà en cours ou qu'on attend la fin du timeout

      setIsAnimating(true);

      // Détermine la direction du scroll
      if (event.deltaY > 0) {
        // Scroll vers le bas
        if (currentSection.current < sectionsRef.current.length - 1) {
          currentSection.current += 1; // Avance d'une section
        }
      } else {
        // Scroll vers le haut
        if (currentSection.current > 0) {
          currentSection.current -= 1; // Recul d'une section
        }
      }

      // Utilisation de GSAP pour scroller vers la section cible si elle est définie
      const targetSection = sectionsRef.current[currentSection.current];
      if (targetSection) {
        gsap.to(window, {
          scrollTo: {
            y: targetSection.offsetTop, // Scroll vers la section cible
          },
          duration: 1, // Durée de l'animation
          ease: 'power2.inOut', // Animation fluide
          onComplete: () => {
            setIsAnimating(false); // On termine l'animation
            // Ajout d'un délai avant de permettre un nouveau scroll
            const timeout = setTimeout(() => {
              setScrollTimeout(null);
            }, 500); // Délai de 500ms entre deux scrolls
            setScrollTimeout(timeout);
          },
        });
      } else {
        setIsAnimating(false); // Si pas de section cible, on réactive le scroll
      }
    };

    // Ajoute l'écouteur pour le scroll
    window.addEventListener('wheel', handleWheel, { passive: false });

    // Nettoie l'événement lorsque le composant est démonté
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout); // Nettoie le timeout si existant
      }
    };
  }, [isAnimating, scrollTimeout]);

  return (
    <div className="bg-black flex flex-col items-center justify-center min-h-screen relative overflow-hidden">
      {/* Curseur personnalisé avec une image */}
      <div
        className="cursor"
        style={{
          position: 'fixed', // Positionnement fixe
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          width: '50px', // Taille de l'image
          height: '50px',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          zIndex: 10000, // S'assurer que le curseur soit au-dessus de tout
        }}
      >
        <Image src={cursorImage} alt="Custom Cursor" width={50} height={50} />
      </div>

      {/* Première section */}
      <div
        ref={(el) => (sectionsRef.current[0] = el)} // Utilise ref pour stocker la référence de la section
        className="relative flex flex-col items-center justify-center min-h-screen w-full"
      >
        <Image
          src={spiral}
          alt="Spiral logo"
          width={100}
          height={100}
          className="absolute top-4 left-4"
        />
        <Image
          src={logo}
          alt="Logo IRI"
          width={1000}
          height={1000}
        />
       <p className="absolute bottom-4 right-4 text-white text-lg font-bold" style={{ fontFamily: 'var(--font-museo-moderno)' }}>
  *iridescentia
</p>

        {/* Bouton "Contactez-nous" */}
        <button
  onClick={handleContactClick}
  className="btn-white-border btn-custom"
  style={{ fontFamily: 'var(--font-museo-moderno)' }}
>
  Contactez-nous
</button>
      </div>

      {/* Deuxième section */}
      <div
        ref={(el) => (sectionsRef.current[1] = el)} // Stocke la référence de cette section
        className="bg-black w-full h-screen relative flex flex-col items-start justify-start pt-10"
      >
       <p
  className="text-white text-2xl ml-16 mb-2"
  style={{ fontFamily: 'var(--font-museo-moderno)' }}
>
  Full service, developpement and design agency
</p>
<p
  className="text-white text-2xl ml-16 mb-4"
  style={{ fontFamily: 'var(--font-museo-moderno)' }}
>
  A propos
</p>
        <div className="w-3/4 h-0.5 bg-white mb-6 ml-16 mr-16" />
        <div className="w-full mt-8">
        <p
  className="text-white text-7xl font-bold ml-16"
  style={{ fontFamily: 'var(--font-museo-moderno)' }}
>
Nous offrons des services complets en développement web (sites et applications), en design (maquettes, affiches, animations) et en communication (stratégie, réseaux sociaux), pour créer des expériences numériques sur mesure et renforcer votre présence en ligne.
</p>
        </div>
      </div>

      {/* Troisième section */}
<div
  ref={(el) => (sectionsRef.current[2] = el)} // Stocke la référence de cette section
  className="bg-black w-full h-screen relative flex flex-col"
>
  <p
    className="absolute top-8 ml-16 text-white text-5xl" // Ajustement de la marge à gauche
    style={{ fontFamily: 'var(--font-museo-moderno)', textAlign: 'left' }}
  >
    Les membres de l'équipe
  </p>
  <div className="flex justify-center items-center w-full mt-32 space-x-8">
    {/* Image 1 */}
    <div className="flex flex-col items-start w-[320px]"> {/* Limite la largeur à 320px */}
      <Image
        src={francois}
        alt="Image 1"
        width={320}
        height={480}
        className="w-[320px] h-[480px] object-cover"
      />
      <div className="w-full h-0.5 bg-white my-4" style={{ height: '1px' }} />
      <p className="text-white text-lg text-left" style={{ fontFamily: 'var(--font-museo-moderno)', maxWidth: '320px', whiteSpace: 'normal' }}>
        François Jaccard
      </p>
      <p className="text-white text-sm text-left" style={{ fontFamily: 'var(--font-museo-moderno)', maxWidth: '320px', whiteSpace: 'normal' }}>
        Je suis Directeur Artistique de 23 ans, en dernière année de master en finance. Je gère le design sur tous supports et développe également le front-end.
      </p>
      <a 
  href="https://www.linkedin.com/in/françois-jaccard-673a7984/" 
  className="text-white text-sm self-end relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-white after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300"
  style={{ fontFamily: 'var(--font-museo-moderno)', maxWidth: '320px', whiteSpace: 'normal' }}
>
  LinkedIn
</a>
    </div>

    {/* Image 2 */}
    <div className="flex flex-col items-start w-[320px]"> {/* Limite la largeur à 320px */}
      <Image
        src={mehdi}
        alt="Image 2"
        width={320}
        height={480}
        className="w-[320px] h-[480px] object-cover"
      />
      <div className="w-full h-0.5 bg-white my-4" style={{ height: '1px' }} />
      <p className="text-white text-lg text-left" style={{ fontFamily: 'var(--font-museo-moderno)', maxWidth: '320px', whiteSpace: 'normal' }}>
        Mehdi Lebranchu
      </p>
      <p className="text-white text-sm text-left" style={{ fontFamily: 'var(--font-museo-moderno)', maxWidth: '320px', whiteSpace: 'normal' }}>
      Je suis Directeur Artistique de 23 ans, en dernière année de master en finance. Je gère le design sur tous supports et développe également le front-end.
      </p>
      <a 
      href="https://www.linkedin.com/in/mehdi-lebranchu-89990b1a8/"
      className="text-white text-sm self-end relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-white after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300"
      style={{ fontFamily: 'var(--font-museo-moderno)', maxWidth: '320px', whiteSpace: 'normal' }}
    >
      LinkedIn
    </a>
    </div>

    {/* Image 3 */}
    <div className="flex flex-col items-start w-[320px]"> {/* Limite la largeur à 320px */}
      <Image
        src={guigz}
        alt="Image 3"
        width={320}
        height={480}
        className="w-[320px] h-[480px] object-cover"
      />
      <div className="w-full h-0.5 bg-white my-4" style={{ height: '1px' }} />
      <p className="text-white text-lg text-left" style={{ fontFamily: 'var(--font-museo-moderno)', maxWidth: '320px', whiteSpace: 'normal' }}>
        Guilhem De Clerck
      </p>
      <p className="text-white text-sm text-left" style={{ fontFamily: 'var(--font-museo-moderno)', maxWidth: '320px', whiteSpace: 'normal' }}>
        Je suis Directeur Artistique de 23 ans, en dernière année de master en finance. Je gère le design sur tous supports et développe également le front-end.
      </p>
      <a 
      href="https://www.linkedin.com/in/guilhem-dc/"
      className="text-white text-sm self-end relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-white after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300"
      style={{ fontFamily: 'var(--font-museo-moderno)', maxWidth: '320px', whiteSpace: 'normal' }}
    >
      LinkedIn
    </a>
    </div>
  </div>
</div>

{/* Nouvelle section insérée ici (entre la 3ème et 4ème section) */}
<div
  ref={(el) => (sectionsRef.current[3] = el)} // Stocke la référence de cette section
  className="bg-black w-full h-screen relative flex flex-col items-start justify-start pt-16"
>
  {/* Bloc pour "Nos services" */}
  <div className="flex flex-col items-start w-full pl-16 mb-16">
    <div className="flex flex-row items-start">
      {/* Titre "Nos services" */}
      <p className="text-white text-5xl mb-4 mr-8" style={{ fontFamily: 'var(--font-museo-moderno)' }}>
        Nos services
      </p>
      {/* Trait vertical plus long */}
      <div className="flex items-start">
        <div className="h-48 w-0.5 bg-white mr-8"></div>
      </div>

      {/* Liste des services à droite du trait */}
      <div className="flex flex-col text-white text-2xl" style={{ fontFamily: 'var(--font-museo-moderno)' }}>
        <p className="mb-2">Développement web</p>
        <p className="mb-2">Design UX/UI</p>
        <p className="mb-2">Stratégie digitale</p>
        <p className="mb-2">Gestion de projet</p>
        <p className="mb-2">SEO</p>
      </div>
    </div>
  </div>

{/* Bloc pour "Ils nous font déjà confiance" */}
<div className="flex flex-col items-start w-full pl-16">
  <div className="flex flex-row items-start">
    {/* Titre "Ils nous font déjà confiance" */}
    <p className="text-white text-5xl mb-4 mr-8" style={{ fontFamily: 'var(--font-museo-moderno)' }}>
      Ils nous font déjà confiance
    </p>
  </div>

  {/* Conteneur pour les rectangles défilables */}
  <div
    className="flex flex-row overflow-x-auto w-full mt-4 space-x-4 pr-16" 
    style={{ maxWidth: '100vw', overflowY: 'hidden' }} 
    onMouseEnter={() => {
      // Désactive le scroll vertical de la page
      document.body.style.overflowY = 'hidden';
    }}
    onMouseLeave={() => {
      // Réactive le scroll vertical de la page lorsque la souris quitte la zone
      document.body.style.overflowY = 'auto';
    }}
    onWheel={(e) => {
      e.preventDefault(); // Empêche le scroll vertical
      const container = e.currentTarget as HTMLElement;

      // Scroll horizontal dans la zone des rectangles
      container.scrollLeft += e.deltaY;

      // Empêche la propagation de l'événement à la page
      e.stopPropagation();
    }}
  >
   {/* Rectangle 1 */}
<div className="flex flex-col items-start">
  <div className="w-[500px] h-[300px] bg-white text-black flex items-center justify-center">
    <Image
      src={dsih} // Remplace par le chemin de l'image que tu souhaites
      alt="DSIH Logo"
      className="w-full h-full object-cover" // Adaptation de l'image à la taille du rectangle
    />
  </div>
  <p className="text-white mt-2" style={{ fontFamily: 'var(--font-museo-moderno)' }}>
    DSIH
  </p>
</div>

{/* Rectangle 2 */}
<div className="flex flex-col items-start">
  <div className="w-[500px] h-[300px] bg-white text-black flex items-center justify-center">
    <Image
      src={vinc} // Remplace par le chemin de l'image que tu souhaites
      alt="APSSIS Logo"
      className="w-full h-full object-cover"
    />
  </div>
  <p className="text-white mt-2" style={{ fontFamily: 'var(--font-museo-moderno)' }}>
    APSSIS
  </p>
</div>

{/* Rectangle 3 */}
<div className="flex flex-col items-start">
  <div className="w-[500px] h-[300px] bg-white text-black flex items-center justify-center">
    <Image
      src={nodal} // Remplace par le chemin de l'image que tu souhaites
      alt="NODAL Logo"
      className="w-full h-full object-cover"
    />
  </div>
  <p className="text-white mt-2" style={{ fontFamily: 'var(--font-museo-moderno)' }}>
    NODAL
  </p>
</div>

{/* Rectangle 4 */}
<div className="flex flex-col items-start">
  <div className="w-[500px] h-[300px] bg-white text-black flex items-center justify-center">
    <Image
      src={cotious} // Remplace par le chemin de l'image que tu souhaites
      alt="COTIOUS Logo"
      className="w-full h-full object-cover"
    />
  </div>
  <p className="text-white mt-2" style={{ fontFamily: 'var(--font-museo-moderno)' }}>
    COTIOUS
  </p>
</div>
  </div>
</div>
</div>


      {/* Quatrième section (devient maintenant la cinquième section) */}
      <div
        ref={(el) => (sectionsRef.current[4] = el)} // Stocke la référence de cette section
        className="bg-black w-full h-screen relative flex flex-col items-start justify-between pl-2 pt-2"
      >
        <div>
          <p className="text-white text-[16rem] font-bold mb-4" style={{ fontFamily: 'var(--font-museo-moderno)' }}>
            Iridescentia
          </p>
        </div>

        {/* Texte en bas */}
        <div className="mb-4">
          <p className="text-white text-6xl mb-2" style={{ fontFamily: 'var(--font-museo-moderno)' }}>
            Paris
          </p>
          <p className="text-white text-4xl" style={{ fontFamily: 'var(--font-museo-moderno)' }}>
            contact@iridescentia.com
          </p>
        </div>
      </div>
    </div>
  );
}