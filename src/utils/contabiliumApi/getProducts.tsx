import { cbFetch } from "./cbFetch"

const getProducts = async (apiToken:string)=>{
    const config = (page:number)=>({
        endpoint:`/api/conceptos/search?pageSize=50&page=${page+1}`,
        method:"GET" as "GET",
        token:apiToken,
    })

    const request = await cbFetch(config(0));

    if(!request)
    return false;
    
    const {Items,TotalItems} = await request.json();

    let remainingPages = Math.trunc((TotalItems-50)/50)
    
    if((TotalItems-50)%50) 
    remainingPages++;
    
    const promises = [];
    for(let page=0;page<remainingPages;page++){
        promises.push(cbFetch(config(page+1)))
    }

    const allProducts = [];
    await Promise.all(promises).then((productResponses)=>{
        productResponses.forEach(async (request)=>{
            if(request){
                const {Items} = await request.json()
                allProducts.push(...Items)
            }
        })
    })
    allProducts.push(...Items);
    return allProducts;
}

export {getProducts};