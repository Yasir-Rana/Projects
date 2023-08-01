import 'bootstrap/dist/css/bootstrap.min.css'
import './Card.css'

const Card = ({img_source, title, description, link}) => {
  return (
    <>
            <div className="card">
              <img className="card-img-top" src={img_source} alt="Movies Posters" style={{ width: '19rem',height: '24rem' }} />
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <a href={link} className="btn btn-primary" target="_blank" rel="noreferrer">Watch Now</a>
              </div>
            </div>  
    </>
  )
}
export default Card
