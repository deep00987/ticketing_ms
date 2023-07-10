import Link from "next/link";

export default ({ currentUser }) => {
  const links = [
    !currentUser && { label: "Sign up", href: "/auth/signup" },
    !currentUser && { label: "Sign in", href: "/auth/signin" },
    currentUser && { label: "Sign out", href: "/auth/signout" },
  ]
    .filter((link) => link)
    .map(({ label, href }) => {
      return (
        <li key={href} className="nav-item">
          <Link legacyBehavior href={href}>
            <a className="nav-link">{label}</a>
          </Link>
        </li>
      );
    });

  return (
    <nav className="navbar navbar-light bg-light">
      <Link legacyBehavior href="/">
        <a className="navbar-brand">Ticket</a>
      </Link>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">
          {/* {currentUser ? 'Sign out' : 'Sign up/in'} */}
          {links}
        </ul>
      </div>
    </nav>
  );
};
