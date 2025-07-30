
import styles from '../styles/ArticleCard.module.css';
import Link from 'next/link';

export default function ArticleCard({ article }) {

  // Destructure fields from the article object
  const { Title, Description, Content, Image, Slug } = article;

  // Get API base URL from .env.local file and Build full image URL if image exists
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const imageUrl = Image?.url ? `${API_URL}${Image.url}` : null;


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
