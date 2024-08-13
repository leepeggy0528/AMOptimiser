import { Link, useMatch, useResolvedPath } from "react-router-dom"
import github from "../images/github.png";
import linkedin from "../images/linkedin.png";
import twitter from "../images/twitter.png";


export default function Footer() {
  return (
      <footer>
          <div id="footer">
                  <div className="social">
                      <CustomLink to="/features" className="nav-item nav-link"><img src={github} className="github" alt="github"/></CustomLink>
                      <CustomLink to="/contact" className="nav-item nav-link"><img src={twitter} className="twitter" alt="twitter"/></CustomLink>
                      <CustomLink to="/about" className="nav-item nav-link"><img src={linkedin} className="linkedin"
                                                                                 alt="linkedin"/></CustomLink>
                  </div>
                  <div className="slogan">
                      <p>Copyright © 2024 AMOptimiser</p>
                  </div>
          </div>
      </footer>
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
        <Link to={to} {...props}>
            {children}
        </Link>
    )
}