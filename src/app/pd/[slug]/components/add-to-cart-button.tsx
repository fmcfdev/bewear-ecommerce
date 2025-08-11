"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

import { addProductToCart } from "@/actions/add-cart-product";
import { Button } from "@/components/ui/button";

interface AddToCartButtonProps {
  productVariantId: string;
  quantity: number;
}

const AddToCartButton = ({
  productVariantId,
  quantity,
}: AddToCartButtonProps) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["addProductToCart", productVariantId, quantity],
    mutationFn: () =>
      addProductToCart({
        productVariantId,
        quantity,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Produto adicionado!", {
        duration: 1500,
      });
    },
    onError: (error) => {
      if (error?.message.toLocaleUpperCase() === "UNAUTHORIZED") {
        toast.error("Entre no sistema para adicionar produtos no carrinho!");
      }
    },
  });
  return (
    <Button
      className="rounded-full"
      size={"lg"}
      variant={"outline"}
      disabled={isPending}
      onClick={() => mutate()}
    >
      {isPending && <Loader2Icon className="animate-spin" />}
      Adicionar à sacola
    </Button>
  );
};

export default AddToCartButton;
