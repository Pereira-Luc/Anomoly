# Anomoly

## Description

Anomoly is a End-to-End encrypted chat application that allows users to chat with each other in a secure manner.
It uses the tweetnacl to encrypt and decrypt messages. It uses a nodejs server as a backend with graphql and apollo
server.

## Installation

First of all clone the repository using the following command:

```bash
git clone https://github.com/Pereira-Luc/Anomoly
```

Then install the dependencies using the following command:

```bash
npm install
```

## Usage

To start the app in development mode use the following command:

```bash
npx expo start
```

This will start the expo server and you can run the app on your device or emulator or on a physical device using Expo
Go.

## Compiling

To compile the app for android use the following command:

```bash
eas build --profile <The Porfile you want> --platform -<platform you want> --local
```

To compile the app on IOS a Mac is required and an Apple developer account is required.

Back End for the app can be found [here](https://github.com/Pereira-Luc/AnomolyServer) Docker compose file will be added
soon.
