import '../css/features.css';
import Images from '../Images'
import Feature_Card from '../componeents/Cards';
import {Link} from "react-router-dom";

export default function Features() {
    const Image = {...Images}
  return (
      <main className="container-fluid">
          <section id="feature_intro">
              <div className="feature_title">
                  <h1>Feature</h1>
              </div>
              <div className="feature_descri">
                  <p className="p_discrib">Quisque finibus nulla id molestie semper. Donec ut tortor ligula.
                      Fusce gravida tellus sed sollicitudin lacinia.Mauris a maximus magna.
                      Aliquam turpis mi, accumsan vel urna faucibus, elementum sagittis massa.
                      Quisque finibus nulla id molestie semper. Donec ut tortor ligula.
                      Fusce gravida tellus sed sollicitudin lacinia.Mauris a maximus magna.
                      Aliquam turpis mi, accumsan vel urna faucibus, elementum sagittis massa.
                      Quisque finibus nulla id molestie semper. Donec ut tortor ligula.
                      Fusce gravida tellus sed sollicitudin lacinia.Mauris a maximus magna.
                      Aliquam turpis mi, accumsan vel urna faucibus, elementum sagittis massa.
                  </p>
              </div>
          </section>
          <section id="feature_cate">
              <div className="category_cards_box">
                  <Feature_Card name="quality" img={Image.quality} content="Quisque finibus nulla id molestie semper. Donec ut tortor ligula. Fusce gravida tellus sed sollicitudin lacinia.
                  Quisque finibus nulla id molestie semper. Donec ut tortor ligula. Fusce gravida tellus sed sollicitudin lacinia."/>
                  <Feature_Card name="wastes" img={Image.wastes} content="Quisque finibus nulla id molestie semper. Donec ut tortor ligula. Fusce gravida tellus sed sollicitudin lacinia.
                  Quisque finibus nulla id molestie semper. Donec ut tortor ligula. Fusce gravida tellus sed sollicitudin lacinia."/>
                  <Feature_Card name="efficient" img={Image.efficient} content="Quisque finibus nulla id molestie semper.
                  Quisque finibus nulla id molestie semper. Donec ut tortor ligula. Fusce gravida tellus sed sollicitudin lacinia."/>
                  <Feature_Card name="wastes" img={Image.wastes} content="Quisque finibus nulla id molestie semper. Donec ut tortor ligula. Fusce gravida tellus sed sollicitudin lacinia.
                  Quisque finibus nulla id molestie semper. Donec ut tortor ligula. Fusce gravida tellus sed sollicitudin lacinia."/>
                  <Feature_Card name="efficient" img={Image.efficient} content="Quisque finibus nulla id molestie semper.
                  Quisque finibus nulla id molestie semper. Donec ut tortor ligula. Fusce gravida tellus sed sollicitudin lacinia."/>
              </div>
          </section>
      </main>

)
}