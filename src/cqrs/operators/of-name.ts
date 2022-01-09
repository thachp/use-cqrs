export const nameOf = <T = any>(target: T): string => {
    return (target as any).name;
};

export default nameOf;
