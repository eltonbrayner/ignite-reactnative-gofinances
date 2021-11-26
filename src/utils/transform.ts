export const currencyToBRL = (number: string | number) =>
  Number(number).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

export const convertDate = (data: string | number) =>
  Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: '2-digit',
  }).format(new Date(data));
