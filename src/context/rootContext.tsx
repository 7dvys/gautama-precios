'use client'
import { CbProduct } from "@/types/contabiliumApi/types/CbProduct";
import { CbVendor } from "@/types/contabiliumApi/types/CbVendor";
import { MatchItems } from "@/types/precios";
import { XlsxConfig } from "@/types/xlsx/types";
import { createContext,Dispatch,SetStateAction } from "react";

interface RootContextProps{
    xlsxProducts:any[],
    setXlsxProducts:Dispatch<SetStateAction<any[]>>,
    cbApiToken:string,
    setCbApiToken:Dispatch<SetStateAction<string>>,
    cbProducts:CbProduct[],
    setCbProducts:Dispatch<SetStateAction<CbProduct[]>>,
    cbVendors:CbVendor[],
    setCbVendors:Dispatch<SetStateAction<CbVendor[]>>,
    xlsxConfig:XlsxConfig,
    setXlsxConfig:Dispatch<SetStateAction<XlsxConfig>>;
    matchItems:MatchItems;
    clearMatchItems:Function;
    matchXlsxAndCbProducts:Function;
    updateMatchItems:Function;
}
export const rootContext = createContext({} as RootContextProps);




