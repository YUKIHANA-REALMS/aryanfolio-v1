import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Heart, Zap, Star, Crown, MessageCircle, Copy } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Friends = () => {
  const [copiedUsername, setCopiedUsername] = useState<string | null>(null);

  const copyDiscordUsername = (username: string, displayName: string) => {
    navigator.clipboard.writeText(username);
    setCopiedUsername(displayName);
    toast({
      title: "Copied!",
      description: `${displayName}'s Discord username copied to clipboard`,
    });
    setTimeout(() => setCopiedUsername(null), 2000);
  };

  const friendsData = {
    "Best Friends": [
      {
        name: "Azuren",
        title: "Discord Server Designer",
        skills: ["Management", "Aesthetic", "Embeds"],
        status: "Available",
        discord: "azuren.dev",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=azuren`
      },
      {
        name: "ZenpaiZombie", 
        title: "Founder @ StrelixCloud",
        skills: ["Proxmox", "KVM", "Virtualization"],
        status: "Busy",
        discord: "zenpaizombie",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=zombie`
      }
    ],
    "Bros": [
      {
        name: "Nkash",
        title: "VPS Specialist",
        skills: ["Networking", "KVM", "Docker"],
        status: "Offline",
        discord: "nkash.tech",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=nkash`
      },
      {
        name: "Exo1tap",
        title: "Minecraft Developer", 
        skills: ["Java", "Minecraft", "Mods"],
        status: "Available",
        discord: "exo1tap",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=exo`
      },
      {
        name: "Spicy mango",
        title: "Minecraft Server Developer",
        skills: ["Java", "PaperMC"],
        status: "Busy",
        discord: "spicymango",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=mango`
      }
    ],
    "Special Persons": [
      {
        name: "Aryan",
        title: "Full-Stack Developer & Cloud DevOps",
        skills: ["React", "Node.js", "Docker", "AWS"],
        status: "Busy",
        discord: "aryan.dev",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=aryan`
      },
      {
        name: "Miorin",
        title: "Security Researcher",
        skills: ["Python", "Machine Learning", "TensorFlow"],
        status: "Available",
        discord: "miorin.ai",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=miorin`
      }
    ],
    "Friends": [
      {
        name: "Alya",
        title: "Graphic Designer",
        skills: ["Photoshop", "Illustrator", "UI Design"],
        status: "Busy",
        discord: "alya.design",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=alya`
      },
      {
        name: "Leo",
        title: "Discord Bot Developer",
        skills: ["Node.js", "JavaScript", "Python"],
        status: "Idle",
        discord: "leo.codes",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=leo`
      }
    ]
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Best Friends": return <Heart className="h-4 w-4 text-white/60" />;
      case "Bros": return <Users className="h-4 w-4 text-white/60" />;
      case "Special Persons": return <Star className="h-4 w-4 text-white/60" />;
      case "Pookie": return <Crown className="h-4 w-4 text-white/60" />;
      default: return <Users className="h-4 w-4 text-white/60" />;
    }
  };

  const totalFriends = Object.values(friendsData).flat().length;

  return (
    <div className="min-h-screen bg-background relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/[0.02] rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/[0.02] rounded-full blur-[120px]" />
      </div>

      <header className="border-b border-white/5 py-6 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white">
                My Network
              </h1>
              <p className="text-white/50 mt-1">Professional connections & amazing friends</p>
            </div>
            <Link to="/">
              <Button variant="outline" size="sm" className="premium-button">← Back</Button>
            </Link>
          </div>
          
          <div className="max-w-3xl">
            <p className="text-white/60 leading-relaxed">
              Welcome to my professional network! These are the incredible individuals I've had the privilege to work, 
              collaborate, and build friendships with. From talented developers and designers to innovative entrepreneurs 
              and creative minds - each person here has contributed something valuable to my journey in tech.
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4 relative z-10">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-white/50" />
            <span className="text-white/60 font-medium">{totalFriends} Connections</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-white/40" />
            <span className="text-white/50">{Object.keys(friendsData).length} Categories</span>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 pb-8 relative z-10">
        <div className="space-y-6">
          {Object.entries(friendsData).map(([category, friends]) => (
            <div key={category} className="space-y-3">
              <div className="flex items-center space-x-2 pb-2 border-b border-white/5">
                {getCategoryIcon(category)}
                <h2 className="text-lg font-semibold text-white">{category}</h2>
                <Badge variant="outline" className="text-xs border-white/10">
                  {friends.length}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {friends.map((friend, index) => (
                  <Card key={index} className="glass-aurora group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-white/5 hover:border-white/15">
                    <CardHeader className="pb-3">
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-12 h-12 border-2 border-white/10 group-hover:border-white/20 transition-colors duration-300">
                          <AvatarImage 
                            src={friend.avatar} 
                            alt={friend.name}
                            className="group-hover:scale-110 transition-transform duration-300"
                          />
                          <AvatarFallback className="bg-white/[0.08] text-white/70 font-semibold">
                            {friend.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <CardTitle className="text-base group-hover:text-white/90 transition-colors duration-200 truncate text-white">
                                {friend.name}
                              </CardTitle>
                              <CardDescription className="text-sm font-medium text-white/50 line-clamp-1">
                                {friend.title}
                              </CardDescription>
                            </div>
                            <Badge 
                              variant={friend.status === "Available" ? "default" : friend.status === "Busy" ? "destructive" : "secondary"}
                              className="text-xs shrink-0 ml-2"
                            >
                              {friend.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0 space-y-3">
                      <div className="flex flex-wrap gap-1">
                        {friend.skills.slice(0, 3).map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="text-xs border-white/10 hover:border-white/20 hover:bg-white/5 transition-colors">
                            {skill}
                          </Badge>
                        ))}
                        {friend.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs border-white/10">
                            +{friend.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-xs premium-button group/btn"
                        onClick={() => copyDiscordUsername(friend.discord, friend.name)}
                      >
                        <MessageCircle className="w-3 h-3 mr-2 group-hover/btn:scale-110 transition-transform" />
                        {copiedUsername === friend.name ? (
                          <>
                            <Copy className="w-3 h-3 mr-1" />
                            Copied!
                          </>
                        ) : (
                          <>@{friend.discord}</>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Friends;
