import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Rocket,
  Wifi,
  MessageSquare,
  Users,
  CreditCard,
  AlertCircle,
  ChevronRight,
  MessageCircle,
  X,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { PublicShell } from "@/components/PublicShell";
import { AppShell } from "@/components/app/AppShell";

const CATEGORIES = [
  {
    id: "primeros-pasos",
    icon: Rocket,
    title: "Primeros pasos",
    count: 8,
    description: "Activa y configura tu sistema",
  },
  {
    id: "canales",
    icon: Wifi,
    title: "Canales y conexiones",
    count: 12,
    description: "WhatsApp, llamadas y portales",
  },
  {
    id: "mensajes",
    icon: MessageSquare,
    title: "Mensajes y respuestas",
    count: 9,
    description: "Personaliza cómo habla el sistema",
  },
  {
    id: "leads",
    icon: Users,
    title: "Leads y conversaciones",
    count: 7,
    description: "Entiende y gestiona tus leads",
  },
  {
    id: "facturacion",
    icon: CreditCard,
    title: "Facturación y planes",
    count: 6,
    description: "Planes, cobros y cambios",
  },
  {
    id: "problemas",
    icon: AlertCircle,
    title: "Problemas frecuentes",
    count: 10,
    description: "Soluciones rápidas a problemas comunes",
  },
];

const SUGGESTED = [
  "Cómo conectar WhatsApp",
  "Editar mensajes",
  "Cambiar de plan",
  "Agregar propiedades",
  "Cancelar",
];

const MOCK_RESULTS = [
  { title: "Cómo conectar tu WhatsApp Business", category: "Canales y conexiones" },
  { title: "Personalizar el mensaje de bienvenida", category: "Mensajes y respuestas" },
  { title: "Cambiar de plan o cancelar", category: "Facturación y planes" },
  { title: "Subir tu inventario de propiedades", category: "Primeros pasos" },
  { title: "El sistema no está respondiendo", category: "Problemas frecuentes" },
];

export function HelpPage() {
  const [isAuth, setIsAuth] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      setIsAuth(window.localStorage.getItem("brerev_logged_in") === "true");
    }
  }, []);

  const content = <HelpContent />;

  if (!mounted) {
    return <div style={{ background: "var(--midnight)", minHeight: "100vh" }} />;
  }

  // En modo autenticado renderizamos el contenido sin AppShell ya que esta ruta
  // es pública (no vive bajo /_app). El usuario ve el sidebar solo si navega
  // desde el dashboard. Para simplicidad, mostramos siempre el shell público.
  return <PublicShell>{content}</PublicShell>;

  // Nota: si quisiéramos detectar al usuario logueado y mostrar AppShell aquí,
  // tendríamos que extraer Help del routeTree público — para evitar duplicar
  // la ruta, mantenemos la consistencia con el shell público.
  // (referencia tácita para evitar warning de import sin uso)
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  AppShell;
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  isAuth;
}

