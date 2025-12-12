import styles from './pagination-controls.module.css'
import { Pagination } from 'react-bootstrap'

const PaginationControls = ({ page = 1, totalPages = 1, onChange }) => {
  if (totalPages <= 1) return null

  const pageNumbers = []

  // Always show first page
  if (page > 2) { pageNumbers.push(1) }
  // Ellipsis left
  if (page > 3) { pageNumbers.push('left-ellipsis') }
  // Current -1
  if (page > 1) { pageNumbers.push(page - 1) }
  // Current
  pageNumbers.push(page)
  // Current +1
  if (page < totalPages) { pageNumbers.push(page + 1)}
  // Ellipsis right
  if (page < totalPages - 2) { pageNumbers.push('right-ellipsis') }
  // Last page
  if (page < totalPages - 1) { pageNumbers.push(totalPages) }

  return (
    <Pagination className={`align-self-center my-4 ${styles['pagination-controls']}`}>
      <Pagination.Prev
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      />

      {pageNumbers.map((num, index) => {
        if (num === 'left-ellipsis' || num === 'right-ellipsis') {
          return (
            <Pagination.Ellipsis
              key={num + index}
              disabled 
            />
          )
        }

        return (
          <Pagination.Item
            key={num}
            active={num === page}
            onClick={() => onChange(num)}
          >
            {num}
          </Pagination.Item>
        )
      })}

      <Pagination.Next
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
      />
    </Pagination>
  )
}

export { PaginationControls }
