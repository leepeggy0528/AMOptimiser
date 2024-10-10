import React, {useEffect, useState} from "react";
import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";
import {AiOutlineCloudUpload} from "react-icons/ai";
import axios from "axios";

export default function FormWizardSample(prop) {
    const [selectedFile, setselectedFile] = useState(null);
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

    const handleSelectFile = (e) => {
        const selectedFileList = [];
        for (let i = 0; i < e.target.files.length; i++) {
          selectedFileList.push(e.target.files.item(i));
        }
        setselectedFile(selectedFileList);
      };
      const handleUploadFile = async () => {
            const body = {"data": selectedFile,
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


  return (
    <>
      <FormWizard stepSize="sm" onComplete={handleUploadFile} finishButtonText="Submit">
          <FormWizard.TabContent title="Personal details" icon="ti-user">
                  <div className="row">
                      <div className="col-md-6">
                          <label>Thickness (m) <input type="number" className="form-control" placeholder="Thickness"
                                                                                  value={thickness} onChange={(e)=>setthickness(e.target.value) } required/></label>
                      </div>
                      <div className="col-md-6">
                          <label>T0 (K) <input type="number" className="form-control" placeholder="T0"
                                                                                    value={T0} onChange={(e)=>setT0(e.target.value) } required/></label>
                      </div>
                  </div>
                  <div className="row mt-3">
                      <div className="col-md-6">
                          <label>Tm (K) <input type="number" className="form-control" placeholder="Tm"
                                                                                    value={Tm} onChange={(e)=> setTm(e.target.value) } required/></label>
                      </div>
                      <div className="col-md-6">
                          <label>Tb (K) <input type="number" className="form-control" placeholder="Tb"
                                                                                    value={Tb} onChange={(e)=> setTb(e.target.value) } required/></label>
                      </div>
                  </div>
                  <div className="row mt-3">
                      <div className="col-md-6">
                          <label>Alpha_min  <input type="number" className="form-control" placeholder="Alpha_min"
                                                                                    value={alpha_min} onChange={(e)=> setAlphaMin(e.target.value) } required/></label>
                      </div>
                      <div className="col-md-6">
                          <label>Density (kg/m³) <input type="number" className="form-control" placeholder="Density"
                                                                                    value={rho} onChange={(e)=> setrho(e.target.value) } required/></label>
                      </div>
                  </div>
                  <div className="row mt-3">
                      <div className="col-md-6">
                          <label>Heat Capacity (J/kg·K) <input type="number" className="form-control"
                                                       placeholder="Heat Capacity" value={cp} onChange={(e)=> setCP(e.target.value)} required/></label>
                      </div>
                      <div className="col-md-6">
                          <label>Thermal Diff (m²/s) <input type="number" className="form-control" placeholder="Thermal Diff"
                                                                                    value={ap} onChange={(e)=> setAP(e.target.value) } required/></label>
                      </div>
                  </div>
          </FormWizard.TabContent>
          <FormWizard.TabContent title="Additional Info" icon="ti-settings">
                  <div className="row">
                      <div className="col-md-6">
                          <label>Spot Dev <input type="number" className="form-control" placeholder="Spot Dev"
                                                 value={sigma} onChange={(e)=> setSigma(e.target.value) } required/></label>
                      </div>
                      <div className="col-md-6">
                          <label>Thermal Cond (W/m·K) <input type="number" className="form-control" placeholder="Thermal Cond"
                                                                                value={kappa} onChange={(e)=> setKappa(e.target.value) } required/></label>
                      </div>
                  </div>
                  <div className="row mt-3">
                      <div className="col-md-6">
                          <label>Latent Heat (kJ/kg) <input type="number" className="form-control" placeholder="Latent Heat"
                                                                                            value={L} onChange={(e)=> setL(e.target.value) } required/></label>
                      </div>
                      <div className="col-md-6">
                          <label>Tens (N/m) <input type="number" className="form-control" placeholder="Tens"
                                                                                           value={tens}onChange={(e)=> setTens(e.target.value) } required/></label>
                      </div>
                  </div>
                  <div className="row mt-3">
                      <div className="col-md-6">
                          <label>Visc (mPa·s) <input type="number" className="form-control" placeholder="Visc"
                                                                                           value={visc}onChange={(e)=> setVisc(e.target.value)} required/></label>
                      </div>
                  </div>
          </FormWizard.TabContent>
          <FormWizard.TabContent title="Last step" icon="ti-check">
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
        {/* add style */}
        <style>{`
        @import url("https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css");
      `}</style>
    </>
  );
}