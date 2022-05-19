# Portals Ecommerce

Eric Notes:

```
1. Create shared package for data models
2. Discuss how Context is passed from RN to Ionic React
3. Diagram out the navigation flow and point out which bits are RN or Ionic React
4. Convert the entire shop API to pub/sub. Yay!
```

An e-commerce demo application using Ionic Portals for React Native.

This is an example application built using React Native and uses web resources for their Portals.

## Portals Registration Key

To try this demo, you are required to input a Portals registration key. You may get a key by going to ionic.io/register-portals. Follow the instructions below to add your key to the React Native demo application.

Create a `.env` file within the `packages/app` folder containing the following contents:

```bash
PORTALS_API_KEY=YOUR_KEY_HERE
```

Replace `YOUR_KEY_HERE` with your key.

## Running the Application

```javascript
// TODO: Work in progress
// 1. Running the RN app
// 2. Serving the web app for development purposes
```

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

## Communication between React Native and Web

One of the key features of Ionic Portals for React Native is facilitating communication between the web and React Native layers of an application.

An initial context is passed from the React Native layer to the web layer of the application:

```typescript
export interface AppContext {
  startingRoute: string;
}
```

The `startingRoute` property directs the web layer to navigate to the desired route:

```jsx
<Route exact path="/">
  {startingRoute !== "/" ? <Redirect to={startingRoute} /> : <DebugPage />}
</Route>
```

> **Note:** This demo application contains a "debug page" used when developing the web experience.

Layer-to-layer communication between React Native and web is achieved through publish/subscribe messaging.

Getting and setting user information is one example of pub/sub communication between the React Native and web layers. React Native messages the application's user details and the web layer responds:

**React Native**

```typescript
//TODO
```

**Web Application**

```typescript
//TODO
```

The web layer can message updated user details to the React Native layer:

**React Native**

```typescript
//TODO
```

**Web Application**

```typescript
//TODO
```

## General Architecture

### React Native

### Web Application

This demo includes an [Ionic React](https://ionicframework.com/docs/react) project presented through Portals for React Native.

> **Note:** You do not have to utilize the Ionic Framework in order to present a web application within a Portal.

### Shared Library
