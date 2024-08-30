import React, { useEffect, useState } from 'react'
import PersonalInfoSection from './PersonalInfoSection'
import { CVDef, CVVariationDef, LanguagesProfecency, PersonalInfoType } from '../interfacesDefs'
import SkillsSection from './SkillsSection'
import LanguagesSection from './LanguagesSection'
import PathDataSection from './PathDataSection'
import NotesSection from './NotesSection'
import { EditBtn } from './CommonUI'
import { AppService } from '../services/AppService'
import { COLORS } from '../consts'

interface CVEditorPropsDef{
    variation:CVVariationDef,
    editMode?:boolean,
}
function CVEditor({variation,editMode}:CVEditorPropsDef){
    const [cv,setCV]=useState<CVDef>(variation.cv);

    useEffect(()=>{
        setCV(variation.cv);
    },[variation]);

    // actions
        // name & title
    function onChangeNameAndTitle({name,title}:{name?:string,title?:string}){
        AppService.updateInstance(()=>{
            if(name)AppService.instance.variations[AppService.selectedVarIdx].cv.name=name;
            if(title)AppService.instance.variations[AppService.selectedVarIdx].cv.title=title;
        });
    }
        // personal infos
    function onChangePhoto(file:File|null){
        try{
            AppService.updateInstance(()=>{
                AppService.instance.variations[AppService.selectedVarIdx].cv.personalInfos.photo=
                    file?URL.createObjectURL(file):null;
            });
        }catch(e){
            const err:Error=e as Error;
            console.info("Error occurued when changing photo");
            console.error(err.message);
            console.error(err.stack);
        }   
    }
    function onPersonalInfoNewItemSubmitted(fd:FormData){
        if(fd.has("type")&&fd.has("key")&&fd.has("value")){
            const type:PersonalInfoType=String(fd.get("type"))! as PersonalInfoType;
            const key:string=fd.get("key")!.toString();
            const value:string=fd.get("value")!.toString();
            AppService.updateInstance(()=>{
                AppService.instance.variations[AppService.selectedVarIdx].cv.personalInfos.infos.push({type,key,value});
            });
        }
    }
    function onPersonalInfoItemDeleteBtn(itemIdx:number){
        AppService.updateInstance(()=>{
            AppService.instance.variations[AppService.selectedVarIdx].cv.personalInfos.infos.splice(itemIdx,1);
        });
    }
        // skills technical&practical 
    function onSkillsNewItemSubmitted(fd:FormData,skillsType:"tech"|"pract"){
        if(fd.has("skill")){
            const skill:string=fd.get("skill")!.toString();
            AppService.updateInstance(()=>{
                if(skillsType==="tech")
                    AppService.instance.variations[AppService.selectedVarIdx].cv.techSkills.push(skill);
                else
                    AppService.instance.variations[AppService.selectedVarIdx].cv.practSkills.push(skill);
            });
        }
    }
    function onSkillsItemDeleteBtn(itemIdx:number,skillsType:"tech"|"pract"){
        AppService.updateInstance(()=>{
            if(skillsType==="tech")
                AppService.instance.variations[AppService.selectedVarIdx].cv.techSkills.splice(itemIdx,1);
            else
                AppService.instance.variations[AppService.selectedVarIdx].cv.practSkills.splice(itemIdx,1);
        });
    }
        // languages
    function onLanguagesNewItemSubmitted(fd:FormData){
        if(fd.has("lang")&&fd.has("prof")){
            const lang:string=fd.get("lang")!.toString();
            const prof:LanguagesProfecency=fd.get("prof")!.toString() as LanguagesProfecency;
            AppService.updateInstance(()=>{
                AppService.instance.variations[AppService.selectedVarIdx].cv.languages.push({lang,prof});
            });
        }
    }
    function onLanguagesItemDeleteBtn(itemIdx:number){
        AppService.updateInstance(()=>{
            AppService.instance.variations[AppService.selectedVarIdx].cv.languages.splice(itemIdx,1);
        });
    }
        // paths educational&proffessional 
    function onPathNewItemSubmitted(fd:FormData,pathType:"edu"|"prof"){
        if(fd.has("year")&&fd.has("data")){
            const year:string=fd.get("year")!.toString();
            const data:string=fd.get("data")!.toString();
            AppService.updateInstance(()=>{
                if(pathType==="edu")
                    AppService.instance.variations[AppService.selectedVarIdx].cv.educationPath.push({year,data});
                else
                    AppService.instance.variations[AppService.selectedVarIdx].cv.proffesionalPath.push({year,data});
            });
        }
    }
    function onPathItemDeleteBtn(itemIdx:number,pathType:"edu"|"prof"){
        AppService.updateInstance(()=>{
            if(pathType==="edu")
                AppService.instance.variations[AppService.selectedVarIdx].cv.educationPath.splice(itemIdx,1);
            else
                AppService.instance.variations[AppService.selectedVarIdx].cv.proffesionalPath.splice(itemIdx,1);
        });
    }
        // notes
    function onNotesNewItemSubmitted(fd:FormData){
        if(fd.has("note")){
            const note:string=fd.get("note")!.toString();
            AppService.updateInstance(()=>{
                AppService.instance.variations[AppService.selectedVarIdx].cv.notes.push(note);
            });
        }
    }
    function onNotesItemDeleteBtn(itemIdx:number){
        AppService.updateInstance(()=>{
            AppService.instance.variations[AppService.selectedVarIdx].cv.notes.splice(itemIdx,1);
        });
    }

    return (

        <div className={`bg-lightest aspect-a4 flex border border-semitrans`}>

            <div className={`bg-darker overflow-y-auto`} style={{width:'37%',backgroundColor:COLORS[AppService.selectedVar.appearence.leftSideBGColor]}}>

                <PersonalInfoSection editMode={editMode} personalInfos={cv.personalInfos} onPhotoChanged={onChangePhoto} onNewItemSubmit={onPersonalInfoNewItemSubmitted} onItemDeleteBtn={onPersonalInfoItemDeleteBtn} />

                <div className='px-4'><hr className='border-dark' /></div>

                <SkillsSection editMode={editMode} skillsTypeName="tech" skills={cv.techSkills} onNewItemSubmit={onSkillsNewItemSubmitted} onItemDeleteBtn={onSkillsItemDeleteBtn} />

                <div className='px-4'><hr className='border-dark' /></div>

                <SkillsSection editMode={editMode} skillsTypeName="pract" skills={cv.practSkills} onNewItemSubmit={onSkillsNewItemSubmitted} onItemDeleteBtn={onSkillsItemDeleteBtn} />

                <div className='px-4'><hr className='border-dark' /></div>

                <LanguagesSection editMode={editMode} languages={cv.languages} onNewItemSubmit={onLanguagesNewItemSubmitted} onItemDeleteBtn={onLanguagesItemDeleteBtn} />

            </div>

            <div className={`bg-lightest px-4 py-4 flex flex-col gap-4 overflow-y-auto`} style={{width:'63%',backgroundColor:COLORS[AppService.selectedVar.appearence.rightSideBGColor]}}>

                <p className='relative text-4xl font-bold text-dark tracking-wide text-center'>
                    {editMode&&<EditBtn classes='absolute left-0 top-0' onClick={()=>{
                        const newVal=prompt("Change title >",cv.title);
                        if(newVal)onChangeNameAndTitle({title:newVal});
                    }} />}
                    {cv.title}
                </p>

                <p className='relative text-xl font-semibold text-dark tracking-widest text-center'>
                    {editMode&&<EditBtn classes='absolute left-0 top-0' onClick={()=>{
                        const newVal=prompt("Change name >",cv.name);
                        if(newVal)onChangeNameAndTitle({name:newVal});
                    }} />}
                    &middot; {cv.name}
                </p>

                <div className=''><hr className='border-light' /></div>
                {/* <div className=''><hr className='border-light' /></div> */}

                <PathDataSection editMode={editMode} pathType='edu' title={AppService.selectedVar.labels["education_path"]} pathData={cv.educationPath} onNewItemSubmit={onPathNewItemSubmitted} onItemDeleteBtn={onPathItemDeleteBtn} />

                <div className=''><hr className='border-light' /></div>

                <PathDataSection editMode={editMode} pathType='prof' title={AppService.selectedVar.labels["proffessional_path"]} pathData={cv.proffesionalPath} onNewItemSubmit={onPathNewItemSubmitted} onItemDeleteBtn={onPathItemDeleteBtn} />

                <NotesSection editMode={editMode} notes={cv.notes} onNewItemSubmit={onNotesNewItemSubmitted} onItemDeleteBtn={onNotesItemDeleteBtn} />

            </div>

        </div>

    )

}

export default CVEditor