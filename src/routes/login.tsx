import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import brerevLogo from "@/assets/brerev-logo.png";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Iniciar sesión — Brerev" },
      { name: "description", content: "Accede a tu sistema Brerev." },
    ],
  }),
  component: LoginPage,
});

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#EA4335"
        d="M12 11v3.2h4.5c-.18 1.1-.74 2.04-1.59 2.66v2.2h2.57c1.5-1.39 2.37-3.43 2.37-5.86 0-.57-.05-1.12-.14-1.65L12 11z"
      />
      <path
        fill="#34A853"
        d="M12 21c2.16 0 3.97-.72 5.29-1.94l-2.57-2.2c-.72.49-1.64.78-2.72.78-2.09 0-3.86-1.41-4.49-3.31H4.86v2.07A8.99 8.99 0 0 0 12 21z"
      />
      <path
        fill="#FBBC05"
        d="M7.51 14.33A5.4 5.4 0 0 1 7.21 12c0-.81.14-1.6.3-2.33V7.6H4.86A8.99 8.99 0 0 0 3.86 12c0 1.45.35 2.82.97 4.4l2.68-2.07z"
      />
      <path
        fill="#4285F4"
        d="M12 6.45c1.18 0 2.24.41 3.07 1.2l2.28-2.28C15.97 4.13 14.16 3 12 3a8.99 8.99 0 0 0-7.14 4.6l2.65 2.07C8.14 7.86 9.91 6.45 12 6.45z"
      />
    </svg>
  );
}

function LoginPage() {
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Guard simulado — sin auth real todavía
    window.localStorage.setItem("brerev_logged_in", "true");
    navigate({ to: "/app/dashboard" });
  };

  const handleGoogle = () => {
    window.localStorage.setItem("brerev_logged_in", "true");
    navigate({ to: "/app/dashboard" });
  };

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[55%_45%]">
      {/* LEFT */}
      <div
        className="relative flex flex-col items-center justify-center overflow-hidden p-8 sm:p-16"
        style={{ background: "var(--midnight)" }}
      >
        <div className="absolute inset-0 bg-grid-subtle opacity-60" />
        <div className="ambient-glow" />

        <Link to="/" className="relative mb-12 flex flex-col items-center gap-2">
          <img
            src={brerevLogo}
            alt="Brerev"
            className="h-8 w-auto"
            style={{ filter: "drop-shadow(0 0 18px rgba(30,95,255,0.35))" }}
          />
          <span className="text-[13px] text-[color:var(--slate)]" style={{ letterSpacing: "0.06em" }}>
            Infraestructura comercial
          </span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-[420px] rounded-[20px] p-10 sm:p-12"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--border-subtle)",
            backdropFilter: "blur(12px)",
          }}
        >
          <h1 className="text-[28px] font-bold text-[color:var(--platinum)]">Bienvenido de vuelta</h1>
          <p className="mt-2 text-[15px] text-[color:var(--slate)]">Accede a tu sistema Brerev</p>

          <div className="my-7" />

          <button
            type="button"
            onClick={handleGoogle}
            className="flex w-full items-center justify-center gap-3 rounded-[10px] border px-4 py-3.5 text-[15px] font-semibold text-[color:var(--platinum)] transition-all hover:bg-white/10"
            style={{
              background: "rgba(255,255,255,0.06)",
              borderColor: "var(--steel-light)",
            }}
          >
            <GoogleIcon />
            Continuar con Google
          </button>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1" style={{ background: "var(--steel)" }} />
            <span className="text-[13px] text-[color:var(--slate)]">o ingresa con email</span>
            <div className="h-px flex-1" style={{ background: "var(--steel)" }} />
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            <FormField label="Correo electrónico" type="email" required placeholder="tu@correo.com" />
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-[color:var(--slate-light)]">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full rounded-[10px] border px-4 py-3.5 pr-11 text-[15px] text-[color:var(--platinum)] outline-none transition-all placeholder:text-[color:var(--slate)] placeholder:opacity-60 focus:border-[color:var(--electric)]"
                  style={{ background: "rgba(8,14,29,0.6)", borderColor: "var(--steel-light)" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--slate)] hover:text-[color:var(--platinum)]"
                  aria-label={showPwd ? "Ocultar" : "Mostrar"}
                >
                  {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-[13px] font-medium text-[color:var(--electric)] hover:underline">
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <button type="submit" className="btn-primary w-full justify-center">
              Iniciar sesión <span className="arrow">→</span>
            </button>
          </form>

          <p className="mt-6 text-center text-[14px] text-[color:var(--slate)]">
            ¿No tienes cuenta?{" "}
            <Link to="/registro" className="font-semibold text-[color:var(--electric)] hover:underline">
              Crear cuenta gratis
            </Link>
          </p>
        </motion.div>
      </div>

      {/* RIGHT */}
      <div
        className="relative hidden flex-col items-center justify-center overflow-hidden p-12 lg:flex"
        style={{
          background:
            "linear-gradient(135deg, var(--navy) 0%, #0a1428 50%, var(--navy-light) 100%)",
        }}
      >
        <div className="ambient-glow" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-[480px] text-center"
        >
          <p className="text-[28px] font-semibold leading-[1.3] text-[color:var(--platinum)]">
            "Hoy llegaron 23 leads.
            <br />
            Los 23 fueron atendidos.
            <br />
            Tú estabas en una cita."
          </p>
          <p className="mt-5 text-[14px] text-[color:var(--slate)]">— Sistema Brerev activo</p>

          <div className="mt-12 grid grid-cols-3 gap-3">
            {[
              { value: "98.7%", label: "Leads atendidos", color: "var(--success)" },
              { value: "<12s", label: "Tiempo respuesta", color: "var(--electric)" },
              { value: "24/7", label: "Disponibilidad", color: "var(--platinum)" },
            ].map((m) => (
              <div
                key={m.label}
                className="rounded-xl p-4 text-center"
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <p className="text-[28px] font-bold tabular" style={{ color: m.color }}>
                  {m.value}
                </p>
                <p className="mt-1 text-[12px] text-[color:var(--slate)]">{m.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function FormField(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const { label, ...rest } = props;
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-[color:var(--slate-light)]">{label}</span>
      <input
        {...rest}
        className="w-full rounded-[10px] border px-4 py-3.5 text-[15px] text-[color:var(--platinum)] outline-none transition-all placeholder:text-[color:var(--slate)] placeholder:opacity-60 focus:border-[color:var(--electric)]"
        style={{ background: "rgba(8,14,29,0.6)", borderColor: "var(--steel-light)" }}
      />
    </label>
  );
}
