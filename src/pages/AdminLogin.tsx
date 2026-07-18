import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TerminalWindow } from "@/components/TerminalWindow";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import StarBorder from "@/components/StarBorder";
import { useAdminSettings } from "@/context/AdminSettings";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSetupMode, setIsSetupMode] = useState(false);
  const [checkingSetup, setCheckingSetup] = useState(true);
  const navigate = useNavigate();
  const { adminLogin, adminSetup, isAdmin } = useAdminSettings();

  useEffect(() => {
    if (isAdmin) navigate("/admin/dashboard");
  }, [isAdmin, navigate]);

  useEffect(() => {
    const checkSetup = async () => {
      try {
        const res = await fetch("/api/settings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "login", password: "__check__" }),
        });
        const data = await res.json();
        if (data.error === "No password set. Use setup first.") {
          setIsSetupMode(true);
        }
      } catch {
        // If API is unreachable, default to setup mode
        setIsSetupMode(true);
      }
      setCheckingSetup(false);
    };
    checkSetup();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    await new Promise((r) => setTimeout(r, 500));

    const result = isSetupMode
      ? await adminSetup(password)
      : await adminLogin(password);

    if (result.success) {
      navigate("/admin/dashboard");
    } else {
      setError(result.error || "Authentication failed.");
    }
    setLoading(false);
  };

  if (checkingSetup) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white/40 font-mono text-sm">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/[0.02] rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/[0.02] rounded-full blur-[120px] animate-float-delayed" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" className="premium-button text-white/70 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Button>
          </Link>
        </div>

        <AnimatedSection animation="slide-in-up">
          <TerminalWindow title="admin@login:~#">
            <div className="space-y-6">
              <AnimatedSection delay={1}>
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center">
                    <Lock className="w-8 h-8 text-white/60" />
                  </div>
                  <h1 className="text-2xl font-bold text-white font-code">
                    {isSetupMode ? "Setup Admin Password" : "Admin Access"}
                  </h1>
                  <p className="text-white/40 text-sm">
                    {isSetupMode
                      ? "Set a password to protect your admin dashboard. This password is stored securely on Vercel's server."
                      : "Enter your password to access the dashboard"}
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={2}>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white/70 font-mono text-sm">
                      {isSetupMode ? "Create Password" : "Password"}
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <Input
                        id="password"
                        type="password"
                        required
                        minLength={4}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={isSetupMode ? "Choose a strong password" : "Enter password"}
                        className="bg-white/5 border-white/10 text-white pl-10 focus:border-white/30 focus:ring-2 focus:ring-white/10 font-mono"
                      />
                    </div>
                    {isSetupMode && (
                      <p className="text-white/20 text-xs font-mono">
                        Minimum 4 characters. This password is stored on the server - you'll need it to edit from any device.
                      </p>
                    )}
                  </div>

                  {error && (
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-white/70 text-sm font-mono">
                      {error}
                    </div>
                  )}

                  <StarBorder
                    as="button"
                    type="submit"
                    color="white"
                    speed="4s"
                    thickness={1}
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {isSetupMode ? "Setting up..." : "Authenticating..."}
                      </span>
                    ) : isSetupMode ? (
                      "Create Password & Continue"
                    ) : (
                      "Access Dashboard"
                    )}
                  </StarBorder>
                </form>
              </AnimatedSection>

              <AnimatedSection delay={3}>
                <div className="text-center">
                  <p className="text-white/20 text-xs font-mono">
                    {isSetupMode
                      ? "Settings are stored on Vercel's server and sync across all your devices."
                      : "Settings are stored server-side. Changes sync across all your devices."}
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </TerminalWindow>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default AdminLogin;
