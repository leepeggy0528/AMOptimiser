import '../css/result.css';
import Breadcrumb from "react-bootstrap/Breadcrumb";
import axios from "axios";
import {FaHome} from "react-icons/fa";
import {useParams, useNavigate, useLocation} from "react-router-dom";
import DownloadCSV from '../componeents/DownloadCSV';
import {useState, useEffect} from "react";



export default function Result_upload() {
    const {name, id}=useParams()
    const [context, setContext]=useState(null)
    const [msg, setMsg]=useState(null)
    const Location = useLocation()
    const Navigate=useNavigate();

    useEffect(() => {
        const handleInputNum = async () => {
            const files = new FormData();
            // Append the file to the request body
            for (let i = 0; i < Location.state.data.length; i++) {
            files.append("file", Location.state.data[i], Location.state.data[i].name);
            }
            try {
                const response = await axios.post(
                    `http://localhost:5000/upload/${name}/${id}`,
                    files
                );
                setMsg(response.data.message);
            } catch (error) {
                Navigate(-1)
                console.error("Error downloading CSV:", error);
            }
        };  handleInputNum();
        }, []);
    useEffect(() => {
            const interval = setInterval(()=>{
                 axios.get('http://127.0.0.1:5000/result')
                  .then(res =>
                  {
                       if (res.status === 200) {
                          setContext(res.data.opt_result);
                          setMsg(null);
                          clearInterval(interval)
                      }else{
                          setMsg(res.data.message);
                      }
          })}, 10000);
            return () => clearInterval(interval)
        }, []);





    // const handleInputNum = async (data) => {
    //       // ev.preventDefault();
    //       const body = {
    //           number: data.num
    //       }
    //
    //       const requestOptions = {
    //           method: "POST",
    //           headers: {
    //               'content-type': 'application/json'
    //           },
    //           body: JSON.stringify(body)
    //       }
    //
    //       fetch(`http://localhost:3000/features/${prop.name}/${prop.id}/result`, requestOptions)
    //           .then(res => res.json())
    //           .then(() => {
    //               setisUploading(false);
    //               Navigate("/features/" + prop.name + "/" + prop.id + "/result")
    //           })
    //           .catch(err => {
    //               setErrormsg(err.message);
    //               setisFileUploaded(true);
    //               setShowForm(false);
    //           });
    //       reset()
    //   }

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

     // const inputFile = async() => {
     //     try {
     //         const response = await axios.get(
     //             `http://127.0.0.1:5000/upload/${name}/${id}`,
     //             {
     //                 responseType: "json",
     //             })
     //         console.log(response.data.nums)
     //         return setContext(response.data.nums)
     //     } catch (error) {
     //         console.error("Error downloading CSV:", error);
     //     }
     // }


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
                  {context? JSON.stringify(context):''}
              </p>
            </div>
            <div className="result_btn">
                <button className="btn_back"  onClick={(e) => {
                  e.preventDefault();
                  Navigate(-1);
                }}>Back</button>
                <DownloadCSV cate={name} id={id} response={JSON.stringify(context)}/>
            </div>
      </section>
  </main>
  )
}