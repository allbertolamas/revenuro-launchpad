import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Check, AlertTriangle, Link as LinkIcon } from "lucide-react";
import { Field } from "./Field";
import type { WizardData } from "./types";

export function Step4Inventory({
  data,
  update,
}: {
  data: WizardData;
  update: (patch: Partial<WizardData>) => void;
}) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const simulateUpload = () => {
    setUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setUploading(false);
          update({ inventoryMethod: "file", inventoryCount: 47 });
          return 100;
        }
        return p + 8;
      });
    }, 120);
  };

  return (
    <div className="space-y-5">
      {/* OPCIÓN A: ARCHIVO */}
      <div>
        <p className="mb-2 text-[12px] font-bold uppercase tracking-wider text-[color:var(--electric)]">
          Recomendado
        </p>
        <div
          className="rounded-[16px] p-10 text-center transition-all"
          style={{
            background: "rgba(30,95,255,0.04)",
            border: "2px dashed rgba(30,95,255,0.2)",
          }}
        >
          <AnimatePresence mode="wait">
            {data.inventoryMethod === "file" && data.inventoryCount > 0 ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--success)]/15">
                  <Check size={24} className="text-[color:var(--success)]" />
                </div>
                <p className="mt-3 text-[16px] font-semibold text-[color:var(--success)]">
                  ✓ {data.inventoryCount} propiedades cargadas correctamente
                </p>
                <button
                  type="button"
                  onClick={() => update({ inventoryCount: 0, inventoryMethod: null })}
                  className="mt-3 text-[13px] font-medium text-[color:var(--electric)] hover:underline"
                >
                  Subir otro archivo
                </button>
              </motion.div>
            ) : uploading ? (
              <motion.div key="up" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p className="text-[14px] text-[color:var(--slate-light)]">
                  Analizando tu inventario...
                </p>
                <div
                  className="mx-auto mt-3 h-2 w-full max-w-[300px] overflow-hidden rounded-full"
                  style={{ background: "var(--steel)" }}
                >
                  <div
                    className="h-full transition-all"
                    style={{
                      width: `${uploadProgress}%`,
                      background: "var(--electric)",
                    }}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Upload
                  size={36}
                  className="mx-auto text-[color:var(--electric)]"
                />
                <p className="mt-3 text-[16px] font-semibold text-[color:var(--platinum)]">
                  Arrastra tu archivo de propiedades aquí
                </p>
                <p className="mt-1 text-[13px] text-[color:var(--slate)]">
                  Excel (.xlsx), CSV, o exportación de Tokko/WebProp
                </p>
                <button
                  type="button"
                  onClick={simulateUpload}
                  className="mt-4 rounded-[10px] px-5 py-2.5 text-[13px] font-semibold text-white transition-transform hover:scale-[1.02]"
                  style={{ background: "var(--electric)" }}
                >
                  Seleccionar archivo
                </button>
                <p className="mt-3 text-[12px]">
                  <a href="#" className="font-medium text-[color:var(--electric)]">
                    Descargar plantilla →
                  </a>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* OPCIÓN B: URL */}
      <div
        className="rounded-[16px] p-5 sm:p-6"
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <div className="mb-3 flex items-center gap-2">
          <LinkIcon size={18} className="text-[color:var(--electric)]" />
          <h3 className="text-[15px] font-semibold text-[color:var(--platinum)]">
            Importar desde un portal
          </h3>
        </div>
        <Field
          label="URL de tu perfil en Inmuebles24, Lamudi, etc."
          placeholder="https://www.inmuebles24.com/..."
          value={data.portalUrl}
          onChange={(e) =>
            update({ portalUrl: e.target.value, inventoryMethod: "url" })
          }
        />
      </div>

      {/* OPCIÓN C: DESPUÉS */}
      <div className="text-center">
        <button
          type="button"
          onClick={() => update({ inventoryMethod: "later", inventoryCount: 0 })}
          className="text-[13px] font-medium text-[color:var(--slate)] underline-offset-4 hover:text-[color:var(--platinum)] hover:underline"
        >
          Continuar sin inventario por ahora
        </button>
        {data.inventoryMethod === "later" && (
          <div
            className="mx-auto mt-3 flex max-w-[420px] items-start gap-2 rounded-[10px] p-3 text-left"
            style={{
              background: "rgba(255,176,32,0.06)",
              border: "1px solid rgba(255,176,32,0.15)",
            }}
          >
            <AlertTriangle
              size={16}
              className="mt-0.5 flex-shrink-0 text-[color:var(--amber)]"
            />
            <p className="text-[12px] text-[color:var(--slate-light)]">
              Sin inventario, el sistema responde preguntas generales pero no sobre
              propiedades específicas. Puedes agregarlo después.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
