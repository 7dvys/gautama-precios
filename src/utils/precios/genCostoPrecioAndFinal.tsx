import { MatchItemXlsxProduct } from "@/types/precios";
import { XlsxConfig } from "@/types/xlsx/types";

const genCostoPrecioAndFinal = ({xlsxCosto,rentabilidadPrevia,xlsxConfig,ivaPrevio}:{xlsxCosto:number;rentabilidadPrevia:number;xlsxConfig:XlsxConfig,ivaPrevio:number}):MatchItemXlsxProduct=>{

    if(typeof xlsxCosto != 'number')
    xlsxCosto=0;

    let iva = xlsxConfig.iva;
    if(!iva)
    iva = ivaPrevio;
    const ivaFactor = (iva/100)+1??1;
    
    let subCosto = xlsxCosto;
    if(xlsxConfig.ivaIncluido == 'si')
    subCosto = xlsxCosto/ivaFactor;
    
    const modificacionFactor = (xlsxConfig.modificacion/100)+1??1;

    let rentabilidad = xlsxConfig.rentabilidad;
    if(!rentabilidad)
    rentabilidad = rentabilidadPrevia;

    let rentabilidadFactor = (rentabilidad/100)+1??1;
    if(xlsxConfig.afecta == 'no'){
      rentabilidadFactor = rentabilidadFactor/modificacionFactor;
      rentabilidad = (rentabilidadFactor-1)*100;
    }

    const costo = subCosto*modificacionFactor;
    const precio = costo*rentabilidadFactor;
    const final = precio*ivaFactor;
    
    return {subCosto:Number(subCosto.toFixed(2)),iva:Number(iva.toFixed(2)),costo:Number(costo.toFixed(2)),precio:Number(precio.toFixed(2)),rentabilidad:Number(rentabilidad.toFixed(2)),final:Number(final.toFixed(2))}
  }

  export {genCostoPrecioAndFinal}
  