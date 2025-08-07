"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? quantity - 1 : prev));
  };

  return (
    <div className="space-y4">
      <h3>Quantidade</h3>
      <div className="flex w-[100px] items-center justify-between rounded-lg border">
        <Button
          size="icon"
          variant="ghost"
          onClick={handleDecrease}
          disabled={quantity === 1}
        >
          <MinusIcon />
        </Button>
        <p>{quantity}</p>
        <Button size="icon" variant="ghost" onClick={handleIncrease}>
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
};

export default QuantitySelector;
