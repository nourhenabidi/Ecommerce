import dynamic from "next/dynamic";


const map=dynamic(()=>import('./page'),{ssr:false})


export default map