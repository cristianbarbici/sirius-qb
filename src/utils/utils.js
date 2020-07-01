export const msSleepDefautl = 100

export function sleep(ms = msSleepDefautl) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
