//validate mode
export function validateMode (mode : any) : string | null {
    const modeEnum :string[] = ['online', 'offline','hybrid']
    if(!isNaN(Number(mode))){
        // return NextResponse.json({message:`Event mode should be type string`,status:'failed'},{status:400})
        return `Event mode should be type string`
    }
    if(!modeEnum.includes(mode)){
        // return NextResponse.json({message:`Event mode should be online, offline or hybrid`,status:'failed'},{status:400})
        return `Event mode should be online, offline or hybrid`
    }
     return null;
}