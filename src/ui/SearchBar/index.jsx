import styles from './search-bar.module.css'
import { Form } from 'react-bootstrap'

import SearchIcon from '@public/assets/icons/search-icon.svg?react'
import ClearSearchIcon from '@public/assets/icons/clear-search-icon.svg?react'

const SearchBar = ({
  value,
  onChange,
  placeholder = 'Buscar productos...',
  className = '',
  customStyle = {},
}) => {
  const handleClear = () => { onChange('') }

  return (
    <div className={`w-100 d-flex align-items-center ${styles['search-bar-wrapper']}`}>
      <SearchIcon
        className={styles['search-icon']}
      />
      <Form.Control
        type='text'
        value={value}
        placeholder={placeholder}
        className={`${styles['products-search']} ${className}`}
        style={customStyle}
        onChange={e => onChange(e.target.value)}
      />
      {value && (
        <button
          type='button'
          className={styles['clear-button']}
          onClick={handleClear}
          aria-label='Limpiar búsqueda'
        >
          <ClearSearchIcon
            className={styles['clear-icon']}
          />
        </button>
      )}
    </div>
    
  )
}

export { SearchBar }