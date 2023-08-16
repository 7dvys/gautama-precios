
const serializeArray = (arrayToSerialize:any[],index:string)=>{
    const initialValue = {} as Record<string,any>
    const serialized = arrayToSerialize.reduce((acc,current)=>{
      acc[current[index]]=current;
      return(acc)
    },initialValue)
    return serialized;
  }

  export {serializeArray};