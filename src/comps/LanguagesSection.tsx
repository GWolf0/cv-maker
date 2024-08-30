import React from 'react'
import { LanguagesProfecency, SkillType } from '../interfacesDefs'
import { RemoveBtn } from './CommonUI'
import NewItemForm from './NewItemForm'
import { AppService } from '../services/AppService'

interface LanguagesSectionPropsDef{
    languages:{lang:string,prof:LanguagesProfecency}[],
    onNewItemSubmit:(fd:FormData)=>any,
    onItemDeleteBtn:(itemIdx:number)=>void,
    editMode?:boolean,
}
function LanguagesSection({languages,onNewItemSubmit,onItemDeleteBtn,editMode}:LanguagesSectionPropsDef){


    return (

        <div className='flex flex-col gap-4 p-4'>

            <div className='w-full py-1 text-sm text-light font-light underline'>
                <p>{AppService.selectedVar.labels["languages"]}:</p>
            </div>

            <ul className='w-full'>
                {
                    languages.map((lang,i)=>(
                        <li key={i} className='py-1 flex items-center text-sm'>
                            <p className='text-light font-semibold mr-4'>- {lang.lang}</p>
                            <p className='text-lightest ml-auto'>{lang.prof[0].toUpperCase()+lang.prof.substring(1)}</p>
                            {editMode&&<RemoveBtn onClick={()=>onItemDeleteBtn(i)} />}
                        </li>
                    ))
                }
            </ul>

            {editMode&&<div>

                <NewItemForm 
                
                    items={[
                        {type:"text",name:"lang",placeholder:"language"},
                        {type:"select",name:"prof",selectItems:["basic","intermediate","fluent"]},
                    ]}
                
                    onFormDataSubmited={(fd:FormData)=>onNewItemSubmit(fd)}

                />

            </div>}

        </div>

    )

}

export default LanguagesSection