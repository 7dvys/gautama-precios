import { getToken } from '@/utils/contabiliumApi/getToken'

const storeCbApiToken = (setCbApiToken:Function)=>{
    const client_id = localStorage.getItem('cbUser')??'';
    const client_secret = localStorage.getItem('cbPass')??'';
    let refreshToken = false;

    if(localStorage.getItem('cbApiToken'))
    setCbApiToken(JSON.parse(localStorage.getItem('cbApiToken') ?? '').access_token);
    

    if((!localStorage.getItem('cbApiToken') || parseInt(JSON.parse(localStorage.getItem('cbApiToken') as string).expire_time_inSeconds) < new Date().getTime()/1000))
    refreshToken = true;

    if(refreshToken)
    getToken({client_id,client_secret}).then(async(request)=>{
        if(request){
            const apiToken = await request.json();
            apiToken.expire_time_inSeconds = new Date().getTime()/1000+apiToken.expires_in;
            localStorage.setItem('cbApiToken',JSON.stringify(apiToken))
            setCbApiToken(apiToken.access_token);
        }else{
            return false;
        }
    })
}

export {storeCbApiToken};