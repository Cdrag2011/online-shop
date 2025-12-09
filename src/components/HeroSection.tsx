import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BrandSlider from "./BrandSlider";
import FloatingButtons from "./FloatingButtons";
import heroBg from "../assets/imagine-fundal1.png";

const HeroSection = () => {
  // SLOGANE ROTATIVE
  const slogans = [
    "Alătură-te viitorului, fii partenerul nostru.",
    "Join the future, be our partner.",
    "Rejoignez l'avenir, devenez notre partenaire.",
    "Unisciti al futuro, diventa nostro partner.",
    "Únete al futuro, sé nuestro socio.",
    "Csatlakozz a jövőhöz, legyél a partnerünk.",
    "Werde Teil der Zukunft, werde unser Partner.",
    "Word deel van de toekomst, word onze partner.",
    "Dołącz do przyszłości, zostań naszym partnerem.",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slogans.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative w-full h-[90vh] flex justify-center"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/30" />

      {/* CONTENT */}
      <div className="relative z-10 text-center flex flex-col items-center mt-24 md:mt-32 px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-xl">
          Neo Tech Shop
        </h1>

        <p
          key={index}
          className="text-lg md:text-2xl text-white mt-4 max-w-3xl animate-slideZoomGlow"
        >
          {slogans[index]}
        </p>

        <Link
          to="/produse"
          className="mt-8 px-8 py-3 rounded-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold shadow-lg transition animate-pulse-smooth"
        >
          Vezi gama de produse
        </Link>

        {/* BRAND SLIDER */}
        <div className="w-full max-w-5xl mt-10">
          <BrandSlider />
        </div>
      </div>

      {/* BUTOANE FLOTANTE */}
      <FloatingButtons />
    </section>
  );
};

export default HeroSection;
