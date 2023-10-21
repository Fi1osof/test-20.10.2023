import { HTMLAttributes } from "react";

export const Button: React.FC<
  React.PropsWithChildren<HTMLAttributes<HTMLButtonElement>>
> = ({ children, ...other }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      {...other}
    >
      {children}
    </button>
  );
};
