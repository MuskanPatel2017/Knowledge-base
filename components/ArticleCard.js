
import styles from '../styles/ArticleCard.module.css';
import Link from 'next/link';

export default function ArticleCard({ article }) {
  const { Title, Description, Content, Image, Slug } = article;

  const imageUrl = Image?.url ? `http://localhost:1337${Image.url}` : null;

  // Flatten the content blocks into a plain string for preview
  const previewText = Content?.map((block) =>
    block.children.map((child) => child.text).join('')
  ).join(' ');

  return (
    <div className={styles.card}>
      {imageUrl && <img src={imageUrl} alt={Title} className={styles.image} />}

      <h2 className={styles.title}>
        <Link href={`/articles/${Slug}`}>{Title}</Link>
      </h2>

      <p className={styles.description}>Description: {Description}</p>

      <p className={styles.contentClamp}>{previewText}</p>

      <Link href={`/articles/${Slug}`}>Read more →</Link>
    </div>
  );
}
