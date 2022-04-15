<h1 align="center">Welcome to tankerkoenigv4 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/hugohabicht01/tankerkoenigv4#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/hugohabicht01/tankerkoenigv4/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/hugohabicht01/tankerkoenigv4/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/hugohabicht01/tankerkoenigv4" />
  </a>
</p>

> A simple wrapper around the version 4 of the creativecommons.tankerkoenig.de API for fetching real-time gas prices in Germany

## Install

```sh
npm install tankerkoenigv4
```

## Run tests

```sh
npm run test
```

## Usage

### Fetch stats

```typescript
import { stats } from 'tankerkoenigv4';

(async () => {
  const { E5, E10, Diesel } = await stats({ apikey: APIKEY });
  console.log({E5, E10, Diesel});
})();
```

Sample output:

```javascript
{
  E5: { count: 13455, mean: 1.972, median: 1.969 },
  E10: { count: 12837, mean: 1.917, median: 1.909 },
  Diesel: { count: 13593, mean: 1.969, median: 1.959 }
}
```

### Find petrol stations around a certain point

```typescript
import { byCoordinates } from 'tankerkoenigv4';

(async () => {
  const { stations } = await byCoordinates({
    lat: 50.114634,
    lng: 8.687657,
    apikey: APIKEY
  })
  console.log(stations);
})();
```

Sample output:

```javascript
[
  {
    country: 'de',
    id: '09978ef8-5fa5-46d5-8389-957eb7cd8540',
    name: 'Aral Tankstelle',
    brand: 'ARAL',
    street: 'Grueneburgweg 67',
    postalCode: '60323',
    place: 'Frankfurt',
    coords: { lat: 50.12197, lng: 8.669096 },
    isOpen: true,
    closesAt: '2022-04-15T21:45:00+02',
    openingTimes: [ [Object], [Object], [Object] ],
    dist: 1.55,
    fuels: [ [Object], [Object], [Object] ]
  },
  {
    country: 'de',
    id: '0a70f16c-0b9e-4083-973e-01173c8839e5',
    name: 'Esso Tankstelle',
    brand: 'ESSO',
    street: 'SPESSARTSTR. 22-24 ',
    postalCode: '60385',
    place: 'FRANKFURT',
    coords: { lat: 50.12519, lng: 8.709553 },
    isOpen: false,
    opensAt: '2022-04-16T07:00:00+02',
    openingTimes: [ [Object], [Object], [Object] ],
    dist: 1.95,
    fuels: [ [Object], [Object], [Object] ]
  },
]
```

### Get prices of stations by ID

```typescript
import { byIds } from 'tankerkoenigv4';

(async () => {
  const { stations } = await byIds({
    ids: ['83d5ac80-4f23-4106-b054-7c7704bfcb95'],
    apikey: APIKEY
  })
  console.log(stations);
})();
```

Sample output:

```javascript
[
  {
    country: 'de',
    id: '83d5ac80-4f23-4106-b054-7c7704bfcb95',
    name: 'Aral Tankstelle',
    brand: 'ARAL',
    street: 'Cannstatter Straße 46',
    postalCode: '70190',
    place: 'Stuttgart',
    coords: { lat: 48.78922, lng: 9.192324 },
    isOpen: true,
    openingTimes: [],
    fuels: [ [Object], [Object], [Object] ]
  }
]
```

### Get petrolstations by postcode

```typescript
import { byPostalcode } from 'tankerkoenigv4';

(async () => {
  const { stations } = await tankerkoenig.byPostalcode({
    postalcode: '11011',
    apikey: APIKEY
  })
  console.log(stations);
})();
```

Sample output:

```javascript
[
  {
    country: 'de',
    id: 'cba00de3-9841-49ce-943c-0bcded76ba18',
    name: 'TotalEnergies Berlin',
    brand: 'TotalEnergies',
    street: 'Chausseestr. 61-62',
    postalCode: '10115',
    place: 'Berlin',
    coords: { lat: 52.537242, lng: 13.375376 },
    isOpen: true,
    openingTimes: [],
    fuels: [ [Object], [Object], [Object] ]
  }
]
```

### Report wrong data

In this example we're reporting a wrong diesel price, and submit that the actual price is supposed to be 0.99 € (I wish lol :sweat_smile:)
```typescript
import { complaint } from 'tankerkoenigv4';

(async () => {
  await complaint({
    id: '1234-1234-1234-1234',
    type: 'wrongPriceDiesel',
    correction: '0.99',
    apikey: APIKEY
  })
})();
```

## Author

👤 **hugohabicht01**

* Github: [@hugohabicht01](https://github.com/hugohabicht01)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/hugohabicht01/tankerkoenigv4/issues). 

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2022 [hugohabicht01](https://github.com/hugohabicht01).<br />
This project is [MIT](https://github.com/hugohabicht01/tankerkoenigv4/blob/master/LICENSE) licensed.
