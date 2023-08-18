import { XlsxConfig } from "@/types/xlsx/types";
import { ChangeEvent } from "react"

const getNumberForColLetter = (colString:string)=>{
    if(parseInt(colString))
    return Number(colString);

    colString = colString.toUpperCase();
    const codigoAscii = colString.charCodeAt(0);
    return codigoAscii - 65 + 1;
}

const promptCols = ()=>{
    const colCodigo = getNumberForColLetter(prompt('Columna codigo: (En numero)','A')??'A')
    const colCosto = getNumberForColLetter(prompt('Columna costo: (En numero)','C')??'C')
    return {colCodigo:colCodigo,colCosto:colCosto}
}

const promptAllSheetOptions = (xlsxConfig:XlsxConfig)=>{
    promptCols()
    const iva = Number(prompt('Coloque Iva: (sin porcentaje)',xlsxConfig.iva.toString())??'21')
    const ivaIncluido = prompt('Iva incluido en el costo?: (si/no)',xlsxConfig.ivaIncluido.toString())??'no'
    const ganancia = Number(prompt('Coloque ganancia: (sin porcentaje)',xlsxConfig.ganancia.toString())??'0')
    const modificacion = Number(prompt('Coloque modificacion: (+/- sin porcentaje)',xlsxConfig.modificacion.toString())??'0')
    const afecta = prompt('la modificacion afecta al precio final?: (si/no)',xlsxConfig.afecta.toString())??'si'

    return {iva,ivaIncluido,ganancia,modificacion,afecta}
}

export {promptCols,promptAllSheetOptions}
