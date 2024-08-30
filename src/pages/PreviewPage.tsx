import React, { useEffect } from 'react'
import { ProjectDef } from '../interfacesDefs'
import { AppService } from '../services/AppService'
import CVEditor from '../comps/CVEditor'

interface PreviewPagePropsDef{
    project:ProjectDef,
    variationIdx:number,
}
function PreviewPage({project,variationIdx}:PreviewPagePropsDef){

    useEffect(()=>{
        
    },[])

    return (
        <div className='w-screen min-h-screen bg-light'>
            
            <main className='px-4 py-8 mx-auto' style={{width:`min(${AppService.selectedVar.appearence.pageMaxWidth}px,95vw)`}}>

                <CVEditor variation={project.variations[variationIdx]} />

            </main>

        </div>
    )

}

export default PreviewPage