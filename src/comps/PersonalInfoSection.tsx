import React, { useEffect, useRef } from 'react'
import { PersonalInfosDef } from '../interfacesDefs'
import NewItemForm from './NewItemForm'
import { RemoveBtn } from './CommonUI'
import { AppService } from '../services/AppService';
import { COLORS } from '../consts';

interface PersonalInfoSectionPropsDef{
    personalInfos:PersonalInfosDef,
    onNewItemSubmit:(fd:FormData)=>any,
    onItemDeleteBtn:(itemIdx:number)=>void,
    onPhotoChanged:(file:File|null)=>void,
    editMode?:boolean,
}
function PersonalInfoSection({personalInfos,onNewItemSubmit,onItemDeleteBtn,onPhotoChanged,editMode}:PersonalInfoSectionPropsDef){
    const fileInputRef=useRef<HTMLInputElement>(null);

    useEffect(()=>{
        
    },[personalInfos]);


    function onOpenFileChooser(){
        if(fileInputRef.current)fileInputRef.current.click();
    }
    function onPhotoFileInputChanged(e:React.ChangeEvent<HTMLInputElement>){
        if(fileInputRef.current&&fileInputRef.current.files&&fileInputRef.current.files.length>0){
            const file:File=fileInputRef.current.files[0];
            onPhotoChanged(file);
        }
    }

    return (

        <div className='flex flex-col gap-4 p-4'>

            {editMode?
            <div className='relative rounded-full overflow-hidden border border-semitrans bg-darkest' style={{width:`${AppService.selectedVar.appearence.photoSize}px`,height:`${AppService.selectedVar.appearence.photoSize}px`,backgroundColor:COLORS[AppService.selectedVar.appearence.photoBGColor]}}>
                {personalInfos.photo?
                    <img src={personalInfos.photo} className='w-full h-full object-contain' />
                    :
                    <div className='w-full h-full text-xs text-lighter flex items-center justify-center'>No Img</div>
                }
                <div onClick={onOpenFileChooser} className='absolute w-full h-full left-0 top-0 flex justify-center items-center bg-semitrans text-lighter text-xl opacity-10 hover:opacity-100 transition-opacity cursor-pointer'><p>+</p></div>
                <input type="file" className='hidden' ref={fileInputRef} onChange={onPhotoFileInputChanged} />
            </div>
            :
            personalInfos.photo?
            (<div className='relative rounded-full overflow-hidden border border-semitrans bg-darkest' style={{width:`${AppService.selectedVar.appearence.photoSize}px`,height:`${AppService.selectedVar.appearence.photoSize}px`,backgroundColor:COLORS[AppService.selectedVar.appearence.photoBGColor]}}>
                <img src={personalInfos.photo} className='w-full h-full object-contain' />
            </div>):
            <></>
            }
            {editMode&&personalInfos.photo&&
                <button className='py-1 my-1 w-full text-xs rounded bg-error text-lighter' onClick={()=>onPhotoChanged(null)}>Remove photo</button>
            }

            <ul className='w-full'>
                {
                    personalInfos.infos.map((info,i)=>(
                        <li key={i} className='py-1 flex items-center text-sm'>
                            <p className='text-light font-semibold mr-4'>{info.key}:</p>
                            <p className='ml-auto text-lightest text-xs'>{info.value}</p>
                            {editMode&&<RemoveBtn onClick={()=>onItemDeleteBtn(i)} />}
                        </li>
                    ))
                }
            </ul>

            {editMode&&<div className='w-full'>

                <NewItemForm 
                
                    items={[
                        {type:"select",name:"type",selectItems:["location","email","phone","link"]},
                        {type:"text",name:"key",placeholder:"key"},
                        {type:"text",name:"value",placeholder:"value"}
                    ]}

                    onFormDataSubmited={(fd:FormData)=>onNewItemSubmit(fd)}

                />

            </div>}

        </div>

    )

    // return (

    //     <div className='flex flex-col gap-4 p-4'>

    //         <div className='rounded-full overflow-hidden border border-semitrans bg-darkest' style={{width:'96px',height:'96px'}}>
    //             <img src={personalInfos.photo} className='w-full h-full object-contain' />
    //         </div>

    //         <ul className='w-full'>
    //             {
    //                 personalInfos.infos.map((info,i)=>(
    //                     <li key={i} className='py-1 flex justify-between text-sm'>
    //                         <p className='text-light font-semibold mr-4'>{info.key}:</p>
    //                         <p className='text-lightest text-xs'>{info.value}</p>
    //                     </li>
    //                 ))
    //             }
    //         </ul>

    //     </div>

    // )

}

export default PersonalInfoSection