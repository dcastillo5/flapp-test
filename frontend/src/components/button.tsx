type ButtonProps = {
  label: string;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  type?: "button" | "submit";
};

const Loading = () => (
  <svg
    className="size-5 animate-spin text-neutral-400"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

export const Button = ({ label, disabled, isLoading, onClick, children, type }: ButtonProps) => {
  return (
    <button
      type={type || "button"}
      className="
      disabled:text-neutral-400 disabled:shadow-none disabled:pointer-events-none disabled:bg-zinc/8
      inline-flex items-center gap-x-2 rounded-md bg-black/10 px-3.5 py-2.5 text-sm font-semibold text-neutral-700 shadow-md hover:bg-black/20
      cursor-pointer
      w-fit"
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? <Loading /> : children}
      {label}
    </button>
  );
};
