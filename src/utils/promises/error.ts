/**
 * Represents an error information object.
 * @template T - The type of the data associated with the error.
 */
export type ErrorInfo<T = unknown> = {
    /**
     * The error message.
     */
    message: string;
    /**
     * The error code (optional).
     */
    code?: string;
    /**
     * Additional data associated with the error (optional).
     */
    data?: T;
};
