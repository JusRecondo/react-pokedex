import { Oval } from 'react-loader-spinner'

const Loader = ({ fullPage }) => {
  return (
    <div className={`loader${fullPage ? ' full-page' : ''}`}>
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#FF0000"
        secondaryColor="#FFDE00"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  )
}

export default Loader