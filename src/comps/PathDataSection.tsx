import React from 'react'
import { PathDataDef } from '../interfacesDefs';
import { RemoveBtn } from './CommonUI';
import NewItemForm from './NewItemForm';

interface PathDataSectionPropsDef{
    pathType:"edu"|"prof",
    title:string,
    pathData:PathDataDef[],
    onNewItemSubmit:(fd:FormData,pathType:"edu"|"prof")=>any,
    onItemDeleteBtn:(itemIdx:number,pathType:"edu"|"prof")=>void,
    editMode?:boolean,
}
function PathDataSection({pathType,title,pathData,onNewItemSubmit,onItemDeleteBtn,editMode}:PathDataSectionPropsDef){


    return (
        <div className='w-full'>

            <div className='w-full py-1 text-sm text-dark underline'>
                <p>{title}:</p>
            </div>

            <div className='mt-4 flex flex-col gap-4 p-4 pl-0 pt-0 border-l-2 border-dark'>

                {
                    pathData.map((path,i)=>(
                        <div key={i} className='relative pl-4'>

                            <span className='absolute top-0 left-0 w-2 h-1 border-t-2 border-dark'></span>

                            <p className='text-xs text-dark underline'>{path.year}</p>

                            <p className='text-sm text-darker mt-2 text-justify'>{path.data}</p>

                            {editMode&&<RemoveBtn classes='absolute top-0 right-0' onClick={()=>onItemDeleteBtn(i,pathType)} />}

                        </div>
                    ))
                }

            </div>

            {editMode&&<div className='mt-2'>

                <NewItemForm 
                
                    items={[
                        {type:"text",name:"year",placeholder:"year/any"},
                        {type:"textarea",name:"data",placeholder:"data.."},
                    ]}
                
                    onFormDataSubmited={(fd:FormData)=>onNewItemSubmit(fd,pathType)}

                />

            </div>}

        </div>

    );

}

export default PathDataSection