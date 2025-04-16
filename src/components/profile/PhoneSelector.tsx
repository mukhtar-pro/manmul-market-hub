
import { useState, useEffect } from 'react';
import { ChevronDown, Check, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Country {
  name: string;
  code: string;
  flag: string;
  dialCode: string;
}

interface PhoneSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const countries: Country[] = [
  { name: 'Australia', code: 'AU', flag: '🇦🇺', dialCode: '+61' },
  { name: 'United States', code: 'US', flag: '🇺🇸', dialCode: '+1' },
  { name: 'United Kingdom', code: 'GB', flag: '🇬🇧', dialCode: '+44' },
  { name: 'Canada', code: 'CA', flag: '🇨🇦', dialCode: '+1' },
  { name: 'China', code: 'CN', flag: '🇨🇳', dialCode: '+86' },
  { name: 'India', code: 'IN', flag: '🇮🇳', dialCode: '+91' },
  { name: 'Japan', code: 'JP', flag: '🇯🇵', dialCode: '+81' },
  { name: 'South Korea', code: 'KR', flag: '🇰🇷', dialCode: '+82' },
  { name: 'Germany', code: 'DE', flag: '🇩🇪', dialCode: '+49' },
  { name: 'France', code: 'FR', flag: '🇫🇷', dialCode: '+33' },
  { name: 'Italy', code: 'IT', flag: '🇮🇹', dialCode: '+39' },
  { name: 'Spain', code: 'ES', flag: '🇪🇸', dialCode: '+34' },
  { name: 'Brazil', code: 'BR', flag: '🇧🇷', dialCode: '+55' },
  { name: 'Russia', code: 'RU', flag: '🇷🇺', dialCode: '+7' },
  { name: 'Mexico', code: 'MX', flag: '🇲🇽', dialCode: '+52' },
  { name: 'Indonesia', code: 'ID', flag: '🇮🇩', dialCode: '+62' },
  { name: 'Netherlands', code: 'NL', flag: '🇳🇱', dialCode: '+31' },
  { name: 'Saudi Arabia', code: 'SA', flag: '🇸🇦', dialCode: '+966' },
  { name: 'Switzerland', code: 'CH', flag: '🇨🇭', dialCode: '+41' },
  { name: 'Argentina', code: 'AR', flag: '🇦🇷', dialCode: '+54' },
  { name: 'Sweden', code: 'SE', flag: '🇸🇪', dialCode: '+46' },
  { name: 'Norway', code: 'NO', flag: '🇳🇴', dialCode: '+47' },
  { name: 'Denmark', code: 'DK', flag: '🇩🇰', dialCode: '+45' },
  { name: 'Finland', code: 'FI', flag: '🇫🇮', dialCode: '+358' },
  { name: 'New Zealand', code: 'NZ', flag: '🇳🇿', dialCode: '+64' },
  { name: 'Singapore', code: 'SG', flag: '🇸🇬', dialCode: '+65' },
  { name: 'Thailand', code: 'TH', flag: '🇹🇭', dialCode: '+66' },
  { name: 'Malaysia', code: 'MY', flag: '🇲🇾', dialCode: '+60' },
  { name: 'Vietnam', code: 'VN', flag: '🇻🇳', dialCode: '+84' },
  { name: 'Turkey', code: 'TR', flag: '🇹🇷', dialCode: '+90' },
];

const PhoneSelector = ({ value, onChange }: PhoneSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  // Get the phone number part (without country code)
  useEffect(() => {
    const parseValue = () => {
      // Find country by dial code at the beginning of the value
      const matchingCountry = countries.find(country => 
        value.startsWith(country.dialCode)
      );
      
      if (matchingCountry) {
        setSelectedCountry(matchingCountry);
        setPhoneNumber(value.substring(matchingCountry.dialCode.length).trim());
      } else {
        // Default to Australia if no match found
        const defaultCountry = countries.find(c => c.code === 'AU') || countries[0];
        setSelectedCountry(defaultCountry);
        setPhoneNumber(value);
      }
    };
    
    parseValue();
  }, [value]);

  // Filter countries based on search query
  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.dialCode.includes(searchQuery)
  );

  // Handle country selection
  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country);
    setOpen(false);
    
    // Combine country code with existing phone number
    const newValue = `${country.dialCode} ${phoneNumber}`.trim();
    onChange(newValue);
  };

  // Handle phone number input change
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoneNumber = e.target.value;
    setPhoneNumber(newPhoneNumber);
    
    // Combine selected country code with new phone number
    const newValue = selectedCountry 
      ? `${selectedCountry.dialCode} ${newPhoneNumber}`.trim()
      : newPhoneNumber;
      
    onChange(newValue);
  };

  return (
    <div className="flex">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className="flex items-center justify-center px-3 border-r-0 rounded-r-none min-w-20"
          >
            {selectedCountry ? (
              <>
                <span className="mr-1 text-lg">{selectedCountry.flag}</span>
                <span className="font-medium mr-1">{selectedCountry.dialCode}</span>
              </>
            ) : (
              <span>Select</span>
            )}
            <ChevronDown size={16} className="ml-1" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-60 p-0">
          <div className="p-2">
            <div className="flex items-center border rounded-md mb-2">
              <Search size={16} className="ml-2 text-gray-500" />
              <Input
                placeholder="Search country or code..."
                className="border-0 focus-visible:ring-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <ScrollArea className="h-60">
              <div className="space-y-1">
                {filteredCountries.map((country) => (
                  <Button
                    key={country.code}
                    variant="ghost"
                    className="w-full justify-start font-normal"
                    onClick={() => handleSelectCountry(country)}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <span className="mr-2 text-lg">{country.flag}</span>
                        <span>{country.name}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-600">{country.dialCode}</span>
                        {selectedCountry?.code === country.code && (
                          <Check size={16} className="ml-2 text-green-500" />
                        )}
                      </div>
                    </div>
                  </Button>
                ))}
                {filteredCountries.length === 0 && (
                  <div className="text-center py-2 text-gray-500">No results found</div>
                )}
              </div>
            </ScrollArea>
          </div>
        </PopoverContent>
      </Popover>
      
      <Input
        type="tel"
        className="rounded-l-none"
        placeholder="Phone number"
        value={phoneNumber}
        onChange={handlePhoneChange}
      />
    </div>
  );
};

export default PhoneSelector;
