


export enum Gender {
    Masculine = "M",
    Femenine = "F",
    Neutral = "N"
}

export class Noun {
    sk:string
    en:string
    gender:Gender
    animate?:boolean
    plural?:boolean
}


