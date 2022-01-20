export function sleep<T>(ms: number, val?: T): Promise<T | undefined> {
    return new Promise((resolve) => setTimeout(() => resolve(val), ms));
}

export async function retry<T>(func: (...args: unknown[]) => T, times = 3, delay = 0): Promise<T> {
    for (let i = 0; i < times; i++) {
        try {
            return await func();
        } catch (e) {
            console.warn(`Retry ${i + 1}/${times}`, func);
            await sleep(delay);
        }
    }
    throw new Error(`${func.name} failed after retried ${times} times`);
}
