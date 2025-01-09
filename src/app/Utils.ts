export  class StringUtils{
    public toUpperCase(arg: string): string {
        if(!arg){
            throw new Error('String is required');
        }
        return arg.toUpperCase();
    }
}

export function toUpperCase(arg: string): string {
    return arg.toUpperCase();
}

export type stringInfo = {
    lowercase: string,
    uppercase: string,
    characters: string[],
    length: number,
    extraInfo: Object | undefined
    }

    export function getStringinfo(arg: string): stringInfo {
        return {
            lowercase: arg.toLowerCase(),
            uppercase: arg.toUpperCase(),
            characters: Array.from(arg),
            length: arg.length,
            extraInfo: {}
        }
    }