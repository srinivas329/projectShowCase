import {Component} from 'react'

import Loader from 'react-loader-spinner'

import ProjectItem from '../ProjectItem'

import './index.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const apiResponse = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class ProjectShowCase extends Component {
  state = {
    projectsList: [],
    options: categoriesList[0].id,
    apiStatus: apiResponse.initial,
  }

  componentDidMount() {
    this.getProjectsList()
  }

  getProjectsList = async () => {
    this.setState({apiStatus: apiResponse.loading})
    const {options} = this.state
    const category = options.toUpperCase()
    console.log(category)
    const url = `https://apis.ccbp.in/ps/projects?category=${category}`
    const response = await fetch(url)
    const data = await response.json()
    const updatedDate = data.projects.map(each => ({
      id: each.id,
      name: each.name,
      imageUrl: each.image_url,
    }))
    if (response.ok === true) {
      this.setState({projectsList: updatedDate, apiStatus: apiResponse.success})
    } else {
      this.setState({apiStatus: apiResponse.failure})
    }
  }

  onChangeSelect = event => {
    this.setState({options: event.target.value}, this.getProjectsList)
  }

  getLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="lightblue" className="loader" />
    </div>
  )

  onClickRetry = () => {
    this.getTotalPageSection()
  }

  getProjectsPage = () => {
    const {projectsList} = this.state
    return (
      <div>
        <ul className="ul-list">
          {projectsList.map(each => (
            <ProjectItem details={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  getFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png "
        alt="failure view"
        className="failure-img"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button onClick={this.onClickRetry} type="button" className="retry-btn">
        Retry
      </button>
    </div>
  )

  getTotalPageSection = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiResponse.success:
        return this.getProjectsPage()
      case apiResponse.failure:
        return this.getFailure()
      case apiResponse.loading:
        return this.getLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <div className="header-bg">
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png "
            alt="website logo"
            className="logo"
          />
        </div>
        <select className="dropDown" onChange={this.onChangeSelect}>
          {categoriesList.map(each => (
            <option value={each.id}>{each.displayText}</option>
          ))}
        </select>
        {this.getTotalPageSection()}
      </div>
    )
  }
}

export default ProjectShowCase
