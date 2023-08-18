import { MatchItems } from "@/types/precios"
import { CbProduct } from "../../types/contabiliumApi/types"
import { cbFetch } from "@/utils/contabiliumApi"

const updateProducts = async ({matchItems,apiToken}:{matchItems:MatchItems,apiToken:string})=>{
    matchItems.cbProducts.forEach((product,index)=>{
        const {costo,precio,ganancia,final} = matchItems.xlsxProducts[index]
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
        
        cbFetch(config)
    })


}


export {updateProducts}