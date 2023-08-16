import { cbFetch } from "./cbFetch";

const getToken = ({client_id,client_secret}:{client_id:string,client_secret:string})=>{

    const body = new URLSearchParams();
    body.append('grant_type', 'client_credentials');
    body.append('client_id', client_id);
    body.append('client_secret', client_secret);

    const config={
        endpoint:'/token',
        method:'POST' as 'POST',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
        },
        body:body,
        cache:false
    }
    return cbFetch(config);
}

export {getToken}