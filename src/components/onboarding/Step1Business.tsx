import { Field } from "./Field";
import type { WizardData } from "./types";

const CITIES = [
  "CDMX",
  "Guadalajara",
  "Monterrey",
  "Tijuana",
  "Cancún",
  "Querétaro",
  "Puebla",
  "Mérida",
  "León",
  "Otra",
];

const PROPERTY_TYPES = [
  "Departamentos",
  "Casas",
  "Terrenos",
  "Oficinas",
  "Locales",
  "Propiedades de lujo",
  "Preventas",
];

export function Step1Business({
  data,
  update,
}: {
  data: WizardData;
  update: (patch: Partial<WizardData>) => void;
}) {
  const leadHint =
    data.monthlyLeads < 50
      ? "Perfecto para empezar con Closer Lite"
      : data.monthlyLeads <= 150
        ? "Revenue Engine cubre tu operación al 100%"
        : "Deal Machine está diseñado para tu volumen";

  return (
    <div className="space-y-6">
      <Field
        label="Nombre de tu negocio o agencia"
        placeholder="Ej: Inmobiliaria Torres, Carlos Mendoza..."
        helper="Así se presentará tu sistema ante cada lead"
        value={data.businessName}
        onChange={(e) => update({ businessName: e.target.value })}
      />

      <Field
        label="¿Cómo te llamas?"
        placeholder="Tu nombre o el del asesor principal"
        value={data.ownerName}
        onChange={(e) => update({ ownerName: e.target.value })}
      />

      <div>
        <span className="mb-1.5 block text-[13px] font-medium text-[color:var(--slate-light)]">
          ¿En qué ciudad o zona operas?
        </span>
        <div className="flex flex-wrap gap-2">
          {CITIES.map((c) => {
            const active = data.city === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => update({ city: c })}
                className="rounded-[8px] border px-3.5 py-2 text-[13px] font-medium transition-all"
                style={{
                  background: active ? "rgba(30,95,255,0.15)" : "rgba(30,95,255,0.04)",
                  borderColor: active ? "var(--electric)" : "var(--steel-light)",
                  color: active ? "var(--electric)" : "var(--slate-light)",
                }}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <span className="mb-2 block text-[13px] font-medium text-[color:var(--slate-light)]">
          ¿Qué tipo de propiedades manejas? (selecciona todas)
        </span>
        <div className="flex flex-wrap gap-2">
          {PROPERTY_TYPES.map((t) => {
            const active = data.propertyTypes.includes(t);
            return (
              <button
                key={t}
                type="button"
                onClick={() =>
                  update({
                    propertyTypes: active
                      ? data.propertyTypes.filter((x) => x !== t)
                      : [...data.propertyTypes, t],
                  })
                }
                className="rounded-[8px] border px-4 py-2.5 text-[13px] font-medium transition-all"
                style={{
                  background: active ? "rgba(30,95,255,0.15)" : "rgba(30,95,255,0.04)",
                  borderColor: active ? "var(--electric)" : "var(--steel-light)",
                  color: active ? "var(--electric)" : "var(--slate-light)",
                }}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[13px] font-medium text-[color:var(--slate-light)]">
            ¿Cuántos leads recibes al mes?
          </span>
          <span
            className="rounded-full px-3 py-1 text-[13px] font-bold tabular-nums"
            style={{
              background: "rgba(30,95,255,0.15)",
              color: "var(--electric)",
            }}
          >
            {data.monthlyLeads}
          </span>
        </div>
        <input
          type="range"
          min={10}
          max={500}
          step={5}
          value={data.monthlyLeads}
          onChange={(e) => update({ monthlyLeads: Number(e.target.value) })}
          className="w-full accent-[color:var(--electric)]"
        />
        <p className="mt-3 text-[13px] text-[color:var(--success)]">{leadHint}</p>
      </div>
    </div>
  );
}
