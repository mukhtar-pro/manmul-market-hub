
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppearanceForm from "@/components/settings/AppearanceForm";
import { 
  Bell, 
  BellOff, 
  Mail, 
  MessageSquare, 
  Tag, 
  ShoppingBag,
  Shield,
  Key,
  Smartphone,
  ExternalLink,
  Info
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const SettingsPage = () => {
  // State for notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promotions, setPromotions] = useState(false);
  const [productUpdates, setProductUpdates] = useState(true);
  const [messageNotifications, setMessageNotifications] = useState(true);
  
  // State for security settings
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [loginNotifications, setLoginNotifications] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState("30");
  
  return (
    <MainLayout>
      <div className="manmul-container py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h1>
        
        <Tabs defaultValue="appearance" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">General Settings</h2>
              <p className="text-gray-600 mb-4">Manage your general account settings.</p>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" defaultValue="John Doe" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="utc-5">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                        <SelectItem value="utc-7">Mountain Time (UTC-7)</SelectItem>
                        <SelectItem value="utc-6">Central Time (UTC-6)</SelectItem>
                        <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                        <SelectItem value="utc">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea 
                    id="bio" 
                    className="w-full min-h-[100px] p-2 border rounded-md" 
                    defaultValue="I'm a software developer interested in e-commerce solutions."
                  />
                </div>
                
                <div className="flex items-center justify-between pt-4">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="appearance">
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Appearance Settings</h2>
              <p className="text-gray-600 mb-4">Customize how ManMulShop looks for you.</p>
              
              <AppearanceForm />
            </div>
          </TabsContent>
          
          <TabsContent value="notifications">
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Notification Settings</h2>
              <p className="text-gray-600 mb-4">Manage your notification preferences.</p>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Communication Channels</CardTitle>
                    <CardDescription>Choose how you want to receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Mail className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-gray-500">Receive updates via email</p>
                          </div>
                        </div>
                        <Switch 
                          checked={emailNotifications} 
                          onCheckedChange={setEmailNotifications} 
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Bell className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="font-medium">Push Notifications</p>
                            <p className="text-sm text-gray-500">Receive alerts on your device</p>
                          </div>
                        </div>
                        <Switch 
                          checked={pushNotifications} 
                          onCheckedChange={setPushNotifications} 
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Notification Types</CardTitle>
                    <CardDescription>Select which types of notifications you want to receive</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <ShoppingBag className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="font-medium">Order Updates</p>
                            <p className="text-sm text-gray-500">Status changes, delivery updates</p>
                          </div>
                        </div>
                        <Switch 
                          checked={orderUpdates} 
                          onCheckedChange={setOrderUpdates} 
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Tag className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="font-medium">Promotions & Offers</p>
                            <p className="text-sm text-gray-500">Discounts, sale alerts, special offers</p>
                          </div>
                        </div>
                        <Switch 
                          checked={promotions} 
                          onCheckedChange={setPromotions} 
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Info className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="font-medium">Product Updates</p>
                            <p className="text-sm text-gray-500">Price changes, back in stock alerts</p>
                          </div>
                        </div>
                        <Switch 
                          checked={productUpdates} 
                          onCheckedChange={setProductUpdates} 
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <MessageSquare className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="font-medium">Messages</p>
                            <p className="text-sm text-gray-500">Replies to your reviews, questions</p>
                          </div>
                        </div>
                        <Switch 
                          checked={messageNotifications} 
                          onCheckedChange={setMessageNotifications} 
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex items-center justify-between pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setEmailNotifications(false);
                      setPushNotifications(false);
                      setOrderUpdates(false);
                      setPromotions(false);
                      setProductUpdates(false);
                      setMessageNotifications(false);
                    }}
                  >
                    <BellOff size={16} className="mr-2" />
                    Mute All
                  </Button>
                  <Button>Save Preferences</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="security">
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Security Settings</h2>
              <p className="text-gray-600 mb-4">Manage your security settings and change your password.</p>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Password Management</CardTitle>
                    <CardDescription>Update your password to keep your account secure</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" type="password" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" />
                        <p className="text-xs text-gray-500 mt-1">
                          Password must be at least 8 characters and include a number and special character.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input id="confirmPassword" type="password" />
                      </div>
                      
                      <Button className="mt-2">Update Password</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Two-Factor Authentication</CardTitle>
                    <CardDescription>Add an extra layer of security to your account</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Shield className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="font-medium">Two-Factor Authentication</p>
                            <p className="text-sm text-gray-500">
                              {twoFactorAuth 
                                ? "Your account is protected with 2FA" 
                                : "Verify your identity with a second method"
                              }
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch 
                            checked={twoFactorAuth} 
                            onCheckedChange={setTwoFactorAuth} 
                          />
                          {twoFactorAuth && (
                            <Badge variant="outline" className="ml-2 bg-green-50 text-green-600 border-green-200">
                              Enabled
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      {twoFactorAuth && (
                        <div className="pt-2">
                          <Button variant="outline" size="sm">
                            <Smartphone size={16} className="mr-2" />
                            Configure Authenticator App
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Session Management</CardTitle>
                    <CardDescription>Control your active sessions and login settings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Key className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="font-medium">Login Notifications</p>
                            <p className="text-sm text-gray-500">Get notified of new logins to your account</p>
                          </div>
                        </div>
                        <Switch 
                          checked={loginNotifications} 
                          onCheckedChange={setLoginNotifications} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                        <Select value={sessionTimeout} onValueChange={setSessionTimeout}>
                          <SelectTrigger id="sessionTimeout">
                            <SelectValue placeholder="Select timeout" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                            <SelectItem value="120">2 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Active Sessions</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                            <div>
                              <p className="text-sm font-medium">Current Device</p>
                              <p className="text-xs text-gray-500">Chrome on Windows • New York, USA</p>
                            </div>
                            <Badge>Active Now</Badge>
                          </div>
                          
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                            <div>
                              <p className="text-sm font-medium">iPhone 13</p>
                              <p className="text-xs text-gray-500">Safari • Last active 2 days ago</p>
                            </div>
                            <Button variant="ghost" size="sm" className="h-7 text-red-500 hover:text-red-600 hover:bg-red-50">
                              Revoke
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full mt-2">
                        <ExternalLink size={16} className="mr-2" />
                        Log Out All Other Devices
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex items-center justify-end pt-4">
                  <Button>Save Security Settings</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
