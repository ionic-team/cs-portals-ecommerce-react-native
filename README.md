# Portals Ecommerce

An e-commerce demo application using Ionic Portals for React Native.

This is an example application built using React Native and uses web resources for their Portals.

## Portals Registration Key

To try this demo, you are required to input a Portals registration key. You may get a key by going to ionic.io/register-portals. Follow the instructions below to add your key to the React Native demo application.

Add the registration key by

```javascript
// TODO: Instruct user to add key in .env file
```

## Web

### Building

Before you build the iOS or Android source you will need to build the web resource:

```bash
yarn install
yarn workspace @portals-ecommerce/web build
```

### Serving

To serve the web application, run the following commands:

```bash
yarn install
yarn workspace @portals-ecommerce/web start
```
