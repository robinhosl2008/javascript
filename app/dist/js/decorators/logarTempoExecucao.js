export function logarTempoExecucao() {
    return (target, propertyKey, descriptor) => {
        const metodoOriginal = descriptor.value;
        descriptor.value = (...args) => {
            const t1 = performance.now();
            const retorno = metodoOriginal.apply(metodoOriginal, args);
            const t2 = performance.now();
            console.log(`${propertyKey} - Tempo de execução: ${(t2 - t1) / 1000} segundos.`);
            retorno;
        };
        return descriptor;
    };
}
