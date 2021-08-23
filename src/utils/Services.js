
export const getMatches = (text, services) => {
    let matches = []

    if (text) {
        matches = services.filter(bruv => {
            const regex = new RegExp(`${text}`, "gi"); // gi makes it case insensitive
            return bruv.match(regex);
        });
    }
    console.log(matches)

    return (
        matches
    );
}