import { cbFetch } from "./cbFetch"

const getUser = (apiToken:string)=>{
    const config = {
        endpoint:`/api/usuarios/obtenerinfo`,
        method:"GET" as "GET",
        token:apiToken,
    }

    return cbFetch(config);
}

export {getUser}