function HelpContent() {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const results =
    query.length >= 2
      ? MOCK_RESULTS.filter((r) =>
          r.title.toLowerCase().includes(query.toLowerCase()),
        )
      : [];

  return (
    <div style={{ background: "var(--midnight)" }}>
      {/* Hero */}
      <section
        className="relative px-5 py-20 sm:py-24"
        style={{ background: "var(--midnight)" }}
      >
        <div className="bg-grid-subtle absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-[720px] text-center">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[36px] font-bold sm:text-[48px]"
            style={{ color: "var(--platinum)", letterSpacing: "-0.02em" }}
          >
            ¿En qué podemos ayudarte?
          </motion.h1>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="relative mx-auto mt-8 max-w-[640px]"
          >
            <Search
              size={20}
              className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2"
              style={{ color: "var(--slate)" }}
            />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
              placeholder="Buscar en el centro de ayuda..."
              className="w-full rounded-[14px] py-4 pl-14 pr-5 text-[16px] outline-none transition-all"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--border-subtle)",
                color: "var(--platinum)",
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") setShowResults(false);
              }}
            />
            {showResults && query.length >= 2 && (
              <div
                className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-[14px] text-left shadow-2xl"
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--border-subtle)",
                  backdropFilter: "blur(16px)",
                }}
              >
                {results.length === 0 ? (
                  <p
                    className="px-5 py-4 text-[14px]"
                    style={{ color: "var(--slate)" }}
                  >
                    Sin resultados para "{query}"
                  </p>
                ) : (
                  <ul>
                    {results.map((r, i) => (
                      <li
                        key={i}
                        className="cursor-pointer border-b px-5 py-3 transition-colors hover:bg-white/5"
                        style={{
                          borderColor: "var(--steel)",
                        }}
                      >
                        <p
                          className="text-[14px] font-medium"
                          style={{ color: "var(--platinum)" }}
                        >
                          {r.title}
                        </p>
                        <p
                          className="mt-0.5 text-[12px]"
                          style={{ color: "var(--slate)" }}
                        >
                          {r.category}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </motion.div>

          {/* Suggested chips */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {SUGGESTED.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setQuery(s);
                  setShowResults(true);
                }}
                className="rounded-full px-3 py-1.5 text-[12px] transition-all hover:-translate-y-px"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid var(--steel-light)",
                  color: "var(--slate-light)",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="mx-auto max-w-[1080px] px-5 pb-24 sm:px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="group flex flex-col items-center rounded-[14px] p-7 text-center transition-all hover:-translate-y-1"
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--border-subtle)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(30,95,255,0.3)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 30px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-subtle)";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-[14px]"
                  style={{ background: "rgba(30,95,255,0.1)" }}
                >
                  <Icon size={26} style={{ color: "var(--electric)" }} />
                </div>
                <h3
                  className="mt-4 text-[16px] font-semibold"
                  style={{ color: "var(--platinum)" }}
                >
                  {cat.title}
                </h3>
                <p
                  className="mt-1 text-[13px]"
                  style={{ color: "var(--slate)" }}
                >
                  {cat.description}
                </p>
                <p
                  className="mt-3 inline-flex items-center gap-1 text-[12px]"
                  style={{ color: "var(--slate)", opacity: 0.7 }}
                >
                  {cat.count} artículos
                  <ChevronRight
                    size={12}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </p>
              </motion.button>
            );
          })}
        </div>

        {/* Top articles */}
        <div className="mx-auto mt-16 max-w-[680px]">
          <h2
            className="mb-4 text-[18px] font-semibold"
            style={{ color: "var(--platinum)" }}
          >
            Artículos más vistos
          </h2>
          <ul
            className="overflow-hidden rounded-[12px]"
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            {MOCK_RESULTS.map((r, i) => (
              <li
                key={i}
                className="flex cursor-pointer items-center gap-3 px-5 py-4 transition-colors hover:bg-white/5"
                style={{
                  borderTop: i > 0 ? "1px solid var(--steel)" : undefined,
                }}
              >
                <ChevronRight size={16} style={{ color: "var(--slate)" }} />
                <div className="min-w-0 flex-1">
                  <p
                    className="text-[15px] font-medium"
                    style={{ color: "var(--platinum)" }}
                  >
                    {r.title}
                  </p>
                  <p
                    className="mt-0.5 text-[12px]"
                    style={{ color: "var(--slate)" }}
                  >
                    {r.category}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 text-center">
            <Link
              to="/"
              className="text-[13px] underline-offset-4 hover:underline"
              style={{ color: "var(--electric)" }}
            >
              ¿No encuentras lo que buscas? Habla con el equipo →
            </Link>
          </div>
        </div>
      </section>

      <SupportFab />
    </div>
  );
}

function SupportFab() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Hablar con el equipo"
        className="fixed bottom-6 right-6 z-40 flex h-13 w-13 items-center justify-center rounded-full transition-transform hover:scale-105"
        style={{
          width: 52,
          height: 52,
          background: "var(--electric)",
          boxShadow: "0 4px 20px rgba(30,95,255,0.4)",
        }}
      >
        {open ? (
          <X size={22} className="text-white" />
        ) : (
          <MessageCircle size={22} className="text-white" />
        )}
      </button>

      {open && (
        <div
          className="fixed bottom-24 right-6 z-40 w-[320px] overflow-hidden rounded-[16px] shadow-2xl"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--border-subtle)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div
            className="px-5 py-4"
            style={{ borderBottom: "1px solid var(--steel)" }}
          >
            <p
              className="text-[15px] font-semibold"
              style={{ color: "var(--platinum)" }}
            >
              ¿Cómo prefieres contactarnos?
            </p>
          </div>
          <div className="p-4">
            <a
              href="https://wa.me/525500000000?text=Hola%20Brerev,%20necesito%20ayuda"
              target="_blank"
              rel="noreferrer"
              className="mb-2 flex items-center gap-3 rounded-[10px] px-4 py-3 transition-colors hover:bg-white/5"
              style={{ background: "rgba(0,214,143,0.08)" }}
            >
              <MessageCircle size={18} style={{ color: "var(--success)" }} />
              <div className="flex-1">
                <p
                  className="text-[13px] font-semibold"
                  style={{ color: "var(--platinum)" }}
                >
                  WhatsApp
                </p>
                <p className="text-[11px]" style={{ color: "var(--slate)" }}>
                  Respuesta inmediata
                </p>
              </div>
            </a>

            {sent ? (
              <p
                className="mt-2 rounded-[10px] px-4 py-3 text-[13px]"
                style={{
                  background: "rgba(0,214,143,0.08)",
                  color: "var(--success)",
                }}
              >
                ✓ Mensaje enviado. Te respondemos en menos de 2 horas.
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (message.trim()) {
                    setSent(true);
                    setMessage("");
                  }
                }}
              >
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  rows={3}
                  className="w-full resize-none rounded-[10px] px-3 py-2.5 text-[13px] outline-none"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--steel-light)",
                    color: "var(--platinum)",
                  }}
                />
                <button
                  type="submit"
                  className="mt-2 w-full rounded-[10px] py-2.5 text-[13px] font-semibold text-white transition-all hover:brightness-110"
                  style={{ background: "var(--electric)" }}
                >
                  Enviar mensaje
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
