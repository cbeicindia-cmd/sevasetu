import Link from "next/link";

const links = [
  ["/", "Home"],
  ["/marketplace", "Marketplace"],
  ["/government-schemes", "Government Schemes"],
  ["/become-seller", "Become a Seller"],
  ["/about", "About"],
  ["/contact", "Contact"],
  ["/login", "Login"]
];

export default function Nav() {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <h1 className="text-xl font-bold text-primary">Gramin Udyog</h1>
        <div className="flex gap-4 text-sm">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className="hover:text-primary">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
