const Button = ({ 
  children, 
  handleClick, 
  handleKeyDown, 
  customClassName, 
  ariaLabel = '' 
}) => {
  return (
    <button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={ariaLabel}
      className={`primary-button ${customClassName ? customClassName : ''}`}
    >
      {children}
    </button>
  )
}

export default Button