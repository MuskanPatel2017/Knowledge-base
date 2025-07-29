import { useState, useMemo } from 'react';
import Head from 'next/head';//SEO meta tags
import { getArticles } from '../../lib/api'; //Server-side data from Strapi
import ArticleCard from '../../components/ArticleCard';
import Link from 'next/link';
import styles from '../../styles/ArticlePage.module.css';

 // SSG with Incremental Static Regeneration
export async function getStaticProps() {
  const articles = await getArticles();
  return {
    props: { articles },
    revalidate: 60,
  };
}

export default function ArticlesPage({ articles }) {
  const [query, setQuery] = useState('');
  const [inputValue, setInputValue] = useState('');

  useMemo(() => {
    const timeout = setTimeout(() => setQuery(inputValue), 300);
    return () => clearTimeout(timeout);
  }, [inputValue]);
 // Search filter (client-side)
  
const filteredArticles = useMemo(() => {
  const q = query.toLowerCase();

  return articles.filter((a) =>
    (a.Title?.toLowerCase().includes(q)) ||
    (a.Description?.toLowerCase().includes(q))
  );
}, [query, articles]);

console.log('Articles:', articles);

// return articles.map((article) => ( ... )) just to verify

  return (
    <main style={{ padding: '2rem' }}>
      <Head>
        <title>Articles – Knowledge Base</title>
      </Head>

      <h1>All Articles</h1>

      <div className={styles.headerContainer}>
        <input
          type="text"
          placeholder="Search articles..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{
            padding: '0.5rem',
            width: '100%',
            maxWidth: '400px',
            margin: '1rem 0',
            fontSize: '1rem',
          }}
        />
        <Link href="/" className={styles.backLink}>← Back to Home</Link>
      </div>

      {filteredArticles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        filteredArticles.map((article) => (
          <ArticleCard  key={article.id} article={article} />
        ))
      )}
      
    </main>
  );
}
