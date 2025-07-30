// pages/category/featured.js

import Head from 'next/head';
import { getFeaturedCategory } from '../../lib/api';
import ArticleCard from '../../components/ArticleCard';
import Link from 'next/link';
import styles from '../../styles/ArticlePage.module.css';

export async function getStaticProps() {
  const category = await getFeaturedCategory();
  if (!category) return { notFound: true };

  return {
    props: {
      category,
      articles: category.articles || [],
    },
    revalidate: 60, // ISR every 60 seconds
  };
}

//This is the React component rendered for `/category/featured` route
export default function FeaturedCategoryPage({ category, articles }) {
  return (
    <main style={{ padding: '2rem' }}>
      <Head><title>{category.Title} Articles – Knowledge Base</title>
      <Link href="/" className={styles.backLink}>← Back to Home</Link>
      </Head>

      <h1>{category.Title}</h1>
      
      {articles.length === 0 ? (
        <p>No articles yet.</p>
      ) : (
        articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))
      )}
    </main>
  );
}
