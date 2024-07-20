import ModeToggle from "./ModeToggle";

export default function Navbar() {
  return (
    <div className="p-1 flex justify-between border-b">
      <h1 className="text-2xl">ShadcnUI React-Hook-Form Practice App</h1>
      <ModeToggle />
    </div>
  );
}
