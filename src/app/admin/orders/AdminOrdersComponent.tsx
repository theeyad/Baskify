"use client";

import { useState } from "react";
import AdminOrdersTable from "@/app/admin/orders/AdminOrdersTable";
import { AdminOrdersComponentProps } from "@/lib/validation/types";
import AdminOrdersSearchAndFilter from "@/app/admin/orders/AdminOrdersSearchAndFilter";

export default function AdminOrdersComponent({
  orders,
  profiles,
}: AdminOrdersComponentProps) {
  // Lifting state up
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  return (
    <>
      <AdminOrdersSearchAndFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <AdminOrdersTable
        orders={orders}
        profiles={profiles}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
    </>
  );
}
