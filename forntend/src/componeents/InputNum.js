import {AiOutlineClose, AiOutlineCloudUpload} from "react-icons/ai";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form"
import axios from "axios";

function InputNum(prop) {
    const [showed, setShowForm] = useState(false)
    const [, setfileURL] = useState("");
    const [selectedFile, setselectedFile] = useState(null);
    const [uploadedFile, setuploadedFile] = useState({});
    const [isUploading, setisUploading] = useState(false);
    const [isFileUploaded, setisFileUploaded] = useState(false);
    const [uploadProgress, setuploadProgress] = useState(0);
    const [errormsg, setErrormsg] = useState("");
    const [data, setInputNum] = useState({})
    const Navigate=useNavigate()
    const { reset, formState: { errors } } = useForm();


      const handleInputNum = async (ev) => {
          ev.preventDefault();
          Navigate("/features/" + prop.name + "/" + prop.id + "/result", {state: {data}})

          // const requestOptions = {
          //     method: "POST",
          //     headers: {
          //         'content-type': 'application/json'
          //     },
          //     body: JSON.stringify(body)
          // }

          // fetch(`http://localhost:3000/features/${prop.name}/${prop.id}/result`, requestOptions)
          //     .then(res => res.json())
          //     .then(() => {
          //         setisUploading(false);
          //         Navigate("/features/" + prop.name + "/" + prop.id + "/result")
          //     })
          //     .catch(err => {
          //         setErrormsg(err.message);
          //         setisFileUploaded(true);
          //         setShowForm(false);
          //     });

          reset()
      }
      // Upload file to server
    return (
        <div className="form_box">
            <div className="update_info">
                <h3>Input the Number</h3>
                <p className='p_intro'>File should be of format {prop.limit}</p>
            </div>
            <form onSubmit={handleInputNum}>
                <div className="update_file">
                    <label htmlFor="input_nums">
                        <input type="number" id="input_num" value={data} onChange={(ev) => setInputNum(ev.target.value)}/>
                        <p className='p_discrib'> Please input the number</p>
                    </label>
                </div>
                <div className="selectedFile">
                    <button type="submit" name="input">Enter
                    </button>
                </div>
            </form>
        </div>
    )
}

export default InputNum