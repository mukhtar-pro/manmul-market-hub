
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { 
  Palette, 
  Mail, 
  Bell, 
  Lock, 
  Save,
  Check
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

const SettingsPage = () => {
  const [selectedTheme, setSelectedTheme] = useState("green");
  const [selectedFont, setSelectedFont] = useState("roboto");
  const [fontSize, setFontSize] = useState("medium");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { toast } = useToast();
  
  // Handle theme settings save
  const handleSaveTheme = () => {
    toast({
      title: "Theme Settings Saved",
      description: "Your appearance preferences have been updated.",
      duration: 3000,
    });
  };
  
  // Handle notifications settings save
  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Saved",
      description: "Your notification preferences have been updated.",
      duration: 3000,
    });
  };
  
  // Handle password change
  const handleChangePassword = () => {
    if (!currentPassword) {
      toast({
        title: "Current Password Required",
        description: "Please enter your current password.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    if (!newPassword) {
      toast({
        title: "New Password Required",
        description: "Please enter a new password.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "New password and confirmation don't match.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully.",
      duration: 3000,
    });
    
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <MainLayout>
      <div className="manmul-container">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>
        
        <Tabs defaultValue="appearance">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="appearance" className="flex items-center">
              <Palette size={16} className="mr-2" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <Bell size={16} className="mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center">
              <Lock size={16} className="mr-2" />
              Security
            </TabsTrigger>
          </TabsList>
          
          {/* Appearance Settings */}
          <TabsContent value="appearance">
            <Card>
              <CardContent className="pt-6 pb-4">
                <h3 className="text-lg font-medium mb-4">Theme Customizer</h3>
                <Separator className="mb-6" />
                
                <div className="space-y-6">
                  {/* Theme Color */}
                  <div className="space-y-3">
                    <Label>Theme Color</Label>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { value: "green", label: "Green", color: "bg-green-500" },
                        { value: "blue", label: "Blue", color: "bg-blue-500" },
                        { value: "purple", label: "Purple", color: "bg-purple-500" },
                        { value: "red", label: "Red", color: "bg-red-500" },
                        { value: "orange", label: "Orange", color: "bg-orange-500" },
                      ].map((theme) => (
                        <div 
                          key={theme.value} 
                          className="relative"
                          onClick={() => setSelectedTheme(theme.value)}
                        >
                          <div 
                            className={`w-12 h-12 rounded-full cursor-pointer ${theme.color} flex items-center justify-center`}
                          >
                            {selectedTheme === theme.value && (
                              <Check size={20} className="text-white" />
                            )}
                          </div>
                          <span className="block text-xs text-center mt-1">{theme.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Font Family */}
                  <div className="space-y-3">
                    <Label>Font Family</Label>
                    <RadioGroup value={selectedFont} onValueChange={setSelectedFont}>
                      <div className="flex flex-col space-y-2">
                        {[
                          { value: "roboto", label: "Roboto", className: "font-sans" },
                          { value: "serif", label: "Serif", className: "font-serif" },
                          { value: "mono", label: "Monospace", className: "font-mono" },
                        ].map((font) => (
                          <div key={font.value} className="flex items-center space-x-2">
                            <RadioGroupItem value={font.value} id={`font-${font.value}`} />
                            <Label htmlFor={`font-${font.value}`} className={font.className}>{font.label}</Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                  
                  {/* Font Size */}
                  <div className="space-y-3">
                    <Label>Font Size</Label>
                    <RadioGroup value={fontSize} onValueChange={setFontSize}>
                      <div className="flex flex-col space-y-2">
                        {[
                          { value: "small", label: "Small" },
                          { value: "medium", label: "Medium" },
                          { value: "large", label: "Large" },
                        ].map((size) => (
                          <div key={size.value} className="flex items-center space-x-2">
                            <RadioGroupItem value={size.value} id={`size-${size.value}`} />
                            <Label 
                              htmlFor={`size-${size.value}`} 
                              className={size.value === "small" ? "text-sm" : size.value === "large" ? "text-lg" : ""}
                            >
                              {size.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <Button onClick={handleSaveTheme}>
                    <Save size={16} className="mr-2" />
                    Save Appearance Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardContent className="pt-6 pb-4">
                <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
                <Separator className="mb-6" />
                
                <div className="space-y-6">
                  {/* Email Notifications */}
                  <div className="space-y-4">
                    <h4 className="font-medium">Email Notifications</h4>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-orders">Order Updates</Label>
                        <div className="text-sm text-gray-500">
                          Receive notifications about your orders
                        </div>
                      </div>
                      <Switch 
                        id="email-orders" 
                        checked={emailNotifications} 
                        onCheckedChange={setEmailNotifications} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-promos">Promotions & Offers</Label>
                        <div className="text-sm text-gray-500">
                          Receive promotions, discounts, and special offers
                        </div>
                      </div>
                      <Switch id="email-promos" defaultChecked={false} />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* SMS Notifications */}
                  <div className="space-y-4">
                    <h4 className="font-medium">SMS Notifications</h4>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sms-orders">Order Updates</Label>
                        <div className="text-sm text-gray-500">
                          Receive SMS alerts about your orders
                        </div>
                      </div>
                      <Switch 
                        id="sms-orders" 
                        checked={smsNotifications} 
                        onCheckedChange={setSmsNotifications} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sms-security">Security Alerts</Label>
                        <div className="text-sm text-gray-500">
                          Receive security notifications via SMS
                        </div>
                      </div>
                      <Switch id="sms-security" defaultChecked={true} />
                    </div>
                  </div>
                  
                  <Button onClick={handleSaveNotifications}>
                    <Save size={16} className="mr-2" />
                    Save Notification Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Security Settings */}
          <TabsContent value="security">
            <Card>
              <CardContent className="pt-6 pb-4">
                <h3 className="text-lg font-medium mb-4">Change Password</h3>
                <Separator className="mb-6" />
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input 
                      id="current-password" 
                      type="password" 
                      placeholder="Enter current password" 
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input 
                      id="new-password" 
                      type="password" 
                      placeholder="Enter new password" 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input 
                      id="confirm-password" 
                      type="password" 
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  
                  <Button onClick={handleChangePassword}>
                    <Lock size={16} className="mr-2" />
                    Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
