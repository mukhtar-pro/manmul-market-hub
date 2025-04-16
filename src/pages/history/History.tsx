
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { orders } from "@/data/mockData";
import { format } from "date-fns";
import Pagination from "@/components/common/Pagination";

const HistoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  
  // Filter and sort orders
  const filteredOrders = orders
    .filter(order => filterStatus === "all" || order.status === filterStatus)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Paginate orders
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle status filter change
  const handleStatusChange = (value: string) => {
    setFilterStatus(value);
    setCurrentPage(1); // Reset to first page when changing filter
  };

  // Handle items per page change
  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };
  
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

  return (
    <MainLayout>
      <div className="manmul-container py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Order History</h1>
            <p className="text-gray-600 mt-1">View and track your recent orders</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
            <Select value={filterStatus} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Orders" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Shipped">Shipped</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">Export History</Button>
          </div>
        </div>
        
        {currentOrders.length > 0 ? (
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            {currentOrders.map((order, index) => (
              <div key={order.id}>
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between">
                    <div>
                      <div className="font-medium">Order #{order.id}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        Placed on {format(new Date(order.date), "MMMM d, yyyy")}
                      </div>
                    </div>
                    
                    <div className="mt-4 sm:mt-0 flex flex-col sm:items-end">
                      <div className="mb-2">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="font-medium">${order.totalAmount.toFixed(2)}</div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="text-sm font-medium mb-2">Order Items:</h3>
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center mr-3">
                              <span className="text-xs">{item.quantity}x</span>
                            </div>
                            <div className="text-sm font-medium">{item.name}</div>
                          </div>
                          <div className="text-sm">${(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="outline" size="sm">Track Order</Button>
                    <Button variant="outline" size="sm">Buy Again</Button>
                  </div>
                </div>
                
                {index < currentOrders.length - 1 && <Separator />}
              </div>
            ))}
            
            {/* Pagination */}
            <div className="p-4 border-t">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="flex items-center mb-4 sm:mb-0">
                  <span className="text-sm text-gray-600 mr-2">Orders per page:</span>
                  <Select value={String(itemsPerPage)} onValueChange={handleItemsPerPageChange}>
                    <SelectTrigger className="w-16">
                      <SelectValue placeholder="5" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="text-sm text-gray-600 mb-4 sm:mb-0">
                  Showing {indexOfFirstOrder + 1}-{Math.min(indexOfLastOrder, filteredOrders.length)} of {filteredOrders.length} orders
                </div>
              </div>
              
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-sm rounded-lg p-8 text-center">
            <h3 className="text-lg font-medium mb-2">No orders found</h3>
            <p className="text-gray-600 mb-4">You have no orders matching the selected filter</p>
            {filterStatus !== "all" && (
              <Button variant="outline" onClick={() => setFilterStatus("all")}>View All Orders</Button>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default HistoryPage;
