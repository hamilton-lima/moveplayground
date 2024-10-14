import Link from "next/link";

export default function Header() {
  return (
    <nav className="navbar justify-between bg-base-300">
      <Link className="btn btn-ghost text-lg" href="/" passHref>
        <img alt="Logo" src="/logo.svg" className="w-12" />
        MovePlayground
      </Link>
      <div className="dropdown dropdown-end sm:hidden">
        <button className="btn btn-ghost">
          <i className="fa-solid fa-bars text-lg"></i>
        </button>

        <ul
          tabIndex={0}
          className="dropdown-content menu z-[1] bg-base-200 p-6 rounded-box shadow w-56 gap-2"
        >
          <li>
            <Link href="/about">About</Link>
          </li>
          <a className="btn btn-sm btn-accent btn-primary">Log in</a>
        </ul>
      </div>

      <ul className="hidden menu sm:menu-horizontal gap-2">
        <li>
          <Link href="/about">About</Link>
        </li>
        <Link
          className="btn btn-sm btn-accent btn-primary"
          href="/login"
          passHref
        >
          Log in
        </Link>
      </ul>
    </nav>
  );
}
