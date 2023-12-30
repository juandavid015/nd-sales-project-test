// Programatically the functions here can be replaced with
// more specialized and lightweight libraries
// The advantages: more scope for countries but also its related
// economic capabilities like conversion rates

// Define available countries
export const availableCountries = [
  'Colombia', 'Argentina', 'Chile', 'Perú', 'Brazil', 'Uruguay',
  'Venezuela', 'Costa rica', 'México', 'Ecuador',
];

// Function to generate country currencies
export const generateCountryCurrency = (country: string) => {
  const parsedCountry = country?.toLowerCase();
  if (parsedCountry === 'colombia') return 'COP';
  if (parsedCountry === 'chile') return 'CLP';
  if (parsedCountry === 'venezuela') return 'VED';
  if (parsedCountry === 'argentina') return 'ARS';
  if (parsedCountry === 'perú') return 'PEN';
  if (parsedCountry === 'brazil') return 'BRL';
  if (parsedCountry === 'uruguay') return 'UYU';
  if (parsedCountry === 'costa rica') return 'CRC';
  if (parsedCountry === 'méxico') return 'MXN';
  if (parsedCountry === 'ecuador') return 'USD';
  return '';
};
