export interface allEntryType{
    code: string,
    name: string,
    latin: string
}

export type nonLatinEntryType = Omit<allEntryType, 'latin'>;