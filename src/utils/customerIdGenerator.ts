export function generateCustomerId(): string {
  const timestamp = new Date().getTime().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `CUS-${timestamp}-${randomStr}`;
}
