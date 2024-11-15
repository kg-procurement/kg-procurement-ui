export const noop = () => {}

export const rupiah = (amount: number) => Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
}).format(amount)

export const us_dollar = (amount: number) => Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format(amount)
