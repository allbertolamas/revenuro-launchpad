import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Lock } from "lucide-react";
import brerevLogo from "@/assets/brerev-logo.png";

type SearchParams = { plan?: "lite" | "engine" | "machine" };

export const Route = createFileRoute("/registro")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    plan: (search.plan as SearchParams["plan"]) || "engine",
  }),
  head: () => ({
    meta: [
      { title: "Crear cuenta — Brerev | 5 días gratis" },
      {
        name: "description",
        content: "Crea tu cuenta Brerev en 3 pasos. Prueba 5 días sin tarjeta de crédito.",
      },
    ],
  }),
  component: RegistroPage,
});

const PLANS = {
  lite: { name: "Closer Lite", monthly: 99, yearly: 82, desc: "Para el asesor individual" },
  engine: { name: "Revenue Engine", monthly: 199, yearly: 165, desc: "Más elegido por inmobiliarias serias", highlighted: true },
  machine: { name: "Deal Machine", monthly: 399, yearly: 332, desc: "Para equipos completos" },
} as const;

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path fill="#EA4335" d="M12 11v3.2h4.5c-.18 1.1-.74 2.04-1.59 2.66v2.2h2.57c1.5-1.39 2.37-3.43 2.37-5.86 0-.57-.05-1.12-.14-1.65L12 11z" />
      <path fill="#34A853" d="M12 21c2.16 0 3.97-.72 5.29-1.94l-2.57-2.2c-.72.49-1.64.78-2.72.78-2.09 0-3.86-1.41-4.49-3.31H4.86v2.07A8.99 8.99 0 0 0 12 21z" />
      <path fill="#FBBC05" d="M7.51 14.33A5.4 5.4 0 0 1 7.21 12c0-.81.14-1.6.3-2.33V7.6H4.86A8.99 8.99 0 0 0 3.86 12c0 1.45.35 2.82.97 4.4l2.68-2.07z" />
      <path fill="#4285F4" d="M12 6.45c1.18 0 2.24.41 3.07 1.2l2.28-2.28C15.97 4.13 14.16 3 12 3a8.99 8.99 0 0 0-7.14 4.6l2.65 2.07C8.14 7.86 9.91 6.45 12 6.45z" />
    </svg>
  );
}

