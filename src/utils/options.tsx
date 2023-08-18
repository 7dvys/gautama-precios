const opciones:[nombre:string,descripcion:string][] = [
    ['cbUser','Usuario Contabilium'],
    ['cbPass','Password Contabilium']
];

const abrirOpciones = ()=>{
    opciones.forEach(([nombre,descripcion])=>{
        // const defaultValue = localStorage.getItem(nombre)?? '';
        const newValue = prompt(descripcion)?? '';
        newValue && localStorage.setItem(nombre,newValue);
    })
    localStorage.removeItem('cbApiToken');
}

const checkearOpciones = ()=>{
    opciones.forEach(([nombre])=>{
        if(!localStorage.getItem(nombre))
        abrirOpciones()
    })
}
export {abrirOpciones,checkearOpciones};