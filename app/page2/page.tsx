"use client";

import Image from 'next/image'; // Assure-toi d'importer 'next/image' si tu utilises Next.js
import React from 'react'; // Ajout de l'import React
import Resize from './Resize.png';
import cursorImage from './spiral.png'; // Image pour le curseur personnalisé

export default function Page2() {
  const imageRef = React.useRef(null); // Référence pour l'image
  const [cursorPosition, setCursorPosition] = React.useState({ x: 0, y: 0 }); // État pour la position du curseur personnalisé

  // Gérer la position du curseur personnalisé
  React.useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative bg-white min-h-screen flex flex-col items-start py-12 px-8">
      {/* Curseur personnalisé */}
      <div
        className="cursor"
        style={{
          position: 'fixed',
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          width: '50px', // Taille du curseur personnalisé
          height: '50px',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          zIndex: 10000, // S'assurer que le curseur soit visible au-dessus de tout
        }}
      >
        <Image src={cursorImage} alt="Custom Cursor" width={50} height={50} />
      </div>

      {/* Titre "Nous contacter" avec un trait noir */}
      <div className="w-full max-w-3xl">
        <h1 className="text-6xl font-bold text-left mb-4" style={{ fontFamily: 'var(--font-museo-moderno)' }}>
          Nous contacter
        </h1>
        <div className="w-full h-0.25 bg-black mb-12" /> {/* Épaisseur du trait réduite */}
      </div>

      {/* Formulaire */}
      <form className="w-full max-w-3xl">
        <div className="flex flex-wrap justify-between mb-12">
          <div className="w-full md:w-1/2 pr-4 mb-6 md:mb-0">
            <label className="block text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-museo-moderno)' }}>
              Votre nom
            </label>
            <input
              type="text"
              className="w-full border-b border-black py-3 px-4 focus:outline-none"
              placeholder="Votre nom"
              style={{ fontFamily: 'var(--font-museo-moderno)' }}
            />
          </div>
          <div className="w-full md:w-1/2 pl-4">
            <label className="block text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-museo-moderno)' }}>
              Adresse email
            </label>
            <input
              type="email"
              className="w-full border-b border-black py-3 px-4 focus:outline-none"
              placeholder="Votre adresse email"
              style={{ fontFamily: 'var(--font-museo-moderno)' }}
            />
          </div>
        </div>

        {/* Champ "Objet de la demande" */}
        <div className="mb-12">
          <label className="block text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-museo-moderno)' }}>
            Objet de la demande
          </label>
          <input
            type="text"
            className="w-full border-b border-black py-3 px-4 focus:outline-none"
            placeholder="Objet de votre demande"
            style={{ fontFamily: 'var(--font-museo-moderno)' }}
          />
        </div>

        {/* Champ "Votre message" */}
        <div className="mb-12">
          <label className="block text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-museo-moderno)' }}>
            Votre message
          </label>
          <textarea
            className="w-full border-b border-black py-3 px-4 focus:outline-none"
            placeholder="Tapez votre message ici"
            rows={8}
            style={{ fontFamily: 'var(--font-museo-moderno)' }}
          />
        </div>

        {/* Bouton pour envoyer, aligné à droite */}
        <div className="text-right">
        <button
  type="submit"
  className="text-lg font-bold py-2 px-6 border-1 border-black rounded-[30px] transition-all duration-500 ease-in-out relative overflow-hidden group"
  style={{ fontFamily: 'var(--font-museo-moderno)' }}
>
  <span className="relative z-10 group-hover:text-white transition-colors duration-500">Envoyer le formulaire</span>
  
  {/* Fond du bouton avec dégradé et animation */}
  <div className="absolute inset-0 bg-[linear-gradient(45deg,#03F7FC,#E4AA0A,#D85040,#AF2898,#0C54FB)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out origin-left"></div>
  
  {/* Bordure noire qui disparaît au survol */}
  <div className="absolute inset-0 border-2 border-black rounded-[30px] group-hover:border-transparent transition-all duration-500"></div>
</button>
        </div>
      </form>

      {/* Image "Resize.png" en bas à droite avec animation élastique */}
      <div
        ref={imageRef}
        className="absolute bottom-0 right-0 elastic-animation"
      >
        <Image
          src={Resize}
          alt="Resize logo"
          width={550}
          height={550}
          className="object-contain"
        />
      </div>

      {/* Animation élastique avec keyframes */}
      <style jsx>{`
        @keyframes elastic {
          0% {
            transform: scale(0.95);
          }
          30% {
            transform: scale(1.05);
          }
          60% {
            transform: scale(0.98);
          }
          100% {
            transform: scale(1);
          }
        }

        .elastic-animation {
          animation: elastic 3s ease-out;
        }
      `}</style>
    </div>
  );
}