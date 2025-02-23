export function formatDate(arg: Date | string): string {
  return new Date(arg).toDateString();
}
