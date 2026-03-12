export const simplePage = (title: string, bullets: string[]) => (
  <div className="space-y-4">
    <h2 className="text-3xl font-bold">{title}</h2>
    <ul className="list-disc space-y-1 pl-6">
      {bullets.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);
