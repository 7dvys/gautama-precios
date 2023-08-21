import { MatchItems } from "@/types/precios"
import { cbFetch } from "@/utils/contabiliumApi"

const updateProducts = async ({matchItems,apiToken}:{matchItems:MatchItems,apiToken:string})=>{
    matchItems.cbProducts.forEach((product,index)=>{
        const {costo,precio,rentabilidad,final,iva} = matchItems.xlsxProducts[index]
        const newProduct = {...product,
            CostoInterno:costo,
            Precio:precio,
            Rentabilidad:rentabilidad,
            PrecioFinal:final,
            Iva:iva,
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