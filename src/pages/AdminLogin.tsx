import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TerminalWindow } from "@/components/TerminalWindow";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, User, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import StarBorder from "@/components/StarBorder";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (username === "aryandw" && password === "Aryan@2010") {
        sessionStorage.setItem("admin-auth", "true");
        navigate("/admin/dashboard");
      } else {
        setError("Invalid credentials. Access denied.");
      }
      setLoading(false);
    }, 800);
  };

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
                  <h1 className="text-2xl font-bold text-white font-code">Admin Access</h1>
                  <p className="text-white/40 text-sm">Enter your credentials to access the dashboard</p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={2}>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-white/70 font-mono text-sm">
                      Username
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <Input
                        id="username"
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                        className="bg-white/5 border-white/10 text-white pl-10 focus:border-white/30 focus:ring-2 focus:ring-white/10 font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white/70 font-mono text-sm">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <Input
                        id="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        className="bg-white/5 border-white/10 text-white pl-10 focus:border-white/30 focus:ring-2 focus:ring-white/10 font-mono"
                      />
                    </div>
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
                        Authenticating...
                      </span>
                    ) : (
                      'Access Dashboard'
                    )}
                  </StarBorder>
                </form>
              </AnimatedSection>

              <AnimatedSection delay={3}>
                <div className="text-center">
                  <p className="text-white/20 text-xs font-mono">
                    Protected area. Unauthorized access is prohibited.
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
