
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-6">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-suprbrain-light p-4">
            <BrainCircuit className="h-12 w-12 text-suprbrain-primary" />
          </div>
        </div>
        <h1 className="text-6xl font-bold mb-4 gradient-text">404</h1>
        <p className="text-xl text-gray-600 mb-8">
          Oops! This page doesn't exist in our universe
        </p>
        <Button asChild size="lg">
          <a href="/">Return to Home</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
