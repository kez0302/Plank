import { useEffect, useState } from 'react';

type Health = { status: string; db: boolean };

export default function App() {
  const [health, setHealth] = useState<Health | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/health')
      .then((r) => r.json() as Promise<Health>)
      .then(setHealth)
      .catch(() => setError(true));
  }, []);

  return (
    <div style={{ fontFamily: 'monospace', padding: '2rem' }}>
      <h1>Plank</h1>
      {error && <p>Could not reach API.</p>}
      {health && (
        <p>
          API: <strong>{health.status}</strong> | DB:{' '}
          <strong>{health.db ? '✓' : '✗'}</strong>
        </p>
      )}
      {!health && !error && <p>Connecting...</p>}
    </div>
  );
}