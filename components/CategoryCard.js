// built-in Link component for client-side navigation
import Link from 'next/link';

export default function CategoryCard({ category }) {
  return (
    // Simple card layout using inline styles for spacing and border
    <section style={{ border: '1px solid #ddd', padding: '1rem', margin: '0.5rem 0' }}>
      <h3>
        <Link href={`/category/${category.slug}`}>
          {category.name}
        </Link>
      </h3>
    </section>
  );
}
