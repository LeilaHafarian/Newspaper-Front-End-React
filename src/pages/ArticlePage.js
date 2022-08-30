import { useEffect, useState } from "react";
import "./article.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash,faSpinner,faClose } from "@fortawesome/free-solid-svg-icons";
import { 
  getAllArticles,
  deleteArticle,
  updateArticle,
  getAllJournalist,
  getAllImages,
  createArticle
 } from "../apis/API";
import ArticleForm from "../components/ArticleForm";

const ArticlePage = () => {
  const [artcileList, setArticleList] = useState([]);
  const [journalistList, setJournalistList] = useState([]);
  const [images, setImages] = useState([]);
  const[blocks,setBlocks]=useState([]);
  const[loading,setLoading]=useState(false);
  const[isSubmitting,setIsSubmitting]=useState(false);
  const[selectedArticle,setSelectedArticle]=useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await getAllArticles();
    const Journalists = await getAllJournalist();
    const images= await getAllImages();
    setImages(images)
    setJournalistList(Journalists)
    setArticleList(result)
  };

  const onClickDeleteArticle=async(id)=>{
    setLoading(true)
    const result = await deleteArticle(id);
    setLoading(false)
    fetchData()
  }

  const onChangeInfo=(value,name)=>{
    let item = Object.assign({}, selectedArticle);
    item[name]=value;
    setSelectedArticle(item)
  }

  const onSubmit=async()=>{
    setIsSubmitting(true);
    const result= selectedArticle.id ? await updateArticle(selectedArticle) : await createArticle(selectedArticle);
    setIsSubmitting(false);
    setSelectedArticle(null)
    const articles = await getAllArticles();
    setArticleList(articles)
  }
  const onClickRemoveBlock=(id)=>{
    let newArray=blocks.filter((item)=>item.id!==id);
    let item = Object.assign({}, selectedArticle);
    item.blocks=newArray;
    setSelectedArticle(item)
    setBlocks(newArray)

  }
  const onClickDownOrder=(block)=>{
  let newArray =blocks.map(item => ({...item})) 
   for(let i=0;i<newArray.length;i++){
   
    if(newArray[i].id===block.id){
      newArray[i].order=(block.order)+1
    }
    else if(newArray[i].id!==block.id && newArray[i].order>block.order){
      newArray[i].order=newArray[i].order-1
    }
   }
   newArray.sort((a, b) => parseFloat(a.order) - parseFloat(b.order));
   setBlocks(newArray)
   let item = Object.assign({}, selectedArticle);
   item.blocks=newArray;
   setSelectedArticle(item)
  }

  
  const onClickUpOrder=(block)=>{
    let newArray =blocks.map(item => ({...item})) 
     for(let i=0;i<newArray.length;i++){
     
      if(newArray[i].id===block.id){
        newArray[i].order=(block.order)-1
      }
      else if(newArray[i].id!==block.id && newArray[i].order<block.order){
        newArray[i].order=newArray[i].order+1
      }
     }
     newArray.sort((a, b) => parseFloat(a.order) - parseFloat(b.order));
     setBlocks(newArray)
     let item = Object.assign({}, selectedArticle);
     item.blocks=newArray;
     setSelectedArticle(item)
    }
    const onClickBlock=(block)=>{
      let newArray =blocks.map(item => ({...item}))
      newArray.push(block)
      let item = Object.assign({}, selectedArticle);
      item.blocks=newArray;
      setSelectedArticle(item)
      setBlocks(newArray)
    }
   console.log({setSelectedArticle})

  return (
    <div className="page">
      <div className="article-header">
        <h1 className="Artiklar">{selectedArticle!==null ?'Skriv Artiklar':'Artiklar'}</h1>
        <div className="d-flex align-item-center" style={{gap:24}}>
          <button 
          onClick={
            selectedArticle!==null ?onSubmit : ()=>{
              setSelectedArticle({
                title:'',
                authorId:0,
                imageName:'',
                intro:'',
                pinned:false,
                blocks:[]
    
              });
              setBlocks([])
            }
         } disabled={isSubmitting}>{selectedArticle===null ? 'Skapa':'Spara'} {isSubmitting &&<FontAwesomeIcon icon={faSpinner}/>}</button>
          {
            selectedArticle!==null && <FontAwesomeIcon icon={faClose} onClick={()=>setSelectedArticle(null)}/>
          }
        </div>
      </div>
      <hr />
      {
        selectedArticle!==null ? 
        <ArticleForm 
          data={selectedArticle} 
          onChange={onChangeInfo} 
          journalists={journalistList}
          images={images}
          onClickRemoveBlock={onClickRemoveBlock}
          blocks={blocks}
          onClickDownOrder={onClickDownOrder}
          onClickUpOrder={onClickUpOrder}
          onClickBlock={onClickBlock}
        /> :(
          <ul className="articles">
          {artcileList.map((article, index) => {
            return (
              <li key={index}>
                <label className="d-flex align-item-center">   
                  <img src={ "https://localhost:44368/images/"+article.imageName} alt="" width="40px" height={'40px'} style={{borderRadius:'50%',marginRight:10}}/> 
                  {article.title.substring(0, 25)} 
                </label>
                <div className="actions">
                  <button onClick={()=>{setSelectedArticle(article);setBlocks(article.blocks)}}>
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button onClick={()=>onClickDeleteArticle(article.id)}>
                    <FontAwesomeIcon icon={loading ?faSpinner :faTrash} />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        )
      }
   
    </div>
  );
};
export default ArticlePage;
