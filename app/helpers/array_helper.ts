export const generateRandomIndex = (array: Array<string | number>) => {
  const arrayLength = array.length
  return Math.floor(Math.random() * arrayLength)
}
