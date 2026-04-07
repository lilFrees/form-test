import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ChakraProvider from "./app/providers/chakra-provider.tsx";
import QueryProvider from "./app/providers/query-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider>
      <QueryProvider>
        <App />
      </QueryProvider>
    </ChakraProvider>
  </StrictMode>,
);
