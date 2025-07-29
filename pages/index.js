
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import CategoryCard from '../components/CategoryCard';
import { getCategories } from '../lib/api';

export async function getStaticProps() {
  const categories = await getCategories();

  return {
    props: { categories },
    revalidate: 60, // ISR every 60 seconds
  };
}

export default function Home({ categories }) {
  return (
    <main className={styles.container}>
      <Head>
        <title>Knowledge Base – Home</title>
        <meta name="description" content="A simple knowledge base using Strapi and Next.js" />
      </Head>

      <section className={styles.hero}>
        <h1>Welcome to the Knowledge Base</h1>
        <p>Explore technical articles and resources powered by Strapi + Next.js.</p>
      </section>

      <section className={styles.links}>
        <div className={styles.linkCard}>
          <Link href="/articles">📚 View All Featured Articles</Link>
        </div>

        <div className={styles.linkCard}>
          <h2>List of All Categories</h2>
          {categories.length > 0 ? (
            categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))
          ) : (
            <p>No categories found.</p>
          )}
        </div>
      </section>
    </main>
  );
}
