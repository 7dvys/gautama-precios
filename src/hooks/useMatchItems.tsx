import { useState } from "react"
import { serializeArray } from "@/utils"
import { CbProduct } from "@/types/contabiliumApi/types"
import { XlsxConfig } from "@/types/xlsx/types"
import { genCostoPrecioAndFinal } from "@/utils/precios"
import { MatchItemXlsxProduct, MatchItems } from "@/types/precios";


const useMatchItems = ({cbProducts,xlsxProducts,xlsxConfig}:{cbProducts:CbProduct[];xlsxProducts:any[];xlsxConfig:XlsxConfig})=>{
    const initialValue = {cbProducts:[],xlsxProducts:[]}
    const [matchItems,setMatchItems]= useState<MatchItems>(initialValue)

    const clearMatchItems = ()=>{
        setMatchItems(initialValue)
    }

    const matchXlsxAndCbProducts = ()=>{
        const serializedCbProducts = serializeArray(cbProducts,"Codigo")
        const matchItems = xlsxProducts.reduce((acc,currentXlsxProduct)=>{
    
          const xlsxProductCodigo = currentXlsxProduct[xlsxConfig.colCodigo-1].toString();
          if(serializedCbProducts[xlsxProductCodigo]){  
            const xlsxCosto = Number(currentXlsxProduct[xlsxConfig.colCosto-1]);
            const cbProduct:CbProduct = serializedCbProducts[xlsxProductCodigo]; 
            const rentabilidadPrevia = Number(cbProduct.Rentabilidad);
            const ivaPrevio = Number(cbProduct.Iva);
            
            const costos = genCostoPrecioAndFinal({xlsxCosto,rentabilidadPrevia,xlsxConfig,ivaPrevio});
            acc.cbProducts.push(cbProduct)
            acc.xlsxProducts.push(costos);
          }
          return acc;
        },initialValue)
        setMatchItems(matchItems);
    }

    const updateMatchItems = (index:number)=>{
        const currentMatchItem = matchItems.xlsxProducts[index];
        const {costo,final,iva} = currentMatchItem;
        const ivaFactor = 1+iva/100;
        const nuevoFinal = Number(prompt('nuevo final',final.toString())??final)
        const nuevoPrecio = nuevoFinal/ivaFactor;
        const nuevaRentalibidad = (nuevoFinal/(costo*ivaFactor)-1)*100
        
        const updated:MatchItemXlsxProduct = {...currentMatchItem,
          precio:Number(nuevoPrecio.toFixed()),
          rentabilidad:Number(nuevaRentalibidad.toFixed()),
          final:Number(nuevoFinal.toFixed())};

        matchItems.xlsxProducts[index]=updated;
    
        setMatchItems({...matchItems})
    }

    return {matchItems,clearMatchItems,matchXlsxAndCbProducts,updateMatchItems}
}

export {useMatchItems};
    