import axios from "axios";
import logo from "./assets/image1.jpg";
import {useState, useRef, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Spinner from "./components/spinner/spinner";

function App() {
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState("");
  const [receiveFile, setReceiveFile] = useState(null);
  
  // const fileInputRef = useRef();
  const inputFileRef = useRef();

  // const [fileValue, setFileValue] = useState(null);
  const [replaceText, setReplaceText] = useState("");
  const [loading, setLoading] = useState(false);
  const [textValue, setTextValue] = useState("");

  // change text value -----------------------------
  const changeTextValue = (event)=>{setTextValue(event.target.value);};

  // open file picker and select file ---------------------------------------
  const openFilePicker = ()=>{inputFileRef.current.click();};
  const pickFile = (event)=>{
    const file = event.target.files[0];
    console.log(file.type);
    if(!file.type.startsWith("image/")) {
      alert("Please Select an Image File ");
    } else {
      setFileURL(URL.createObjectURL(event.target.files[0]));
      setFile(event.target.files[0]);
      console.log(event.target.files[0]);
    }

  };
  const cancelSelectFile = ()=>{setFile(null); setFileURL("");};

  // send selected file --------------------------------------------------
  const sendFile = async (event)=>{
    event.preventDefault();
    setLoading(true);

    try{
      if(!file) {
        console.error("No file selected for upload.");
        return;
      }

      const response = await axios.post("https://jovialsoh-apiocr.hf.space/uploadfile", {workFile: file, replaceName: replaceText}, {
        headers: {
          "Content-Type": "multipart/form-data"
        }, 
        responseType : "blob"
      });
      const blob = await response.data;
      
      const urlFile = URL.createObjectURL(blob);
      setReceiveFile(urlFile);

      const headers = JSON.parse(response.headers["image-data"]);
      var outputText = "";

      headers.forEach(value=>{
        outputText += `pos=(${value.x}, ${value.y}) text=${value.text} \n`;
      });
      
      console.log(headers);
      console.log(outputText);
      setTextValue(outputText);
      
    } catch(error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="app">
      <h1 className="fs-1 fw-bold"> Text Erase </h1>
      <div className="container rounded-2 px-3 main-container">
        <div className="row h-100 py-2">
          <div className="col col-12 col-md-6 col-sm-12 col-md-6 first-bloc d-flex align-items-center flex-column justify-content-center gap-2">
            {fileURL ? (
              <div className="h-100 w-100 position-relative bg-primary">
                <img src={fileURL} alt={"upload-image"} height={"100%"} width={"100%"} className="position-absolute top-0 start-0"/>
                <button className="btn btn-dark position-absolute top-0 end-0 m-2" onClick={cancelSelectFile}><span className="fas fa-close"></span></button>
              </div>
            ) : (
              <button className="btn w-100 upload-bt h-100" onClick={openFilePicker}><span className="icon fas fa-file-upload"></span> <br/><br/><span>Upload File</span> </button>
            )}
            <input type="file" style={{display: "none"}} onChange={pickFile} ref={inputFileRef}/>
            <button className="btn w-100 send-bt" onClick={sendFile}> Erase Text</button>
          </div>

          <div className="col col-12 col-md-6 col-sm-12 second-bloc d-flex flex-column justify-content-center gap-3">
            <div className="replace-text-or-image d-flex justify-content-between align-items-center">
              <input type={"text"} placeholder={"Enter the replace text"} name={"replaceText"} onChange={(e)=>setReplaceText(e.target.value)} value={replaceText} className={"form-control"}/>
            </div>

            <div className="ouput-text-bloc h-25 d-flex flex-column">
              <label htmlFor="output-text" className="form-label"> Output Text </label>
              { loading ? <Spinner /> :   <textarea className="form-control flex-grow-1" value={textValue} onChange={changeTextValue} id="output-text"/>}
            </div>

            <div className="output-image-bloc d-flex flex-column h-75 rounded-2">
              <label htmlFor="output-image">Output Image </label>
              {loading ? (<Spinner />) : (
                  <div className="position-relative flex-grow-1 bg-light rounded-3" id="output-image">
                    {receiveFile && <img src={receiveFile} className={"position-absolute top-0 start-0 h-100 w-100"} alt={"output-image"} />}
                  </div>)
              }

            </div>
            <a href={receiveFile} download={`extract-image-${Date.now()}.png`} className="fw-bold btn btn-success" disabled={!receiveFile ? true : false} > Download Image </a>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
