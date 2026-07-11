import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Heart, Zap, Star, Crown, MessageCircle, Copy } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { useAdminSettings } from "@/context/AdminSettings";

const DEFAULT_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'%3E%3Crect width='128' height='128' rx='64' fill='%2336393f'/%3E%3Ccircle cx='64' cy='52' r='24' fill='%2372767d'/%3E%3Cellipse cx='64' cy='100' rx='36' ry='28' fill='%2372767d'/%3E%3C/svg%3E";

const getDiscordAvatarUrl = (userId: string): string | null => {
  if (!userId || userId.trim() === '') return null;
  return `https://api.lanyard.rest/v1/users/${userId.trim()}/avatar`;
};

const Friends = () => {
  const { settings } = useAdminSettings();
  const [copiedUsername, setCopiedUsername] = useState<string | null>(null);
  const [avatarUrls, setAvatarUrls] = useState<Record<string, string>>({});

  const friends = settings.friends;
  const networkTitle = settings.networkTitle || 'My Network';
  const networkDescription = settings.networkDescription || '';

  // Fetch Discord avatars
  useEffect(() => {
    const fetchAvatars = async () => {
      const newAvatars: Record<string, string> = {};
      for (const friend of friends) {
        const url = getDiscordAvatarUrl(friend.discordUserId);
        if (url) {
          try {
            const res = await fetch(url);
            if (res.ok) {
              const data = await res.json();
              if (data.data && data.data.discord_user && data.data.discord_user.avatar) {
                const avatarHash = data.data.discord_user.avatar;
                const ext = avatarHash.startsWith('a_') ? 'gif' : 'png';
                newAvatars[friend.discord] = `https://cdn.discordapp.com/avatars/${friend.discordUserId}/${avatarHash}.${ext}?size=128`;
              }
            }
          } catch {
            // Keep default
          }
        }
      }
      if (Object.keys(newAvatars).length > 0) {
        setAvatarUrls(prev => ({ ...prev, ...newAvatars }));
      }
    };
    fetchAvatars();
  }, [friends]);

  const copyDiscordUsername = (username: string, displayName: string) => {
    navigator.clipboard.writeText(username);
    setCopiedUsername(displayName);
    toast({
      title: "Copied!",
      description: `${displayName}'s Discord username copied to clipboard`,
    });
    setTimeout(() => setCopiedUsername(null), 2000);
  };

  // Group friends by category
  const friendsByCategory: Record<string, typeof friends> = {};
  friends.forEach(f => {
    const cat = f.category || 'Friends';
    if (!friendsByCategory[cat]) friendsByCategory[cat] = [];
    friendsByCategory[cat].push(f);
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Best Friends": return <Heart className="h-4 w-4 text-white/60" />;
      case "Bros": return <Users className="h-4 w-4 text-white/60" />;
      case "Special Persons": return <Star className="h-4 w-4 text-white/60" />;
      case "Pookie": return <Crown className="h-4 w-4 text-white/60" />;
      default: return <Users className="h-4 w-4 text-white/60" />;
    }
  };

  const totalFriends = friends.length;

  const getAvatarSrc = (friend: typeof friends[0]) => {
    if (avatarUrls[friend.discord]) return avatarUrls[friend.discord];
    if (friend.discordUserId) {
      const url = getDiscordAvatarUrl(friend.discordUserId);
      return url || DEFAULT_AVATAR;
    }
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${friend.name}`;
  };

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
                {networkTitle}
              </h1>
              <p className="text-white/50 mt-1">Professional connections & amazing friends</p>
            </div>
            <Link to="/">
              <Button variant="outline" size="sm" className="premium-button">← Back</Button>
            </Link>
          </div>
          
          <div className="max-w-3xl">
            <p className="text-white/60 leading-relaxed">
              {networkDescription}
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
            <span className="text-white/50">{Object.keys(friendsByCategory).length} Categories</span>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 pb-8 relative z-10">
        <div className="space-y-6">
          {Object.entries(friendsByCategory).map(([category, catFriends]) => (
            <div key={category} className="space-y-3">
              <div className="flex items-center space-x-2 pb-2 border-b border-white/5">
                {getCategoryIcon(category)}
                <h2 className="text-lg font-semibold text-white">{category}</h2>
                <Badge variant="outline" className="text-xs border-white/10">
                  {catFriends.length}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {catFriends.map((friend, index) => (
                  <Card key={index} className="glass-aurora group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-white/5 hover:border-white/15">
                    <CardHeader className="pb-3">
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-12 h-12 border-2 border-white/10 group-hover:border-white/20 transition-colors duration-300">
                          <AvatarImage 
                            src={getAvatarSrc(friend)} 
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
