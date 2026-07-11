import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Send, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/AnimatedSection";

const ContactEmail = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    topic: '',
    message: ''
  });

  const topics = [
    { value: 'collaboration', label: 'Collaboration & Projects' },
    { value: 'freelance', label: 'Freelance Opportunities' },
    { value: 'fulltime', label: 'Full-time Positions' },
    { value: 'mentorship', label: 'Mentorship & Advice' },
    { value: 'networking', label: 'Professional Networking' },
    { value: 'feedback', label: 'Feedback & Suggestions' },
    { value: 'other', label: 'Other' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailSubject = `${formData.topic ? `[${topics.find(t => t.value === formData.topic)?.label}] ` : ''}${formData.subject}`;
    const emailBody = `Hi,

My name is ${formData.name} and I'm reaching out regarding: ${topics.find(t => t.value === formData.topic)?.label || 'General Inquiry'}

${formData.message}

Best regards,
${formData.name}
${formData.email}`;

    const mailtoLink = `mailto:aryandw2010@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoLink, '_blank');
  };

  return (
    <div className="min-h-screen bg-background relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/[0.02] rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/[0.02] rounded-full blur-[120px]" />
      </div>

      <header className="border-b border-white/5 py-4 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Get In Touch</h1>
              <p className="text-sm text-white/50">Let's discuss your ideas</p>
            </div>
            <Link to="/">
              <Button variant="outline" size="sm" className="premium-button">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 sm:py-8 relative z-10">
        <div className="max-w-2xl mx-auto">
          <AnimatedSection animation="slide-in-up">
            <Card className="shadow-2xl border-white/5 glass-aurora">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-white/[0.05] rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300 border border-white/10">
                  <Mail className="w-8 h-8 text-white/70" />
                </div>
                <CardTitle className="text-2xl sm:text-3xl text-white">
                  Contact Me
                </CardTitle>
                <CardDescription className="text-base sm:text-lg mt-2 text-white/50">
                  Fill out the form below and I'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="px-4 sm:px-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70 flex items-center gap-1">
                        Name <span className="text-white/40">*</span>
                      </label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Your full name"
                        className="bg-white/5 border-white/10 text-white focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all duration-200 hover:border-white/20"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70 flex items-center gap-1">
                        Email <span className="text-white/40">*</span>
                      </label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="your.email@example.com"
                        className="bg-white/5 border-white/10 text-white focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all duration-200 hover:border-white/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70 flex items-center gap-1">
                      What would you like to discuss? <span className="text-white/40">*</span>
                    </label>
                    <Select
                      required
                      value={formData.topic}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, topic: value }))}
                    >
                      <SelectTrigger className="bg-white/5 border-white/10 focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all duration-200 hover:border-white/20">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/95 backdrop-blur-xl border-white/10">
                        {topics.map((topic) => (
                          <SelectItem key={topic.value} value={topic.value} className="hover:bg-white/5">
                            {topic.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70 flex items-center gap-1">
                      Subject <span className="text-white/40">*</span>
                    </label>
                    <Input
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder="Brief description of your inquiry"
                      className="bg-white/5 border-white/10 text-white focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all duration-200 hover:border-white/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70 flex items-center gap-1">
                      Message <span className="text-white/40">*</span>
                    </label>
                    <Textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Tell me more about your project, idea, or inquiry..."
                      rows={5}
                      className="bg-white/5 border-white/10 text-white focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all duration-200 resize-none hover:border-white/20"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-white/10 hover:bg-white/15 text-white border border-white/10 hover:border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                    size="lg"
                  >
                    <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </Button>
                </form>

                <div className="mt-8 pt-6 border-t border-white/5 text-center">
                  <p className="text-sm text-white/40">
                    You can also reach me directly at{" "}
                    <a 
                      href="mailto:aryandw2010@gmail.com" 
                      className="text-white/70 hover:text-white transition-colors duration-200 font-medium"
                    >
                      aryandw2010@gmail.com
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </main>
    </div>
  );
};

export default ContactEmail;
