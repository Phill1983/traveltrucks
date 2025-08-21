import { NavLink, Outlet } from 'react-router-dom'
import styles from './Layout.module.css'


export default function Layout() {
return (
<div className={styles.wrapper}>
<header className={styles.header}>
<div className="container">
<nav className={styles.nav}>
<NavLink to='/' className={styles.logo}>
<span>TravelTrucks</span>
</NavLink>
<div className={styles.links}>
<NavLink to='/' className={({isActive}) => isActive ? styles.active : undefined}>Home</NavLink>
<NavLink to='/catalog' className={({isActive}) => isActive ? styles.active : undefined}>Catalog</NavLink>
</div>
</nav>
</div>
</header>


<main>
<Outlet />
</main>


<footer className={styles.footer}>
<div className="container">© {new Date().getFullYear()} TravelTrucks</div>
</footer>
</div>
)
}