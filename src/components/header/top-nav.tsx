import { Link } from "@tanstack/react-router";

const TOP_ROUTES = [
  {
    id: "/",
    label: "Home",
  },
  {
    id: "/about",
    label: "About",
  },
  {
    id: "/posts",
    label: "Posts",
  },
];

export const TopNav = () => {
  return (
    <nav className="w-full flex justify-center items-center xl:py-6 relative gradient-border-b">
      {TOP_ROUTES.map((route) => (
        <Link
          to={route.id}
          className="px-6 font-light hover:text-primary text-primary/80 transition-colors duration-300"
          key={route.id}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};
