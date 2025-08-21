import { Link } from 'react-router-dom'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.box}>
          <h1 className={styles.title}>Campers of your dreams</h1>
          <p className={styles.subtitle}>You can find everything you want in our catalog</p>
          <Link to="/catalog" className={styles.cta}>View Now</Link>
        </div>
      </div>
    </section>
  )
}

