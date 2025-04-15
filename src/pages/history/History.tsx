
import MainLayout from "@/components/layout/MainLayout";
import { orders } from "@/data/mockData";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  CheckCircle,
  Truck,
  Clock,
  XCircle
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

type OrderStatus = "Delivered" | "Shipped" | "Processing" | "Cancelled";

const getStatusBadge = (status: OrderStatus) => {
  switch (status) {
    case "Delivered":
      return (
        <Badge className="bg-green-500 hover:bg-green-600">
          <CheckCircle size={12} className="mr-1" />
          Delivered
        </Badge>
      );
    case "Shipped":
      return (
        <Badge className="bg-blue-500 hover:bg-blue-600">
          <Truck size={12} className="mr-1" />
          Shipped
        </Badge>
      );
    case "Processing":
      return (
        <Badge className="bg-yellow-500 hover:bg-yellow-600">
          <Clock size={12} className="mr-1" />
          Processing
        </Badge>
      );
    case "Cancelled":
      return (
        <Badge className="bg-red-500 hover:bg-red-600">
          <XCircle size={12} className="mr-1" />
          Cancelled
        </Badge>
      );
    default:
      return (
        <Badge variant="outline">
          {status}
        </Badge>
      );
  }
};

const HistoryPage = () => {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  
  const toggleOrderExpand = (orderId: string) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <MainLayout>
      <div className="manmul-container">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Order History</h1>
        
        {orders.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="w-[80px]">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <>
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">#{order.id.split('-')[1]}</TableCell>
                      <TableCell>{formatDate(order.date)}</TableCell>
                      <TableCell>
                        {getStatusBadge(order.status as OrderStatus)}
                      </TableCell>
                      <TableCell className="text-right">${order.totalAmount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => toggleOrderExpand(order.id)}
                        >
                          {expandedOrder === order.id ? (
                            <ChevronUp size={18} />
                          ) : (
                            <ChevronDown size={18} />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                    
                    {/* Order Details Row */}
                    {expandedOrder === order.id && (
                      <TableRow className="bg-gray-50">
                        <TableCell colSpan={5} className="p-0">
                          <div className="p-4">
                            <h4 className="font-medium text-gray-800 mb-3">Order Items</h4>
                            <div className="divide-y">
                              {order.items.map((item) => (
                                <div key={item.id} className="py-2 flex justify-between items-center">
                                  <div className="flex-1">
                                    <Link 
                                      to={`/products/${item.productId}`}
                                      className="text-manmul-600 hover:text-manmul-700 flex items-center"
                                    >
                                      {item.name}
                                      <ExternalLink size={14} className="ml-1" />
                                    </Link>
                                    <div className="text-sm text-gray-500">
                                      Quantity: {item.quantity} × ${item.price.toFixed(2)}
                                    </div>
                                  </div>
                                  <div className="font-medium">
                                    ${(item.price * item.quantity).toFixed(2)}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock size={24} className="text-gray-400" />
            </div>
            
            <h3 className="text-lg font-medium text-gray-800 mb-2">No Order History</h3>
            <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
            
            <Button asChild>
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default HistoryPage;
