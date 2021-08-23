
export const DateFormatter = (textValue) => {
    return (
        textValue.length === 3 && !textValue.includes("/")
            ? `${textValue.substring(0, 2)}/${textValue.substring(2)}`
            : textValue
    );
}