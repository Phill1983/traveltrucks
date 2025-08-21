import styles from './Button.module.css'
export default function Button({ as='button', className='', ...props }) {
const Comp = as
return <Comp className={`${styles.btn} ${className}`} {...props} />
}