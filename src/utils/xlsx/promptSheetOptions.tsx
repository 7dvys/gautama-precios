import { XlsxConfig } from "@/types/xlsx/types";

const getNumberForColLetter = (colString:string)=>{
    if(parseInt(colString))
    return Number(colString);

    colString = colString.toUpperCase();
    const codigoAscii = colString.charCodeAt(0);
    return codigoAscii - 65 + 1;
}

const promptCols = (xlsxConfig:XlsxConfig)=>{
    const colCodigo = getNumberForColLetter(prompt('Columna codigo: (En numero)',xlsxConfig.colCodigo.toString())??'A')
    const colCosto = getNumberForColLetter(prompt('Columna costo: (En numero)',xlsxConfig.colCosto.toString())??'C')
    return {colCodigo:colCodigo,colCosto:colCosto}
}

const promptAllSheetOptions = (xlsxConfig:XlsxConfig)=>{
    const {colCodigo,colCosto} = promptCols(xlsxConfig)
    const iva = Number(prompt('Coloque Iva: (sin porcentaje)',xlsxConfig.iva.toString())??'21')
    const ivaIncluido = prompt('Iva incluido en el costo?: (si/no)',xlsxConfig.ivaIncluido.toString())??'no'
    const rentabilidad = Number(prompt('Coloque rentabilidad: (sin porcentaje)',xlsxConfig.rentabilidad.toString())??'0')
    const modificacion = Number(prompt('Coloque modificacion: (+/- sin porcentaje)',xlsxConfig.modificacion.toString())??'0')
    const afecta = prompt('la modificacion afecta al precio final?: (si/no)',xlsxConfig.afecta.toString())??'si'
    
    return {iva,ivaIncluido,rentabilidad,modificacion,afecta,colCodigo,colCosto}
}

export {promptCols,promptAllSheetOptions}
