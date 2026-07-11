import { useLocation } from "react-router-dom";
import { useEffect } from "react";
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
    <div className="min-h-screen flex items-center justify-center bg-background relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/[0.02] rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/[0.02] rounded-full blur-[120px]" />
      </div>
      
      <div className="text-center relative z-10">
        <h1 className="text-6xl font-bold mb-4 text-white">
          404
        </h1>
        <p className="text-xl text-white/50 mb-6">Oops! Page not found</p>
        <a href="/">
          <Button variant="outline" className="premium-button">
            Return to Home
          </Button>
        </a>
      </div>
    </div>
  );
};

export default NotFound;
