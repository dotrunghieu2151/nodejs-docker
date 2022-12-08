// export const round = (value: number, precision: number) => {
//   const rounded = +(
//     Math.round(value.toString() + 'e+' + precision.toString()) +
//     'e-' +
//     precision
//   );
//   return isNaN(rounded) ? 0 : rounded;
// };

export const randomIntBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

// export const formatNumber = ({
//   number,
//   precision = 0,
//   thousand = ',',
//   decimal = '.',
// }) => {
//   number = number || 0;
//   precision = !isNaN((precision = Math.abs(precision))) ? precision : 2;
//   thousand = thousand == null ? '' : thousand;
//   decimal = decimal || '.';
//   const negative = number < 0 ? '-' : '';
//   const i =
//     parseInt((number = Math.abs(+number || 0).toFixed(precision)), 10) + '';
//   let j = i.length;
//   j = j > 3 ? j % 3 : 0;

//   const intPart =
//     (j ? i.substr(0, j) + thousand : '') +
//     i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand);
//   const decimalValue = precision
//     ? Math.abs(number - i)
//       .toFixed(precision)
//       .slice(2)
//     : 0;
//   const decimalPart = decimalValue != 0 ? decimal + decimalValue : '';

//   return negative + intPart + decimalPart;
// };

// export const formattedToNumber = (formattedNumb, precision) => {
//   const number = +formattedNumb.replace(/[^\d.]/g, '');
//   return isNaN(number) ? 0 : parseFloat(number.toFixed(precision));
// };
