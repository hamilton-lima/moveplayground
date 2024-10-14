import packageJSON from "../package.json";

export default function Footer() {
  const version = packageJSON.version;
  const year = new Date().getFullYear();

  return (
    <footer className="footer footer-center bg-base-300 text-base-content p-4">
      <aside>
        <p>
          Copyright © {year} - All right reserved by MOVEPLAYGROUND - version{" "}
          {version}
        </p>
      </aside>
    </footer>
  );
}
