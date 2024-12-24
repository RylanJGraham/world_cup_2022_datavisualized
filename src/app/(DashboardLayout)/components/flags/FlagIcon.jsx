'use client';

import React from 'react';
import { FlagIcon } from 'react-flag-kit';

// Mapping team names to country codes (ISO 3166-1 alpha-2)
const countryCodeMapping = {
  Qatar: 'QA',
  Ecuador: 'EC',
  England: 'GB',
  Iran: 'IR',
  Senegal: 'SN',
  Netherlands: 'NL',
  'United States': 'US',
  Wales: 'GB-WLS',
  Argentina: 'AR',
  'Saudi Arabia': 'SA',
  SaudiArabia: 'SA',
  Denmark: 'DK',
  Tunisia: 'TN',
  Mexico: 'MX',
  Poland: 'PL',
  France: 'FR',
  Australia: 'AU',
  Morocco: 'MA',
  Croatia: 'HR',
  Germany: 'DE',
  Japan: 'JP',
  Spain: 'ES',
  'Costa Rica': 'CR',
  Belgium: 'BE',
  Canada: 'CA',
  Switzerland: 'CH',
  Cameroon: 'CM',
  Uruguay: 'UY',
  'Korea Republic': 'KR',
  Portugal: 'PT',
  Ghana: 'GH',
  Brazil: 'BR',
  Serbia: 'RS',
  USA: 'US',
  Korea: 'KR',
  'Korea republic': 'KR',
  'Costa rica': 'CR',
  'United states': 'US',
  'Saudi arabia': 'SA'
};

// Flag component with dynamic size
const CountryFlag = ({ country, size = 20 }) => {
  // Fetch the country code using the country name
  const countryCode = countryCodeMapping[country];

  if (!countryCode) {
    return <div>Country not found</div>; // Error handling if country is not found
  }

  return (
    <FlagIcon code={countryCode} style={{ width: `${size}px`, height: `${size}px` }} />
  );
};

export default CountryFlag;
