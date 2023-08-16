// Pendiente
import { useState } from "react";
const useNavStatus = ()=>{
    const [navStatus,setNavStatus] = useState({status:'ok',fallback:''})

    const setNavLoading = ({fallback}:{fallback:string})=>{
        const msg = fallback??''
        setNavStatus({status:'loading',fallback:msg});
    }

    const clearNavStatus = ()=>{
        setNavStatus({status:'ok',fallback:''});
    }
}