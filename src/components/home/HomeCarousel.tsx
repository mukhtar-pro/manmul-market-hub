
import { useState, useEffect } from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Define carousel items
const carouselItems = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop",
    title: "Shop the Latest Tech",
    description: "Discover cutting-edge electronics and gadgets"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop",
    title: "Fashion Forward",
    description: "Explore trendy clothing and accessories"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?q=80&w=2070&auto=format&fit=crop",
    title: "Home Essentials",
    description: "Everything you need for a beautiful home"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=2070&auto=format&fit=crop",
    title: "Gifts for Everyone",
    description: "Find the perfect present for any occasion"
  }
];

const HomeCarousel = () => {
  // Auto-slide functionality
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Carousel 
      className="w-full max-w-5xl mx-auto rounded-xl overflow-hidden"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {carouselItems.map((item) => (
          <CarouselItem key={item.id}>
            <div className="relative h-[300px] md:h-[400px] w-full">
              {/* Image */}
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover" 
              />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center p-8 text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">{item.title}</h2>
                <p className="text-sm md:text-base mb-4 max-w-md">{item.description}</p>
                <button className="bg-white text-black hover:bg-gray-200 transition-colors w-fit py-2 px-4 rounded-md font-medium">
                  Shop Now
                </button>
              </div>
              
              {/* Indicator dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {carouselItems.map((_, index) => (
                  <div 
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      currentIndex === index ? "bg-white" : "bg-white/50"
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
};

export default HomeCarousel;
