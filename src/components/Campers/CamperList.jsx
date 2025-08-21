import { useSelector } from 'react-redux'
import CamperCard from './CamperCard'
import styles from './CamperList.module.css'


export default function CamperList() {
const items = useSelector(s => s.campers.items)


if (!items.length) {
return <p className={styles.empty}>No campers yet. Use filters and click Search.</p>
}


return (
<div className={styles.grid}>
{items.map(item => <CamperCard key={item.id} camper={item} />)}
</div>
)
}