"use client";
import { FormattedMessage } from "react-intl";
import packageJSON from "../package.json";

export default function Footer({ lang }: { lang: string }) {
  const version = packageJSON.version;
  const year = new Date().getFullYear();

  return (
    <footer className="footer footer-center bg-base-300 text-base-content p-4">
      <aside>
        <FormattedMessage id="footer.copyright" values={{ year, version }} />
      </aside>
    </footer>
  );
}
