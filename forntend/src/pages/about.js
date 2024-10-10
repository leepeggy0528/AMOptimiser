import FormWizardSample from "../componeents/test";
import React, {useEffect, useState} from "react";


export default function About() {
  const [datas, setInputNum] = useState([{power: 0, speed: 0, hatch: 0}])
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

  const handleInputNum = async (e) => {
    e.preventDefault()
    console.log( datas)
    // Navigate("/features/" + prop.name + "/" + prop.id + "/result", {state: {body, data}})
};

  return(
      <main className="container-fluid">
        <h1>About</h1>
        <p>Quisque finibus nulla id molestie semper. Donec ut tortor ligula. Fusce gravida tellus sed sollicitudin
          lacinia. <br/></p>

        <form onSubmit={handleInputNum}>
          <div className="update_file">
            {datas.map((data,index)=> (
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
                  <button className="removebtn" onClick={(e) => removeFields(index,e)}> Remove</button>
                </div>
            ))}
            <div className="addField">
              <button onClick={(e) => addFields(e)}>Add</button>
            </div>
          </div>
          <button> submit</button>
        </form>


      </main>
  )
}