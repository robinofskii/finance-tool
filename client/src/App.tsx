import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  QueryClientProvider,
} from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';
import Index from "./pages/Index.tsx";

const queryClient = new QueryClient()

function App() {
  return (
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
