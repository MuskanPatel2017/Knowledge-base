
// pages/articles/[slug].js
import Head from 'next/head';
import Image from 'next/image';
import { getArticles, getArticleBySlug } from '../../lib/api';
import Link from 'next/link';

export async function getStaticPaths() {
  const articles = await getArticles();

  return {
    paths: articles.map((a) => ({
      params: { slug: a.Slug }, // assuming Slug is capitalized
    })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  console.log('Fetching article for slug:', params.slug);
  const article = await getArticleBySlug(params.slug);

  if (!article) return { notFound: true };

  return {
    props: { article },
    revalidate: 60,
  };
}

export default function ArticleDetail({ article }) {
  if (!article) {
    return <p>Loading...</p>; // fallback rendering
  }

  const { Title, Description, Content, Image: coverImage } = article;
  const imageUrl = coverImage?.url
    ? `http://localhost:1337${coverImage.url}`
    : null;
console.log('slug',Title, Description);
console.log("articleDetail:", article);

  return (
    <main style={{ padding: '2rem' , height: '100vh', width: '100vw'}}>
      <Head>
        <title>{`${Title} – Knowledge Base`}</title>
        <meta name="description" content={Description || ''} />
      </Head>

      <h1>{Title}</h1>
      <p>{Description}</p>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={Title}
          width={800}
          height={600}
        />
      )}

      <article>
        {Content?.map((block, idx) => (
          <p key={idx}>
            {block.children?.map((child) => child.text).join('')}
          </p>
        ))}
      </article>
    
       <Link href="/" >← Back to Home</Link>
    </main>
  );
}
