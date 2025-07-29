import Head from 'next/head';
import { getArticles, getCategoryBySlug, getCategories } from '../../lib/api';
import ArticleCard from '../../components/ArticleCard';
import Link from 'next/link';


export async function getStaticPaths() {
  const categories = await getCategories();

  console.log("Fetched categories:", categories);

  //  Filter out invalid slugs
  const validCategories = categories.filter(
    (cat) => typeof cat.slug === 'string' && cat.slug.trim() !== ''
  );

  return {
    paths: validCategories.map((cat) => ({
      params: { slug: cat.slug },
    })),
    fallback: 'blocking',
  };
}


export async function getStaticProps({ params }) {
  const category = await getCategoryBySlug(params.slug);

  if (!category) return { notFound: true };

  // Get all articles for this category
  const articles = category.articles || [];

  return {
    props: { category, articles },
    revalidate: 60, // ISR every 60 seconds
  };
}

export default function CategoryPage({ category, articles }) {
  return (
    <main style={{ padding: '2rem' }}>
      <Head>
        <title>{category.name} – Category</title>
      </Head>
      <div>
      <h1>Category: {category.name}</h1>
       <Link href="/" >← Back to Home</Link>
      </div>
      {articles.length === 0 ? (
        <p>No articles in this category.</p>
      ) : (
        <div>
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </main>
  );
}
