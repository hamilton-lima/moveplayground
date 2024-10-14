import Link from "next/link";

export default function Header() {
  return (
    <nav className="navbar justify-between bg-base-300">
      <a className="btn btn-ghost text-lg">
        <img alt="Logo" src="/logo-oct-2024.svg" className="w-12" />
        MovePlayground
      </a>

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
          {/* <li>
            <a>Pricing</a>
          </li>
          <li>
            <a>Blog</a>
          </li>
          <li>
            <a>Contact</a>
          </li> */}
          <a className="btn btn-sm btn-primary">Log in</a>
        </ul>
      </div>

      <ul className="hidden menu sm:menu-horizontal gap-2">
        <li>
          <Link href="/about">About</Link>
        </li>
        <a className="btn btn-sm btn-primary">Log in</a>
      </ul>
    </nav>
  );
}
