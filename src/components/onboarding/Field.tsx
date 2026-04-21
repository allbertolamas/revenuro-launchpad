import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export function Field(
  props: InputHTMLAttributes<HTMLInputElement> & { label: string; helper?: string }
) {
  const { label, helper, ...rest } = props;
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-[color:var(--slate-light)]">
        {label}
      </span>
      <input
        {...rest}
        className="w-full rounded-[10px] border px-4 py-3.5 text-[15px] text-[color:var(--platinum)] outline-none transition-all placeholder:text-[color:var(--slate)] placeholder:opacity-60 focus:border-[color:var(--electric)]"
        style={{
          background: "rgba(8,14,29,0.6)",
          borderColor: "var(--steel-light)",
        }}
      />
      {helper && (
        <span className="mt-1.5 block text-[12px] text-[color:var(--slate)]">{helper}</span>
      )}
    </label>
  );
}

export function TextField(
  props: TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }
) {
  const { label, ...rest } = props;
  return (
    <label className="block">
      {label && (
        <span className="mb-1.5 block text-[13px] font-medium text-[color:var(--slate-light)]">
          {label}
        </span>
      )}
      <textarea
        {...rest}
        className="w-full resize-y rounded-[10px] border px-4 py-3.5 text-[15px] text-[color:var(--platinum)] outline-none transition-all placeholder:text-[color:var(--slate)] placeholder:opacity-60 focus:border-[color:var(--electric)]"
        style={{
          background: "rgba(8,14,29,0.6)",
          borderColor: "var(--steel-light)",
          minHeight: 120,
        }}
      />
    </label>
  );
}
