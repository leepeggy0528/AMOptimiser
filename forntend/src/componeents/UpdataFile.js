import {AiOutlineClose, AiOutlineCloudUpload} from "react-icons/ai";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import FormWizard from "react-form-wizard-component";
import {Alert} from "react-bootstrap";



function UpdataFile(prop) {
    const [showed, setShowForm] = useState(false)
    const [, setfileURL] = useState("");
    const [selectedFile, setselectedFile] = useState(null);
    const [uploadedFile, setuploadedFile] = useState({});
    const [isUploading, setisUploading] = useState(false);
    const [isFileUploaded, setisFileUploaded] = useState(false);
    const [uploadProgress, setuploadProgress] = useState(0);
    const [errormsg, setErrormsg] = useState("");
    const Navigate=useNavigate();
    const [thickness, setthickness] = useState(0.0);
    const [T0, setT0] = useState(0.0);
    const [Tm, setTm] = useState(0.0);
    const [Tb, setTb] = useState(0.0);
    const [alpha_min, setAlphaMin] = useState(0.0);
    const [rho, setrho] = useState(0.0);
    const [cp, setCP] = useState(0.0);
    const [ap, setAP] = useState(0.0);
    const [sigma, setSigma] = useState(0.0);
    const [kappa, setKappa] = useState(0.0);
    const [L, setL] = useState(0.0);
    const [tens, setTens] = useState(0.0);
    const [visc, setVisc] = useState(0.0);

    const [show,setShow]=useState(false)
    const [status,setStatus]=useState('')
    const [serverResponse,setServerResponse]=useState("")

      // Track selected file before the upload
      const handleSelectFile = (e) => {
        const selectedFileList = [];

        for (let i = 0; i < e.target.files.length; i++) {
          selectedFileList.push(e.target.files.item(i));
        }
        setselectedFile(selectedFileList);
      };
      const handleUploadFile = async () => {
            const body = {
                "thickness": Number(thickness),
                "T0": Number(T0),
                "Tm": Number(Tm),
                "Tb": Number(Tb),
                "alpha_min": Number(alpha_min),
                "density": Number(rho),
                "heat_capacity": Number(cp),
                "thermal_diff": Number(ap),
                "spot_dev": Number(kappa),
                "thermal_cond": Number(sigma),
                "latent_heat": Number(L),
                "tens": Number(tens),
                "visc": Number(visc)}
          console.log(body)
            const data=selectedFile
          if (data==null){
              alert("Please select a file")
          }else{
              Navigate("/features/" + prop.name + "/" + prop.id + "/result_upload", {state: {body, data}})
          }

      };

      useEffect(()=>{
          const init_params=()=>{
              axios.get(`http://127.0.0.1:5000/setParams/getparams`)
                  .then(res =>
                  {
                       if (res.status === 200) {
                            setthickness(res.data.thickness);
                            setT0(res.data.T0);
                            setTm(res.data.Tm);
                            setTb(res.data.Tb);
                            setAlphaMin(res.data.alpha_min);
                            setrho(res.data.density);
                            setCP(res.data.heat_capacity);
                            setAP(res.data.thermal_diff);
                            setSigma(res.data.spot_dev);
                            setKappa(res.data.thermal_cond);
                            setL(res.data.latent_heat);
                            setTens(res.data.tens);
                            setVisc(res.data.visc);
                      }else{
                          console.log("Error")
                      }
          })};  init_params()}, []);

      // Upload file to server
    return (
        <>
            {show &&
                    <Alert variant={status} onClose={() => {
                        setShow(false)
                    }} dismissible>
                        <p>
                            {serverResponse}
                        </p>
                    </Alert>
                }
            <div className="form_box">
                <div className="update_info">
                    <h3>Upload your files</h3>
                    <p className='p_intro'>File should be of format {prop.limit}</p>
                </div>
                <form>
                    <>
                        <FormWizard stepSize="sm" onComplete={handleUploadFile} finishButtonText="Submit">
                            <FormWizard.TabContent title="Params setting-1">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Thickness (m) <input type="number" className="form-control"
                                                                    placeholder="Thickness"
                                                                    value={thickness}
                                                                    onChange={(e) => setthickness(e.target.value)}
                                                                    required/></label>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Initial Temperature(K) <input type="number" className="form-control"
                                                                             placeholder="T0"
                                                                             value={T0}
                                                                             onChange={(e) => setT0(e.target.value)}
                                                                             required/></label>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-6">
                                        <label>Melting Temperature (K) <input type="number" className="form-control"
                                                                              placeholder="Tm"
                                                                              value={Tm}
                                                                              onChange={(e) => setTm(e.target.value)}
                                                                              required/></label>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Boiling Temperature (K) <input type="number" className="form-control"
                                                                              placeholder="Tb"
                                                                              value={Tb}
                                                                              onChange={(e) => setTb(e.target.value)}
                                                                              required/></label>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-6">
                                        <label>Absorptivity <input type="number" className="form-control"
                                                                   placeholder="Alpha_min"
                                                                   value={alpha_min}
                                                                   onChange={(e) => setAlphaMin(e.target.value)}
                                                                   required/></label>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Density (kg/m³) <input type="number" className="form-control"
                                                                      placeholder="Density"
                                                                      value={rho}
                                                                      onChange={(e) => setrho(e.target.value)}
                                                                      required/></label>
                                    </div>
                                </div>
                            </FormWizard.TabContent>
                            <FormWizard.TabContent title="Params setting-2">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Heat Capacity (J/kg·K) <input type="number" className="form-control"
                                                                             placeholder="Heat Capacity" value={cp}
                                                                             onChange={(e) => setCP(e.target.value)}
                                                                             required/></label>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Thermal Diff (m²/s) <input type="number" className="form-control"
                                                                          placeholder="Thermal Diff"
                                                                          value={ap}
                                                                          onChange={(e) => setAP(e.target.value)}
                                                                          required/></label>
                                    </div>
                                </div>
                                <div className="row  mt-3">
                                    <div className="col-md-6">
                                        <label>Spot Dev <input type="number" className="form-control"
                                                               placeholder="Spot Dev"
                                                               value={sigma} onChange={(e) => setSigma(e.target.value)}
                                                               required/></label>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Thermal Cond (W/m·K) <input type="number" className="form-control"
                                                                           placeholder="Thermal Cond"
                                                                           value={kappa}
                                                                           onChange={(e) => setKappa(e.target.value)}
                                                                           required/></label>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-6">
                                        <label>Latent Heat (J/kg) <input type="number" className="form-control"
                                                                         placeholder="Latent Heat"
                                                                         value={L}
                                                                         onChange={(e) => setL(e.target.value)}
                                                                         required/></label>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Surface tension (N/m) <input type="number" className="form-control"
                                                                            placeholder="Tens"
                                                                            value={tens}
                                                                            onChange={(e) => setTens(e.target.value)}
                                                                            required/></label>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-6">
                                        <label>Dynamic viscosity (Pa·s) <input type="number" className="form-control"
                                                                               placeholder="Visc"
                                                                               value={visc}
                                                                               onChange={(e) => setVisc(e.target.value)}
                                                                               required/></label>
                                    </div>
                                </div>
                            </FormWizard.TabContent>
                            <FormWizard.TabContent title="Upload fild">
                                <div className="update_file">
                                    <label htmlFor="file-upload">
                                        <input type="file" id="file-upload" accept={prop.file} multiple
                                               onChange={handleSelectFile}/>
                                        <p className='p_discrib'> Drag & Drop your files here</p>
                                        <AiOutlineCloudUpload/>
                                    </label>
                                </div>
                                <div className="selectedFile">
                                    {selectedFile &&
                                        selectedFile.map((item, index) => {
                                            return (
                                                <div key={index}>
                                                    <span>{index + 1}. {item.name}</span>
                                                </div>
                                            );
                                        })}
                                </div>
                            </FormWizard.TabContent>
                        </FormWizard>
                    </>
                </form>
            </div>
        </>

    )
}

export default UpdataFile