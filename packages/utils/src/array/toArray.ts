
export const toArray = <T>(input: T[] | T): T[] => {
  if (input == undefined) {
    throw new Error("not support undefined/null value");
  }
  return Array.isArray(input) ? input : [input];
};
