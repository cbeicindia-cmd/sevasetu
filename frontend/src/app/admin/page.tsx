import { simplePage } from "../../lib/pageFactory";

export default function AdminPage() {
  return simplePage("Admin Panel", [
    "Super Admin / Govt Officer / Marketplace Manager / District Coordinator roles",
    "Approve sellers and products",
    "Manage incentives, payments and analytics"
  ]);
}
