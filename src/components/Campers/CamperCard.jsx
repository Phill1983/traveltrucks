import { useDispatch, useSelector } from 'react-redux'
import { addFav, removeFav } from '../../store/favoritesSlice'
import { formatPrice, formatReviews } from '../../utils/format'
import styles from './CamperCard.module.css'

export default function CamperCard({ camper }) {
  const favs = useSelector(s => s.favorites.ids)
  const dispatch = useDispatch()
  const isFav = favs.includes(camper.id)
  const toggleFav = () => isFav ? dispatch(removeFav(camper.id)) : dispatch(addFav(camper.id))

  const { id, name, price, rating, reviews = [], location, gallery = [], description } = camper

  return (
    <article className={styles.card}>
      <img className={styles.cover} src={gallery?.[0] || 'https://placehold.co/280x200'} alt={name} />
      <div className={styles.body}>
        <div className={styles.row}>
          <h3 className={styles.title}>{name}</h3>
          <div className={styles.price}>{formatPrice(price)}</div>
        </div>

        <p className={styles.meta}>
          {formatReviews(rating, reviews)} {location ? ` ${location}` : ''}
        </p>

        {description && <p className={styles.desc}>{description}</p>}

        <ul className={styles.features}>
          {/* Перший ряд фіч, як у PDF прикладах */}
          {camper.transmission === 'automatic' && <li>Automatic</li>}
          {camper.engine === 'petrol' && <li>Petrol</li>}
          {camper.kitchen && <li>Kitchen</li>}
          {camper.AC && <li>AC</li>}
          {/* можна додати ще іконок за потреби */}
        </ul>

        <div className={styles.actions}>
          <a className={styles.more} href={`/catalog/${id}`} target="_blank" rel="noopener noreferrer">Show more</a>
          <button className={styles.fav} aria-pressed={isFav} onClick={toggleFav}>
            {isFav ? '♥ In favorites' : '♡ Add to favorites'}
          </button>
        </div>
      </div>
    </article>
  )
}
