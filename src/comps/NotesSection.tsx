import React from 'react'
import { RemoveBtn } from './CommonUI'
import NewItemForm from './NewItemForm'

interface NotesSectionPropsDef{
    notes:string[],
    onNewItemSubmit:(fd:FormData)=>any,
    onItemDeleteBtn:(itemIdx:number)=>void,
    editMode?:boolean,
}
function NotesSection({notes,onNewItemSubmit,onItemDeleteBtn,editMode}:NotesSectionPropsDef){


    return (

        <div className='w-full px-2 py-1 bg-lighter border border-semitrans rounded mt-auto'>

            <ul className='w-full'>

                {
                    notes.map((note,i)=>(
                        <li key={i} className='relative py-0.5 text-xs'>
                            <p className='text-dark text-justify'>- {note}</p>
                            {editMode&&<RemoveBtn classes='ml-auto absolute top-0 right-0' onClick={()=>onItemDeleteBtn(i)} />}
                        </li>
                    ))
                }

            </ul>

            {editMode&&<div className='mt-2'>

                <NewItemForm 
                
                    items={[
                        {type:"textarea",name:"note",placeholder:"note",textareaRows:2},
                    ]}
                
                    onFormDataSubmited={(fd:FormData)=>onNewItemSubmit(fd)}

                />

            </div>}

        </div>

    )

}

export default NotesSection