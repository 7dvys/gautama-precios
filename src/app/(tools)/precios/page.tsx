'use client'

import { useContext, useEffect, useState } from "react";
import { rootContext } from "@/context";
import { CbProduct } from "@/utils/contabiliumApi/types";
import { serializeArray } from "@/utils";
import styles from '@/assets/styles/precios.module.css'

const Precios = ()=>{

    const {xlsxProducts,cbProducts,xlsxConfig,cbVendors,matchItems,setMatchItems} = useContext(rootContext);

    useEffect(()=>{
      setMatchItems({xlsxProducts:[],cbProducts:[]})
      if(cbProducts.length && xlsxProducts.length)
      setMatchItems(matchXlsxAndCbProducts())

    },[xlsxProducts,cbProducts,xlsxConfig])

    const genCostoPrecioAndFinal = (n:number,rentabilidadPrevia:number)=>{
      if(typeof n != 'number')
        n=0;

      let rentabilidad = xlsxConfig.ganancia;
      if(!rentabilidad)
      rentabilidad = Number(rentabilidadPrevia.toFixed(2));

      let afectaFactor = 1;
      if(xlsxConfig.afecta=='no' && xlsxConfig.modificacion)
      afectaFactor=1/xlsxConfig.modificacion;
      const ivaFactor=1+xlsxConfig.iva/100;
      const gananciaFactor = (1+rentabilidad/100)*afectaFactor;
      const modificacionFactor = 1+xlsxConfig.modificacion/100;

      const ganancia = (gananciaFactor-1)*100;
      const modificacion = (modificacionFactor-1)*100;

      let subCosto = n;
      let costo = n*modificacionFactor;
      let precio = costo*gananciaFactor;

      if(xlsxConfig.ivaIncluido=='si'){
        subCosto = n/ivaFactor;
        costo=(n*modificacionFactor)/ivaFactor;
        precio=costo*ivaFactor;
      }

      const final = precio*ivaFactor
      
      return [(subCosto).toFixed(2),modificacion.toFixed(2),(costo).toFixed(2),(precio).toFixed(2),ganancia.toFixed(2),(final).toFixed(2)]
    }  
    
    const matchXlsxAndCbProducts = ()=>{
      const initialValue = {cbProducts:[],xlsxProducts:[]}
      const serializedCbProducts = serializeArray(cbProducts,"Codigo")

      const matchItems = xlsxProducts.reduce((acc,current)=>{

        const xlsxProductCodigo = current[xlsxConfig.colCodigo-1];
        if(serializedCbProducts[xlsxProductCodigo]){  

          const xlsxCosto = Number(current[xlsxConfig.colCosto-1])
          const cbProduct = serializedCbProducts[xlsxProductCodigo]; 
          const rentabilidadPrevia = cbProduct.Rentabilidad;
          
          const costos = genCostoPrecioAndFinal(xlsxCosto,rentabilidadPrevia);
          acc.cbProducts.push(cbProduct)
          acc.xlsxProducts.push(costos);
        }
        return acc;
      },initialValue)

      return matchItems;
    }

    const updateMatchItems = (index:number)=>{
      const [subCosto,modificacion,costo,_,ganancia,final] = matchItems.xlsxProducts[index];
      const ivaFactor = 1+xlsxConfig.iva/100;
      const nuevoFinal = Number(prompt('nuevo final',final.toString())??final.toFixed(2));
      const nuevoPrecio = Number((nuevoFinal/ivaFactor).toFixed(2));
      const nuevaGanancia = Number(((nuevoFinal/(Number(costo)*ivaFactor)-1)*100).toFixed(2))
      
      const updated:[subCosto:number,modificacion:number,costo:number,precio:number,ganancia:number,final:number] = [subCosto,modificacion,costo,nuevoPrecio,nuevaGanancia,nuevoFinal];
      matchItems.xlsxProducts[index]=updated;
      setMatchItems(
        {...matchItems}
      )
    }

    const TableMatchItems = ({matchItems}:{matchItems:{cbProducts:CbProduct[];xlsxProducts:number[][]}})=>{
      return (
        <div className={styles.tables}>
        <table>
          <thead>
            <tr>
              <th>codigo</th>
              <th>titulo</th>
              <th>final actual</th>
            </tr>
          </thead>
          <tbody>
            {matchItems.cbProducts.map((item:CbProduct,index)=>(
              <tr key={index}>
                <td>{item.Codigo}</td>
                <td>{item.Nombre}</td>
                <td title={`iva:${item.Iva}\nrentabilidad:${item.Rentabilidad}\ncosto:${item.CostoInterno}\nprecio:${item.Precio}`}>{item.PrecioFinal}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table>
          <thead>
              <tr>
                <th>costo</th>
                <th>precio</th>
                <th>final</th>
              </tr>
          </thead>
          <tbody>
            {matchItems.xlsxProducts.map((item:number[],index)=>{
              return(
                <tr key={index}>
                  <td title={`costo: ${item[0]}+${item[1]}%(modificacion)`}>{item[2]}</td>
                  <td title={`precio: costo+${item[4]}%(ganacia)`}>{item[3]}</td>
                  <td onClick={()=>{updateMatchItems(index)}}  title={`final: precio+${xlsxConfig.iva}%(iva)`}>{item[5]}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        </div>

      )
    }
    
    return(
    <>
    {matchItems && matchItems.cbProducts.length?<TableMatchItems matchItems={matchItems} />:''}
    </>)
}

export default Precios