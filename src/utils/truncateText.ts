/**
 * Truncates a given string to a specified length by replacing the middle portion with ellipses.
 * @param str - The string to truncate.
 * @param startIndex - The starting index of the middle portion to replace with ellipses.
 * @param endIndex - The ending index of the middle portion to replace with ellipses.
 * @returns The truncated string.
 */
export const truncateText = (
    str: string | null,
    startIndex: number,
    endIndex: number
) => {
    const text = String(str);
    const firstHalf = text.slice(0, startIndex);
    const secondHalf = text.slice(text.length - endIndex);
    return `${firstHalf}...${secondHalf}`;
};
