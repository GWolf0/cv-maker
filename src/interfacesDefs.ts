export interface PersonalInfosDef{
    photo:string|null,
    infos:{key:string,type:PersonalInfoType,value:string}[],
}

export interface PathDataDef{
    year:string,
    data:string,
}

export type PersonalInfoType="location"|"phone"|"email"|"link";
export type SkillType=string;
export type LanguagesProfecency="basic"|"intermediate"|"fluent";

export interface CVDef{
    name:string,
    title:string,
    educationPath:PathDataDef[],
    proffesionalPath:PathDataDef[],

    personalInfos:PersonalInfosDef,
    techSkills:SkillType[],
    practSkills:SkillType[],
    languages:{lang:string,prof:LanguagesProfecency}[],

    notes:string[],
}

export interface AppearenceDef{
    pageMaxWidth:number,
    leftSideBGColor:string,
    rightSideBGColor:string,
    photoBGColor:string,
    photoSize:number,
}
export interface CVVariationDef{
    name:string,
    cv:CVDef,
    labels:{[key:string]:string},
    appearence:AppearenceDef,
}
export interface ProjectDef{
    variations:CVVariationDef[],
}
