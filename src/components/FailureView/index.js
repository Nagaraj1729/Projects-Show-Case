import './index.css'

const FailureView = props => {
  const {retryRequest} = props
  const onClickRetryButton = () => {
    retryRequest()
  }
  return (
    <div className="failure-view-page">
      <img
        className="failure-view-img"
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png "
        alt="failure view"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="retry-button"
        type="button"
        onClick={onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )
}
export default FailureView
