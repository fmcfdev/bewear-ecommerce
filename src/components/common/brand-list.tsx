import Image from "next/image";

interface BrandListProp {
  title: string;
  brands: string[];
}

const BrandList = ({ title, brands }: BrandListProp) => {
  return (
    <div className="mb-15 space-y-6">
      <h3 className="px-5 font-semibold">{title}</h3>
      <div className="flex w-full gap-6 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
        {brands.map((brand, indice) => (
          <Image
            key={indice}
            src={`./brands/${brand}.svg`}
            alt={brand}
            width={92}
            height={107}
            style={{ height: "auto", width: "auto" }}
          />
        ))}
      </div>
    </div>
  );
};

export default BrandList;
