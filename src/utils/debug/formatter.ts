/**
 * Create formatter for debug purpose
 *
 * @param {string} pageIdentifier - The page identidier to indicate where the log is throw
 * @returns {(string) => string} The formatter
 */
export const createDebugStringFormatter = (pageIdentifier: string) => {
    /**
     * Format message for debug purpose
     *
     * @param {string} msg - The message to format.
     * @returns {string} The formatted string.
     */
    function debugStringFormatter(msg: string, ...path: string[]) {
        return `[${pageIdentifier}${path ? `.${path.join('.')}` : ''}] ${msg}`;
    }

    return debugStringFormatter;
};
