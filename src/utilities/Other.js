// generates random colour for listing items.
export const generateRandomColour = () => {
    return '#' + Math.random().toString(16).substr(-6);
}