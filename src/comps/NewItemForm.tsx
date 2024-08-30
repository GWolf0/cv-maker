import React, { useRef } from 'react'
import { FormSubmitBtn } from './CommonUI';

export interface NewItemFormItemDef{
    type:"text"|"number"|"select"|"checkbox"|"color"|"textarea",
    selectItems?:any[],
    textareaRows?:number,
    name:string,
    placeholder?:string,
}
interface NewItemFormPropsDef{
    items:NewItemFormItemDef[],
    onFormDataSubmited:(fd:FormData)=>any,
}
function NewItemForm({items,onFormDataSubmited}:NewItemFormPropsDef){
    const formRef=useRef<HTMLFormElement>(null);

    return (

        <form ref={formRef} className='flex flex-col gap-1' onSubmit={(e)=>{e.preventDefault();onFormDataSubmited(new FormData(formRef.current!))}}>

            {
                items.map((item,i)=>(

                    <div key={i}>

                        {

                            item.type==="text"?
                            <input name={item.name} type="text" className='w-full px-2 py-0.5 bg-light text-dark text-xs' placeholder={item.placeholder} />
                            :
                            item.type==="number"?
                            <input name={item.name} type="number" className='w-full px-2 py-0.5 bg-light text-dark text-xs' placeholder={item.placeholder} />
                            :
                            item.type==="select"?
                            <select name={item.name} className='w-full px-2 py-0.5 bg-light text-dark text-xs'>
                                {
                                    item.selectItems!.map((_item,j)=>(
                                        <option key={j} value={String(_item)}>{String(_item).toUpperCase()}</option>
                                    ))
                                }
                            </select>
                            :
                            item.type==="checkbox"?
                            <input name={item.name} type="checkbox" className='w-full px-2 py-0.5 bg-light text-dark text-xs' placeholder={item.placeholder} />
                            :
                            item.type==="color"?
                            <input name={item.name} type="color" className='w-full px-2 py-0.5 bg-light text-dark text-xs' placeholder={item.placeholder} />
                            :
                            item.type==="textarea"?
                            <textarea name={item.name} rows={item.textareaRows||3} className='w-full px-2 py-0.5 bg-light text-dark text-xs resize-none' placeholder={item.placeholder}></textarea>
                            :
                            <></>
                        }

                    </div>

                ))
            }

            <div className='w-full flex justify-end'>
                <FormSubmitBtn text='Add' />
            </div>

        </form>

    );

}

export default NewItemForm;