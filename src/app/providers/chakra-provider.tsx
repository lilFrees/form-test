import type { ReactNode } from "react";
import {
  ChakraProvider as ChakraUIProvider,
  createSystem,
  defaultConfig,
} from "@chakra-ui/react";

interface ChakraProviderProps {
  children: ReactNode;
}

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      radii: {
        none: { value: "0px" },
        sm: { value: "10px" },
        md: { value: "16px" },
        lg: { value: "20px" },
        xl: { value: "24px" },
        full: { value: "9999px" },
      },
    },
  },
});

export default function ChakraProvider({ children }: ChakraProviderProps) {
  return <ChakraUIProvider value={system}>{children}</ChakraUIProvider>;
}
