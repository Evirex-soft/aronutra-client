// "use client";

// import React, { useRef, useState } from "react";
// import { FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";
// import { IProduct } from "@/types/product";
// import Continue from "./Continue";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import { useCart } from "@/app/contexts/CartContext";

// export default function AddToCartSection({ product }: { product: IProduct }) {
//   const { addToCart } = useCart();
//   const [quantity, setQuantity] = useState(1);
//   const router = useRouter();

//   const holdInterval = useRef<NodeJS.Timeout | null>(null);


//   // For holding press on + / -
//   const handleHold = (action: "increase" | "decrease") => {
//     if (action === "increase") {
//       setQuantity((prev) => {
//         if (product.stockQuantity && prev >= product.stockQuantity) {
//           toast.error(`Only ${product.stockQuantity} available in stock!`);
//           return prev; // stop here
//         }
//         return prev + 1;
//       });
//     } else {
//       setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
//     }

//     holdInterval.current = setInterval(() => {
//       setQuantity((prev) => {
//         if (action === "increase") {
//           if (product.stockQuantity && prev >= product.stockQuantity) {
//             toast.error(`Only ${product.stockQuantity} available in stock!`);
//             return prev;
//           }
//           return prev + 1;
//         } else {
//           return prev > 1 ? prev - 1 : 1;
//         }
//       });
//     }, 150);
//   };


//   const stopHold = () => {
//     if (holdInterval.current) {
//       clearInterval(holdInterval.current);
//       holdInterval.current = null;
//     }
//   };

//   const handleAddToCart = () => {
//     if (!product.stockQuantity || product.stockQuantity <= 0) {
//       toast.error(`${product.name} is out of stock!`);
//       return;
//     }

//     addToCart(product, quantity);

//     // store only the selected checkout item separately
//     const cartItem = {
//       id: product._id,
//       name: product.name,
//       image: product.images[0],
//       price: product.sellingPrice,
//       mrp: product.mrp,
//       description: product.shortDescription,
//       quantity,
//       total: product.sellingPrice * quantity,
//       stockQuantity: product.stockQuantity,
//     };

//     localStorage.setItem("checkoutItem", JSON.stringify(cartItem));

//     router.push("/checkout");
//   };

//   return (
//     <div className="mt-8 space-y-6">
//       {/* Quantity Selector */}
//       <div className="flex items-center gap-4">
//         <p className="font-semibold text-gray-700">Quantity:</p>
//         <div className="flex items-center border border-gray-200 rounded-full">
//           <button
//             onMouseDown={() => handleHold("decrease")}
//             onMouseUp={stopHold}
//             onMouseLeave={stopHold}
//             className="p-3 text-gray-600 hover:text-pink-600 transition-colors"
//             aria-label="Decrease quantity"
//           >
//             <FaMinus />
//           </button>
//           <span className="px-4 text-lg font-bold text-gray-800 w-12 text-center">
//             {quantity}
//           </span>
//           <button
//             onMouseDown={() => handleHold("increase")}
//             onMouseUp={stopHold}
//             onMouseLeave={stopHold}
//             disabled={quantity >= (product.stockQuantity || 0)}
//             className="p-3 text-gray-600 hover:text-pink-600 transition-colors"
//             aria-label="Increase quantity"
//           >
//             <FaPlus />
//           </button>
//         </div>

//         {/* Stock Display */}
//         <span className="text-sm font-bold text-red-600 ml-2">
//           {product.stockQuantity > 0
//             ? `${product.stockQuantity} in stock`
//             : "Out of stock"}
//         </span>
//       </div>

//       {/* Buttons Row */}
//       <div className="flex gap-4">
//         <button
//           onClick={handleAddToCart}
//           disabled={product.stockQuantity <= 0}
//           className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-3 rounded-full font-semibold text-sm sm:text-base hover:from-pink-600 hover:to-orange-600 transform transition-all duration-300 hover:scale-105 active:scale-95 shadow-md"
//         >
//           <FaShoppingCart className="w-4 h-4" />
//           {product.stockQuantity > 0 ? "Buy Now" : "Out of Stock"}
//         </button>

//         <Continue />
//       </div>
//     </div>
//   );
// }
