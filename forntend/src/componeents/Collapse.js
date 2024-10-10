import React, { useState } from 'react'
import { AiFillCaretUp, AiFillCaretDown, AiOutlineClose } from 'react-icons/ai'
import Alert from 'react-bootstrap/Alert'
import data from '../data'
import UpdataFile from "./UpdataFile";
import InputNum from "./InputNum";

function Question(prop) {
    const [expanded, setExpanded] = useState(false)
    const [showed, setShowForm] = useState(false)
    const [uploaded, isUploaded] = useState(false)
    const [inputed, isInputed] = useState(false)
    const [isFileUploaded, setisFileUploaded] = useState(false);
    const [errormsg, setErrormsg] = useState("");

      return (
        <div className='collapses'>
          <div onClick={() => setExpanded(!expanded)} className={expanded ? 'question-expand' : 'question'}>
              <div className="Qtitle">
                  <span>{prop.id+1}</span>
                  <h3 className='question-title'>
                      {prop.problem}
                  </h3>
              </div>
              <button className='btn' onClick={() => setExpanded(!expanded)}>
              {expanded ? <AiFillCaretUp  /> : <AiFillCaretDown />}
            </button>
          </div>
            {expanded &&
                <div className="content">
                    <div className="content_box">
                        <div className="pro_descrip">
                            <h4>Description</h4>
                            <p className="p_intro">{prop.description}</p>
                        </div>
                        <div className="pro_limit">
                            <h4>Limitation</h4>
                            <ul>{prop.limit}</ul>
                        </div>
                    </div>
                    <div className="pro_btn">
                        <button className="use_btn" onClick={() => {setShowForm(true); console.log("Form is open");
                            let obj = Object.values(prop.limit)[0].props.children
                             if (obj == 'number'){
                                    isUploaded(false)
                                    isInputed(true)
                                }else{
                                    isUploaded(true)
                                    isInputed(false)
                                };
                        }}> Use</button>
                    </div>
                </div>
            }
            {showed &&
                <section id="upload">
                    <div className="update_box">
                        <div className="ub_close">
                            <button className='close_btn' onClick={() => {setShowForm(false); console.log("Form is closed")}}>
                                <AiOutlineClose/>
                            </button>
                        </div>
                        {uploaded &&
                            <UpdataFile name={prop.name} file={prop.file} limit={Object.values(prop.limit)[0]} id={prop.id}/>}
                        {inputed &&
                            <InputNum name={prop.name} file={prop.file} limit={Object.values(prop.limit)[0]} id={prop.id}/>}

                    </div>
                </section>

            }
        {/*                                {isUploading && (*/}
        {/*  <>*/}
        {/*      <CircularProgress*/}
        {/*        color="primary"*/}
        {/*        size="md"*/}
        {/*        variant="soft"*/}
        {/*        value={uploadProgress} thickness="12px">*/}
        {/*      {uploadProgress}%*/}
        {/*      </CircularProgress>*/}
        {/*  </>*/}
        {/*)}*/}
        {/* Show the success message and file names after upload */}
        {isFileUploaded && (
            <>
                <Alert key='danger' variant='danger'>
                  File(s) uploaded failed, Since {errormsg}
                </Alert>
            </>
        )}
        </div>
  )
}


const Accordion = (porp) => {
        const [questions, setQuestions] = useState(data)
       return(
           <div className="problem_box">
               <div className="box_title">
                   <h2>Problems</h2>
               </div>
                <div className='info'>
                  {questions.filter((question)=> question.cate==porp.cate).map((question)=> (
                         <Question key={question.id} id={question.id} problem={question.problem} description={question.description} file={question.limitation[0]} name={porp.cate}
                        limit = {question.limitation.map((limit, index) =>(
                            <li key={index}>{limit}</li>
                        ))}
                        />
                  ))}
                </div>
           </div>
       )
}
export default Accordion
