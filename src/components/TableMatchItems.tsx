import { CbProduct } from "@/types/contabiliumApi/types"
import { MatchItemXlsxProduct, MatchItems } from "@/types/precios"
import { XlsxConfig } from "@/types/xlsx/types"
import { ReactNode } from "react"

const Table:React.FC<{trHead:string[],children:ReactNode}> = ({trHead,children})=>{
  return (
    <table>
    <thead>
      <tr>
        <th>{trHead[0]}</th>
        <th>{trHead[1]}</th>
        <th>{trHead[2]}</th>
      </tr>
    </thead>
    <tbody>
      {children}
    </tbody>
  </table>
  )
}

const TableMatchItems:React.FC<{matchItems:MatchItems,updateMatchItems:Function,xlsxConfig:XlsxConfig}> = ({matchItems,updateMatchItems,xlsxConfig})=>{
  if(matchItems && matchItems.cbProducts.length)
    return (
      <>
      <Table trHead={['codigo','titulo','final actual']}>
        {matchItems.cbProducts.map((item:CbProduct,index)=>(
            <tr key={index}>
              <td>{item.Codigo}</td>
              <td>{item.Nombre}</td>
              <td title={`iva:${item.Iva}\nrentabilidad:${item.Rentabilidad}\ncosto:${item.CostoInterno}\nprecio:${item.Precio}`}>{item.PrecioFinal}</td>
            </tr>
          ))}
      </Table>
      <Table trHead={['costo','precio','final']}>
      {matchItems.xlsxProducts.map((item:MatchItemXlsxProduct,index)=>{
            return(
              <tr key={index}>
                <td title={`costo: ${item.subCosto}+${xlsxConfig.modificacion}%(modificacion)`}>{item.costo}</td>
                <td title={`precio: costo+${item.rentabilidad}%(ganacia)`}>{item.precio}</td>
                <td onClick={()=>{updateMatchItems(index)}}  title={`final: precio+${item.iva}%(iva)`}>{item.final}</td>
              </tr>
            )
          })}
      </Table>
      
      </>
    )
  }

  export {TableMatchItems};