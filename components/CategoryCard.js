
import Link from 'next/link';

export default function CategoryCard({ category }) {
  return (
    <section style={{ border: '1px solid #ddd', padding: '1rem', margin: '0.5rem 0' }}>
      <h3>
        <Link href={`/category/${category.slug}`}>
          {category.name}
        </Link>
      </h3>
    </section>
  );
}
