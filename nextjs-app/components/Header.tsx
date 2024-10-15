"use client";
import Link from "next/link";
import { FormattedMessage } from "react-intl";

export default function Header({ lang }: { lang: string }) {
  return (
    <nav className="navbar justify-between bg-base-300">
      <Link className="btn btn-ghost text-lg" href={`/${lang}`}>
        <img alt="Logo" src="/logo.svg" className="w-12" />
        <FormattedMessage id="nav.home" />
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
            <Link href={`/${lang}/about`}>
              <FormattedMessage id="nav.about" />
            </Link>
          </li>
          <Link
            className="btn btn-sm btn-accent btn-primary"
            href={`/${lang}/login`}
          >
            <FormattedMessage id="nav.login" />
          </Link>
        </ul>
      </div>

      <ul className="hidden menu sm:menu-horizontal gap-2">
        <li>
          <Link href={`/${lang}/about`}>
            <FormattedMessage id="nav.about" />
          </Link>
        </li>
        <Link
          className="btn btn-sm btn-accent btn-primary"
          href={`/${lang}/login`}
        >
          <FormattedMessage id="nav.login" />
        </Link>
      </ul>
    </nav>
  );
}
