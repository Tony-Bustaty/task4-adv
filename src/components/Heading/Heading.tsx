interface HeadingProps{
    content:string
}
import "./Heading.css"
function Heading({content}:HeadingProps) {
  return (
    <h1 className="heading">
        {content}
    </h1>
  )
}

export default Heading