import { createRoot } from "react-dom/client";
import App from "./App.tsx";

const app = () => {
  return createRoot(document.getElementById("root")!).render(<App />);
};

app();
