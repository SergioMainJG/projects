export const history: number[] = []
export const add = ( x: number, y: number ): number =>{
    history.push( x+y );
    return x+y;
}
export const addAll = ( numbers: number[]): number => {
    let result = 0;
    numbers.forEach( values => {
        result += values;
    });
    history.push(result);
    return result;
};
