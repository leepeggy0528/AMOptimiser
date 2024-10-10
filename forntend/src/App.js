import {useEffect, useState} from "react";
import './App.css';
import Navbar1 from "./componeents/Navbar"
import Features from "./pages/features"
import Contact from "./pages/contact"
import About from "./pages/about"
// import Info from "./componeents/Member_info"
// import History from "./componeents/Member_hist"
import Member from "./pages/member"
import Problem from "./pages/problems"
import Result from "./pages/result"
import Index from "./pages/index"
import { Route, Routes } from "react-router-dom"
import Footer from "./componeents/Footer";
import Result_upload from "./pages/result_upload";
import {useNavigate} from "react-router-dom";
import { useAuth} from './signIn'

const baseUrl = "http://127.0.0.1:5000"
function App() {
  // const [description, setDescription] = useState("");
  // const [eventsList, setEventsList] = useState([]);
  // const fetchEvents = async () =>{
  //   const data = await axios.get(`${baseUrl}/index`)
  //   const {events} = data.data
  //   setEventsList(events);
  // }
  //
  // const  handleChange = e => {
  //   setDescription(e.target.value);
  // }
  // const  handleSubmit = e => {
  //   e.preventDefault();
  //   console.log(description);
  // }
  // useEffect(() => {
  //   fetchEvents();
  // }, [])
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [logged] = useAuth();

  return (
      <>
          <Navbar1 />
                <Routes>
                    <Route path="/" element={< Index/>} />
                    <Route path="/features">
                        <Route index element={<Features />} />
                        <Route path=":name" element={<Problem />}/>
                        <Route path=":name/:id/result" element={<Result/>} />
                        <Route path=":name/:id/result_upload" element={<Result_upload/>} />
                    </Route>
                    <Route path="/about" element={<About />}/>
                    <Route path="/contact" element={<Contact />} />
                    {logged?
                        (
                            <Route path="/member">
                                <Route index element={<Member/>} />
                            </Route>
                            ):''
                    }
                </Routes>
          <Footer/>
      </>
      // <div className="App">
      //   <header className="App-header">
      //
      //     {/*<img src={logo} className="App-logo" alt="logo" />*/}
      //     <section>
      //       <form onSubmit={handleSubmit}>
      //         <label htmlFor="description">Description</label>
      //         <input onChange={handleChange} type="text" name="description" id="description" value={description}/>
      //         <button type="submit">Submit</button>
      //       </form>
      //     </section>
      //     <section>
      //       <ul>
      //         {events.map(event => {
      //           return (
      //               <li key={event.id}>{event.description}</li>
      //           )
      //         })}
      //       </ul>
      //     </section>
      //
      //   </header>
      // </div>
  );
}

export default App;
