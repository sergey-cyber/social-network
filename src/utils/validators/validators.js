export const requireField = (value) => {
    if(value) return undefined;
    return 'this field require';
}

export const maxLengthCreator = (maxLength) => (value) => { //Замыкание, смотреть урок 77
    if(value.length > maxLength) return `Max length is ${maxLength} sibols`;
    return undefined;
}