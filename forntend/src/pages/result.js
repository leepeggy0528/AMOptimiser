import '../css/result.css';
import Breadcrumb from "react-bootstrap/Breadcrumb";
import axios from "axios";
import {FaHome} from "react-icons/fa";
import {useParams, useNavigate, useLocation} from "react-router-dom";
import DownloadCSV from '../componeents/DownloadCSV';
import {useState, useEffect} from "react";




export default function Result() {
    const {name, id}=useParams()
    const Location = useLocation()
    const Navigate=useNavigate();
     const [context, setContext]=useState(false)
    const [show, setShow]=useState(false)
    const [msg, setMsg]=useState(null)
    const [Power, setPower]=useState(null)
    const [Speed, setSpeed]=useState(null)
    const [Hatch, setHatch]=useState(null)

    useEffect(() => {
        // const downloadFile = async () => {
        //   try {
        //     const response = await axios.get(
        //       "http://localhost:5000/upload",
        //       {
        //         responseType: "blob",
        //       }
        //     );
        //
        //     // Create a Blob from the response data
        //     const pdfBlob = new Blob([response.data.message], { type: "application/pdf" });
        //
        //     // Create a temporary URL for the Blob
        //     const url = window.URL.createObjectURL(pdfBlob);
        //
        //     // Create a temporary <a> element to trigger the download
        //     const tempLink = document.createElement("a");
        //     tempLink.href = url;
        //     tempLink.setAttribute(
        //       "download",
        //       `result.pdf`
        //     ); // Set the desired filename for the downloaded file
        //
        //     // Append the <a> element to the body and click it to trigger the download
        //     document.body.appendChild(tempLink);
        //     tempLink.click();
        //
        //     // Clean up the temporary elements and URL
        //     document.body.removeChild(tempLink);
        //     window.URL.revokeObjectURL(url);
        //   } catch (error) {
        //     console.error("Error downloading PDF:", error);
        //   }
        // };
        const handleInputNum = async () => {
            try {
                const response = await axios.post(
                    `http://localhost:5000/upload/${name}/${id}`,
                    {"number": Location.state.datas, "material": Location.state.body}
                );
                setMsg(response.data.message);
            } catch (error) {
                Navigate(-1)
                console.error("Error downloading CSV:", error);
            }
        };  handleInputNum();
        }, [Location.state.data]);

    useEffect(() => {
            const interval = setInterval(()=>{
                setContext(null);
                 axios.get('http://127.0.0.1:5000/result')
                  .then(res =>
                  {
                       if (res.status === 200) {
                          setContext(true);
                          setShow(true);
                          const inx=res.data.opt_result.length
                          setPower(Object.values(res.data.opt_result)[inx-1][0])
                          setSpeed(Object.values(res.data.opt_result)[inx-1][1])
                          setHatch(Object.values(res.data.opt_result)[inx-1][2])
                          setMsg(null);
                          clearInterval(interval)
                      }else{
                           setContext(false);
                           setShow(false)
                           setPower(null)
                          setSpeed(null)
                          setHatch(null)
                          setMsg(res.data.message);

                      }
          })}, 5000);
            return () => clearInterval(interval)
        }, []);

  return(
  <main className="container-fluid">
      <Breadcrumb>
            <Breadcrumb.Item href="/"><FaHome /></Breadcrumb.Item>
            <Breadcrumb.Item href="/features">Features
            </Breadcrumb.Item>
            <Breadcrumb.Item href={"/features/"+name}>{name.charAt(0).toUpperCase() + name.slice(1)}
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Result</Breadcrumb.Item>
        </Breadcrumb>
      <section id="result">
            <div className="result_title">
            <h1>Result</h1>
            </div>
            <div className="result_content">
              <p className="p_discrib">
                  {msg? JSON.stringify(msg):''}
                  {context &&
                      <>
                      {/*    <span>*/}
                      {/*    Your input: number: {Location.state.datas}, material: {Location.state.body}*/}
                      {/*</span>*/}
                          <span>
                              The optimal parameters is: <br/>
                            Power: {Power}<br/>
                            Speed: {Speed}<br/>
                              Hatch: {Hatch}
                      </span>
                      </>

                  }
              </p>
            </div>
          <div className="result_btn">
              <button className="btn_back" onClick={(e) => {
                  e.preventDefault();
                  Navigate(-1);
              }}>Back</button>
              {
                  show &&
                                  <DownloadCSV cate={name} id={id} response={JSON.stringify({
                Power: Power,
                Speed: Speed,
                Hatch: Hatch
            })}/>
              }
            </div>
      </section>
  </main>
  )
}