
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Sun, Moon, Laptop, TerminalSquare, Type } from "lucide-react";

const AppearanceForm = () => {
  const { toast } = useToast();
  const { theme, font, setTheme, setFont } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [selectedFont, setSelectedFont] = useState(font);

  useEffect(() => {
    setSelectedTheme(theme);
    setSelectedFont(font);
  }, [theme, font]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTheme(selectedTheme);
    setFont(selectedFont);
    
    toast({
      title: "Appearance updated",
      description: "Your appearance settings have been saved.",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Theme</CardTitle>
            <CardDescription>
              Choose your preferred color theme.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              defaultValue={selectedTheme} 
              value={selectedTheme}
              onValueChange={(value) => setSelectedTheme(value as 'light' | 'dark' | 'system')}
              className="grid grid-cols-3 gap-4"
            >
              <div>
                <RadioGroupItem value="light" id="theme-light" className="sr-only peer" />
                <Label
                  htmlFor="theme-light"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Sun className="mb-3 h-6 w-6" />
                  <span className="text-sm font-medium">Light</span>
                </Label>
              </div>
              
              <div>
                <RadioGroupItem value="dark" id="theme-dark" className="sr-only peer" />
                <Label
                  htmlFor="theme-dark"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Moon className="mb-3 h-6 w-6" />
                  <span className="text-sm font-medium">Dark</span>
                </Label>
              </div>
              
              <div>
                <RadioGroupItem value="system" id="theme-system" className="sr-only peer" />
                <Label
                  htmlFor="theme-system"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Laptop className="mb-3 h-6 w-6" />
                  <span className="text-sm font-medium">System</span>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Font</CardTitle>
            <CardDescription>
              Choose your preferred font style.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <RadioGroup 
                    defaultValue={selectedFont} 
                    value={selectedFont}
                    onValueChange={(value) => setSelectedFont(value as 'default' | 'serif' | 'mono' | 'rounded')}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div>
                      <RadioGroupItem value="default" id="font-default" className="sr-only peer" />
                      <Label
                        htmlFor="font-default"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Type className="mb-3 h-6 w-6" />
                        <span className="text-sm font-medium">Default</span>
                      </Label>
                    </div>
                    
                    <div>
                      <RadioGroupItem value="serif" id="font-serif" className="sr-only peer" />
                      <Label
                        htmlFor="font-serif"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary font-serif"
                      >
                        <Type className="mb-3 h-6 w-6" />
                        <span className="text-sm font-medium">Serif</span>
                      </Label>
                    </div>
                    
                    <div>
                      <RadioGroupItem value="mono" id="font-mono" className="sr-only peer" />
                      <Label
                        htmlFor="font-mono"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary font-mono"
                      >
                        <TerminalSquare className="mb-3 h-6 w-6" />
                        <span className="text-sm font-medium">Mono</span>
                      </Label>
                    </div>
                    
                    <div>
                      <RadioGroupItem value="rounded" id="font-rounded" className="sr-only peer" />
                      <Label
                        htmlFor="font-rounded"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        style={{ fontFamily: 'var(--font-rounded, sans-serif)' }}
                      >
                        <Type className="mb-3 h-6 w-6" />
                        <span className="text-sm font-medium">Rounded</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">Preview</h3>
                  <div className={`${selectedFont === 'serif' ? 'font-serif' : selectedFont === 'mono' ? 'font-mono' : selectedFont === 'rounded' ? 'font-rounded' : 'font-sans'}`}>
                    <p className="mb-2">This is how your selected font will look.</p>
                    <p className="text-sm text-gray-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
          <Button type="submit">
            Save Appearance Settings
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AppearanceForm;
