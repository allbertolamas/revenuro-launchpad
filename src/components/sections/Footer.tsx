import brerevLogo from "@/assets/brerev-logo.png";

export function Footer() {
  const links = ["Cómo funciona", "Precios", "Demo", "Privacidad", "Términos"];
  const hrefs = ["#como-funciona", "#precios", "#demo", "#", "#"];

  return (
    <footer
      style={{
        background: "var(--midnight)",
        borderTop: "1px solid var(--steel)",
        paddingTop: "48px",
        paddingBottom: "32px",
      }}
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <img
            src={brerevLogo}
            alt="Brerev"
            className="h-6 w-auto select-none"
            style={{
              filter:
                "drop-shadow(0 0 14px rgba(30,95,255,0.3)) drop-shadow(0 2px 4px rgba(0,0,0,0.4))",
            }}
            draggable={false}
          />

          <nav className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {links.map((l, i) => (
              <a
                key={l}
                href={hrefs[i]}
                className="text-[14px] text-[color:var(--slate)] transition-colors hover:text-[color:var(--platinum)]"
              >
                {l}
              </a>
            ))}
          </nav>
        </div>

        <div
          className="mt-8 pt-6 text-center"
          style={{ borderTop: "1px solid var(--steel)" }}
        >
          <p
            className="text-[13px] text-[color:var(--slate)]"
            style={{ opacity: 0.6 }}
          >
            © 2026 Brerev. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
