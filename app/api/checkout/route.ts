import { CartItem } from "@/store/slices/cartSlice";
import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Fetching the active stripe Products Function
async function getActiveStripeProducts() {
  const products = await stripe.products.list();
  const activeProducts = products.data.filter(
    (item: any) => item.active === true
  );
  return activeProducts; // Return the filtered active products
}

// Getting the Cart Products function
export async function POST(request: NextRequest) {
  try {
    // Getting the Cart Products in the Api end point
    const { products }: { products: CartItem[] } = await request.json();
    const checkoutProducts: CartItem[] = products;

    let activeStripeProducts = await getActiveStripeProducts();

    // Create the item in the stripe dashboard if it doesn't exist
    for (const product of checkoutProducts) {
      const stripeProduct = activeStripeProducts.find(
        (item: any) => item.name.toLowerCase() === product.name.toLowerCase()
      );
      console.log(stripeProduct);
      if (!stripeProduct) {
        // Create this product
        try {
          const newStripePdt = await stripe.products.create({
            name: product.name,
            images: [product.image],
            default_price_data: {
              unit_amount: Math.round(product.price * 100),
              currency: "usd",
            },
          });
          // console.log(newStripePdt);
        } catch (error) {
          console.log(`Failed to create Product: ${error}`);
        }
      }
    }
    activeStripeProducts = await getActiveStripeProducts();
    let stripeCheckoutProducts: any = [];
    // Add product to stripe checkout products
    for (const product of checkoutProducts) {
      const extistingStripeProduct = activeStripeProducts.find(
        (item: any) => item.name.toLowerCase() === product.name.toLowerCase()
      );
      console.log(extistingStripeProduct);
      if (extistingStripeProduct) {
        // Add this product to the stripecheck out products
        stripeCheckoutProducts.push({
          price: extistingStripeProduct.default_price,
          quantity: product.qty,
        });
      }
    }
    // create a session
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const session = await stripe.checkout.sessions.create({
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/cancel`,
      line_items: stripeCheckoutProducts,
      mode: "payment",
    });

    return NextResponse.json({ url: session?.url });
  } catch (error) {
    console.log(error);
  }
}
