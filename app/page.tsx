"use client";

import { NextUIProvider } from "@nextui-org/react";
import { FormContextProvider } from "@/context/FormContext";
import HomePage from "@/components/HomePage";

export default function Home() {
  return (
    <FormContextProvider>
      <NextUIProvider>
        <main className="flex min-h-screen items-center justify-around px-12">
          <HomePage />
        </main>
      </NextUIProvider>
    </FormContextProvider>
  );
}
