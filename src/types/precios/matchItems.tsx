import { CbProduct } from "../contabiliumApi/types";

type MatchItemXlsxProduct = {
    subCosto:number,
    costo:number,
    precio:number,
    rentabilidad:number,
    final:number,
    iva:number
}

interface MatchItems{
    cbProducts:CbProduct[];
    xlsxProducts:MatchItemXlsxProduct[]
}


export {type MatchItems, type MatchItemXlsxProduct};