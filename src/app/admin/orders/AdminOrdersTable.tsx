"use client";

import { useState, useEffect, useOptimistic, useTransition } from "react";
import { updateOrderStatus } from "@/actions/admin";
import { formatDate, formatCurrency } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  Eye,
  CheckCircle2,
  Truck,
  PackageCheck,
  XCircle,
  Clock,
  Loader2,
} from "lucide-react";
import { AdminOrder, AdminOrdersTableProps } from "@/lib/validation/types";
import AdminOrdersMetrics from "@/app/admin/orders/AdminOrdersMetrics";
import AdminOrdersDetailsSheet from "@/app/admin/orders/AdminOrdersDetailsSheet";

export default function AdminOrdersTable({
  orders,
  profiles,
  searchQuery,
  statusFilter,
}: AdminOrdersTableProps) {
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [, startTransition] = useTransition();

  // Optimistic Orders state
  const [optimisticOrders, setOptimisticOrders] = useOptimistic(
    orders,
    (currentOrders, update: { orderId: string; newStatus: string }) =>
      currentOrders.map((order) =>
        order.id === update.orderId
          ? {
              ...order,
              status: update.newStatus,
              updated_at: new Date().toISOString(),
            }
          : order,
      ),
  );

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Filter orders
  const filteredOrders = optimisticOrders.filter((order) => {
    const matchesStatus =
      statusFilter === "all" ||
      order.status.toLowerCase() === statusFilter.toLowerCase();

    const customerName =
      (order.user_id && profiles[order.user_id]?.full_name) ||
      order.shipping_address?.fullName ||
      "Guest Customer";

    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.stripe_payment_intent_id &&
        order.stripe_payment_intent_id
          .toLowerCase()
          .includes(searchQuery.toLowerCase()));

    return matchesStatus && matchesSearch;
  });

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, itemsPerPage]);

  // Calculate pagination metrics
  const totalPages = Math.max(
    1,
    Math.ceil(filteredOrders.length / itemsPerPage),
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredOrders.length);
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Calculate metrics
  const totalRevenue = optimisticOrders.reduce(
    (acc, o) => (o.status !== "cancelled" ? acc + Number(o.total_amount) : acc),
    0,
  );
  const pendingCount = optimisticOrders.filter(
    (o) => o.status === "pending",
  ).length;
  const deliveredCount = optimisticOrders.filter(
    (o) => o.status === "delivered",
  ).length;

  function handleStatusChange(orderId: string, newStatus: string) {
    setUpdatingId(orderId);
    startTransition(async () => {
      setOptimisticOrders({ orderId, newStatus });
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder((prev) =>
          prev ? { ...prev, status: newStatus } : null,
        );
      }
      try {
        await updateOrderStatus(orderId, newStatus);
      } finally {
        setUpdatingId(null);
      }
    });
  }

  function getStatusBadge(status: string) {
    const s = status.toLowerCase();
    switch (s) {
      case "paid":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" /> Paid
          </span>
        );
      case "shipped":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 border border-blue-500/20">
            <Truck className="w-3 h-3" /> Shipped
          </span>
        );
      case "delivered":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 border border-indigo-500/20">
            <PackageCheck className="w-3 h-3" /> Delivered
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 border border-rose-500/20">
            <XCircle className="w-3 h-3" /> Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20">
            <Clock className="w-3 h-3" /> Pending
          </span>
        );
    }
  }

  // Generate page numbers for pagination
  function getPageNumbers() {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, "...", totalPages];
    }
    if (currentPage >= totalPages - 2) {
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, "...", currentPage, "...", totalPages];
  }

  return (
    <div className="space-y-6">
      {/* Top Metrics Grid */}
      <AdminOrdersMetrics
        ordersLength={orders.length}
        totalRevenue={totalRevenue}
        pendingCount={pendingCount}
        deliveredCount={deliveredCount}
      />

      {/* Orders Data Table */}
      <div className="bg-sidebar border border-border rounded-xl overflow-hidden shadow-xs">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-27.5">Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedOrders.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-12 text-muted-foreground text-xs"
                >
                  No orders found matching your criteria.
                </TableCell>
              </TableRow>
            ) : (
              paginatedOrders.map((order) => {
                const shortId = order.id.substring(0, 8).toUpperCase();
                const customerName =
                  (order.user_id && profiles[order.user_id]?.full_name) ||
                  order.shipping_address?.fullName ||
                  "Guest Customer";

                return (
                  <TableRow key={order.id}>
                    {/* Order ID */}
                    <TableCell className="font-mono text-xs font-semibold">
                      #{shortId}
                    </TableCell>

                    {/* Customer */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground text-xs">
                          {customerName}
                        </span>
                      </div>
                    </TableCell>

                    {/* Date */}
                    <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatDate(new Date(order.created_at))}
                    </TableCell>

                    {/* Items */}
                    <TableCell className="text-xs text-muted-foreground">
                      {order.order_items?.length || 0} item(s)
                    </TableCell>

                    {/* Total */}
                    <TableCell className="font-bold text-xs text-foreground">
                      {formatCurrency(order.total_amount)}
                    </TableCell>

                    {/* Status */}
                    <TableCell>{getStatusBadge(order.status)}</TableCell>

                    {/* Actions Dropdown */}
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <Button
                              variant="ghost"
                              size="icon-xs"
                              className="cursor-default"
                              disabled={updatingId === order.id}
                            >
                              {updatingId === order.id ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <MoreHorizontal className="w-4 h-4" />
                              )}
                            </Button>
                          }
                        />
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => setSelectedOrder(order)}
                            className="cursor-default"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />
                          <DropdownMenuLabel>Update Status</DropdownMenuLabel>

                          <DropdownMenuItem
                            onClick={() => handleStatusChange(order.id, "paid")}
                            disabled={order.status === "paid"}
                            className="cursor-default"
                          >
                            <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600" />
                            Mark Paid
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(order.id, "shipped")
                            }
                            disabled={order.status === "shipped"}
                            className="cursor-default"
                          >
                            <Truck className="w-4 h-4 mr-2 text-blue-600" />
                            Mark Shipped
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(order.id, "delivered")
                            }
                            disabled={order.status === "delivered"}
                            className="cursor-default"
                          >
                            <PackageCheck className="w-4 h-4 mr-2 text-indigo-600" />
                            Mark Delivered
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(order.id, "cancelled")
                            }
                            disabled={order.status === "cancelled"}
                            variant="destructive"
                            className="cursor-default"
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Cancel Order
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        {/* Pagination Footer */}
        {filteredOrders.length > 0 && (
          <div className="border-t border-border px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Range & Total info */}
            <div className="text-xs text-muted-foreground font-medium">
              Showing{" "}
              <span className="text-foreground font-bold">
                {startIndex + 1}
              </span>{" "}
              to <span className="text-foreground font-bold">{endIndex}</span>{" "}
              of{" "}
              <span className="text-foreground font-bold">
                {filteredOrders.length}
              </span>{" "}
              orders
            </div>

            {/* Pagination Controls & Rows Per Page */}
            <div className="flex items-center gap-4">
              {/* Rows Per Page Selector */}
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span>Rows per page:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="bg-background border border-input rounded-md px-2 py-1 text-xs outline-none focus:border-muted cursor-default"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>

              {/* shadcn Pagination */}
              <Pagination className="w-auto mx-0">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) setCurrentPage((p) => p - 1);
                      }}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-40 cursor-default"
                          : "cursor-default"
                      }
                    />
                  </PaginationItem>

                  {getPageNumbers().map((page, i) => (
                    <PaginationItem key={i}>
                      {page === "..." ? (
                        <PaginationEllipsis />
                      ) : (
                        <PaginationLink
                          isActive={currentPage === page}
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(Number(page));
                          }}
                          className="cursor-default"
                        >
                          {page}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages)
                          setCurrentPage((p) => p + 1);
                      }}
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-40 cursor-default"
                          : "cursor-default"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        )}
      </div>

      {/* Slide-out Order Details Sheet */}
      <AdminOrdersDetailsSheet
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
        profiles={profiles}
        getStatusBadge={getStatusBadge}
      />
    </div>
  );
}
