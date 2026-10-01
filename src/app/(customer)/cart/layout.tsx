import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description:
    "Review and manage the items in your shopping cart before proceeding to checkout on Baskify.",
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
