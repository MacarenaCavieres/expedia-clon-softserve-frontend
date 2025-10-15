import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
};
export default function Errors({ children }: Props) {
    return <p className="text-red-600 text-sm font-medium">{children}</p>;
}
