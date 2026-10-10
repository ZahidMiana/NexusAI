import { forwardRef, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const CONTROL_CLASSES =
  "w-full rounded-lg border bg-black/50 px-3.5 py-2.5 font-mono text-sm text-white placeholder:text-zinc-500 transition-[border-color,box-shadow] duration-200 outline-none focus:border-cyber-cyan focus:shadow-[0_0_0_3px_rgba(0,240,255,0.15)]";

function controlClasses(invalid: boolean, extra?: string): string {
  return cn(CONTROL_CLASSES, invalid ? "border-red-400/80" : "border-zinc-700 hover:border-zinc-500", extra);
}

interface FieldShellProps {
  id: string;
  label: string;
  error?: string;
  hint?: ReactNode;
  optional?: boolean;
  children: ReactNode;
}

/** Label + control + hint/error, with ids wired for screen readers. */
export function FieldShell({ id, label, error, hint, optional, children }: FieldShellProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="flex items-baseline justify-between font-tech text-xs tracking-[0.12em] text-zinc-300 uppercase">
        <span>
          {label}
          {optional && <span className="ml-1.5 normal-case tracking-normal text-zinc-400">(optional)</span>}
        </span>
        {hint && <span className="font-mono normal-case tracking-normal text-zinc-400">{hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="font-mono text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

function describedBy(id: string, error?: string): string | undefined {
  return error ? `${id}-error` : undefined;
}

type ShellProps = Omit<FieldShellProps, "children" | "id"> & { id: string };

export const TextField = forwardRef<HTMLInputElement, ShellProps & InputHTMLAttributes<HTMLInputElement>>(function TextField(
  { id, label, error, hint, optional, className, ...input },
  ref,
) {
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} optional={optional}>
      <input ref={ref} id={id} aria-invalid={Boolean(error)} aria-describedby={describedBy(id, error)} className={controlClasses(Boolean(error), className)} {...input} />
    </FieldShell>
  );
});

export const SelectField = forwardRef<HTMLSelectElement, ShellProps & SelectHTMLAttributes<HTMLSelectElement> & { options: readonly { value: string; label: string }[]; placeholder: string }>(
  function SelectField({ id, label, error, hint, optional, className, options, placeholder, ...select }, ref) {
    return (
      <FieldShell id={id} label={label} error={error} hint={hint} optional={optional}>
        <select
          ref={ref}
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy(id, error)}
          className={controlClasses(Boolean(error), cn("cursor-pointer appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2300F0FF%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:16px] bg-[right_0.75rem_center] bg-no-repeat pr-10", className))}
          {...select}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-panel">
              {option.label}
            </option>
          ))}
        </select>
      </FieldShell>
    );
  },
);

export const TextAreaField = forwardRef<HTMLTextAreaElement, ShellProps & TextareaHTMLAttributes<HTMLTextAreaElement>>(function TextAreaField(
  { id, label, error, hint, optional, className, ...textarea },
  ref,
) {
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} optional={optional}>
      <textarea ref={ref} id={id} aria-invalid={Boolean(error)} aria-describedby={describedBy(id, error)} className={controlClasses(Boolean(error), cn("min-h-32 resize-y", className))} {...textarea} />
    </FieldShell>
  );
});
