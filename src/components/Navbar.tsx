import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import brerevLogo from "@/assets/brerev-logo.png";

export function Navbar({ topOffset = 0 }: { topOffset?: number }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cuando hace scroll, el navbar se "despega" del topbar y se queda en top:0.
  const headerTop = scrolled ? 0 : topOffset;

  const navLinks = [
    { label: "Precios", to: "/precios" as const },
    { label: "Demo en vivo", to: "/demo" as const },
  ];

  return (
    <>
      <header
        className="fixed left-0 right-0 z-[100] transition-all duration-300"
        style={{
          top: headerTop,
          background: scrolled ? "rgba(8,14,29,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: scrolled ? "1px solid var(--steel)" : "1px solid transparent",
        }}
      >
        <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-6">
          <Link
            to="/"
            className="group flex items-center gap-2 transition-transform duration-300 hover:scale-[1.02]"
            aria-label="Brerev"
          >
            <img
              src={brerevLogo}
              alt="Brerev"
              className="h-7 w-auto select-none"
              style={{
                filter:
                  "drop-shadow(0 0 18px rgba(30,95,255,0.35)) drop-shadow(0 2px 4px rgba(0,0,0,0.4))",
              }}
              draggable={false}
            />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((l, i) => (
              <div key={l.to} className="flex items-center gap-1">
                <Link
                  to={l.to}
                  className="px-3 py-2 text-[15px] font-medium text-[color:var(--slate)] transition-colors duration-200 hover:text-[color:var(--platinum)]"
                  activeProps={{ style: { color: "var(--platinum)" } }}
                >
                  {l.label}
                </Link>
                {i < navLinks.length - 1 && (
                  <span className="text-[color:var(--steel-light)]">·</span>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/login"
              className="text-[14px] font-medium text-[color:var(--slate)] transition-colors hover:text-[color:var(--platinum)]"
            >
              Iniciar sesión
            </Link>
            <Link to="/registro" className="btn-primary !py-2.5 !px-5 text-[14px]">
              Probar gratis <span className="arrow">→</span>
            </Link>
          </div>

          <button
            className="md:hidden text-[color:var(--platinum)]"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
            className="fixed top-0 right-0 z-[99] h-screen w-[80%] max-w-sm bg-[color:var(--midnight)] pt-[72px] md:hidden"
            style={{ borderLeft: "1px solid var(--steel)" }}
          >
            <div className="flex flex-col gap-1 p-6">
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="py-3 text-[18px] font-medium text-[color:var(--platinum)]"
                >
                  {l.label}
                </Link>
              ))}
              <div className="my-4 h-px bg-[color:var(--steel)]" />
              <Link
                to="/login"
                className="py-3 text-[16px] text-[color:var(--slate)]"
                onClick={() => setOpen(false)}
              >
                Iniciar sesión
              </Link>
              <Link
                to="/registro"
                onClick={() => setOpen(false)}
                className="btn-primary mt-4 justify-center"
              >
                Probar gratis <span className="arrow">→</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
