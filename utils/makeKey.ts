/** Generates a unique key based on a provided number */
export default function makeKey(num: number) {
  if (typeof num !== "number" || isNaN(num)) num = Math.random();

  const timestampPart = Date.now().toString(36); // Get current timestamp in base36
  const numberPart = Math.abs(num).toString(36); // Convert to base36
  const randomPart = Math.random().toString(36).substring(2, 8);

  return `${timestampPart}-${numberPart}-${randomPart}`;
}
