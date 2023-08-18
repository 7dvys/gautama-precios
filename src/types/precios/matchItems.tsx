import { CbProduct } from "../contabiliumApi/types";

type MatchItemXlsxProduct = {
    subCosto:number,
    modificacion:number,
    costo:number,
    precio:number,
    ganancia:number,
    final:number}

interface MatchItems{
    cbProducts:CbProduct[];
    xlsxProducts:MatchItemXlsxProduct[]
}


export {type MatchItems, type MatchItemXlsxProduct};