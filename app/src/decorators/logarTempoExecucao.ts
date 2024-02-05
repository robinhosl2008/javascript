

export function logarTempoExecucao() {
    return (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) => {
        const metodoOriginal = descriptor.value;

        descriptor.value = (...args: any[]) => {
            const t1 = performance.now();
            
            // chamar o método original.
            const retorno = metodoOriginal.apply(metodoOriginal, args);

            const t2 = performance.now();
            console.log(`${propertyKey} - Tempo de execução: ${(t2 - t1)/1000} segundos.`);
            retorno;
        };

        return descriptor;
    }
}