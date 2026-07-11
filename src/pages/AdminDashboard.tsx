import { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAdminSettings, AnimationName, VisualEffect } from "@/context/AdminSettings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  ArrowLeft, Settings, Palette, Type, Link2, Sparkles, Image,
  Layout, Save, RotateCcw, LogOut, Plus, Trash2, Eye, Layers,
  Zap, MousePointer, Monitor, Globe, FileText, Star, Box,
  GripVertical, ChevronDown, ChevronUp
} from "lucide-react";
import StarBorder from "@/components/StarBorder";
import { animations, AnimationKey } from "@/lib/animations";
import { visualEffects, EffectType } from "@/lib/effects";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { settings, updateSettings, updateSettingsImmediate, resetSettings } = useAdminSettings();
  const [activeTab, setActiveTab] = useState("branding");
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    const auth = sessionStorage.getItem("admin-auth");
    if (!auth) navigate("/admin");
  }, [navigate]);

  const handleSave = () => {
    setSaveMessage("Settings saved successfully!");
    setTimeout(() => setSaveMessage(""), 3000);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin-auth");
    navigate("/admin");
  };

  const handleReset = () => {
    if (confirm("Reset all settings to default?")) {
      resetSettings();
      setSaveMessage("Settings reset to defaults!");
      setTimeout(() => setSaveMessage(""), 3000);
    }
  };

  const toggleAnimation = (anim: AnimationName) => {
    const current = settings.enabledAnimations;
    const updated = current.includes(anim)
      ? current.filter(a => a !== anim)
      : [...current, anim];
    updateSettingsImmediate({ enabledAnimations: updated as AnimationName[] });
  };

  const addSkill = () => {
    updateSettingsImmediate({
      skills: [...settings.skills, { name: "New Skill", category: "Other", level: 50 }]
    });
  };

  const updateSkill = (index: number, updates: Partial<typeof settings.skills[0]>) => {
    const newSkills = [...settings.skills];
    newSkills[index] = { ...newSkills[index], ...updates };
    updateSettingsImmediate({ skills: newSkills });
  };

  const removeSkill = (index: number) => {
    updateSettingsImmediate({ skills: settings.skills.filter((_, i) => i !== index) });
  };

  const addProject = () => {
    updateSettingsImmediate({
      projects: [...settings.projects, {
        name: "New Project", year: "2025", description: "Project description",
        tags: ["Tag1"], status: "development", featured: false, liveLink: "", githubLink: "", logoUrl: ""
      }]
    });
  };

  const updateProject = (index: number, updates: Partial<typeof settings.projects[0]>) => {
    const newProjects = [...settings.projects];
    newProjects[index] = { ...newProjects[index], ...updates };
    updateSettingsImmediate({ projects: newProjects });
  };

  const removeProject = (index: number) => {
    updateSettingsImmediate({ projects: settings.projects.filter((_, i) => i !== index) });
  };

  const addButton = () => {
    updateSettingsImmediate({
      buttons: [...settings.buttons, { label: "New Button", link: "#", type: "secondary" }]
    });
  };

  const updateButton = (index: number, updates: Partial<typeof settings.buttons[0]>) => {
    const newButtons = [...settings.buttons];
    newButtons[index] = { ...newButtons[index], ...updates };
    updateSettingsImmediate({ buttons: newButtons });
  };

  const removeButton = (index: number) => {
    updateSettingsImmediate({ buttons: settings.buttons.filter((_, i) => i !== index) });
  };

  const addParagraph = () => {
    updateSettingsImmediate({ aboutParagraphs: [...settings.aboutParagraphs, "New paragraph text"] });
  };

  const updateParagraph = (index: number, value: string) => {
    const newParagraphs = [...settings.aboutParagraphs];
    newParagraphs[index] = value;
    updateSettingsImmediate({ aboutParagraphs: newParagraphs });
  };

  const removeParagraph = (index: number) => {
    updateSettingsImmediate({ aboutParagraphs: settings.aboutParagraphs.filter((_, i) => i !== index) });
  };

  const InputField = ({ label, value, onChange, placeholder, type = "text" }: {
    label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
  }) => (
    <div className="space-y-2">
      <Label className="text-white/70 text-sm">{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-white/5 border-white/10 text-white focus:border-white/30 focus:ring-1 focus:ring-white/20"
      />
    </div>
  );

  const SectionCard = ({ title, icon: Icon, children }: {
    title: string; icon: React.ElementType; children: React.ReactNode;
  }) => (
    <Card className="bg-white/[0.02] border-white/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-white/90 text-base flex items-center gap-2">
          <Icon className="w-4 h-4" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );

  // Preview card for Effects tab - shows the current effect in real-time
  const EffectsPreview = () => {
    const currentEffectClass = useMemo(() => {
      return visualEffects[settings.visualEffect]?.class || '';
    }, [settings.visualEffect]);

    const currentEffectName = useMemo(() => {
      return visualEffects[settings.visualEffect]?.name || 'None';
    }, [settings.visualEffect]);

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-white/70 text-sm">Live Preview</Label>
          <Badge className="bg-white/10 text-white text-xs">{currentEffectName}</Badge>
        </div>
        <div className={`rounded-xl p-6 border border-white/10 ${currentEffectClass}`} style={{ borderRadius: `${settings.borderRadius}px` }}>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <Star className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-white/90 font-medium text-sm">Preview Card</div>
                <div className="text-white/40 text-xs">This is how your cards will look</div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="px-3 py-1.5 rounded-lg bg-white/10 text-white/70 text-xs">Tag 1</div>
              <div className="px-3 py-1.5 rounded-lg bg-white/10 text-white/70 text-xs">Tag 2</div>
            </div>
            <div className="text-white/50 text-xs">
              The effect applies to all glass-card elements across your portfolio.
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Preview card for Animations tab - shows enabled animations cycling
  const AnimationsPreview = () => {
    const [animIndex, setAnimIndex] = useState(0);
    const enabledAnims = settings.enabledAnimations;

    useEffect(() => {
      if (enabledAnims.length === 0) return;
      const interval = setInterval(() => {
        setAnimIndex(prev => (prev + 1) % enabledAnims.length);
      }, 3000);
      return () => clearInterval(interval);
    }, [enabledAnims.length]);

    const currentAnimKey = enabledAnims[animIndex];
    const currentAnimClass = currentAnimKey ? animations[currentAnimKey]?.class : '';
    const currentAnimName = currentAnimKey ? animations[currentAnimKey]?.name : 'None';

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-white/70 text-sm">Animation Preview</Label>
          <Badge className="bg-white/10 text-white text-xs">{currentAnimName}</Badge>
        </div>
        <div className="rounded-xl p-8 border border-white/10 bg-white/[0.02] flex items-center justify-center min-h-[120px]">
          <div className={`w-24 h-24 rounded-xl bg-white/10 flex items-center justify-center ${currentAnimClass}`}>
            <Sparkles className="w-8 h-8 text-white/70" />
          </div>
        </div>
        <div className="text-white/30 text-xs text-center">
          {enabledAnims.length === 0 ? 'No animations enabled' : `Cycling through ${enabledAnims.length} animation(s)`}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" size="sm" className="premium-button">
                <ArrowLeft className="w-4 h-4 mr-1" /> Portfolio
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/70 font-mono text-sm">Admin Dashboard</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {saveMessage && (
              <span className="text-green-400 text-sm font-mono animate-pulse">{saveMessage}</span>
            )}
            <StarBorder as="button" onClick={handleSave} color="white" speed="3s" thickness={1}>
              <span className="flex items-center gap-1"><Save className="w-3 h-3" /> Save</span>
            </StarBorder>
            <Button variant="outline" size="sm" onClick={handleReset} className="premium-button">
              <RotateCcw className="w-3 h-3 mr-1" /> Reset
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout} className="premium-button">
              <LogOut className="w-3 h-3 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/[0.03] border border-white/5 p-1 h-auto flex flex-wrap gap-1">
            {[
              { value: "branding", icon: Globe, label: "Branding" },
              { value: "content", icon: FileText, label: "Content" },
              { value: "buttons", icon: Star, label: "Buttons" },
              { value: "skills", icon: Zap, label: "Skills" },
              { value: "projects", icon: Box, label: "Projects" },
              { value: "animations", icon: Sparkles, label: "Animations" },
              { value: "effects", icon: Layers, label: "Effects" },
              { value: "theme", icon: Palette, label: "Theme" },
              { value: "layout", icon: Layout, label: "Layout" },
            ].map(({ value, icon: Icon, label }) => (
              <TabsTrigger key={value} value={value} className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50 gap-1.5 px-3 py-2 text-xs">
                <Icon className="w-3.5 h-3.5" /> {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* ═══ BRANDING ═══ */}
          <TabsContent value="branding" className="space-y-4">
            <SectionCard title="Site Identity" icon={Globe}>
              <InputField label="Site Name" value={settings.siteName} onChange={v => updateSettings({ siteName: v })} />
              <InputField label="Page Title" value={settings.siteTitle} onChange={v => updateSettings({ siteTitle: v })} />
              <InputField label="Meta Description" value={settings.siteDescription} onChange={v => updateSettings({ siteDescription: v })} />
              <InputField label="Canonical URL" value={settings.canonicalUrl} onChange={v => updateSettings({ canonicalUrl: v })} />
              <InputField label="Logo URL" value={settings.logo} onChange={v => updateSettings({ logo: v })} placeholder="https://..." />
              <InputField label="Favicon URL" value={settings.favicon} onChange={v => updateSettings({ favicon: v })} placeholder="https://..." />
            </SectionCard>

            <SectionCard title="Social Links" icon={Link2}>
              <InputField label="GitHub" value={settings.githubUrl} onChange={v => updateSettings({ githubUrl: v })} />
              <InputField label="LinkedIn" value={settings.linkedinUrl} onChange={v => updateSettings({ linkedinUrl: v })} />
              <InputField label="Twitter" value={settings.twitterUrl} onChange={v => updateSettings({ twitterUrl: v })} />
              <InputField label="YouTube" value={settings.youtubeUrl} onChange={v => updateSettings({ youtubeUrl: v })} />
              <InputField label="Discord Invite URL" value={settings.discordUrl} onChange={v => updateSettings({ discordUrl: v })} />
              <InputField label="Discord Username" value={settings.discordUsername} onChange={v => updateSettings({ discordUsername: v })} />
              <InputField label="Discord Popup Message" value={settings.discordMessage} onChange={v => updateSettings({ discordMessage: v })} />
              <InputField label="Email" value={settings.email} onChange={v => updateSettings({ email: v })} />
            </SectionCard>
          </TabsContent>

          {/* ═══ CONTENT ═══ */}
          <TabsContent value="content" className="space-y-4">
            <SectionCard title="Hero Section" icon={Type}>
              <InputField label="Hero Title" value={settings.heroTitle} onChange={v => updateSettings({ heroTitle: v })} />
              <div className="space-y-2">
                <Label className="text-white/70 text-sm">Tagline</Label>
                <Textarea
                  value={settings.heroTagline}
                  onChange={(e) => updateSettings({ heroTagline: e.target.value })}
                  className="bg-white/5 border-white/10 text-white min-h-[80px]"
                />
              </div>
            </SectionCard>

            <SectionCard title="About Section" icon={FileText}>
              <InputField label="Section Title" value={settings.aboutTitle} onChange={v => updateSettings({ aboutTitle: v })} />
              <InputField label="Availability Text" value={settings.aboutAvailability} onChange={v => updateSettings({ aboutAvailability: v })} />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-white/70 text-sm">Paragraphs</Label>
                  <Button variant="outline" size="sm" onClick={addParagraph} className="premium-button">
                    <Plus className="w-3 h-3 mr-1" /> Add
                  </Button>
                </div>
                {settings.aboutParagraphs.map((p, i) => (
                  <div key={i} className="flex gap-2">
                    <Textarea
                      value={p}
                      onChange={(e) => updateParagraph(i, e.target.value)}
                      className="bg-white/5 border-white/10 text-white flex-1 min-h-[60px]"
                    />
                    <Button variant="outline" size="sm" onClick={() => removeParagraph(i)} className="premium-button shrink-0">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Contact Section" icon={Link2}>
              <InputField label="Title" value={settings.contactTitle} onChange={v => updateSettings({ contactTitle: v })} />
              <InputField label="Description" value={settings.contactDescription} onChange={v => updateSettings({ contactDescription: v })} />
              <InputField label="CTA Text" value={settings.contactCta} onChange={v => updateSettings({ contactCta: v })} />
              <InputField label="Footer Text" value={settings.footerText} onChange={v => updateSettings({ footerText: v })} />
            </SectionCard>
          </TabsContent>

          {/* ═══ BUTTONS ═══ */}
          <TabsContent value="buttons" className="space-y-4">
            <SectionCard title="Hero Buttons" icon={Star}>
              <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={addButton} className="premium-button">
                  <Plus className="w-3 h-3 mr-1" /> Add Button
                </Button>
              </div>
              {settings.buttons.map((btn, i) => (
                <Card key={i} className="bg-white/[0.02] border-white/5 p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <InputField label="Label" value={btn.label} onChange={v => updateButton(i, { label: v })} />
                    <InputField label="Link" value={btn.link} onChange={v => updateButton(i, { link: v })} />
                    <div className="space-y-2">
                      <Label className="text-white/70 text-sm">Type</Label>
                      <div className="flex gap-2">
                        {(["primary", "secondary", "ghost"] as const).map(type => (
                          <Button
                            key={type}
                            variant={btn.type === type ? "default" : "outline"}
                            size="sm"
                            onClick={() => updateButton(i, { type })}
                            className={btn.type === type ? "bg-white/20 text-white" : "premium-button"}
                          >
                            {type}
                          </Button>
                        ))}
                        <Button variant="outline" size="sm" onClick={() => removeButton(i)} className="premium-button ml-auto">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </SectionCard>
          </TabsContent>

          {/* ═══ SKILLS ═══ */}
          <TabsContent value="skills" className="space-y-4">
            <SectionCard title="Technical Skills" icon={Zap}>
              <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={addSkill} className="premium-button">
                  <Plus className="w-3 h-3 mr-1" /> Add Skill
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {settings.skills.map((skill, i) => (
                  <Card key={i} className="bg-white/[0.02] border-white/5 p-3">
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          value={skill.name}
                          onChange={(e) => updateSkill(i, { name: e.target.value })}
                          className="bg-white/5 border-white/10 text-white text-sm"
                          placeholder="Skill name"
                        />
                        <Button variant="outline" size="sm" onClick={() => removeSkill(i)} className="premium-button shrink-0">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={skill.category}
                          onChange={(e) => updateSkill(i, { category: e.target.value })}
                          className="bg-white/5 border-white/10 text-white text-sm"
                          placeholder="Category"
                        />
                        <div className="flex items-center gap-2 flex-1">
                          <Slider
                            value={[skill.level]}
                            onValueChange={([v]) => updateSkill(i, { level: v })}
                            max={100}
                            step={5}
                            className="flex-1"
                          />
                          <span className="text-white/50 text-xs w-8 text-right">{skill.level}%</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </SectionCard>
          </TabsContent>

          {/* ═══ PROJECTS ═══ */}
          <TabsContent value="projects" className="space-y-4">
            <SectionCard title="Projects" icon={Box}>
              <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={addProject} className="premium-button">
                  <Plus className="w-3 h-3 mr-1" /> Add Project
                </Button>
              </div>
              {settings.projects.map((project, i) => (
                <Card key={i} className="bg-white/[0.02] border-white/5 p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <Input
                      value={project.name}
                      onChange={(e) => updateProject(i, { name: e.target.value })}
                      className="bg-white/5 border-white/10 text-white font-medium w-48"
                    />
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Switch
                          checked={project.featured}
                          onCheckedChange={(v) => updateProject(i, { featured: v })}
                        />
                        <span className="text-white/50 text-xs">Featured</span>
                      </div>
                      <select
                        value={project.status}
                        onChange={(e) => updateProject(i, { status: e.target.value })}
                        className="bg-white/5 border border-white/10 text-white text-xs rounded px-2 py-1"
                      >
                        <option value="production">Production</option>
                        <option value="development">Development</option>
                        <option value="coming soon">Coming Soon</option>
                      </select>
                      <Button variant="outline" size="sm" onClick={() => removeProject(i)} className="premium-button">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    value={project.description}
                    onChange={(e) => updateProject(i, { description: e.target.value })}
                    className="bg-white/5 border-white/10 text-white text-sm min-h-[60px]"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      value={project.tags.join(", ")}
                      onChange={(e) => updateProject(i, { tags: e.target.value.split(",").map(t => t.trim()) })}
                      className="bg-white/5 border-white/10 text-white text-sm"
                      placeholder="Tags (comma separated)"
                    />
                    <Input
                      value={project.year}
                      onChange={(e) => updateProject(i, { year: e.target.value })}
                      className="bg-white/5 border-white/10 text-white text-sm"
                      placeholder="Year"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      value={project.liveLink}
                      onChange={(e) => updateProject(i, { liveLink: e.target.value })}
                      className="bg-white/5 border-white/10 text-white text-sm"
                      placeholder="Live URL"
                    />
                    <Input
                      value={project.githubLink}
                      onChange={(e) => updateProject(i, { githubLink: e.target.value })}
                      className="bg-white/5 border-white/10 text-white text-sm"
                      placeholder="GitHub URL"
                    />
                  </div>
                  <Input
                    value={project.logoUrl || ''}
                    onChange={(e) => updateProject(i, { logoUrl: e.target.value })}
                    className="bg-white/5 border-white/10 text-white text-sm"
                    placeholder="Logo URL (optional)"
                  />
                </Card>
              ))}
            </SectionCard>
          </TabsContent>

          {/* ═══ ANIMATIONS ═══ */}
          <TabsContent value="animations" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 space-y-4">
                <SectionCard title="Animation Library (25+)" icon={Sparkles}>
                  <p className="text-white/40 text-sm mb-4">Toggle animations on/off for cards, buttons, hover effects, and scroll triggers.</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {(Object.keys(animations) as AnimationKey[]).map(key => {
                      const anim = animations[key];
                      const isEnabled = settings.enabledAnimations.includes(key as AnimationName);
                      return (
                        <button
                          key={key}
                          onClick={() => toggleAnimation(key as AnimationName)}
                          className={`p-3 rounded-lg border text-left text-sm transition-all ${
                            isEnabled 
                              ? "bg-white/10 border-white/20 text-white" 
                              : "bg-white/[0.02] border-white/5 text-white/40 hover:border-white/10"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs">{anim.name}</span>
                            {isEnabled && <span className="w-2 h-2 bg-green-400 rounded-full" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </SectionCard>

                <SectionCard title="Animation Triggers" icon={MousePointer}>
                  <div className="space-y-3">
                    {[
                      { key: "scrollAnimations", label: "Scroll Animations", desc: "Elements animate when scrolled into view" },
                      { key: "hoverAnimations", label: "Hover Animations", desc: "Elements animate on mouse hover" },
                      { key: "loadingAnimations", label: "Loading Animations", desc: "Show loading states and transitions" },
                      { key: "cursorEffect", label: "Custom Cursor", desc: "Custom cursor trail effect" },
                    ].map(({ key, label, desc }) => (
                      <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
                        <div>
                          <span className="text-white/80 text-sm">{label}</span>
                          <p className="text-white/30 text-xs">{desc}</p>
                        </div>
                        <Switch
                          checked={settings[key as keyof typeof settings] as boolean}
                          onCheckedChange={(v) => updateSettingsImmediate({ [key]: v })}
                        />
                      </div>
                    ))}
                  </div>
                </SectionCard>
              </div>

              <div className="space-y-4">
                <SectionCard title="Preview" icon={Eye}>
                  <AnimationsPreview />
                </SectionCard>
              </div>
            </div>
          </TabsContent>

          {/* ═══ EFFECTS ═══ */}
          <TabsContent value="effects" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 space-y-4">
                <SectionCard title="Visual Effects" icon={Layers}>
                  <p className="text-white/40 text-sm mb-4">Choose a visual effect style for cards and UI elements.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(Object.keys(visualEffects) as EffectType[]).map(key => {
                      const effect = visualEffects[key];
                      const isSelected = settings.visualEffect === key;
                      return (
                        <button
                          key={key}
                          onClick={() => updateSettingsImmediate({ visualEffect: key })}
                          className={`p-4 rounded-xl border text-left transition-all ${isSelected ? "bg-white/10 border-white/30" : "bg-white/[0.02] border-white/5 hover:border-white/10"}`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-white/90 font-medium text-sm">{effect.name}</span>
                            {isSelected && <Badge className="bg-white/20 text-white text-xs">Active</Badge>}
                          </div>
                          <p className="text-white/40 text-xs">{effect.description}</p>
                        </button>
                      );
                    })}
                  </div>
                </SectionCard>

                <SectionCard title="Glassmorphism Settings" icon={Eye}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-white/70 text-sm">Blur Intensity: {settings.glassmorphismIntensity}px</Label>
                      <Slider
                        value={[settings.glassmorphismIntensity]}
                        onValueChange={([v]) => updateSettingsImmediate({ glassmorphismIntensity: v })}
                        min={5}
                        max={40}
                        step={1}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white/70 text-sm">Border Radius: {settings.borderRadius}px</Label>
                      <Slider
                        value={[settings.borderRadius]}
                        onValueChange={([v]) => updateSettingsImmediate({ borderRadius: v })}
                        min={0}
                        max={32}
                        step={1}
                      />
                    </div>
                  </div>
                </SectionCard>
              </div>

              <div className="space-y-4">
                <SectionCard title="Live Preview" icon={Eye}>
                  <EffectsPreview />
                </SectionCard>
              </div>
            </div>
          </TabsContent>

          {/* ═══ THEME ═══ */}
          <TabsContent value="theme" className="space-y-4">
            <SectionCard title="Color Theme" icon={Palette}>
              <p className="text-white/40 text-sm mb-4">Customize the color palette. All colors are applied via CSS variables.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: "primaryColor", label: "Primary Color", desc: "Main accent color" },
                  { key: "accentColor", label: "Accent Color", desc: "Secondary accent" },
                  { key: "backgroundColor", label: "Background Color", desc: "Page background" },
                  { key: "textColor", label: "Text Color", desc: "Main text color" },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <input
                      type="color"
                      value={settings[key as keyof typeof settings] as string}
                      onChange={(e) => updateSettingsImmediate({ [key]: e.target.value })}
                      className="w-10 h-10 rounded cursor-pointer bg-transparent border border-white/10"
                    />
                    <div>
                      <span className="text-white/80 text-sm">{label}</span>
                      <p className="text-white/30 text-xs">{desc}</p>
                    </div>
                    <span className="ml-auto text-white/40 text-xs font-mono">{settings[key as keyof typeof settings] as string}</span>
                  </div>
                ))}
              </div>
            </SectionCard>
          </TabsContent>

          {/* ═══ LAYOUT ═══ */}
          <TabsContent value="layout" className="space-y-4">
            <SectionCard title="Features" icon={Monitor}>
              <div className="space-y-3">
                {[
                  { key: "showParticles", label: "Particle Background", desc: "Floating binary particles" },
                  { key: "showScrollProgress", label: "Scroll Progress Bar", desc: "Top progress indicator" },
                  { key: "showTerminalWindow", label: "Terminal Window Frame", desc: "Wrap sections in terminal UI" },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <div>
                      <span className="text-white/80 text-sm">{label}</span>
                      <p className="text-white/30 text-xs">{desc}</p>
                    </div>
                    <Switch
                      checked={settings[key as keyof typeof settings] as boolean}
                          onCheckedChange={(v) => updateSettingsImmediate({ [key]: v })}
                    />
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Header" icon={Layout}>
              <div className="space-y-2">
                <Label className="text-white/70 text-sm">Header Style</Label>
                <div className="flex gap-2">
                  {(["default", "floating", "hidden"] as const).map(style => (
                    <Button
                      key={style}
                      variant={settings.headerStyle === style ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateSettingsImmediate({ headerStyle: style })}
                      className={settings.headerStyle === style ? "bg-white/20 text-white" : "premium-button"}
                    >
                      {style}
                    </Button>
                  ))}
                </div>
              </div>
            </SectionCard>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
