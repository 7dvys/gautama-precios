'use client'
import styles from '@/assets/styles/nav.module.css'
import { useState } from 'react'
import { NavLink,XlsxNav } from '@/components'

const Nav:React.FC = ()=>{
    const [currentTool,setCurrentTool] = useState('')    

    const tools:[title:string,text?:string][] = [['','inicio'],['precios','modificar precios'],];

    return (
        <nav className={styles.nav}>
            
            {currentTool=='precios'?
            <div className={styles.subNav}>
                <XlsxNav/>
            </div>
            :''}
            <div className={`${styles.subNav} ${styles.navOptions}`}>
                <div className={styles.navList}>
                    {tools.map((tool,index)=>(
                        <NavLink key={index} currentTool={currentTool} tool={tool} setCurrentTool={setCurrentTool}/>
                    ))}
                </div>
                {/* Nav status */}
            </div>

        </nav>
    )
}

export {Nav}