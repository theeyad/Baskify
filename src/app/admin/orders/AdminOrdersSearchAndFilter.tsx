import {
  Search,
} from "lucide-react";

export default function AdminOrdersSearchAndFilter({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
}: {searchQuery: string, setSearchQuery: (query: string) => void, statusFilter: string, setStatusFilter: (filter: string) => void}) {
  const statusOptions = [
    "all",
    "pending",
    "paid",
    "shipped",
    "delivered",
    "cancelled",
  ];

  return (
    <>
      {/* Filter and Search Bar */}
      <div className="bg-sidebar border border-border rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by Order ID or Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-input bg-background outline-none focus:border-muted transition-colors"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize cursor-default whitespace-nowrap ${
                statusFilter === status
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
