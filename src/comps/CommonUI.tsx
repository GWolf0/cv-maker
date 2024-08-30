export function RemoveBtn({classes,onClick}:{classes?:string,onClick:(e:React.MouseEvent)=>any}){

    return (
        <button className={`p-1 text-error hover:opacity-50 text-sm ${classes}`} onClick={onClick}>&times;</button>
    )

}

export function EditBtn({classes,onClick}:{classes?:string,onClick:(e:React.MouseEvent)=>any}){

    return (
        <button className={`p-1 bg-warning text-dark rounded-full w-6 h-6 hover:opacity-50 text-xs ${classes}`} onClick={onClick}>I</button>
    )

}


export function FormSubmitBtn({text}:{text:string}){

    return (
        <button type='submit' className='px-4 py-0.5 text-lightest bg-primary rounded text-xs'>{text}</button>
    )

}


