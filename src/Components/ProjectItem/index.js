import './index.css'

const ProjectItem = props => {
  const {details} = props
  const {name, imageUrl} = details
  return (
    <li className="list-item">
      <img className="thumbnail" src={imageUrl} alt={name} />
      <p className="name-text">{name}</p>
    </li>
  )
}

export default ProjectItem
