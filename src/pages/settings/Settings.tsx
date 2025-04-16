
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppearanceForm from "@/components/settings/AppearanceForm";

const SettingsPage = () => {
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
              
              {/* General settings content would go here */}
              <div className="text-center py-12 text-gray-500">
                General settings coming soon
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
              
              {/* Notification settings content would go here */}
              <div className="text-center py-12 text-gray-500">
                Notification settings coming soon
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="security">
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Security Settings</h2>
              <p className="text-gray-600 mb-4">Manage your security settings and change your password.</p>
              
              {/* Security settings content would go here */}
              <div className="text-center py-12 text-gray-500">
                Security settings coming soon
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
