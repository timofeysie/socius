
export * from './socius.module';
export * from './models/pattern';
export * from './models/anti-pattern';
export * from './components/notification.component';
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