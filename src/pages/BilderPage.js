import { useEffect, useState } from "react";
import "./article.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { getAllImages,uploadImage } from "../apis/API";

const BilderPage = () => {
  const [bilders, setBilders] = useState([]);
  const [biderUrl, setBiderUrl] = useState(null);
  const [loading,setLoading]=useState(false)
  const [name,setName]=useState('');
  const[displayMessage,setDisplayMessage]=useState('')
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await getAllImages();
    setBilders(result)
  };
  const onChangeLogo = async (e) => {
    let file = e.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setBiderUrl(file);
    };
  };

  const submit= async()=>{
    setLoading(true)
    setDisplayMessage('')
    let formData = new FormData();
    formData.append("file", biderUrl,`${name}.jpg`);
    await uploadImage(formData)
    setLoading(false)
    setName('')
    setBiderUrl(null)
    setDisplayMessage('Uppladdning lyckades')

  }
  console.log({biderUrl})
  return (
    <div className="page">
      <div className="article-header">
        <h1 className="Bilders">Bilder</h1>
        <button onClick={submit} disabled={loading}>Skapa   {loading && <FontAwesomeIcon icon={faSpinner} />}</button>
      </div>
      <hr />
      <div className="upload">
        {
          displayMessage!=='' && <div className="sucess-message">{displayMessage}</div>
        }
        <div className="d-flex gap-16">
          <label>Label name</label> <input value={name} onChange={(e)=>setName(e.target.value)}/>
          <div className="bider-upload">
            <span> Bläddra</span>
         
             <input
                    type={"file"}
                    id="logo-img"
                    name="logo-img"
                    onChange={() => {
                      onChangeLogo(
                        document.querySelector(
                          'input[type=file][name="logo-img"]'
                        )
                      );
                    }}
                  />
        </div>
        </div>
        <button onClick={submit} disabled={loading}>Ladda upp   {loading && <FontAwesomeIcon icon={faSpinner} />}</button>

      
   
      </div>
     
    </div>
  );
};
export default BilderPage;
