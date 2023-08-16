'use client'

import '@/assets/styles/globals.css'
import { Nav } from '@/components'
import { abrirOpciones,checkearOpciones,storeCbApiToken } from '@/utils'
import { useEffect,useRef, useState} from 'react' 
import { rootContext} from '@/context'
import { CbProduct } from '@/utils/contabiliumApi/types'
import { getProducts, getVendors, getUser } from '@/utils/contabiliumApi'
import { CbVendor } from '@/utils/contabiliumApi/types/CbVendor'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const [cbApiToken,setCbApiToken] = useState('');
    const [cbProducts,setCbProducts] = useState<CbProduct[]>([])
    const [cbVendors,setCbVendors] = useState<CbVendor[]>([])
    const [xlsxProducts,setXlsxProducts] = useState<any[]>([])
    const [matchItems,setMatchItems]= useState<{cbProducts:CbProduct[];xlsxProducts:[subCosto:number,modificacion:number,costo:number,precio:number,ganancia:number,final:number][]}>({cbProducts:[],xlsxProducts:[]})
    const [xlsxConfig,setXlsxConfig] = useState({idProveedor:'none',colCodigo:0,colTitulo:1,colCosto:2,iva:21,ivaIncluido:'no',ganancia:40,modificacion:0,afecta:'si'})


    
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
                    <rootContext.Provider value={{cbProducts,setCbProducts,cbApiToken,setCbApiToken,xlsxProducts,setXlsxProducts,cbVendors,setCbVendors,xlsxConfig,setXlsxConfig,matchItems,setMatchItems}}>
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
