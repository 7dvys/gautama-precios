'use client'

import { useContext, useEffect } from "react";
import { rootContext } from "@/context";
import styles from '@/assets/styles/precios.module.css'
import { TableMatchItems } from "@/components";

const Precios = ()=>{

    const {xlsxProducts,cbProducts,xlsxConfig,cbVendors,matchItems,matchXlsxAndCbProducts,clearMatchItems,updateMatchItems} = useContext(rootContext);

    useEffect(()=>{
      clearMatchItems();
      if(cbProducts.length && xlsxProducts.length)
      matchXlsxAndCbProducts();
      // console.log({xlsxProducts,cbProducts,xlsxConfig})
    },[xlsxProducts,cbProducts,xlsxConfig])

    useEffect(()=>{
      // console.log(matchItems)
    },[matchItems])

    return(
    <>
      <div className={styles.tables}>
        <TableMatchItems matchItems={matchItems} updateMatchItems={updateMatchItems} xlsxConfig={xlsxConfig}/>
      </div>
    </>)
}

export default Precios