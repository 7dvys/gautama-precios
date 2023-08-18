import { MatchItemXlsxProduct } from "@/types/precios";
import { XlsxConfig } from "@/types/xlsx/types";

const genCostoPrecioAndFinal = ({xlsxCosto,rentabilidadPrevia,xlsxConfig,ivaPrevio}:{xlsxCosto:number;rentabilidadPrevia:number;xlsxConfig:XlsxConfig,ivaPrevio:number}):MatchItemXlsxProduct=>{
    if(typeof xlsxCosto != 'number')
    xlsxCosto=0;

    let rentabilidad = xlsxConfig.ganancia;
    if(!rentabilidad)
    rentabilidad = Number(rentabilidadPrevia.toFixed(2));

    let iva = xlsxConfig.iva;
    if(!iva)
    iva = Number(ivaPrevio.toFixed(2))

    let afectaFactor = 1;
    if(xlsxConfig.afecta=='no' && xlsxConfig.modificacion)
    afectaFactor=1/xlsxConfig.modificacion;

    const ivaFactor=1+iva/100;
    const gananciaFactor = (1+rentabilidad/100)*afectaFactor;
    const modificacionFactor = 1+xlsxConfig.modificacion/100;

    const ganancia = (gananciaFactor-1)*100;
    const modificacion = (modificacionFactor-1)*100;

    let subCosto = xlsxCosto;
    let costo = xlsxCosto*modificacionFactor;
    let precio = costo*gananciaFactor;

    if(xlsxConfig.ivaIncluido=='si'){
      subCosto = xlsxCosto/ivaFactor;
      costo=(xlsxCosto*modificacionFactor)/ivaFactor;
      precio=costo*ivaFactor;
    }

    const final = precio*ivaFactor
    
    return {subCosto:Number(subCosto.toFixed(2)),modificacion:Number(modificacion.toFixed(2)),costo:Number(costo.toFixed(2)),precio:Number(precio.toFixed(2)),ganancia:Number(ganancia.toFixed(2)),final:Number(final.toFixed(2))}
  }

  export {genCostoPrecioAndFinal}
  