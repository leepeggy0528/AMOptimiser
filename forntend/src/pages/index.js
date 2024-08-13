import '../css/index.css'
import Feature_Card from '../componeents/Cards'
import {Link} from "react-router-dom";
import Images from '../Images'


export default function Index() {
  const Image = {...Images};
  return(
  <main className="container-fluid">
    <section id="introduce">
      <div className="intro_bg">
        <img src={Image.intro_background} className="intro_background" alt="intro_background"/>
      </div>
      <div className="intro_content">
        <div className="intro_title">
          <h1>Optimising Additive Manufacturing</h1>
        </div>
        <div className="intro_descr">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non sapien laoreet, tempor ligula sit amet, sollicitudin orci. </p>
        </div>
        <div className="intro_btn">
          <button type="button" className="try_btn">Try It</button>
        </div>
      </div>
    </section>
    <section id="feature">
      <div className="feature_title">
        <h2>Feature</h2>
      </div>
      <div className="feature_category">
        <div className="category_cards_box">
          <Feature_Card name="quality" img={Image.quality} content="Quisque finibus nulla id molestie semper. Donec ut tortor ligula. Fusce gravida tellus sed sollicitudin lacinia.
                      Quisque finibus nulla id molestie semper. Donec ut tortor ligula. Fusce gravida tellus sed sollicitudin lacinia."/>
          <Feature_Card name="wastes" img={Image.wastes} content="Quisque finibus nulla id molestie semper. Donec ut tortor ligula. Fusce gravida tellus sed sollicitudin lacinia.
                      Quisque finibus nulla id molestie semper. Donec ut tortor ligula. Fusce gravida tellus sed sollicitudin lacinia."/>
          <Feature_Card name="efficient" img={Image.efficient} content="Quisque finibus nulla id molestie semper.
                      Quisque finibus nulla id molestie semper. Donec ut tortor ligula. Fusce gravida tellus sed sollicitudin lacinia."/>
        </div>
        <div className="link_more">
          <Link to="/features" className="category_more">
            more ->
          </Link>
        </div>
      </div>
    </section>
  </main>
  )
}