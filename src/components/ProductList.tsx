import React from "react";
import { products } from "../data/products";

interface ProductListProps {
  selectedBrand: string | null;
}

const ProductList: React.FC<ProductListProps> = ({ selectedBrand }) => {
  if (!selectedBrand) {
    return (
      <p className="text-center text-gray-600 mt-8">
        Selectează un brand pentru a vedea produsele.
      </p>
    );
  }

  const filtered = products.filter((p) => p.brand === selectedBrand);

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Produse {selectedBrand}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-40 w-auto object-contain mb-4"
            />
            <h4 className="font-semibold text-lg text-gray-800 text-center mb-2">
              {product.name}
            </h4>
            <p className="text-yellow-600 font-bold text-lg">
              {product.price} RON
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductList;
