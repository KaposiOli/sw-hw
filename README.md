# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a(n)

- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)

## Running Tests

To test the application run `npm run test`. Tests are run via Jest.

## Linting

To lint the application, run `npm run lint`.

## Dev Docs

Single screen, most of the logic happens in the CharacterList component.

On first load, the SWApi is called, which returns all the characters available.

Since there is a built in "pagination" on SWApi, which limits the number of characters returned in a single query to 10,
I prefered looping through the API requests so that I only go to the API once for all the data, instead of firing multiple requests on every user interaction such as sorting or searching by name.
This ensures that we always have the whole character list as a source, and we dont fetch the API several times hoping we dont hit rate limiting.

After every user interaction, the whole list of characters is subject to sorting/pagination/filtering. This ensures the the whole of the available source is used, not just what is on the screen at the moment.
Pagination is calculated dinamically to ensure that the page size is customizable, and the Previous/Next buttons are always available/disabled correctly.

Searching by name is also case insensitive.

Tests cover the business logic such as proper sorting and the single API call.
