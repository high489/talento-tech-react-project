import styles from './products-category-selector.module.css'
import { Form } from 'react-bootstrap'

const ProductsCategorySelector = ({
  categories = [],
  value = '',
  onChange = () => {},
  disabled = false,
  className = '',
  customStyle = {},
}) => {

  return (
    <Form.Select
      aria-label='Seleccioná categoría de producto'
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`${styles['products-category-selector']} ${className}`}
      style={customStyle}
    >
      <option value=''>Todas las categorías</option>
      {categories.map((cat, index) => (
        <option key={index} value={cat.slug}>
          {cat.name}
        </option>
      ))}
    </Form.Select>
  )
}

export { ProductsCategorySelector }