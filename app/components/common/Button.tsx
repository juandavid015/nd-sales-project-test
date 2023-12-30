/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */

'use client';

interface ButtonProps {
  type: 'button' | 'submit'
  label: string
  [key: string]: any
}
export default function Button({
  children, type, label, ...rest
}: React.PropsWithChildren & ButtonProps) {
  return (
    <button
      aria-label={label}
      type={type === 'submit' ? 'submit' : 'button'}
      className="px-8 py-3 bg-main-color fill-white text-white
      flex items-center justify-center mt-auto w-fit
      transition-all hover:scale-[0.95] font-medium"
      {...rest}
    >
      {children}
    </button>
  );
}
