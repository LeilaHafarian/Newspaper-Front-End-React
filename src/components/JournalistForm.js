import './journalist-form.css'
const JournalistForm=({data,onChange,journalists,images})=>{
    return <div className="d-flex d-flex-colum edit-article">
        <div className="d-flex align-item-center gap-16">
           <label>FirstName</label>
           <input value={data.firstName} onChange={(e)=>{
          
            onChange(e.target.value,'firstName')
           }}/>
        </div>
        <div className="d-flex align-item-center gap-16">
           <label>LastName</label>
           <input value={data.lastName} onChange={(e)=>{
          
            onChange(e.target.value,'lastName')
           }}/>
        </div>
        <div className="d-flex align-item-center gap-16">
           <label>TwitterUserName</label>
           <input value={data.twitterUserName} onChange={(e)=>{
          
            onChange(e.target.value,'twitterUserName')
           }}/>
        </div>
        <div className="d-flex align-item-center gap-16">
           <label>Mail</label>
           <input value={data.mail} onChange={(e)=>{
          
            onChange(e.target.value,'mail')
           }}/>
        </div>
        <div className="d-flex align-item-center gap-16">
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
    </div>
}
export default JournalistForm;