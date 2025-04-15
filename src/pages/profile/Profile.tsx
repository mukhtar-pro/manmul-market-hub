
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { user } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard, 
  DollarSign, 
  Save
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ProfilePage = () => {
  const [balance, setBalance] = useState(user.balance);
  const [addAmount, setAddAmount] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();
  
  // Handle add money to balance
  const handleAddMoney = () => {
    const amount = parseFloat(addAmount);
    
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to add.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      setBalance(prevBalance => prevBalance + amount);
      setAddAmount("");
      setIsUpdating(false);
      
      toast({
        title: "Balance Updated",
        description: `$${amount.toFixed(2)} has been added to your balance.`,
        duration: 3000,
      });
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="manmul-container">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Info Card */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Manage your account details and preferences
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="mb-4 md:mb-0 md:mr-6">
                    <div className="w-24 h-24 bg-gray-100 rounded-full overflow-hidden">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-manmul-100">
                          <UserIcon size={48} className="text-manmul-600" />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold">{user.name}</h3>
                    <div className="flex items-center text-gray-500">
                      <Mail size={16} className="mr-2" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Phone size={16} className="mr-2" />
                      <span>{user.phoneNumber}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MapPin size={16} className="mr-2" />
                      <span>{user.address}</span>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                {/* Edit Profile Form */}
                <div className="space-y-4">
                  <h4 className="font-medium">Edit Profile</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" type="text" defaultValue={user.name} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue={user.email} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" defaultValue={user.phoneNumber} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" type="text" defaultValue={user.address} />
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button>
                  <Save size={16} className="mr-2" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Balance Card */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Account Balance</CardTitle>
                <CardDescription>
                  Add money to your account
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-gray-500 text-sm mb-1">Current Balance</div>
                  <div className="flex items-center">
                    <DollarSign size={20} className="text-manmul-600 mr-1" />
                    <span className="text-2xl font-bold">{balance.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Add Money</h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign size={16} className="text-gray-400" />
                      </div>
                      <Input 
                        id="amount" 
                        type="text" 
                        placeholder="0.00" 
                        className="pl-9"
                        value={addAmount}
                        onChange={(e) => setAddAmount(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="card">Payment Method</Label>
                    <div className="flex items-center p-3 border rounded-md bg-gray-50">
                      <CreditCard size={16} className="text-gray-500 mr-2" />
                      <span className="text-gray-700">**** **** **** 4242</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={handleAddMoney}
                  disabled={isUpdating || !addAmount}
                >
                  {isUpdating ? "Processing..." : "Add Money"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
