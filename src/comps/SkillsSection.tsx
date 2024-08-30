import React, { useEffect } from 'react'
import { SkillType } from '../interfacesDefs'
import { RemoveBtn } from './CommonUI'
import NewItemForm from './NewItemForm'
import { AppService } from '../services/AppService'

interface SkillsSectionPropsDef{
    skillsTypeName:"tech"|"pract",
    skills:SkillType[],
    onNewItemSubmit:(fd:FormData,skillsType:"tech"|"pract")=>any,
    onItemDeleteBtn:(itemIdx:number,skillsType:"tech"|"pract")=>void,
    editMode?:boolean,
}
function SkillsSection({skillsTypeName,skills,onNewItemSubmit,onItemDeleteBtn,editMode}:SkillsSectionPropsDef){

    return (

        <div className='flex flex-col gap-4 p-4'>

            <div className='w-full py-1 text-sm text-light font-light underline'>
                <p>{skillsTypeName==="pract"?AppService.selectedVar.labels["practical_skills"]:AppService.selectedVar.labels["technical_skills"]}:</p>
            </div>

            <ul className='w-full'>
                {
                    skills.map((skill,i)=>(
                        <li key={i} className='flex items-center py-0.5 text-sm'>
                            <p className='text-lightest mr-4 text-justify'>- {skill}</p>
                            {editMode&&<RemoveBtn classes='ml-auto' onClick={()=>onItemDeleteBtn(i,skillsTypeName)} />}
                        </li>
                    ))
                }
            </ul>

            {editMode&&<div>

                <NewItemForm 
                
                    items={[
                        {type:"text",name:"skill",placeholder:"skill"}
                    ]}
                
                    onFormDataSubmited={(fd:FormData)=>onNewItemSubmit(fd,skillsTypeName)}

                />

            </div>}

        </div>

    )

}

export default SkillsSection