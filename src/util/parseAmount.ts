
/// Parse the amount field and support SI shorthands for `kilo` (k) and `million` (m).
export default function parseAmount(val: string) {
  return val.replace(/,/gi, '.').replace(/k/gi, '000').replace(/m/gi, '000000');
}

