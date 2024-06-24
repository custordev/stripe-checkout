"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { IProduct, type Product } from "@/types/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import {
  addProductToCart,
  removeProductFromCart,
} from "@/store/slices/cartSlice";
import toast from "react-hot-toast";

export default function Product({ product }: { product: IProduct }) {
  const [existing, setExisting] = useState(false);
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const dispatch = useAppDispatch();
  function handleAdd() {
    const newCartItem = {
      id: product.id,
      name: product.title,
      price: product.price,
      qty: 1,
      image: product.thumbnail,
    };
    dispatch(addProductToCart(newCartItem));
  }
  const handleRemove = (productId: number) => {
    dispatch(removeProductFromCart(productId));
  };
  useEffect(() => {
    // Check if the product already exists in the cart
    const isExisting = cartItems.some((item) => item.id === product.id);
    setExisting(isExisting);
  }, [cartItems, product.id]);
  return (
    <div className="border p-2 rounded-md">
      <Image
        width={200}
        height={200}
        alt=""
        src={product.thumbnail ?? "/placeholder.svg"}
        className="w-full object-cover h-28 rounded-md mr-2"
      />
      <h2 className="font-semibold line-clamp-1">{product.title}</h2>
      <p className="line-clamp-2 text-xs">{product.description}</p>
      <div className="flex items-center justify-between py-2">
        <p className="text-blue-600 text-sm font-medium">${product.price}</p>
        <Button variant={"outline"} size={"sm"} className="">
          {product.stock} items
        </Button>
      </div>
      {existing ? (
        <Button
          variant={"destructive"}
          className="w-full"
          onClick={() => handleRemove(product.id)}
        >
          <Minus className="w-4 h-4 mr-2" />
          <span> Remove Item</span>
        </Button>
      ) : (
        <Button onClick={handleAdd} className="w-full" variant={"outline"}>
          <Plus className="mr-2 w-4 h-4" />
          <span>Add to Cart</span>
        </Button>
      )}
    </div>
  );
}
