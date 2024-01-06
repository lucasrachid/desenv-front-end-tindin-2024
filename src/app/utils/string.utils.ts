export class StringUtil {
    static capitalizeFirstLetterOfWords(inputString: string): string {
        if (!inputString) {
            return '';
        }
        return inputString.replace(/\b\w/g, (char) => char.toUpperCase());
    }
}
