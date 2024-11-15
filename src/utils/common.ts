export const noop = () => {}

export const formatPrice = (
  amount: number,
  quantityPrice: number,
  currencyCode: string,
  uomName: string
): string => {
  const formattedPrice = new Intl.NumberFormat(
    currencyCode === 'IDR' ? 'id-ID' : 'en-US',
    {
      style: 'currency',
      currency: currencyCode,
    }
  ).format(amount);

  return quantityPrice > 1
    ? `${formattedPrice} / ${quantityPrice} ${uomName}`
    : `${formattedPrice} / ${uomName}`;
};
