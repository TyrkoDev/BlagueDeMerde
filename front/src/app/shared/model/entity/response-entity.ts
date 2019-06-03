export interface ResponseEntity<T> {
    code?: number;
    error?: number ;
    message?: string;
    value?: T;
}
