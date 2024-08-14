import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export enum TypographyVariantEnums {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
  H5 = "h5",
  H6 = "h6",
  INHERIT = "p"
}

export interface TypographyProps {
  children: ReactNode;
  variant?: TypographyVariantEnums;
  className?: string;
}

const VariantStyles = {
  [TypographyVariantEnums.H1]: "text-2xl font-bold",
  [TypographyVariantEnums.H2]: "text-xl font-medium",
  [TypographyVariantEnums.H3]: "text-lg font-bold",
  [TypographyVariantEnums.H4]: "text-lg font-semibold",
  [TypographyVariantEnums.H5]: "text-base",
  [TypographyVariantEnums.H6]: "text-sm font-semibold",
  [TypographyVariantEnums.INHERIT]: "text-base font-normal",
}

const Typography = ({ children, variant = TypographyVariantEnums.INHERIT, className = "" }: TypographyProps) => {
  return (
    <>
      <p className={cn(VariantStyles[variant], className)}>
        {children}
      </p>
    </>
  )
}

export default Typography;
