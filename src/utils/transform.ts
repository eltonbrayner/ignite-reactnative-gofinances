export const currencyToBRL = (number: string | number) =>
  Number(number).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
