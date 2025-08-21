export default function RatingStars({ value = 0 }){
const stars = Math.round(value)
return <span aria-label={`Rating: ${stars} of 5`}>{'★'.repeat(stars)}{'☆'.repeat(5 - stars)}</span>
}