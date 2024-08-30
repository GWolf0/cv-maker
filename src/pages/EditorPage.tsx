import React, { useEffect, useState } from 'react'
import CVEditor from '../comps/CVEditor';
import ThemeSettingsModal from '../comps/modals/ThemeSettingsModal';
import { ProjectDef, CVVariationDef } from '../interfacesDefs';
import { AppService } from '../services/AppService';

interface EditorPagePropsDef{
    project:ProjectDef,
    selectedVarIdx:number,
}
function EditorPage({project,selectedVarIdx}:EditorPagePropsDef){
    const [uiState,setUIState]=useState({variationsListToggled:false,settingsModalVisible:false});

    useEffect(()=>{
        // untoggle the variations toggle button when click outside
        if(uiState.variationsListToggled)document.addEventListener("click",onDocClick);
        else document.removeEventListener("click",onDocClick);
        return ()=>{
            document.removeEventListener("click",onDocClick);
        }
    },[uiState.variationsListToggled]);

    // untoggle the variations toggle button when click outside
    function onDocClick(e:MouseEvent){
        if(uiState.variationsListToggled&&!document.getElementById("variationsToggleBtn")!.contains(e.target as HTMLElement)){
            setUIState(prev=>({...prev,variationsListToggled:false}));
        }
    }

    // on new var
    function onNewVarBtn(){
        const newVar:CVVariationDef=AppService.getDefaultVariationObject();
        AppService.updateInstance(()=>{
            AppService.instance.variations.push(newVar);
        });
        setUIState(prev=>({...prev,variationsListToggled:false}));
    }

    // on preview button
    function onPerviewBtn(){
        window.open(`${window.location.origin}/?p=preview&varidx=${selectedVarIdx}`,"_blank");
    }

    return (
        <div className='w-screen min-h-screen bg-light'>

            {/* // Header */}
            <header className='w-full flex items-center px-2 md:px-4 bg-dark fixed z-10' style={{height:'60px'}}>

                <div>
                    <p className='font-extrabold text-lighter'>CV-Maker <small className='font-normal'>({AppService.selectedVar.name})</small></p>
                </div>

                {/* // variations toggle button */}
                <div className='ml-auto relative' id="variationsToggleBtn">

                    <button onClick={()=>setUIState(prev=>({...prev,variationsListToggled:!prev.variationsListToggled}))} title="variations" className='w-10 h-10 rounded-full bg-light text-dark'><i className='bi bi-grid-1x2'></i></button>
                    {uiState.variationsListToggled&&
                    <ul className='absolute right-0 p-2 bg-light rounded-md overflow-hidden shadow' style={{top:'110%',width:'min(180px,50vw)'}}>
                        {
                            project.variations.map((v,i)=>(
                                <li key={i} onClick={()=>{AppService.updateSelectedVarIdx(i);setUIState(prev=>({...prev,variationsListToggled:false}))}} className={`${selectedVarIdx===i?'underline opacity-70':''} py-2.5 cursor-pointer hover:opacity-70`}>
                                    <p className='text-dark text-xs font-bold text-center'>{v.name}</p>
                                </li>
                            ))
                        }
                        <li onClick={onNewVarBtn} className='py-2.5 cursor-pointer hover:opacity-70 bg-primary rounded'>
                            <p className='text-lighter text-xs font-bold text-center underline'>New Var</p>
                        </li>
                    </ul>
                    }

                </div>
                {/* // settings button */}
                <button onClick={()=>setUIState(prev=>({...prev,settingsModalVisible:!prev.settingsModalVisible}))} title="settings" className='ml-2 w-10 h-10 rounded-full bg-light text-dark'><i className='bi bi-gear'></i></button>
                {/* // preview button */}
                <button onClick={onPerviewBtn} title="preview" className='ml-2 w-10 h-10 rounded-full bg-light text-dark'><i className='bi bi-play'></i></button>
            
            </header>
            
            {/* // Main CV Editor */}
            <main className='px-4 py-8 mx-auto' style={{paddingTop:'90px',width:`min(${AppService.selectedVar.appearence.pageMaxWidth}px,95vw)`}}>

                <CVEditor editMode variation={project.variations[selectedVarIdx]} />

            </main>
            
            {/* // Modals */}
            {uiState.settingsModalVisible&&
            <section className='bg-semitrans fixed top-0 left-0 w-screen h-screen z-80'>
                
                {/* // Settings Modal */}
                <ThemeSettingsModal labels={project.variations[selectedVarIdx].labels} appearence={project.variations[selectedVarIdx].appearence} onCloseBtn={()=>setUIState(prev=>({...prev,settingsModalVisible:false}))} />

            </section>
            }

        </div>
    )
}

export default EditorPage