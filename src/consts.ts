import { AppearenceDef } from "./interfacesDefs";

// export type ColorsType="light"|"lighter"|"lightest"|"dark"|"darker"|"darkest"|"primary"|"accent"|"secondary"|"info"|"error"|"warning";
export const COLORS:{[key:string]:string}={
    light:"#E7E5E4",
    lighter:"#F5F5F4",
    lightest:"#FAFAF9",
    dark:"#334155",
    darker:"#1E293B",
    darkest:"#0F172A",
    primary:"#6366F1",
    accent:"#3B82F6",
    secondary:"#EC4899",
    info:"#22C55E",
    error:"#EF4444",
    warning:"#F59E0B",
};

export const DEFAULT_LABELS:{[key:string]:string}={
    "technical_skills":"Technical skills",
    "practical_skills":"Practical skills",
    "languages":"Languages",
    "education_path":"Education path",
    "proffessional_path":"Professional path",
};

export const DEFAULT_APPEARENCE:AppearenceDef={
    pageMaxWidth:986,
    leftSideBGColor:"darker",
    rightSideBGColor:"lightest",
    photoBGColor:"darkest",
    photoSize:96,
};