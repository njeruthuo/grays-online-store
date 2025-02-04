export function formatNumber(arg: number | string){
    return Number(arg).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
}
