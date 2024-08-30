import React, { useEffect, useState } from 'react'
import { COLORS, DEFAULT_APPEARENCE, DEFAULT_LABELS } from '../../consts'
import { AppearenceDef } from '../../interfacesDefs';
import { AppService } from '../../services/AppService';

interface ThemeSettingsModalPropsDef{
    labels:{[key:string]:string},
    appearence:AppearenceDef,
    onCloseBtn:()=>void,
}
function ThemeSettingsModal({labels,appearence,onCloseBtn}:ThemeSettingsModalPropsDef){
    const [section,setSection]=useState<"general"|"labels"|"appearence">("general");
    const [_labels,setLabels]=useState<{[key:string]:string}>(labels);
    const [_appearence,setAppearence]=useState<AppearenceDef>(appearence);
    const [generalInfo,setGeneralInfo]=useState({varName:AppService.selectedVar.name});

    useEffect(()=>{

    },[]);

    function onApplyBtn(){
        AppService.updateInstance(()=>{
            AppService.instance.variations[AppService.selectedVarIdx].labels={..._labels};
            AppService.instance.variations[AppService.selectedVarIdx].appearence={..._appearence};
            AppService.instance.variations[AppService.selectedVarIdx].name=generalInfo.varName;
        });
        onCloseBtn();
    }

    function onDeleteVarBtn(){
        if(confirm("Confirm delete variation?")){
            if(AppService.instance.variations.length===1)return alert("Cannot delete variation (there must be at least one variation)!");
            AppService.updateInstance(()=>{
                AppService.instance.variations.splice(AppService.selectedVarIdx,1);
            });
            AppService.updateSelectedVarIdx(AppService.instance.variations.length-1);
            onCloseBtn();
        }
    }

    return (

        <div className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col bg-lighter rounded overflow-hidden' style={{width:'min(720px,90vw)',height:'min(720px,80vh)'}}>

            <section className='w-full py-4 px-2 flex items-center justify-between border-b border-light'>
                <p className='text-dark font-semibold'>Settings</p>
                <button className='p-2 text-dark hover:opacity-70' onClick={onCloseBtn}>&times;</button>
            </section>

            <section className='flex grow'>

                <aside className='h-full border-r border-light p-2 overflow-y-auto' style={{width:'25%'}}>

                    <ul className='w-full px-2'>
                        <li className={`py-2 ${section==='general'?'text-primary':'text-dark'} cursor-pointer hover:opacity-70`} onClick={()=>setSection("general")}>General</li>
                        <li className={`py-2 ${section==='labels'?'text-primary':'text-dark'} cursor-pointer hover:opacity-70`} onClick={()=>setSection("labels")}>Labels</li>
                        <li className={`py-2 ${section==='appearence'?'text-primary':'text-dark'} cursor-pointer hover:opacity-70`} onClick={()=>setSection("appearence")}>Appearence</li>
                    </ul>

                </aside>

                <main className='p-2 h-full overflow-y-auto' style={{width:'75%'}}>

                    {/* // Labels section */}
                    {section==="general"&&
                    <section>

                        <div className='w-full'>
                            <table className='w-full'>
                                <tbody>
                                    <tr>
                                        <td className='text-sm text-dark'>Variation Name</td>
                                        <td>
                                            <input value={generalInfo.varName} onChange={(e)=>setGeneralInfo(prev=>({...prev,varName:e.target.value}))} className='w-full text-dark border border-light bg-inherit px-2 py-1 text-sm text-center' />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2} className='py-2'>
                                            <button onClick={onDeleteVarBtn} className='p-1.5 w-full text-sm text-lighter bg-error rounded hover:opacity-70'>Delete variation</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </section>
                    }

                    {/* // Labels section */}
                    {section==="labels"&&
                    <section>

                        <div className='flex flex-col gap-2'>

                            {
                                Object.entries(_labels).map(([lblKey,lblValue],i)=>(
                                    <div key={i} className='w-full flex items-center justify-between gap-2'>
                                        <div className='w-1/2'>
                                            <p className='text-dark font-semibold text-sm underline'>{lblKey}: </p>
                                        </div>
                                        <div className='w-1/2'>
                                            <input className='w-full text-dark border border-light bg-inherit px-2 py-1 rounde text-sm text-center' placeholder={lblKey} type="text" value={lblValue} onChange={(e)=>setLabels(prev=>({...Object.assign(prev,{[lblKey]:e.target.value})}))} />
                                        </div>
                                    </div>
                                ))
                            }

                        </div>

                    </section>
                    }

                    {/* // Appearence section */}
                    {section==="appearence"&&<section>

                        <table className='w-full'>
                            <thead><tr><td></td><td></td></tr></thead>
                            <tbody>
                            {
                                Object.entries(_appearence).map(([appeKey,appeValue],i)=>(
                                    <tr key={i} className='w-full flex items-center gap-2'>
                                        <td className='w-1/2'>
                                            <p className='text-dark font-semibold text-sm underline'>{appeKey}: </p>
                                        </td>
                                        <td className='w-1/2'>
                                        {
                                            (Object.keys(COLORS).includes(String(appeValue)))?
                                            <div className='w-full flex grow items-center gap-1'>
                                                <select className='text-dark border border-light bg-inherit px-2 py-1 text-sm text-center grow basis-0' value={appeValue} onChange={(e)=>setAppearence(prev=>({...Object.assign(prev,{[appeKey]:e.target.value})}))}>
                                                    {
                                                        Object.keys(COLORS).map((colName,j)=>(
                                                            <option key={j} value={colName}>{colName.toUpperCase()}</option>
                                                        ))
                                                    }
                                                </select>
                                                <div className='w-4 h-4 rounded border border-semitrans' style={{backgroundColor:COLORS[appeValue]}}></div>
                                            </div>
                                            :
                                            (typeof appeValue==="string")?
                                            <input className='w-full text-dark border border-light bg-inherit px-2 py-1 text-sm text-center' placeholder={appeKey} type="text" value={appeValue} onChange={(e)=>setAppearence(prev=>({...Object.assign(prev,{[appeKey]:e.target.value})}))} />
                                            :
                                            (typeof appeValue==="number")?
                                            <input className='w-full text-dark border border-light bg-inherit px-2 py-1 text-sm text-center' placeholder={appeKey} type="number" value={appeValue} onChange={(e)=>setAppearence(prev=>({...Object.assign(prev,{[appeKey]:e.target.value})}))} />
                                            :
                                            <></>
                                        }
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>

                    </section> }

                </main>

            </section>

            <section className='px-4 py-2 flex justify-end border-t border-light'>

                <button onClick={onApplyBtn} className='px-8 py-2 rounded bg-primary text-lighter text-sm hover:opacity-70'>Apply changes</button>

            </section>

        </div>

    )

}

export default ThemeSettingsModal