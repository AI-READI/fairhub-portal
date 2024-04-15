export default function currentUnixTimestamp() {
  return BigInt(Math.round(new Date().valueOf() / 1000));
}
