// helper functions that return all the matched subscription names and check if a subscription name is already in use.
export const getMatches = (text, services) => {
    let matches = []
    if (text) {
        matches = services.filter(service => {
            const regex = new RegExp(`${text}`, "gi"); // gi makes it case insensitive
            return service.name.match(regex);
        });
    }
    return (
        matches
    );
}

export const checkName = (text, items) => {
    if (items.find(item => item.name == text)) {
        return false;
    }
    return true;
}