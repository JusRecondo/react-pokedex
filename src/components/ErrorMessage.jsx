const ErrorMessage = ({ message = null }) => {
  return (
    <div className="error-message">
      {
        message ? (
          <p>{message}</p>
        ) : (
          <p>Ups! Something went wrong... Try again later!</p>
        )
      }
    </div>
  )
}

export default ErrorMessage