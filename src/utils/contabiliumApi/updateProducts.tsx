import { CbProduct } from "./types"
import { cbFetch } from "@/utils/contabiliumApi"

const updateProducts = async ({matchItems,apiToken}:{matchItems:{cbProducts:CbProduct[],xlsxProducts:[subCosto:number,modificacion:number,costo:number,precio:number,ganancia:number,final:number][]},apiToken:string})=>{
    const config = (id:string)=>({
        endpoint:`/api/conceptos/?id=${id}`,
        method:"PUT" as "PUT",
        token:apiToken,
    })

    matchItems.cbProducts.forEach((product,index)=>{
        const [subCosto,modificacion,costo,precio,ganancia,final] = matchItems.xlsxProducts[index]
        const newProduct = {...product,
            CostoInterno:Number(costo),
            Precio:Number(precio),
            Rentabilidad:Number(ganancia),
            PrecioFinal:Number(final),
            Iva:21,
            Tipo:"P",
            Estado:"A"
        }
        const productId = product.Id;    
        const config = {
            endpoint:`/api/conceptos/?id=${productId}`,
            method:"PUT" as "PUT",
            token:apiToken,
            body:JSON.stringify(newProduct)
        }
        console.log({product,newProduct,config})
        
        cbFetch(config)
    })


}


export {updateProducts}