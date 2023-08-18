import { ChangeEvent } from "react";
import * as XLSX from 'xlsx';

const readXlsx = async (xlsxFile:any)=>{
    const data = await xlsxFile.arrayBuffer();
    const xlsxData = XLSX.read(data);
    return xlsxData;
}

export {readXlsx}