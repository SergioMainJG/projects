
export const createCircle = (): HTMLDivElement => {
    const circle = document.createElement('div');
    circle.style.width           = "100px";
    circle.style.height          = "100px";
    circle.style.backgroundColor = "red";
    circle.style.borderRadius    = "50%";
    circle.id = "Circle"

    return circle;
};

export const changeBorders = ( circle: HTMLDivElement, values: number[] = [] ):void =>{
    if( values.length <= 0 ) return;
    circle.style.borderTopLeftRadius    = `${values[0]}%`;
    circle.style.borderTopRightRadius   = `${values[0]}%`;
    circle.style.borderBottomLeftRadius = `${values[0]}%`;
    circle.style.borderBottomLeftRadius = `${values[0]}%`;
};

export const getValuesCircle = ( circle: HTMLDivElement ): string => {
    return `${circle.style}`;
};