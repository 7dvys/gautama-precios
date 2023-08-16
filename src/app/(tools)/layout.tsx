
import { Metadata } from 'next'
export const metadata:Metadata = {
    title: 'Gautama Precios',
    description: 'Maneja tus precios con facilidad!!',
}

const Layout = ({children}:{children:React.ReactNode})=>{
    return (
        <>
        {children}
        </>
    )
}

export default Layout;