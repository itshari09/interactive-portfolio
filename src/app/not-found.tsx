import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="eyebrow">404 / LOST IN SPACE</p>
      <h1>This page took a different route.</h1>
      <p>The page you are looking for does not exist or has moved.</p>
      <Link className="button button-primary" href="/">Return home ↗</Link>
    </main>
  );
}
