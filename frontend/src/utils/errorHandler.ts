export function handleError(error: unknown, context: string): Error {
    if ( error instanceof Error ) {
        return new Error(`${context}: ${error.message}`)
    }
    return new Error(`${context}: Error desconocido.`)
}