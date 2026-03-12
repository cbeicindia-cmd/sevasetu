const categories = ["Handloom", "Organic Foods", "Bamboo Crafts", "Terracotta", "Herbal Products"];
const artisans = ["Sita Devi (Madhubani)", "Ramesh Kumar (Khadi)", "Asha Bai (Handicrafts)"];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="rounded-xl bg-primary p-8 text-white">
        <h2 className="text-3xl font-bold">Empowering Rural Entrepreneurs Across India</h2>
        <p className="mt-2">Marketplace, AI assistance, schemes and incentives in one platform.</p>
      </section>

      <section>
        <h3 className="text-2xl font-semibold">Rural Product Categories</h3>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {categories.map((category) => (
            <div key={category} className="rounded-lg border bg-white p-4">{category}</div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-semibold">Featured Artisans</h3>
        <ul className="mt-3 list-disc pl-6">
          {artisans.map((artisan) => <li key={artisan}>{artisan}</li>)}
        </ul>
      </section>

      <section className="rounded-lg border bg-white p-4">
        <h3 className="text-xl font-semibold">Government Scheme Highlights</h3>
        <p>Quick access to central/state schemes with eligibility checks and application tracking.</p>
      </section>

      <section className="rounded-lg border bg-white p-4">
        <h3 className="text-xl font-semibold">Success Stories</h3>
        <p>Read how artisans increased income through digital commerce and incentives.</p>
      </section>
    </div>
  );
}