function RegistroPage() {
  const { plan: initialPlan } = Route.useSearch();
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [plan, setPlan] = useState<keyof typeof PLANS>(initialPlan ?? "engine");
  const [yearly, setYearly] = useState(false);
  const [pwd, setPwd] = useState("");

  const pwdCriteria = [
    { label: "8+ caracteres", ok: pwd.length >= 8 },
    { label: "1 mayúscula", ok: /[A-Z]/.test(pwd) },
    { label: "1 número o símbolo", ok: /\d/.test(pwd) || /[^a-zA-Z0-9]/.test(pwd) },
    { label: "12+ caracteres (recomendado)", ok: pwd.length >= 12 },
  ];
  const pwdStrength = pwdCriteria.filter((c) => c.ok).length;
  const pwdColor =
    pwdStrength <= 1
      ? "var(--red-loss)"
      : pwdStrength === 2
      ? "var(--amber)"
      : pwdStrength === 3
      ? "var(--electric)"
      : "var(--success)";
  const pwdLabel =
    pwd.length === 0
      ? ""
      : pwdStrength <= 1
      ? "Débil"
      : pwdStrength === 2
      ? "Aceptable"
      : pwdStrength === 3
      ? "Fuerte"
      : "Excelente";

  return (
    <div className="relative min-h-screen overflow-hidden bg-grid" style={{ background: "var(--midnight)" }}>
      <div className="ambient-glow" />

      <div className="relative mx-auto max-w-[600px] px-6 py-12">
        <Link to="/" className="mb-10 flex items-center justify-center">
          <img
            src={brerevLogo}
            alt="Brerev"
            className="h-8 w-auto"
            style={{ filter: "drop-shadow(0 0 18px rgba(30,95,255,0.35))" }}
          />
        </Link>

        {/* Progress */}
        <div className="mb-10 flex items-center justify-center gap-2">
          {[1, 2, 3].map((n, i) => {
            const isActive = step === n;
            const isDone = step > n;
            const labels = ["Tu cuenta", "Tu plan", "Activa"];
            return (
              <div key={n} className="flex items-center gap-2">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-bold transition-colors"
                    style={{
                      background: isDone
                        ? "var(--success)"
                        : isActive
                        ? "var(--electric)"
                        : "var(--steel)",
                      color: isDone || isActive ? "white" : "var(--slate)",
                    }}
                  >
                    {isDone ? <Check size={16} /> : n}
                  </div>
                  <span
                    className="text-[11px] font-medium"
                    style={{ color: isActive ? "var(--platinum)" : "var(--slate)" }}
                  >
                    {n}. {labels[i]}
                  </span>
                </div>
                {i < 2 && (
                  <div
                    className="mt-[-18px] h-px w-12"
                    style={{ background: step > n ? "var(--success)" : "var(--steel)" }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Card */}
        <div
          className="relative overflow-hidden rounded-[20px] p-8 sm:p-10"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--border-subtle)",
            backdropFilter: "blur(12px)",
          }}
        >
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="s1"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 className="text-[26px] font-bold text-[color:var(--platinum)]">
                  Crea tu cuenta Brerev
                </h1>
                <p className="mt-2 text-[15px] text-[color:var(--slate)]">
                  5 días de prueba sin tarjeta de crédito.
                </p>

                <button
                  type="button"
                  className="mt-7 flex w-full items-center justify-center gap-3 rounded-[10px] border px-4 py-3.5 text-[15px] font-semibold text-[color:var(--platinum)] transition-all hover:bg-white/10"
                  style={{ background: "rgba(255,255,255,0.06)", borderColor: "var(--steel-light)" }}
                >
                  <GoogleIcon />
                  Continuar con Google
                </button>

                <div className="my-6 flex items-center gap-3">
                  <div className="h-px flex-1" style={{ background: "var(--steel)" }} />
                  <span className="text-[13px] text-[color:var(--slate)]">o con email</span>
                  <div className="h-px flex-1" style={{ background: "var(--steel)" }} />
                </div>

                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setStep(2);
                  }}
                >
                  <FormField label="Nombre completo" required placeholder="Tu nombre" />
                  <FormField label="Correo electrónico" type="email" required placeholder="tu@correo.com" />
                  <div>
                    <FormField
                      label="Contraseña"
                      type="password"
                      required
                      minLength={8}
                      placeholder="Mínimo 8 caracteres, 1 número"
                      value={pwd}
                      onChange={(e) => setPwd(e.target.value)}
                    />
                    {pwd.length > 0 && (
                      <div className="mt-2 flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            className="h-1 flex-1 rounded-full transition-colors"
                            style={{
                              background:
                                i < pwdStrength
                                  ? pwdStrength === 1
                                    ? "var(--red-loss)"
                                    : pwdStrength === 2
                                    ? "var(--amber)"
                                    : "var(--success)"
                                  : "var(--steel)",
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center">
                    Continuar <span className="arrow">→</span>
                  </button>
                </form>

                <p className="mt-5 text-center text-[14px] text-[color:var(--slate)]">
                  ¿Ya tienes cuenta?{" "}
                  <Link to="/login" className="font-semibold text-[color:var(--electric)] hover:underline">
                    Iniciar sesión
                  </Link>
                </p>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="s2"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 className="text-[26px] font-bold text-[color:var(--platinum)]">Elige tu plan</h1>
                <p className="mt-2 text-[15px] text-[color:var(--slate)]">
                  Puedes cambiar o cancelar cuando quieras.
                </p>

                <div className="mt-6 inline-flex items-center gap-2 rounded-full p-1" style={{ background: "var(--steel)" }}>
                  <button
                    onClick={() => setYearly(false)}
                    className="rounded-full px-4 py-1.5 text-[13px] font-semibold transition-colors"
                    style={{
                      background: !yearly ? "var(--electric)" : "transparent",
                      color: !yearly ? "white" : "var(--slate)",
                    }}
                  >
                    Mensual
                  </button>
                  <button
                    onClick={() => setYearly(true)}
                    className="rounded-full px-4 py-1.5 text-[13px] font-semibold transition-colors"
                    style={{
                      background: yearly ? "var(--electric)" : "transparent",
                      color: yearly ? "white" : "var(--slate)",
                    }}
                  >
                    Anual <span className="text-[color:var(--success)]">-2 meses</span>
                  </button>
                </div>

                <div className="mt-6 space-y-3">
                  {(Object.keys(PLANS) as Array<keyof typeof PLANS>).map((key) => {
                    const p = PLANS[key];
                    const selected = plan === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setPlan(key)}
                        className="flex w-full items-center gap-4 rounded-[14px] border p-5 text-left transition-all"
                        style={{
                          background: selected ? "rgba(30,95,255,0.06)" : "rgba(8,14,29,0.4)",
                          borderColor: selected ? "var(--electric)" : "var(--steel-light)",
                        }}
                      >
                        <div
                          className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all"
                          style={{
                            borderColor: selected ? "var(--electric)" : "var(--steel-light)",
                          }}
                        >
                          {selected && (
                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{ background: "var(--electric)" }}
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[16px] font-bold text-[color:var(--platinum)]">
                              {p.name}
                            </span>
                            {"highlighted" in p && p.highlighted && (
                              <span
                                className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase text-white"
                                style={{ background: "var(--electric)", letterSpacing: "0.08em" }}
                              >
                                Más elegido
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 text-[13px] text-[color:var(--slate)]">{p.desc}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[20px] font-extrabold tabular text-[color:var(--platinum)]">
                            ${yearly ? p.yearly : p.monthly}
                          </p>
                          <p className="text-[11px] text-[color:var(--slate)]">USD/mes</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 text-center">
                  <Link
                    to="/precios"
                    target="_blank"
                    className="text-[13px] font-medium text-[color:var(--electric)] hover:underline"
                  >
                    Ver comparación completa →
                  </Link>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="btn-ghost flex-shrink-0"
                  >
                    ← Anterior
                  </button>
                  <button onClick={() => setStep(3)} className="btn-primary flex-1 justify-center">
                    Continuar <span className="arrow">→</span>
                  </button>
                </div>

                <p className="mt-4 text-center text-[12px] text-[color:var(--slate)]">
                  No se cobra nada hoy. La prueba de 5 días es completamente gratis.
                </p>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="s3"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 className="text-[26px] font-bold text-[color:var(--platinum)]">
                  Activa tu prueba gratuita
                </h1>
                <p className="mt-2 text-[15px] text-[color:var(--slate)]">
                  Añade una tarjeta para continuar después de los 5 días. No se hace ningún cobro hoy.
                </p>

                {/* Order summary */}
                <div
                  className="mt-6 rounded-[14px] p-5"
                  style={{
                    background: "rgba(0,214,143,0.05)",
                    border: "1px solid rgba(0,214,143,0.15)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] text-[color:var(--slate)]">Plan seleccionado</span>
                    <span className="text-[15px] font-semibold text-[color:var(--platinum)]">
                      {PLANS[plan].name} {yearly ? "(anual)" : "(mensual)"}
                    </span>
                  </div>
                  <div className="mt-2 flex items-baseline justify-between">
                    <span className="text-[14px] text-[color:var(--slate)]">Cargo hoy</span>
                    <span className="text-[24px] font-extrabold tabular text-[color:var(--success)]">
                      $0 USD
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[13px] text-[color:var(--slate)]">
                    <span>Primer cobro</span>
                    <span>
                      en 5 días · ${yearly ? PLANS[plan].yearly : PLANS[plan].monthly} USD
                    </span>
                  </div>
                </div>

                {/* Stripe placeholder */}
                <div
                  className="mt-6 rounded-[14px] p-5"
                  style={{
                    background: "rgba(8,14,29,0.6)",
                    border: "1px dashed var(--steel-light)",
                  }}
                >
                  <div className="space-y-3">
                    <FormField label="Número de tarjeta" placeholder="1234 1234 1234 1234" />
                    <div className="grid grid-cols-2 gap-3">
                      <FormField label="MM / AA" placeholder="12 / 28" />
                      <FormField label="CVV" placeholder="123" />
                    </div>
                    <FormField label="Nombre en la tarjeta" placeholder="Como aparece en la tarjeta" />
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <Lock size={12} className="text-[color:var(--slate)]" />
                    <span className="text-[12px] text-[color:var(--slate)]">
                      Pago seguro vía Stripe · Encriptación SSL
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button onClick={() => setStep(2)} className="btn-ghost flex-shrink-0">
                    ← Anterior
                  </button>
                  <button
                    onClick={() => {
                      window.localStorage.setItem("brerev_logged_in", "true");
                      navigate({ to: "/onboarding" });
                    }}
                    className="btn-primary flex-1 justify-center"
                  >
                    Activar prueba gratuita <span className="arrow">→</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="mt-6 text-center text-[13px] text-[color:var(--slate)]">
          Al continuar aceptas nuestros{" "}
          <a href="#" className="text-[color:var(--electric)] hover:underline">
            términos
          </a>{" "}
          y{" "}
          <a href="#" className="text-[color:var(--electric)] hover:underline">
            política de privacidad
          </a>
          .
        </p>
      </div>
    </div>
  );
}

function FormField(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const { label, ...rest } = props;
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-[color:var(--slate-light)]">
        {label}
      </span>
      <input
        {...rest}
        className="w-full rounded-[10px] border px-4 py-3.5 text-[15px] text-[color:var(--platinum)] outline-none transition-all placeholder:text-[color:var(--slate)] placeholder:opacity-60 focus:border-[color:var(--electric)]"
        style={{ background: "rgba(8,14,29,0.6)", borderColor: "var(--steel-light)" }}
      />
    </label>
  );
}
