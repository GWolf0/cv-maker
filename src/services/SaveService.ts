import { ProjectDef } from "../interfacesDefs";
import { AppService } from "./AppService";

export class SaveService{
    static STORAGE_KEY="cv_data";

    static init():ProjectDef{
        const savedInstance:ProjectDef=SaveService.load();
        return savedInstance;        
    }

    // save/load
    static load():ProjectDef{
        const storageData:string|null=window.localStorage.getItem(SaveService.STORAGE_KEY);
        if(!storageData)return AppService.getDefaultProjectInstance();
        return JSON.parse(storageData) as ProjectDef;
    }
    static save(project:ProjectDef){
        window.localStorage.setItem(SaveService.STORAGE_KEY,JSON.stringify(project));
    }

}