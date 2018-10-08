export * from './models/pattern';
export * from './models/anti-pattern';
exports.removeFootnotes = function(description: string) {
    if (description) {
        const indexOfBracket = description.indexOf('[');
        if (indexOfBracket !== -1) {
            return description.substring(0, indexOfBracket);
        } else {
            return description;
        }
    }
}