import '../css/result.css';
import Breadcrumb from "react-bootstrap/Breadcrumb";
import axios from "axios";
import {FaHome} from "react-icons/fa";
import {useParams, useNavigate, useLocation, json} from "react-router-dom";
import DownloadCSV from '../componeents/DownloadCSV';
import {useState, useEffect} from "react";



export default function Result_upload() {
    const {name, id}=useParams()
    const [context, setContext]=useState(false)
    const [msg, setMsg]=useState(null)
    const [Power, setPower]=useState(null)
    const [Speed, setSpeed]=useState(null)
    const [Hatch, setHatch]=useState(null)
    const Location = useLocation()
    const Navigate=useNavigate();
    const [show, setShow]=useState(false)

    function readFileAsync(file) {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();

                    reader.onload = () => {
                        resolve(reader.result);
                    };

                    reader.onerror = () => {
                        reject(reader.error);
                    };

                    reader.readAsDataURL(file); // 或者使用 readAsText, readAsArrayBuffer 等根据需要
                });
            }

    async function handleFileUpload(files) {
        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const fileContent = await readFileAsync(file);
                console.log(fileContent); // 这里你可以处理文件内容，例如发送到服务器
            }
        } catch (error) {
                    alert("Please upload at least one file")
                    Navigate(-1)
            console.error("Error reading file:", error);
        }
    }

    useEffect(() => {
        const handleInputNum = async () => {
            const files = new FormData()
            // Append the file to the request body
            for (let i = 0; i < Location.state.data.length; i++) {
                files.append("file", Location.state.data[i], Location.state.data[i].name);
            }
            // files.append("file", Location.state.data[0], Location.state.data[0].name);
            const params = JSON.stringify(Location.state.body)
            files.append("params", params)

            // const file = Location.state.data[0];
            // await handleFileUpload(file);
            // const file = {
            //     fileName: files.name,
            //     fileData: "",
            //     fileType: files.type,
            // };
            // console.log(Location.state.body)
            // `http://localhost:5000/setParams/resetparams`

            try {
                const response = await axios.post(
                    `http://localhost:5000/upload/${name}/${id}`,
                   files,
                );
                // {headers: {
                //         'Content-Type':  'application/json'
                //     }}
                setMsg(response.data.message);
            } catch (error) {
                Navigate(-1)
                console.error("Error downloading CSV:", error);
            }
        };  handleInputNum();
        }, []);

    useEffect(() => {
            const interval = setInterval(()=>{
                setContext(null);
                 axios.get('http://127.0.0.1:5000/result')
                  .then(res =>
                  {
                       if (res.status === 200) {
                          setContext(true);
                          const inx=res.data.opt_result.length
                           setShow(true)
                          setPower(Object.values(res.data.opt_result)[inx-1][0])
                          setSpeed(Object.values(res.data.opt_result)[inx-1][1])
                          setHatch(Object.values(res.data.opt_result)[inx-1][2])
                          setMsg(null);
                          clearInterval(interval)
                      }else{
                           setContext(false);
                           setShow(false);
                           setPower(null)
                          setSpeed(null)
                          setHatch(null)
                          setMsg(res.data.message);
                      }
          })}, 5000);
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
                  {context &&
                      <>
                      {/*    <span>*/}
                      {/*    Your input: <br/>*/}
                      {/*        number: {Location.state.datas}<br/>*/}
                      {/*        material: {JSON.stringify(Location.state.body)}<br/>*/}
                      {/*        ---------------------------------------------*/}
                      {/*        <br/><br/>*/}
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
                <button className="btn_back"  onClick={(e) => {
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