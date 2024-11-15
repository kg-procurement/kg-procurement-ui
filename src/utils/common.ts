export const noop = () => {}

export const rupiah = (amount: number) => Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
}).format(amount)
