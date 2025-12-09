import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const parts = pathname.split("/").filter(Boolean);

  return (
    <div className="text-sm text-gray-300 mb-6">
      <Link to="/" className="hover:underline text-yellow-400">
        Acasă
      </Link>

      {parts.map((p, idx) => {
        const url = "/" + parts.slice(0, idx + 1).join("/");
        return (
          <span key={idx}>
            {" / "}
            <Link to={url} className="hover:underline">
              {p.replace("-", " ")}
            </Link>
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
