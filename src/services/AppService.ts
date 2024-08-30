import { DEFAULT_APPEARENCE, DEFAULT_LABELS } from "../consts";
import { AppearenceDef, CVDef, CVVariationDef, ProjectDef } from "../interfacesDefs";
import { SaveService } from "./SaveService";

export class AppService{
    static instance:ProjectDef;
    static setProject:React.Dispatch<React.SetStateAction<ProjectDef>>;
    static selectedVarIdx:number=0;
    static setSelectedVarIdx:React.Dispatch<React.SetStateAction<number>>;
    static get selectedVar():CVVariationDef{return AppService.instance.variations[AppService.selectedVarIdx]};

    static init(setProject:React.Dispatch<React.SetStateAction<ProjectDef>>,setSelectedVarIdx:React.Dispatch<React.SetStateAction<number>>){
        AppService.instance=SaveService.init();
        AppService.setProject=setProject;
        AppService.setSelectedVarIdx=setSelectedVarIdx;
    }

    // update instance (project)
    static updateInstance(callback:()=>void){
        callback();
        AppService.setProject({...AppService.instance});
        SaveService.save(AppService.instance);
    }

    // update selected variation index
    static updateSelectedVarIdx(idx:number){
        AppService.selectedVarIdx=idx;
        AppService.setSelectedVarIdx(AppService.selectedVarIdx);
    }

    // default project instance
    static getDefaultProjectInstance():ProjectDef{
        return {
            variations:[
                AppService.getDefaultVariationObject(),
            ]
        }
    }

    static getDefaultVariationObject():CVVariationDef{
        return {
            name:"New CV",
            cv:{
                name:"USER Name",
                title:"Best Singer In The World",
                educationPath:[
                    {year:"2001",data:"The data at this time."},
                    {year:"2004",data:"The data at this time."},
                    {year:"2008",data:"The data at this time."},
                    {year:"2016",data:"The data at this time."},
                ],
                proffesionalPath:[
                    {year:"2017",data:"The data at this time."},
                    {year:"2019",data:"The data at this time."},
                    {year:"2022",data:"The data at this time."},
                ],
                personalInfos:{
                    photo:"./vite.svg",
                    infos:[
                        {key:"Location",type:"location",value:"City"},
                        {key:"Phone",type:"phone",value:"xx-xx-xx-xx-xx"},
                        {key:"Email",type:"email",value:"user@email.com"},
                        {key:"Portfolio",type:"link",value:"http://mportf.com"},
                    ],
                },
                techSkills:[
                    "Skill 1",
                    "Skill 2",
                    "Skill 3",
                    "Skill 4",
                    "Skill 5",
                ],
                practSkills:[
                    "Skill 1",
                    "Skill 2",
                    "Skill 3",
                    "Skill 4",
                    "Skill 5",
                ],
                languages:[
                    {lang:"Arabic",prof:"basic"},
                    {lang:"French",prof:"intermediate"},
                    {lang:"English",prof:"fluent"},
                ],
                notes:[
                    "Note number 1.",
                    "Note number 2.",
                    "Note number 3.",
                    "Note number 4.",
                ],
            },
            labels:{...DEFAULT_LABELS},
            appearence:{...DEFAULT_APPEARENCE},
        };
    }

}