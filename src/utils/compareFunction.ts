export const compareFunction = (desc: boolean) => (aProp: number, bProp: number) => {
    return desc ? (bProp - aProp) : (aProp - bProp);
};
