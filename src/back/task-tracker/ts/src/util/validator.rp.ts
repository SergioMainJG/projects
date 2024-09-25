import { Formatter } from "@util/date.formatter";

export class Result<T>{
    static register: string[] = [];

    private constructor(
        public value: T | undefined,
        public isSucces: boolean,
        public Error: string | null,
    ){}

    public static Success<T>( value: T ): Result<T>{
        const succes = new Result<T>(value, true, null);
        this.register.push(`Success: ${ succes.isSucces }  : Time${ Formatter.formatDate( new Date() )}; Value Registred: ${ succes.value }; Error: ${ succes.Error }`);
        return succes;
    }; 
    
    public static Failure<T>( error: string, defaultFactory?: () => T): Result<T>{
        const defaultValue =  defaultFactory ? defaultFactory() : undefined;
        const failure = new Result<T>( defaultValue , false, error );
        this.register.push(`Failure: ${ failure.isSucces }; Time${ Formatter.formatDate( new Date() )}; Value Registred: ${ failure.value }; Error: ${ failure.Error }`);
        return failure;
    }; 
}