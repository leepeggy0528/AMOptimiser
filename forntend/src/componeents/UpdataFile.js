import {AiOutlineClose, AiOutlineCloudUpload} from "react-icons/ai";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function UpdataFile(prop) {
    const [showed, setShowForm] = useState(false)
    const [, setfileURL] = useState("");
    const [selectedFile, setselectedFile] = useState(null);
    const [uploadedFile, setuploadedFile] = useState({});
    const [isUploading, setisUploading] = useState(false);
    const [isFileUploaded, setisFileUploaded] = useState(false);
    const [uploadProgress, setuploadProgress] = useState(0);
    const [errormsg, setErrormsg] = useState("");
    const Navigate=useNavigate()

      // Track selected file before the upload
      const handleSelectFile = (e) => {
        const selectedFileList = [];
        for (let i = 0; i < e.target.files.length; i++) {
          selectedFileList.push(e.target.files.item(i));
        }
        setselectedFile(selectedFileList);
      };
      const handleUploadFile = async (ev) => {
            ev.preventDefault();
            // setisUploading(true)
            const data = selectedFile;
            Navigate("/features/" + prop.name + "/" + prop.id + "/result_upload", {state: {data}})
            // try {
            // const config = {
            // onUploadProgress: (progressEvent) => {
            //   const { loaded, total } = progressEvent;
            //   setuploadProgress(Math.round((loaded / total) * 100));
            // },
            // };
            // const response = await axios.post(
            //     `http://127.0.0.1:5000/upload/${prop.name}/${prop.id}`, data, config );
            //
            // const body = response.data;
            //
            // setfileURL(`http://127.0.0.1:5000/upload/${prop.name}/${prop.id}/${body.filename}`);
            // if (response.status === 200) {
            //     setisUploading(false);
            //     setuploadedFile(selectedFile); // set the uploaded file to show the name
            //     Navigate("/features/"+prop.name+"/"+prop.id+"/result")
            // }
            // } catch (error) {
            //     setisFileUploaded(true);// flag to show the uploaded file
            //     setShowForm(false);
            //     setErrormsg(error.message)
            // }
      };
      // Upload file to server
    return (
        <div className="form_box">
            <div className="update_info">
                <h3>Upload your files</h3>
                <p className='p_intro'>File should be of format {prop.limit}</p>
            </div>
            <form onSubmit={handleUploadFile}>
                <div className="update_file">
                    <label htmlFor="file-upload">
                        <input type="file" id="file-upload" accept={prop.file} multiple onChange={handleSelectFile}/>
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
                <button type="submit" name="upload">Submit
                </button>
            </form>
        </div>
    )
}

export default UpdataFile