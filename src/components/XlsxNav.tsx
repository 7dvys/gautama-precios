'use client'
import { ChangeEvent,useState,useContext, useEffect  } from "react";
import { rootContext } from "@/context";
import {updateProducts} from '@/utils/contabiliumApi'
import { readXlsx,promptCols,promptAllSheetOptions } from "@/utils/xlsx";
import * as XLSX from 'xlsx';

const XlsxNav:React.FC = ()=>{
    const [xlsxFile,setXlsxFile] = useState<XLSX.WorkBook>({} as XLSX.WorkBook);
    const [selectedSheet,setSelectedSheet] = useState('none');
    const {setXlsxProducts,cbVendors,xlsxConfig,setXlsxConfig,matchItems,cbApiToken:apiToken} = useContext(rootContext);

    const SelectVendorOptions:React.FC = ()=>{
        if(cbVendors)
        return (
            cbVendors.map(({NombreFantasia,Id},index)=>(
                <option key={index} value={Id}>{NombreFantasia}</option>
            ))
        )
    }

    const SelectSheets:React.FC = ()=>{
        if(xlsxFile.Sheets)
        return (
            <select onChange={changeSheetHandler} name="sheet" value={selectedSheet}>
                <option value="none">hoja</option>
                {xlsxFile.SheetNames.map((sheet,index)=>(<option key={index} value={sheet}>{sheet}</option>))}
            </select>
        )
    }

    const ButtonOptions:React.FC = ()=>{
        const buttonTitle = `codigo|titulo|costo: ${xlsxConfig.colCodigo}|${xlsxConfig.colCosto}\niva: ${xlsxConfig.iva}\niva incluido: ${xlsxConfig.ivaIncluido}\nganancia: ${xlsxConfig.ganancia}\nmodificacion: ${xlsxConfig.modificacion}\nafecta a final: ${xlsxConfig.afecta}\nproveedor:${xlsxConfig.idProveedor}`

        if(xlsxFile.Sheets)
        return(
            <button onClick={openXlsxOptions} title={buttonTitle}>configuracion</button>
        )
    }

    const ButtonAcept:React.FC = ()=>{
        if(matchItems && matchItems.cbProducts.length)
        return (
            <button onClick={()=>{
                if(confirm('Actualizar precios?'))
                updateProducts({matchItems,apiToken})
            }}>aceptar</button>
        )
    }

    const changeXlsxFileHandler = async(event:ChangeEvent<HTMLInputElement>)=>{
        if(event.target.files){
            const xlsxFile = event.target.files[0];
            const xlsxData:XLSX.WorkBook = await readXlsx(xlsxFile);
            setXlsxFile(xlsxData);
        }
        setSelectedSheet('none');
    }

    const changeSheetHandler = (event:ChangeEvent<HTMLSelectElement>)=>{
        if(event.target.value !='none'){
            const {colCodigo,colCosto} = promptCols()
            setXlsxConfig({...xlsxConfig,colCodigo:colCodigo,colCosto:colCosto})
        }
        setSelectedSheet(event.target.value);
    }

    useEffect(()=>{
        if(xlsxFile.Sheets)
        setXlsxProducts(XLSX.utils.sheet_to_json(xlsxFile.Sheets[selectedSheet],{header:1,defval:'_null'})) 
    },[selectedSheet])

    const openXlsxOptions = ()=>{
        const allSheetOptions = promptAllSheetOptions(xlsxConfig);
        setXlsxConfig({...xlsxConfig,...allSheetOptions})
    }

    return (
        <>
            <select value={xlsxConfig.idProveedor} onChange={(event)=>{setXlsxConfig({...xlsxConfig,idProveedor:event.target.value})}}>
                <option value={'none'}>proveedor</option>
                <SelectVendorOptions/>             
            </select>

            <input name="xlsxFile" type="file" onChange={changeXlsxFileHandler}/>
            <SelectSheets/>
            <ButtonOptions/>
            <ButtonAcept/>
        </>
    )
}

export {XlsxNav}