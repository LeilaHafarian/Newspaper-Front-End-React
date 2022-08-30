import { useEffect, useState } from "react";
import "./journalist.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash,faSpinner,faClose } from "@fortawesome/free-solid-svg-icons";
import { 
  getAllJournalist,
  deleteJournalist, 
  updateJournalist,
  createJournalist,
  getAllImages } from "../apis/API";
import JournalistForm from "../components/JournalistForm";




const JournalistPage = () => {
  const [journalistList, setJournalistList] = useState([]);
  const [images, setImages] = useState([]);
  const[loading,setLoading]=useState(false); 
  const[isSubmitting,setIsSubmitting]=useState(false);
  const[selectedJournalist,setSelectedJournalist]=useState(null);
  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    const result = await getAllJournalist();
    setJournalistList(result)
    const images= await getAllImages();
    setImages(images)
    
  };
   

  const onClickDeleteJournalist=async(id)=>{
    setLoading(true)
    const result = await deleteJournalist(id);
    setLoading(false)
    fetchData()
  }

  const onChangeInfo=(value,name)=>{
    let item = Object.assign({}, selectedJournalist);
    item[name]=value;
    setSelectedJournalist(item)
  }

  const onSubmit=async()=>{
    setIsSubmitting(true);
     selectedJournalist.id ? await updateJournalist(selectedJournalist) : await createJournalist(selectedJournalist);
    setIsSubmitting(false);
    setSelectedJournalist(null)
    const result = await getAllJournalist();
    setJournalistList(result)
    
   
  }

  console.log({selectedJournalist})

  return (
    <div className="page">
        <div className="journalist-header">
        <h1>{selectedJournalist!==null ?'Skriv Journalister':'Journalister'}</h1>
        <div className="d-flex align-item-center" style={{gap:24}}>
          <button onClick={selectedJournalist!==null ?onSubmit : ()=>setSelectedJournalist({
            firstName:'',
            lastName:'',
            imageName:'',
            twitterUserName:'',
            mail:''

          })} disabled={isSubmitting}>Skapa {isSubmitting &&<FontAwesomeIcon icon={faSpinner}/>}</button>
          {
            selectedJournalist!==null && <FontAwesomeIcon icon={faClose} onClick={()=>setSelectedJournalist(null)}/>
          }
        </div>
      </div>
      <hr />
      {
        selectedJournalist!==null ? 
        <JournalistForm 
          data={selectedJournalist} 
          onChange={onChangeInfo} 
          images={images}
        /> :(
      <ul className="journalist">
        {journalistList.map((journalist, index) => {
          return (
            <li key={index}>
              <label className="d-flex align-item-center gap-16"> <img src={"https://localhost:44368/images/"+journalist.imageName} alt="" width="40px" height={'40px'}/>{journalist.firstName} {journalist.lastName} </label>
              <div className="actions">
                  <button onClick={()=>setSelectedJournalist(journalist)}>
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button  onClick={()=>onClickDeleteJournalist(journalist.id)}>
                  <FontAwesomeIcon icon={loading ? faSpinner :faTrash} />
                  </button>
              </div>
            </li>
          );
        })}
      </ul>)}
    </div>
  );
};
export default JournalistPage;
