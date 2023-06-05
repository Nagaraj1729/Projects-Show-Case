import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './App.css'

import Navbar from './components/Navbar'
import FailureView from './components/FailureView'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const apiStatusResult = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class App extends Component {
  state = {
    apiStatus: apiStatusResult.initial,
    activeCategory: categoriesList[0].id,
    projectsList: [],
  }

  componentDidMount() {
    this.getProjectsList()
  }

  getProjectsList = async () => {
    this.setState({apiStatus: apiStatusResult.inProgress})
    const {activeCategory} = this.state

    const apiUrl = `https://apis.ccbp.in/ps/projects?category=${activeCategory}`
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      const projectsData = data.projects
      const formattedData = projectsData.map(project => ({
        id: project.id,
        name: project.name,
        imageUrl: project.image_url,
      }))

      this.setState({
        projectsList: formattedData,
        apiStatus: apiStatusResult.success,
      })
    } else {
      this.setState({apiStatus: apiStatusResult.failure})
    }
  }

  onChangeCategory = event => {
    this.setState({activeCategory: event.target.value}, this.getProjectsList)
  }

  renderDropDownMenu = () => {
    const {activeCategory} = this.state
    return (
      <select
        className="drop-down-menu"
        onChange={this.onChangeCategory}
        value={activeCategory}
      >
        {categoriesList.map(category => (
          <option key={category.id} value={category.id} className="menu-option">
            {category.displayText}
          </option>
        ))}
      </select>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#328af2" height={50} width={50} />
    </div>
  )

  renderProjectsList = () => {
    const {projectsList} = this.state
    return (
      <ul className="projects-list">
        {projectsList.map(project => (
          <li key={project.id} className="project-card-item">
            <img
              className="project-img"
              src={project.imageUrl}
              alt={project.name}
            />
            <p className="project-title">{project.name}</p>
          </li>
        ))}
      </ul>
    )
  }

  renderAppropriateContent = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusResult.inProgress:
        return this.renderLoader()
      case apiStatusResult.success:
        return this.renderProjectsList()
      case apiStatusResult.failure:
        return <FailureView retryRequest={this.getProjectsList} />
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Navbar />
        <div className="app-container">
          <div className="app-content">
            {this.renderDropDownMenu()}
            {this.renderAppropriateContent()}
          </div>
        </div>
      </>
    )
  }
}

export default App
