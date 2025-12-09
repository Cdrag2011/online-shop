import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const parts = location.pathname.split("/").filter(Boolean);

  const paths = parts.map((part, index) => ({
    name: decodeURIComponent(part).replace(/-/g, " "),
    url: "/" + parts.slice(0, index + 1).join("/"),
  }));

  return (
    <nav className="text-gray-300 text-sm mb-6">
      <Link to="/" className="text-yellow-400 hover:underline">
        Acasă
      </Link>

      {paths.map((p, i) => (
        <span key={i}>
          {" "}
          /{" "}
          <Link
            to={p.url}
            className={i === paths.length - 1 ? "text-yellow-400" : "hover:underline"}
          >
            {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
          </Link>
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
