interface ConfigProps{
    method?:'POST'|'GET'|'DEL'|'PUT';
    headers?:Record<string,string>;
    cache?:boolean|'no-store';
    body?:any;
}

interface CbFetchProps extends ConfigProps{
    endpoint:string;
    token?:string;
}

const cbFetch = async ({endpoint,method='GET',headers={'Content-Type':'application/json'},cache=false,body='',token=''}:CbFetchProps)=>{
    const baseUrl = 'https://rest.contabilium.com'
    
    const config:ConfigProps = {           
        method:method,
        headers:headers,
    }
    
    if(method!='GET')
    config.body=body;

    if(!cache)
    config.cache = "no-store";

    if(token)
    config.headers = {...config.headers,'Authorization':'Bearer '+token}

    const request =  await fetch(baseUrl+endpoint,config as RequestInit)

    if(!request.ok){
        console.error(request.status,request.statusText)
        return false;
    }

    return request;
}

export {cbFetch};