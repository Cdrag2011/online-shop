import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import { unslugify, slugify } from "../utils/slugify";

const CategoryPage = () => {
  const { slug } = useParams();

  const categoryName = unslugify(slug ?? "");

  const filtered = products.filter(
    (p) => slugify(p.category) === slug
  );

  return (
    <div className="pt-28 px-6 max-w-7xl mx-auto text-white">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 drop-shadow">
        Categoria: <span className="text-yellow-400">{categoryName}</span>
      </h1>

      {filtered.length === 0 ? (
        <p className="text-gray-300">Nu există produse în această categorie.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p) => (
            <Link
              key={p.id}
              to={`/product/${p.id}`}
              className="bg-white/10 p-4 rounded-2xl backdrop-blur hover:scale-[1.03] transition"
            >
              <img src={p.image} className="h-44 w-full object-contain mb-4" />
              <h3 className="text-xl font-bold">{p.name}</h3>
              <p className="text-gray-300">{p.brand}</p>
              <div className="text-yellow-400 font-bold text-lg mt-3">
                {p.price} lei
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
