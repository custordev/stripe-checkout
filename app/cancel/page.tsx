import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mx-auto mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <line x1="3" y1="3" x2="21" y2="21" stroke="red" stroke-width="3" />
            <line x1="3" y1="21" x2="21" y2="3" stroke="red" stroke-width="3" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-red-500 mb-2">
          Your Order Was Cancelled
        </h2>
        <p className="text-gray-700 mb-4">Please Try Again.</p>
        <Link href="/" className="px-4 py-2 bg-red-500 text-white rounded-md">
          Back To shop
        </Link>
      </div>
    </div>
  );
}
