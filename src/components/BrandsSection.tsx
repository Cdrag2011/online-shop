import React from "react";
import { brands } from "../data/brands";

interface BrandsSectionProps {
  onSelectBrand?: (brand: string) => void;
}

const BrandsSection: React.FC<BrandsSectionProps> = ({ onSelectBrand }) => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          Branduri Partenere
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 justify-items-center">
          {brands.map((brand) => (
            <button
              key={brand.name}
              onClick={() => onSelectBrand?.(brand.name)}
              className="flex items-center justify-center bg-white shadow-md rounded-lg p-4 hover:scale-105 transition-transform duration-300"
            >
              <img
                src={brand.logoUrl}
                alt={brand.name}
                className="h-16 md:h-20 w-auto object-contain grayscale hover:grayscale-0 transition"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BrandsSection;