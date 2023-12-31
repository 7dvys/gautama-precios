import Link from "next/link"
import { Dispatch,SetStateAction } from "react"

interface NavLinkProps{
    currentTool:string;
    setCurrentTool:Dispatch<SetStateAction<string>>;
    tool:[title:string,text?:string];
}

const NavLink:React.FC<NavLinkProps> = ({setCurrentTool,currentTool,tool:[name,text]})=>{
    if(!name)
    name=`http://${process.env.host_ip}:${process.env.host_port}/`
    return(
        <Link onClick={()=>setCurrentTool(name)} className={currentTool==name?'clicked':''} href={name}>{text??name}</Link>
    )
}

export {NavLink};