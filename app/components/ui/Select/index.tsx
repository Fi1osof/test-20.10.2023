import { HTMLAttributes } from "react";

export type SelectItem = {
  value: string;
  title: string;
};

export const Select: React.FC<
  HTMLAttributes<HTMLSelectElement> & {
    name: string;
    value: string;
    items: SelectItem[];
  }
> = ({ items, ...other }) => {
  return (
    <>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...other}
      >
        {items.map((n) => {
          return (
            <option
              key={n.value}
              value={n.value || ""}
            >
              {n.title}
            </option>
          );
        })}
      </select>
    </>
  );
};
