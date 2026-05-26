import { useSearchParams } from "react-router"

interface SearchProps{
    className?:string,
    placeHolder:string
}
function Search({className,placeHolder}:SearchProps) {
  const [searchParams,setSearchParams]=useSearchParams()
  return (
   <div>
    <div style={{display:"flex",justifyContent:"center",gap:"2rem", position:"relative", alignItems:"center"}}>
        
     <input name="productName" placeholder={placeHolder}  className={className||undefined} onChange={(e)=>setSearchParams({...searchParams,search:e.target.value})}/>
     <img src="/assets/search.png" style={{display:"block"}} alt="search icon" />
    </div>
   </div>
  )
}

export default Search