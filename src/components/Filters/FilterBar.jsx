import { useDispatch, useSelector } from 'react-redux'
import { setLocation, setForm, toggleFeature, resetFilters } from '../../store/filtersSlice'
import styles from './FilterBar.module.css'

const VEHICLE_TYPES = [
  { value: '', label: 'Any type' },
  { value: 'van', label: 'Van' },
  { value: 'fullyIntegrated', label: 'Fully Integrated' },
  { value: 'alcove', label: 'Alcove' },
]

const EQUIPMENT = [
  { key: 'AC', label: 'AC' },
  { key: 'automatic', label: 'Automatic' },
  { key: 'petrol', label: 'Petrol' },
  { key: 'kitchen', label: 'Kitchen' },
  { key: 'TV', label: 'TV' },
  { key: 'bathroom', label: 'Bathroom' },
  { key: 'radio', label: 'Radio' },
  { key: 'refrigerator', label: 'Refrigerator' },
  { key: 'microwave', label: 'Microwave' },
  { key: 'gas', label: 'Gas' },
  { key: 'water', label: 'Water' },
]

export default function FilterBar({ onApply }) {
  const dispatch = useDispatch()
  const { location, form, features } = useSelector(s => s.filters)

  return (
    <aside className={styles.sidebar}>
      <h3 className={styles.caption}>Filters</h3>

      <div className={styles.group}>
        <label className={styles.label} htmlFor='loc'>Location</label>
        <input id='loc' className={styles.input} placeholder='City'
          value={location}
          onChange={(e)=>dispatch(setLocation(e.target.value))} />
      </div>

      <div className={styles.group}>
        <label className={styles.label} htmlFor='form'>Vehicle type</label>
        <select id='form' className={styles.select}
          value={form}
          onChange={(e)=>dispatch(setForm(e.target.value))}>
          {VEHICLE_TYPES.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </div>

      <fieldset className={styles.group}>
        <legend className={styles.label}>Vehicle equipment</legend>
        <div className={styles.features}>
          {EQUIPMENT.map(({key,label}) => (
            <label key={key} className={styles.checkbox}>
              <input type='checkbox'
                     checked={!!features[key]}
                     onChange={()=>dispatch(toggleFeature(key))}/>
              <span>{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className={styles.actions}>
        <button className={styles.btnPrimary} onClick={onApply}>Search</button>
        <button className={styles.btnGhost} onClick={()=>dispatch(resetFilters())}>Reset</button>
      </div>
    </aside>
  )
}
