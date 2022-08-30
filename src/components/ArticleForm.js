import './editArticle.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faTrash,faArrowDown,faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';

const CreateFormBlock=({type,images,onClick})=>{
    const[block,setBlock]=useState({
        type:type,
        order:0,
        value:''
    });
 
    const onChange=(value,name)=>{
        let item = Object.assign({}, block);
        item[name]=value;
        setBlock(item)

    }
    return(
        <div className="d-flex-colum paragraph-card">
        <div className='card-header'> <h1>{type==='image'? 'Bild' : type==="paragraph" ? 'Paragraf' :'Citat'}</h1> <div className='actions'> 
        <FontAwesomeIcon icon={faArrowDown} />
        <FontAwesomeIcon icon={faArrowUp} />
        <FontAwesomeIcon icon={faTrash} /></div></div>
        <input value={block.order} onChange={(e)=>onChange(e.target.value,'order')}/>
        {
            type==='image' ?  
            <select  
                value={block.value} 
                onChange={(e)=>onChange(e.target.value,'value')}>
                {
                    images.map((bilder)=>{
                        return <option value={bilder} key={bilder}>{bilder} </option>
                    })
                }
            </select> :<textarea   value={block.value} onChange={(e)=>onChange(e.target.value,'value')}/>
        }
        <button onClick={()=>onClick(block)}>Block</button>
       
</div>
    )
  
}
const ArticleForm=({
    data,
    onChange,
    journalists,
    images,
    onClickRemoveBlock,
    blocks,
    onClickDownOrder,
    onClickBlock,
    onClickUpOrder})=>{
        const[type,setType]=useState('')

    return <div className="d-flex d-flex-colum edit-article">
        <div className="d-flex align-item-center">
           <label>Titel</label>
           <input value={data.title} onChange={(e)=>{
          
            onChange(e.target.value,'title')
           }}/>
        </div>
        <div className="d-flex align-item-center">
            <label>Författare</label>
            <select  
                value={data.authorId} 
                onChange={(e)=> onChange(e.target.value,'authorId')}>
                {
                    journalists.map((item)=>{
                        return <option value={item.id} key={item.id}>{item.firstName} {item.lastName} </option>
                    })
                }
            </select>
        </div>
        <div className="d-flex align-item-center">
            <label>Artikelbild</label>
            <select  
                value={data.imageName} 
                onChange={(e)=> onChange(e.target.value,'imageName')}>
                {
                    images.map((bilder)=>{
                        return <option value={bilder} key={bilder}>{bilder} </option>
                    })
                }
            </select>
        </div>
        <div className="d-flex align-item-center">
           <label>Ingress</label>
           <textarea 
                row="10" 
                value={data.intro} 
                onChange={(e)=>{
                    onChange(e.target.value,'intro')
                }}/>
        </div>
        <div className="d-flex ">
           <label>Fäst Artikel</label>
          <input  
            type="checkbox" 
            checked={data.pinned} 
            value={data.pinned} 
            onChange={(e)=> onChange(e.target.checked,'pinned')} 
            
          />
        </div>
        <div className='divider'/>
        <div>Blocks</div>
        {
            blocks?.map((block)=>{
                if(block.type==="paragraph"){
                    return <div key={block.id} className="d-flex-colum paragraph-card">
                        <div className='card-header'> <h1>Paragraf</h1> <div className='actions'> 
                            <FontAwesomeIcon icon={faArrowDown} onClick={()=>onClickDownOrder(block)} />
                            <FontAwesomeIcon icon={faArrowUp} onClick={()=>onClickUpOrder(block)}/>
                            <FontAwesomeIcon icon={faTrash} onClick={()=>onClickRemoveBlock(block.id)} /></div></div>
                  
                    <div className='content'>  {block.value}</div>
                </div>
                }
                else if(block.type==="image"){
                    return  (
                        <div key={block.id} className="d-flex-colum paragraph-card">
                            <div className='card-header'> <h1>Bild</h1> <div className='actions'> 
                            <FontAwesomeIcon icon={faArrowDown} onClick={()=>onClickDownOrder(block)}/>
                            <FontAwesomeIcon icon={faArrowUp} onClick={()=>onClickUpOrder(block)}/>
                            <FontAwesomeIcon icon={faTrash} onClick={()=>onClickRemoveBlock(block.id)}/></div></div>
                            <select  
                                value={block.value} 
                                onChange={(e)=> onChange(e.target.value,'imageName')}>
                                {
                                    images.map((bilder)=>{
                                        return <option value={bilder} key={bilder}>{bilder} </option>
                                    })
                                }
                            </select>
                    </div>
                    )
                }
                else{
                    return (
                        <div key={block.id} className="d-flex-colum paragraph-card">
                            <div className='card-header'> <h1>Citat</h1> <div className='actions'> 
                            <FontAwesomeIcon icon={faArrowDown} onClick={()=>onClickDownOrder(block)}/>
                            <FontAwesomeIcon icon={faArrowUp} onClick={()=>onClickUpOrder(block)}/>
                            <FontAwesomeIcon icon={faTrash} onClick={()=>onClickRemoveBlock(block.id)}/></div></div>
                            <div>  {block.value}</div>
                    </div>
                    )
                }
            })
        }
        {
            type!=='' &&   <CreateFormBlock images={images} type={type} onClick={(block)=>{
                setType('')
                onClickBlock(block)
            }}/>
        }
      
        <div className='block-actions'>
            <button onClick={()=>{setType('paragraph');}}>Ny Paragraf</button>
            <button onClick={()=>setType('citat')}>Nytt citat</button>
            <button onClick={()=>setType('image')}>Ny bild</button>

        </div>
    </div>
}
export default ArticleForm;