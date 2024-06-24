"use client";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { removeProductFromCart } from "@/store/slices/cartSlice";
import {
  Headset,
  HelpCircle,
  LogOut,
  Mail,
  MessageSquareMore,
  Minus,
  PhoneCall,
  Plus,
  Presentation,
  Settings,
  ShoppingCart,
  Trash,
  User,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CartMenu() {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  console.log(cartItems);
  const dispatch = useAppDispatch();
  function handleRemove(id: number) {
    dispatch(removeProductFromCart(id));
  }
  const totalSum = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-transparent rounded-lg ">
          <ShoppingCart className="text-lime-700 dark:text-lime-500" />
          <span className="sr-only">Cart</span>
          <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500  rounded-full -top-0 end-6 dark:border-gray-900">
            {cartItems.length.toString().padStart(2, "0")}
          </div>
        </button>
      </SheetTrigger>
      {cartItems && cartItems.length > 0 ? (
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <h2 className="scroll-m-20 text-xl font-semibold tracking-tight first:mt-0 border-b pb-3">
              Shopping Cart ({cartItems.length})
            </h2>
          </SheetHeader>
          {/* CONTENT HWRE */}
          <div className="">
            {cartItems.map((item, i) => {
              return (
                <div
                  key={i}
                  className="flex justify-between gap-4 py-3 border-b "
                >
                  <Image
                    width={200}
                    height={200}
                    alt="cart image"
                    src={item.image}
                    className="w-16 h-16 rounded-lg"
                  />
                  <div className="space-y-2">
                    <h2 className="text-xs font-medium">{item.name}</h2>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-xs flex items-center text-red-500"
                    >
                      <Trash className="w-4 h-4 mr-1" />
                      <span>Remove</span>
                    </button>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-sx">${item.price}</h2>
                    <div className="flex items-center space-x-3">
                      <button className="border shadow rounded flex items-center justify-center w-10 h-7">
                        <Minus className="w-4 h-4" />
                      </button>

                      <p>1</p>
                      <button className="border shadow rounded flex items-center justify-center w-10 h-7 bg-slate-800 text-white">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="space-y-1 py-3 border-b mb-3">
              <div className="flex items-center justify-between text-sm">
                <h2 className="font-medium">Total</h2>
                <p>${totalSum.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant={"outline"} type="submit">
                Continue Shopping
              </Button>
            </SheetClose>
            <Button asChild>
              <Link href="/checkout">
                <span>Proceed to Checkout</span>
              </Link>
            </Button>
          </SheetFooter>
        </SheetContent>
      ) : (
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <h2 className="scroll-m-20 text-xl font-semibold tracking-tight first:mt-0 border-b pb-3">
              Empty Cart
            </h2>
          </SheetHeader>
          {/* CONTENT HWRE */}
          <div className="min-h-80  flex-col space-y-4 flex items-center justify-center">
            <Image
              src="/empty-cart.png"
              width={300}
              height={300}
              alt="empty cart"
              className="w-36 h-36 object-cover"
            />
            <h2>Your Cart Empty</h2>
            <SheetClose asChild>
              <Button asChild size={"sm"} variant={"outline"} type="submit">
                <Link href="/">Continue Shopping to add Items</Link>
              </Button>
            </SheetClose>
          </div>
        </SheetContent>
      )}
    </Sheet>
  );
}
