'use client'
import { ChangeEvent,useState,useContext  } from "react";
import { rootContext } from "@/context";
import {updateProducts} from '@/utils/contabiliumApi'
import * as XLSX from 'xlsx' 

const XlsxNav = ()=>{
    const [xlsxFile,setXlsxFile] = useState<XLSX.WorkBook>({} as XLSX.WorkBook);
    const [selectedSheet,setSelectedSheet] = useState('none');
    const {setXlsxProducts,cbVendors,xlsxConfig,setXlsxConfig,matchItems,cbApiToken:apiToken} = useContext(rootContext);

    const readXlsx = async (event:ChangeEvent<HTMLInputElement>)=>{
        if(event.target.files){
            const xlsxFile = event.target.files[0];
            const data = await xlsxFile.arrayBuffer();
            setXlsxFile(XLSX.read(data));
            setSelectedSheet('none')
        }
    }

    const putSheetOptions = (event:ChangeEvent<HTMLSelectElement>)=>{
        if(event.target.value!='none'){
            const colCodigo = getNumberForColLetter(prompt('Columna codigo: (En numero)','A')??'A')
            const colCosto = getNumberForColLetter(prompt('Columna costo: (En numero)','C')??'C')
            setXlsxConfig({...xlsxConfig,colCodigo:colCodigo,colCosto:colCosto})
            setXlsxProducts(XLSX.utils.sheet_to_json(xlsxFile.Sheets[event.target.value],{header:1,defval:'_null'})) 
        }else{
            setXlsxConfig({...xlsxConfig})
            setXlsxProducts(XLSX.utils.sheet_to_json(xlsxFile.Sheets[event.target.value],{header:1,defval:'_null'})) 
        }
        setSelectedSheet(event.target.value)
    }

    const putAllSheetOptions = ()=>{
        const colCodigo = getNumberForColLetter(prompt('Columna codigo: (En numero)',xlsxConfig.colCodigo.toString())??'A')
        const colCosto = getNumberForColLetter(prompt('Columna costo: (En numero)',xlsxConfig.colCosto.toString())??'C')
        const iva = parseInt(prompt('Coloque Iva: (sin porcentaje)',xlsxConfig.iva.toString())??'21')
        const IvaIncluido = prompt('Iva incluido en el costo?: (si/no)',xlsxConfig.ivaIncluido.toString())??'no'
        const ganancia = parseInt(prompt('Coloque ganancia: (sin porcentaje)',xlsxConfig.ganancia.toString())??'0')
        const modificacion = parseInt(prompt('Coloque modificacion: (+/- sin porcentaje)',xlsxConfig.modificacion.toString())??'0')
        const afecta = prompt('la modificacion afecta al precio final?: (si/no)',xlsxConfig.afecta.toString())??'si'
        setXlsxConfig({...xlsxConfig,iva:iva,ivaIncluido:IvaIncluido,ganancia:ganancia,modificacion:modificacion,afecta:afecta,colCodigo:colCodigo,colCosto:colCosto})
    }

    const getNumberForColLetter = (colString:string)=>{
        if(parseInt(colString))
        return Number(colString);

        colString = colString.toUpperCase();
        const codigoAscii = colString.charCodeAt(0);
        return codigoAscii - 65 + 1;
    }

    const putProveedor = (event:ChangeEvent<HTMLSelectElement>)=>{
        setXlsxConfig({...xlsxConfig,idProveedor:event.target.value})
    }

    const confirmUpdate = ()=>{
        if(confirm('Actualizar precios?'))
        updateProducts({matchItems,apiToken}).then(()=>{alert('Productos actualizados!!')})
    }

    return (
        <>
            <select onChange={putProveedor}>
                <option value={'none'}>proveedor</option>
                {
                    cbVendors?cbVendors.map(({NombreFantasia,Id},index)=>(
                        <option key={index} value={Id}>{NombreFantasia}</option>
                    )):''
                }                
            </select>
            <input onChange={readXlsx} type="file" name="xlsx file"/>
            {
            xlsxFile.Sheets?
            <>
            <select onChange={putSheetOptions}  name="sheet" value={selectedSheet}>
                <option value="none">hoja</option>
                {
                xlsxFile.SheetNames.map((sheet,index)=>(
                    <option key={index} value={sheet}>{sheet}</option>
                ))
                }
            </select>
            <button 
            onClick={putAllSheetOptions}
            title={`codigo|titulo|costo: ${xlsxConfig.colCodigo}|${xlsxConfig.colCosto}\niva: ${xlsxConfig.iva}\niva incluido: ${xlsxConfig.ivaIncluido}\nganancia: ${xlsxConfig.ganancia}\nmodificacion: ${xlsxConfig.modificacion}\nafecta a final: ${xlsxConfig.afecta}\nproveedor:${xlsxConfig.idProveedor}`}>configuracion</button>
            </>
            :''
            }
            {matchItems && matchItems.cbProducts.length?<button onClick={()=>{confirmUpdate()}}>aceptar</button>:''}
        </>
    )
}

export {XlsxNav}