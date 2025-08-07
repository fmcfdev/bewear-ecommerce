import Image from "next/image";
import Link from "next/link";

import { productVariantTable } from "@/db/schema";

interface ProductDetailsSelectorProps {
  selectedVariantSlug: string;
  variants: (typeof productVariantTable.$inferSelect)[];
}

const ProductDetailsSelector = ({
  selectedVariantSlug,
  variants,
}: ProductDetailsSelectorProps) => {
  return (
    <>
      <div className="flex items-center gap-4">
        {variants.map((variant) => (
          <Link
            href={`/pd/${variant.slug}`}
            key={variant.id}
            className={`rounded-xl border-2 ${
              selectedVariantSlug === variant.slug
                ? "border-primary"
                : "border-transparent"
            } `}
          >
            <Image
              width={68}
              height={68}
              src={variant.imageUrl}
              alt={variant.name}
              className="rounded-xl"
            />
          </Link>
        ))}
      </div>
    </>
  );
};

export default ProductDetailsSelector;
