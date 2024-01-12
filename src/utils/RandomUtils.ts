const generateRandomNumber = (length: number) =>
{
    let result:string = '';
    const characters = '0123456789';
    for (let i = 0; i < length; i++)
    {
        result += characters.charAt(Math.floor(Math.random() * 10));
    }
    return result;
}

export {
    generateRandomNumber
}