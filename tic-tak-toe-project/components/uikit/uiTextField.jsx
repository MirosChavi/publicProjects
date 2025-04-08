import clsx from "clsx";

/**
 *
 * @param {{
 * label?: string,
 * className: string,
 * helperText?: string,
 * errorText?: string,
 * } & import('react').HTMLAttributes<HTMLInputElement>} props
 * @returns
 */

export function UiTextField({
  label,
  required,
  helperText,
  errorText,
  className,
  ...inputProps
}) {
  return (
    <div className={className}>
      <div>
        {label && (
          <label
            for="example2"
            className={clsx(
              required && "after:text-orange-600 after:content-[" * "]",
              "mb-1 block text-sm font-medium text-slate-900 after:ml-0.5",
            )}
          >
            {label}
          </label>
        )}

        <input
          type="email"
          id="example2"
          required={required}
          className={clsx([
            `
            outline-0 border block w-full rounded-md shadow-sm  
            focus:ring-opacity-50 disabled:cursor-not-allowed 
            disabled:bg-gray-50 disabled:text-gray-500
            text-sm leading-tight py-2 px-2
            `,
            errorText
              ? "focus:border-orange-600 focus:ring focus:ring-orange-600/20 border-orange-600"
              : "focus:border-teal-600 focus:ring focus:ring-teal-600/20 border-slate-200",
          ])}
          placeholder="you@email.com"
          {...inputProps}
        />
        {(helperText || errorText) && (
          <p
            className={clsx(
              "mt-1 text-sm",
              errorText ? "text-orange-600" : "text-slate-400",
            )}
          >
            {errorText ?? helperText}
          </p>
        )}
      </div>
    </div>
  );
}
