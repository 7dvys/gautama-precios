'use client'

import '@/assets/styles/globals.css'
import { Nav } from '@/components'
import { abrirOpciones,checkearOpciones,storeCbApiToken } from '@/utils'
import { useEffect, useState} from 'react' 
import { rootContext} from '@/context'
import { CbProduct } from '@/types/contabiliumApi/types'
import { getProducts, getVendors, getUser } from '@/utils/contabiliumApi'
import { CbVendor } from '@/types/contabiliumApi/types/CbVendor'
import { XlsxConfig } from '@/types/xlsx/types'
import { useMatchItems } from '@/hooks'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const [cbApiToken,setCbApiToken] = useState<string>('');
    const [cbProducts,setCbProducts] = useState<CbProduct[]>([])
    const [cbVendors,setCbVendors] = useState<CbVendor[]>([])
    const [xlsxProducts,setXlsxProducts] = useState<any[]>([])

    const initialXlsxConfig = {
        idProveedor:'none',
        colCodigo:0,
        colCosto:2,
        iva:21,
        ivaIncluido:'no',
        ganancia:0,
        modificacion:0,
        afecta:'si'
    };

    const [xlsxConfig,setXlsxConfig] = useState<XlsxConfig>(initialXlsxConfig);
    const {matchItems,clearMatchItems,matchXlsxAndCbProducts,updateMatchItems} = useMatchItems({cbProducts,xlsxConfig,xlsxProducts})

    useEffect(()=>{
        checkearOpciones();
        storeCbApiToken(setCbApiToken);
    },[])

    useEffect(()=>{
        if(cbApiToken){
            // getUser(cbApiToken).then(user=>{console.log(user)})
            getVendors(cbApiToken).then(vendors=>{if(vendors) setCbVendors(vendors)})
            getProducts(cbApiToken).then(products=>{if(products) setCbProducts(products)})
        }
    },[cbApiToken])

    return (
        <html lang="es">
            <body>
                <div onClick={abrirOpciones} className='options'>opciones</div>
                <main className='main'>
                    <rootContext.Provider value={{cbProducts,setCbProducts,cbApiToken,setCbApiToken,xlsxProducts,setXlsxProducts,cbVendors,setCbVendors,xlsxConfig,setXlsxConfig,matchItems,clearMatchItems,matchXlsxAndCbProducts,updateMatchItems}}>
                        <Nav/>
                        <div className='tool'>
                            {children}
                        </div>
                    </rootContext.Provider>
                </main>
            </body>
        </html>
    )
}

