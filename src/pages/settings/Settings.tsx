
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Palette, 
  Type, 
  Bell, 
  Mail, 
  Check,
  Lock
} from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/contexts/ThemeContext";

const SettingsPage = () => {
  const { theme, setThemeOption, saveTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("appearance");
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  
  // Contact preferences
  const [preferredContact, setPreferredContact] = useState("email");
  const [contactEmail, setContactEmail] = useState("user@example.com");
  const [contactPhone, setContactPhone] = useState("+1 555-123-4567");
  
  return (
    <MainLayout>
      <div className="manmul-container">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 md:grid-cols-4">
            <TabsTrigger value="appearance" className="flex items-center">
              <Palette size={16} className="mr-2" />
              <span>Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <Bell size={16} className="mr-2" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center">
              <Mail size={16} className="mr-2" />
              <span>Contact</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="hidden md:flex items-center">
              <Lock size={16} className="mr-2" />
              <span>Security</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Appearance Tab */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>
                  Customize how ManMulShop looks for you.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Theme Color */}
                <div className="space-y-2">
                  <Label htmlFor="theme-color">Theme Color</Label>
                  <Select
                    value={theme.color}
                    onValueChange={(value) => setThemeOption('color', value)}
                  >
                    <SelectTrigger id="theme-color">
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="purple">Purple</SelectItem>
                      <SelectItem value="red">Red</SelectItem>
                      <SelectItem value="orange">Orange</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Font */}
                <div className="space-y-2">
                  <Label htmlFor="font">Font</Label>
                  <Select
                    value={theme.font}
                    onValueChange={(value) => setThemeOption('font', value)}
                  >
                    <SelectTrigger id="font">
                      <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Roboto">Roboto</SelectItem>
                      <SelectItem value="Arial">Arial</SelectItem>
                      <SelectItem value="Helvetica">Helvetica</SelectItem>
                      <SelectItem value="Verdana">Verdana</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Font Size */}
                <div className="space-y-2">
                  <Label htmlFor="font-size">Font Size</Label>
                  <Select
                    value={theme.fontSize}
                    onValueChange={(value) => setThemeOption('fontSize', value)}
                  >
                    <SelectTrigger id="font-size">
                      <SelectValue placeholder="Select font size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                      <SelectItem value="x-large">Extra Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Preview */}
                <div className="bg-background p-4 rounded-md border">
                  <h4 className="font-semibold mb-2">Preview</h4>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`w-6 h-6 rounded-full bg-primary`}></div>
                    <span>Primary color sample</span>
                  </div>
                  <p>This is how your text will appear with the selected options.</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={saveTheme}>
                  <Check size={16} className="mr-2" />
                  Save Appearance Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Manage how you receive notifications from us.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications" className="block mb-1">Email Notifications</Label>
                    <p className="text-sm text-gray-500">Receive email updates about your account</p>
                  </div>
                  <Switch 
                    id="email-notifications" 
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifications" className="block mb-1">Push Notifications</Label>
                    <p className="text-sm text-gray-500">Receive push notifications on your device</p>
                  </div>
                  <Switch 
                    id="push-notifications" 
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="order-updates" className="block mb-1">Order Updates</Label>
                    <p className="text-sm text-gray-500">Receive updates about your orders</p>
                  </div>
                  <Switch 
                    id="order-updates" 
                    checked={orderUpdates}
                    onCheckedChange={setOrderUpdates}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketing-emails" className="block mb-1">Marketing Emails</Label>
                    <p className="text-sm text-gray-500">Receive promotional offers and newsletters</p>
                  </div>
                  <Switch 
                    id="marketing-emails" 
                    checked={marketingEmails}
                    onCheckedChange={setMarketingEmails}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button>
                  <Check size={16} className="mr-2" />
                  Save Notification Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Contact Tab */}
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Preferences</CardTitle>
                <CardDescription>
                  Set your preferred contact methods for communications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="preferred-contact">Preferred Contact Method</Label>
                  <Select
                    value={preferredContact}
                    onValueChange={setPreferredContact}
                  >
                    <SelectTrigger id="preferred-contact">
                      <SelectValue placeholder="Select contact method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="phone">Phone</SelectItem>
                      <SelectItem value="both">Both Email and Phone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input 
                    id="contact-email" 
                    value={contactEmail} 
                    onChange={(e) => setContactEmail(e.target.value)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Contact Phone</Label>
                  <Input 
                    id="contact-phone" 
                    value={contactPhone} 
                    onChange={(e) => setContactPhone(e.target.value)} 
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button>
                  <Check size={16} className="mr-2" />
                  Save Contact Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Security Tab */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your account security preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <Label htmlFor="two-factor" className="block mb-1">Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <Switch id="two-factor" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>
                  <Check size={16} className="mr-2" />
                  Update Password
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
