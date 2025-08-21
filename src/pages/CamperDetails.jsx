import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchCamperById } from '../api/campersApi'
import Loader from '../components/Shared/Loader'

export default function CamperDetails() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let alive = true
    setLoading(true)
    fetchCamperById(id)
      .then((res) => {
        if (!alive) return
        setData(res)
        setError(null)
      })
      .catch((e) => {
        if (!alive) return
        setError(e?.message || 'Fetch error')
      })
      .finally(() => {
        if (!alive) return
        setLoading(false)
      })
    return () => {
      alive = false
    }
  }, [id])

  if (loading) {
    return (
      <section className="container" style={{ padding: '24px 0' }}>
        <Loader />
      </section>
    )
  }
  if (error) {
    return (
      <section className="container" style={{ padding: '24px 0' }}>
        <p style={{ color: 'crimson' }}>Error: {error}</p>
      </section>
    )
  }
  if (!data) return null

  const { name, gallery = [], location, price, rating, reviews = [], ...rest } = data

  return (
    <section className="container" style={{ padding: '24px 0' }}>
      <h1 style={{ margin: '0 0 8px' }}>{name}</h1>
      <p style={{ color: '#6b7280', margin: '0 0 16px' }}>
        📍 {location} • {Number(price || 0).toFixed(2)} • Rating {rating ?? '-'} / 5
      </p>

      {/* Gallery */}
      <section style={{ marginBottom: 24 }}>
        <h2>Gallery</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {gallery.slice(0, 4).map((src, i) => (
            <img key={i} src={src} alt={`${name} ${i + 1}`} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ marginBottom: 24 }}>
        <h2>Features</h2>
        <ul>
          {[
            'transmission',
            'engine',
            'AC',
            'bathroom',
            'kitchen',
            'TV',
            'radio',
            'refrigerator',
            'microwave',
            'gas',
            'water',
          ].map((key) => (rest[key] ? <li key={key}>{key}: {String(rest[key])}</li> : null))}
        </ul>
      </section>

      {/* Details */}
      <section style={{ marginBottom: 24 }}>
        <h2>Details</h2>
        <ul>
          {['form', 'length', 'width', 'height', 'tank', 'consumption'].map((key) =>
            rest[key] ? <li key={key}>{key}: {String(rest[key])}</li> : null
          )}
        </ul>
      </section>

      {/* Reviews */}
      <section style={{ marginBottom: 24 }}>
        <h2>Reviews</h2>
        {reviews?.length ? (
          <ul>
            {reviews.map((r, i) => {
              const stars = Math.round(r.rating || 0)
              return (
                <li key={i}>
                  {'★'.repeat(stars)}
                  {'☆'.repeat(5 - stars)} — {r.comment || 'No comment'}
                </li>
              )
            })}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}
      </section>

      {/* Booking form */}
      <section>
        <h2>Book this camper</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            alert('Booking successful!')
          }}
        >
          <div style={{ display: 'grid', gap: 8, maxWidth: 400 }}>
            <input name="name" placeholder="Your name" required />
            <input name="email" type="email" placeholder="Email" required />
            <input name="date" type="date" required />
            <textarea name="comment" placeholder="Comments" rows="3"></textarea>
            <button type="submit">Send</button>
          </div>
        </form>
      </section>
    </section>
  )
}
