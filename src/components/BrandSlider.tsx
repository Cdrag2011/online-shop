import { useState, useEffect } from "react";

const brands = [
  { src: "/brands/rheinol.png", h: "h-[55px] md:h-[70px]" },
  { src: "/brands/repsol.png", h: "h-[55px] md:h-[70px]" },
  { src: "/brands/valvoline.png", h: "h-[55px] md:h-[70px]" },
  { src: "/brands/record.png", h: "h-[60px] md:h-[80px]" },
  { src: "/brands/cyclon.png", h: "h-[55px] md:h-[70px]" },
  { src: "/brands/hertzkraft.png", h: "h-[95px] md:h-[110px]" },
  { src: "/brands/sandexon.png", h: "h-[50px] md:h-[65px]" },
  { src: "/brands/hififilter.png", h: "h-[70px] md:h-[90px]" },
];

const BrandSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % brands.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const desktopBrands = [
    brands[index],
    brands[(index + 1) % brands.length],
    brands[(index + 2) % brands.length],
  ];

  const mobileBrand = brands[index];

  return (
    <div className="w-full flex justify-center">
      <div className="w-full overflow-hidden">

        {/* DESKTOP */}
        <div className="hidden md:flex gap-10 items-center justify-center">
          {desktopBrands.map((b, i) => (
            <img
              key={i}
              src={b.src}
              alt="brand"
              className={`
                ${b.h}
                object-contain max-w-[180px]
                transition-all duration-700 animate-slideLeft
              `}
            />
          ))}
        </div>

        {/* MOBILE */}
        <div className="flex md:hidden justify-center overflow-hidden h-[90px]">
          <img
            key={index}
            src={mobileBrand.src}
            alt="brand"
            className={`
              ${mobileBrand.h}
              object-contain max-w-[160px]
              transition-all duration-700 animate-slideUp
            `}
          />
        </div>

      </div>
    </div>
  );
};

export default BrandSlider;
