
import React from 'react';

// Custom layout wrapper for consistent header/footer across all pages

export default function Layout({ children }) {
  return (
    <div>
      <header style={{ padding: '1rem', background: '#f0f0f0' }}>
        <h1>Knowledge Base</h1>
      </header>
      <main style={{ padding: '1rem' }}>{children}</main>
      <footer style={{ padding: '1rem', background: '#f0f0f0' }}>
        <small>&copy; 2025 Knowledge Base</small>
      </footer>
    </div>
  );
}
