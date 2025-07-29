import Link from 'next/link';//Enables client-side routing
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.link}>Home</Link>
      <Link href="/articles" className={styles.link}>Articles</Link>
      <Link href="/category/featured">Category Featured Articles</Link>
    </nav>
  );
}
