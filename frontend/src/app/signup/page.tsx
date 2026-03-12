export default function SignupPage() {
  return (
    <div className="max-w-md space-y-4 rounded-lg border bg-white p-6">
      <h2 className="text-2xl font-bold">Signup</h2>
      <input className="w-full rounded border p-2" placeholder="Full name" />
      <input className="w-full rounded border p-2" placeholder="Email" />
      <input className="w-full rounded border p-2" placeholder="Password" type="password" />
      <button className="w-full rounded bg-primary p-2 text-white">Create Account</button>
    </div>
  );
}
