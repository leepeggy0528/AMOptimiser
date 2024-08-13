import { Link, useMatch, useResolvedPath,useParams } from "react-router-dom"


export default function Feature_Card(props) {
 const cate=['efficient','wastes', 'quality'];
 let i= Math.floor(Math.random()*3)
    const {name}=useParams()
  return (
      <div className="category_card">
          <div className="hover_color_bubble"></div>
          <div className="cate_img">
              <img src={props.img} className={props.name} alt={props.name}/>
          </div>
          <div className="cate_content">
              <div className="cate_name">
                  <h3>{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</h3>
              </div>
              <div className="cate_intro">
                  <p className="p_intro">
                      {props.content}
                  </p>
              </div>
              <div className="cate_btn">
                  <CustomLink to={"/features/" + props.name}>Explore</CustomLink>
              </div>
          </div>
      </div>
  )
}

function CustomLink({
                        to, children,
                        ...
                            props
                    }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true})

    return (
        <button type="button" className="explore_btn">
            <Link to={to} {...props}>
                {children}
            </Link>
        </button>

    )
}