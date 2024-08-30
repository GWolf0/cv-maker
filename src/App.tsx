import { useEffect, useState } from 'react'
import {  ProjectDef } from './interfacesDefs';
import { AppService } from './services/AppService';
import EditorPage from './pages/EditorPage';
import PreviewPage from './pages/PreviewPage';

function App(){
    const [page,setPage]=useState<"editor"|"preview">("editor");
    const [project,setProject]=useState<ProjectDef>(AppService.getDefaultProjectInstance());
    const [selectedVarIdx,setSelectedVarIdx]=useState<number>(AppService.selectedVarIdx);
    const [initialized,setInitialized]=useState<boolean>(false);

    useEffect(()=>{
        // get selected page ("editor"||"preview"), ("editor" by default of not specified)
        const params=new URLSearchParams(window.location.search);
        // set page and selected variation index if specified, defaults to 0
        if(params.has("p")&&params.get("p")==="preview"){
            if(params.has("varidx"))setSelectedVarIdx(Number(params.get("varidx")));
            setPage("preview");
        }
        // init app service, passing dispatch functions for ability to mutate state from app service
        AppService.init(setProject,setSelectedVarIdx);
        // app serice loads saved project instance if present, otherwise create new one,
        // and set the project state to the loaded instance from app service
        setProject({...AppService.instance});
        // set initialized to true
        setInitialized(true);
    },[]);

    return initialized&&AppService.selectedVarIdx<AppService.instance.variations.length?(
        page==="editor"?
            <EditorPage project={project} selectedVarIdx={selectedVarIdx} />
        :
            <PreviewPage project={project} variationIdx={selectedVarIdx} />
    ):(
        // Loading
        <div className='w-screen h-screen bg-light flex items-center justify-center'>
            <p className='text-dark text-center'>Loading..</p>
        </div>
    );

}

export default App