
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Package, 
  Truck, 
  Clock, 
  MapPin, 
  Phone, 
  Mail,
  FileText,
  CalendarDays,
  CreditCard,
  CheckCircle2,
  XCircle,
  Printer,
  Share2
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { orders } from "@/data/mockData";
import MainLayout from "@/components/layout/MainLayout";

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Find the order based on the ID
  const order = orders.find(o => o.id === id);
  
  if (!order) {
    return (
      <MainLayout>
        <div className="manmul-container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <p className="text-gray-600 mb-6">The order you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/history')}>
            <ArrowLeft size={16} className="mr-2" />
            Back to Order History
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get delivery icon based on status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle2 size={40} className="text-green-500" />;
      case "Shipped":
        return <Truck size={40} className="text-blue-500" />;
      case "Processing":
        return <Package size={40} className="text-yellow-500" />;
      case "Cancelled":
        return <XCircle size={40} className="text-red-500" />;
      default:
        return <Package size={40} className="text-gray-500" />;
    }
  };
  
  // Calculate order summary
  const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 5.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <MainLayout>
      <div className="manmul-container py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => navigate('/history')} className="mr-2">
            <ArrowLeft size={18} />
          </Button>
          <h1 className="text-2xl font-bold">Order #{order.id}</h1>
        </div>
        
        {/* Order Status Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex items-center mb-4 md:mb-0">
              {getStatusIcon(order.status)}
              <div className="ml-4">
                <h2 className="text-lg font-medium">Order Status</h2>
                <div className="flex items-center mt-1">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">
                    Last Updated: {format(new Date(order.date), "MMM d, yyyy - h:mm a")}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <Printer size={16} className="mr-2" />
                Print Receipt
              </Button>
              <Button variant="outline" size="sm">
                <Share2 size={16} className="mr-2" />
                Share
              </Button>
            </div>
          </div>
          
          {/* Order Timeline */}
          <div className="mt-8">
            <h3 className="text-sm font-medium mb-4">Order Timeline</h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-3 top-1 w-0.5 h-full bg-gray-200"></div>
              
              {/* Timeline items */}
              <div className="space-y-6">
                <div className="flex">
                  <div className="relative flex items-center justify-center w-6 h-6 rounded-full border-2 border-blue-500 bg-white z-10">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium">Order Placed</p>
                    <p className="text-xs text-gray-500">{format(new Date(order.date), "MMM d, yyyy - h:mm a")}</p>
                  </div>
                </div>
                
                {order.status !== "Cancelled" && (
                  <>
                    <div className="flex">
                      <div className={`relative flex items-center justify-center w-6 h-6 rounded-full border-2 ${order.status === "Processing" || order.status === "Shipped" || order.status === "Delivered" ? "border-blue-500" : "border-gray-300"} bg-white z-10`}>
                        <div className={`w-2 h-2 ${order.status === "Processing" || order.status === "Shipped" || order.status === "Delivered" ? "bg-blue-500" : "bg-gray-300"} rounded-full`}></div>
                      </div>
                      <div className="ml-4">
                        <p className={`text-sm ${order.status === "Processing" || order.status === "Shipped" || order.status === "Delivered" ? "font-medium" : "text-gray-500"}`}>Processing</p>
                        {order.status === "Processing" || order.status === "Shipped" || order.status === "Delivered" ? (
                          <p className="text-xs text-gray-500">{format(new Date(order.date), "MMM d, yyyy")}</p>
                        ) : (
                          <p className="text-xs text-gray-400">Pending</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className={`relative flex items-center justify-center w-6 h-6 rounded-full border-2 ${order.status === "Shipped" || order.status === "Delivered" ? "border-blue-500" : "border-gray-300"} bg-white z-10`}>
                        <div className={`w-2 h-2 ${order.status === "Shipped" || order.status === "Delivered" ? "bg-blue-500" : "bg-gray-300"} rounded-full`}></div>
                      </div>
                      <div className="ml-4">
                        <p className={`text-sm ${order.status === "Shipped" || order.status === "Delivered" ? "font-medium" : "text-gray-500"}`}>Shipped</p>
                        {order.status === "Shipped" || order.status === "Delivered" ? (
                          <p className="text-xs text-gray-500">{format(new Date(order.date), "MMM d, yyyy")}</p>
                        ) : (
                          <p className="text-xs text-gray-400">Pending</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className={`relative flex items-center justify-center w-6 h-6 rounded-full border-2 ${order.status === "Delivered" ? "border-blue-500" : "border-gray-300"} bg-white z-10`}>
                        <div className={`w-2 h-2 ${order.status === "Delivered" ? "bg-blue-500" : "bg-gray-300"} rounded-full`}></div>
                      </div>
                      <div className="ml-4">
                        <p className={`text-sm ${order.status === "Delivered" ? "font-medium" : "text-gray-500"}`}>Delivered</p>
                        {order.status === "Delivered" ? (
                          <p className="text-xs text-gray-500">{format(new Date(order.date), "MMM d, yyyy")}</p>
                        ) : (
                          <p className="text-xs text-gray-400">Pending</p>
                        )}
                      </div>
                    </div>
                  </>
                )}
                
                {order.status === "Cancelled" && (
                  <div className="flex">
                    <div className="relative flex items-center justify-center w-6 h-6 rounded-full border-2 border-red-500 bg-white z-10">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-red-600">Order Cancelled</p>
                      <p className="text-xs text-gray-500">{format(new Date(order.date), "MMM d, yyyy")}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Order Items */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-medium mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex items-start">
                      <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center mr-4">
                        <Package size={24} className="text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <div className="flex justify-between mt-2">
                          <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                          <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                    {index < order.items.length - 1 && <Separator className="my-4" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Order Info */}
          <div className="md:col-span-1">
            {/* Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-medium mb-4">Shipping Information</h2>
              <div className="space-y-3">
                <div className="flex">
                  <MapPin size={18} className="text-gray-500 mr-2" />
                  <span className="text-gray-600">123 Main Street, Apt 4B<br />New York, NY 10001</span>
                </div>
                <div className="flex">
                  <Phone size={18} className="text-gray-500 mr-2" />
                  <span className="text-gray-600">(555) 123-4567</span>
                </div>
                <div className="flex">
                  <Mail size={18} className="text-gray-500 mr-2" />
                  <span className="text-gray-600">user@example.com</span>
                </div>
              </div>
            </div>
            
            {/* Payment Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium mb-4">Payment Information</h2>
              <div className="space-y-3">
                <div className="flex">
                  <CreditCard size={18} className="text-gray-500 mr-2" />
                  <span className="text-gray-600">•••• •••• •••• 4242</span>
                </div>
                <div className="flex">
                  <CalendarDays size={18} className="text-gray-500 mr-2" />
                  <span className="text-gray-600">Billed on {format(new Date(order.date), "MMMM d, yyyy")}</span>
                </div>
                <div className="flex">
                  <FileText size={18} className="text-gray-500 mr-2" />
                  <span className="text-gray-600">Invoice #INV-{order.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={() => navigate('/history')}>
            <ArrowLeft size={16} className="mr-2" />
            Back to Orders
          </Button>
          <div className="space-x-2">
            {order.status !== "Cancelled" && (
              <Button variant="destructive">
                Cancel Order
              </Button>
            )}
            <Button>Contact Support</Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderDetails;
