import { useDispatch, useSelector } from 'react-redux'
import FilterBar from '../components/Filters/FilterBar'
import CamperList from '../components/Campers/CamperList'
import Loader from '../components/Shared/Loader'
import { reset, nextPage, fetchCampersThunk } from '../store/campersSlice'


export default function Catalog(){
const dispatch = useDispatch()
const { items, total, loading } = useSelector(s => s.campers)


const handleApply = () => {
// ВАЖЛИВО: скидаємо попередні результати перед новим фільтром
dispatch(reset())
dispatch(fetchCampersThunk())
}


const handleLoadMore = () => {
dispatch(nextPage())
dispatch(fetchCampersThunk())
}


const canLoadMore = items.length < total && !loading


return (
<section className="container" style={{ display:'grid', gridTemplateColumns:'280px 1fr', gap:'24px', padding:'24px 0' }}>
<FilterBar onApply={handleApply} />


<div>
<h2 style={{margin:'0 0 16px'}}>All campers</h2>
{loading && !items.length ? <Loader/> : <CamperList />}


<div style={{display:'flex', justifyContent:'center', marginTop:16, gap:8}}>
<button disabled={!canLoadMore} onClick={handleLoadMore}>Load More</button>
</div>
</div>
</section>
)
}