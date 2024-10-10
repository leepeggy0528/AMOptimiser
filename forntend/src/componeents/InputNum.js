import {AiOutlineClose, AiOutlineCloudUpload} from "react-icons/ai";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form"
import axios from "axios";
import FormWizard from "react-form-wizard-component";
import {MdOutlineAddBox} from "react-icons/md";
import {CiSquareRemove} from "react-icons/ci";

function UserParamsForm({datas}, prop){

    const handleInputdata = (index, ev) => {
        let inputdata = [...datas]
        inputdata[index][ev.target.name] = ev.target.value;
        datas(inputdata);
    }
    const addFields=()=>{
        let newInput={power:'', speed:'', hatch:''}
        datas([...datas, newInput])
    }
    const removeFields=(index)=>{
        let inputdata=[...datas]
        inputdata.splice(index,1);
        datas(inputdata)
    }


    return (
        <div className="update_file">
            {datas.map((data, index) => {
                <div key={prop.index} className="muti_input">
                    <label>
                        <input type="number" id="input_num" name='power' value={prop.data.power}
                               onChange={(ev) => handleInputdata(prop.index, ev)}/>
                        <p className='p_discrib'> Please input the number</p>
                    </label>
                    <label>
                        <input type="number" id="input_num" name='speed' value={prop.data.speed}
                               onChange={(ev) => handleInputdata(prop.index, ev)}/>
                        <p className='p_discrib'> Please input the number</p>
                    </label>
                    <label>
                        <input type="number" id="input_num" name='hatch' value={prop.data.hatch}
                               onChange={(ev) => handleInputdata(index, ev)}/>
                        <p className='p_discrib'> Please input the number</p>
                    </label>
                    <button className="removebtn" onClick={() => removeFields(index)}> Remove</button>
                </div>
            })}
            <div className="addField">
                <button onClick={() => addFields()}>Add</button>
            </div>
        </div>
    )
}

function InputNum(prop) {
    const {reset, formState: {errors}} = useForm();
    const Navigate = useNavigate()
    const [datas, setInputNum] = useState([{power: 0, speed: 0, hatch: 0}])
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

    const handleInputdata = (index, ev) => {
        let inputdata = [...datas]
        inputdata[index][ev.target.name] = Number(ev.target.value);
        setInputNum(inputdata);
    }
    const removeFields=(index,e)=>{
        e.preventDefault()

        let inputdata=[...datas]
        inputdata.splice(index,1);
        setInputNum(inputdata)
    }
    const addFields=  (e)=>{
        e.preventDefault()
        let newInput={power:0, speed:0, hatch:0}
        setInputNum([...datas, newInput])
    }
    const handleInputNum = async () => {
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
        "visc": Number(visc)
    }
    if(datas.length<2){
        alert("Please input at least 2 combinations of parameters")
    }else{
         Navigate("/features/" + prop.name + "/" + prop.id + "/result", {state: {body, datas}})
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
        <div className="form_box">
            <div className="update_info">
                <h3>Input the Number</h3>
                <p className='p_intro'>File should be of format {prop.limit}</p>
            </div>
            <form>
                <>
                  <FormWizard stepSize="sm" onComplete={handleInputNum} finishButtonText="Submit" >
                      <FormWizard.TabContent title="Params setting-1">
                              <div className="row">
                                  <div className="col-md-6">
                                      <label>Thickness (m) <input type="number" className="form-control" placeholder="Thickness"
                                                                                              value={thickness} onChange={(e)=>setthickness(e.target.value) } required/></label>
                                  </div>
                                  <div className="col-md-6">
                                      <label>Initial Temperature(K) <input type="number" className="form-control" placeholder="T0"
                                                                                                value={T0} onChange={(e)=>setT0(e.target.value) } required/></label>
                                  </div>
                              </div>
                              <div className="row mt-3">
                                  <div className="col-md-6">
                                      <label>Melting Temperature (K) <input type="number" className="form-control" placeholder="Tm"
                                                                                                value={Tm} onChange={(e)=> setTm(e.target.value) } required/></label>
                                  </div>
                                  <div className="col-md-6">
                                      <label>Boiling Temperature (K) <input type="number" className="form-control" placeholder="Tb"
                                                                                                value={Tb} onChange={(e)=> setTb(e.target.value) } required/></label>
                                  </div>
                              </div>
                              <div className="row mt-3">
                                  <div className="col-md-6">
                                      <label>Absorptivity  <input type="number" className="form-control" placeholder="Alpha_min"
                                                                                                value={alpha_min} onChange={(e)=> setAlphaMin(e.target.value) } required/></label>
                                  </div>
                                  <div className="col-md-6">
                                      <label>Density (kg/m³) <input type="number" className="form-control" placeholder="Density"
                                                                                                value={rho} onChange={(e)=> setrho(e.target.value) } required/></label>
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
                                                                    value={ap} onChange={(e) => setAP(e.target.value)}
                                                                    required/></label>
                              </div>
                          </div>
                          <div className="row  mt-3">
                              <div className="col-md-6">
                                  <label>Spot Dev <input type="number" className="form-control" placeholder="Spot Dev"
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
                                                                    value={L} onChange={(e) => setL(e.target.value)}
                                                                    required/></label>
                              </div>
                              <div className="col-md-6">
                                  <label>Surface tension (N/m) <input type="number" className="form-control" placeholder="Tens"
                                                           value={tens} onChange={(e) => setTens(e.target.value)}
                                                           required/></label>
                              </div>
                          </div>
                          <div className="row mt-3">
                              <div className="col-md-6">
                                  <label>Dynamic viscosity (Pa·s) <input type="number" className="form-control" placeholder="Visc"
                                                             value={visc} onChange={(e) => setVisc(e.target.value)}
                                                             required/></label>
                              </div>
                          </div>
                      </FormWizard.TabContent>
                      <FormWizard.TabContent title="Input number">
                          <div className="update_file">
                              {datas.map((data, index) => (
                                  <div className="muti_input" key={index}>
                                      <label>
                                          <input type="number" className="input_num" name='power' value={data.power}
                                                 onChange={(ev) => handleInputdata(index, ev)}/>
                                          <p className='p_discrib'> Power</p>
                                      </label>
                                      <label>
                                          <input type="number" className="input_num" name='speed' value={data.speed}
                                                 onChange={(ev) => handleInputdata(index, ev)}/>
                                          <p className='p_discrib'> Speed</p>
                                      </label>
                                      <label>
                                          <input type="number" className="input_num" name='hatch' value={data.hatch}
                                                 onChange={(ev) => handleInputdata(index, ev)}/>
                                          <p className='p_discrib'> Hatch</p>
                                      </label>
                                      <button className="removebtn" onClick={(e) => removeFields(index, e)}> <CiSquareRemove />
                                      </button>
                                  </div>
                              ))}
                              <div className="addField">
                                  <button id="addbtn" onClick={(e) => addFields(e)}><MdOutlineAddBox /></button>
                              </div>
                          </div>
                      </FormWizard.TabContent>
                  </FormWizard>
                </>
            </form>
        </div>
    )
}

export default InputNum