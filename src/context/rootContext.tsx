'use client'
import { CbProduct } from "@/utils/contabiliumApi/types/CbProduct";
import { CbVendor } from "@/utils/contabiliumApi/types/CbVendor";
import { XlsxConfig } from "@/utils/xlsx/types";
import { createContext } from "react";

interface RootContextProps{
    xlsxProducts:any[],
    setXlsxProducts:Function,
    cbApiToken:string,
    setCbApiToken:Function,
    cbProducts:CbProduct[],
    setCbProducts:Function,
    cbVendors:CbVendor[],
    setCbVendors:Function,
    xlsxConfig:XlsxConfig,
    setXlsxConfig:Function;
    matchItems:{cbProducts:CbProduct[];xlsxProducts:[subCosto:number,modificacion:number,costo:number,precio:number,ganancia:number,final:number][]};
    setMatchItems:Function;
}
export const rootContext = createContext({} as RootContextProps);




