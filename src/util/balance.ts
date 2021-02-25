import { formatBalance } from '@polkadot/util';

// Convert a string into a nicely formatted ETH balance string.
export function toEthBalance(v: string) {
  return formatBalance(v.toString(), {
    decimals: 18,
    withSi: true,
    withSiFull: true,
    withUnit: false
  });
}

// Convert a number or string into a nicely formatted substrate balance string.
export function toSubBalance(v: number | string) {
  return formatBalance(v, {
    decimals: 9,
    withSi: true,
    withSiFull: false,
    withUnit: false
  });
}
