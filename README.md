# Portals Ecommerce

An e-commerce demo application using Ionic Portals for React Native.

This project highlights the use of web resources to populate Portals within a React Native application, communication between React Native and web resources, sharing code between web resources and React Native, and using Live Updates to update the contents of a Portal.

To do so, this project is constructed as a monorepo using Yarn Workspaces containing the following packages:

- `@portals-ecommerce/app` - This package is a React Native application.
- `@portals-ecommerce/web` - This package is an Ionic React application.
- `@portals-ecommerce/shared` - This package contains code and assets shared between the other packages.

Each project within the monorepo can be found within the `packages` directory. The `packages/live-update` directory serves as the base version of web resources to be replaced using Live Updates but is not a buildable project within the monorepo.

> **Note:** This document presumes the reader is familiar building and running React Native applications.

## Portals Registration Key

To try this demo, you are required to input a Portals registration key. You may get a key by going to [ionic.io/register-portals](https://ionic.io/register-portals). Follow the instructions below to add your key to the React Native demo application.

Create a `.env` file within the `packages/app` folder containing the following contents:

```bash
PORTALS_API_KEY=YOUR_KEY_HERE
```

Replace `YOUR_KEY_HERE` with your key.

## Running the Applications

Before running either application you must first build the shared code library:

```
yarn workspace @portals-ecommerce/shared build
```

To serve the web application presented through Portals run the following command:

```
yarn workspace @portals-ecommerce/web start
```

Before you build or run the React Native application, you will need to build the web resource:

```
yarn workspace @portals-ecommerce/web build
```

Once complete, you may change directories to `packages/app` and follow your typical workflow to run a React Native project.

## General Architecture

The following diagram represents which application views written purely with React Native and which views display web resources through Portals.

<br />
<div align="center">
  <img src="./portals-diagram-reactnative.png" height="400" />
</div>
<br />

### Registering and Adding Portals

The React Native application defines a method to register and adds Portals within `packages/app/src/initializePortals.ts`:

```typescript
import { addPortals, Portal, register } from "@ionic/portals-react-native";
import { PORTALS_API_KEY } from "@env";
import { LiveUpdate } from "./shared";

const shopPortal: Portal = {
  name: "shopwebapp",
  startDir: "portals/shopwebapp",
  initialContext: { startingRoute: "/help" },
  androidPlugins: ["com.capacitorjs.plugins.camera.CameraPlugin"],
};

/* Code omitted for brevity */

const initializePortals = async () => {
  await register(PORTALS_API_KEY);
  await addPortals([shopPortal, featuredProductsPortal]);
};
export default initializePortals;
```

This method is imported and called in `packages/app/src/App.tsx`:

```typescript
/* Additional imports omitted for brevity */
import initializePortals from "./src/initializePortals";

initializePortals();

const App = () => {
  /* Code omitted for brevity */
};
export default App;
```

> **Note:** The code above runs _outside_ of any React component definitions. It is not recommended to register and add Portals within the React lifecycle.

### Displaying Portals

This demo application contains two Portals: `shopwebapp` and `featuredproductsapp`. Each `<PortalView />` component using the `shopwebapp` Portal passes a different route as part of its `initialContext` to display a different portion of the web application:

```JSX
// packages/app/src/ProfileScreen.tsx
<PortalView initialContext={{ startingRoute: '/user', user }} />

// packages/app/src/HelpScreen.tsx
<PortalView initialContext={{ startingRoute: '/help' }} />
```

The web application intercepts the `startingRoute` and will route to the appropriate view:

```JSX
// packages/web/src/App.tsx
<Route exact path="/">
  {startingRoute !== "/" ? <Redirect to={startingRoute} /> : <DebugPage />}
</Route>
```

> **Note:** This demo application contains a "debug page" used when developing the web experience.

### Communication Between Layers

Layer-to-layer communication between React Native and web is achieved through pub/sub messaging. This demo's checkout functionality is a good example of communication between both layers.

First, React Native passes the current state of the cart through the `<PortalView />` component:

```JSX
// packages/app/src/cart/CheckoutScreen.tsx
<PortalView initialContext={{ startingRoute: '/checkout', user, cart }} />
```

Next, the web application uses the initial context to set its state:

```Typescript
// packages/web/src/App.tsx
const App: React.FC<{ context: AppContext }> = ({
  context: { startingRoute, user, cart },
}) => {
  const { setStateData } = useData();

  useEffect(() => {
    setStateData({ user, cart });
  }, [setStateData, user, cart]);

  return ( /* Code omitted for brevity */ );
}
export default App;
```

Upon checkout, the web application clears its cart state and publishes a message to a topic React Native subscribes to:

```Typescript
// packages/web/src/checkout/CheckoutPage.tsx
 const { result } = checkout();
const data = { result };
await Portals.publish<Messages>({ topic: "cart:checkout", data });
```

Finally, the React Native application responds to this message, clearing its cart and dismissing the view:

```Typescript
// packages/app/src/cart/CheckoutScreen.tsx
const subscribeToCheckout = useCallback(async () => {
  checkoutSubRef.current = await subscribe('cart:checkout', ({ data }) => {
    if (data.result === 'success') {
      clearCart();
      navigation.goBack();
    }
  });
}, [clearCart, navigation]);
```

### Live Updates

The `featuredproductsapp` Portal is displayed within the React Native application in an interstitial fashion, as part of the shopping experience:

```TSX
// packages/app/src/shop/ShopScreen.tsx

/* Code augmented for brevity */
<PortalView
  portal={{ name: 'featuredproductsapp' }}
  style={{ height: 400, width: '100%' }}
/>
```

Pressing refresh icon on the top-right of the Portal pulls down the latest Live Update for `featuredproductsapp`.

The code for this interstitial experience can be found within the following repo: [https://github.com/ionic-team/cs-portals-ecommerce-featured-products/](https://github.com/ionic-team/cs-portals-ecommerce-featured-products/).

Live Updates are associated with this Portal as the `liveUpdate` property supplied to `addPortal()`:

```Typescript
// packages/app/App.tsx
addPortal({
  name: 'featuredproductsapp',
  startDir: 'portals/featuredproductsapp',
  liveUpdate: {
    appId: LiveUpdate.appId,
    channel: LiveUpdate.channel,
    syncOnAdd: false,
  },
});
```

Note the `syncOnAdd` property above. When this property is set to `true` (or omitted), a sync operation will occur the first time a Portal is created to check if an update is available, If so, the assets are downloaded to the device and setup with the Portal and will be applied the next time the Portal is loaded.

This demo application "manually" applies a Live Update by unmounting and remounting the `<FeaturedProductPortal />` component.

> **Note:** Ionic recommends applying Live Updates using the default background mode. Manual syncing is implemented solely for **demo purposes**.

Refer to Portals' [Getting Started with Live Updates](https://ionic.io/docs/portals/getting-started/live-updates) for additional information on the Live Update API.

## Copying Web Resources

The React Native application copies the contents of `packages/web/build` as part of its build process for both iOS and Android. This directory contains distribution files for the web application.

For Android, the build task to copy web assets can be found in `packages/app/android/app/build.gradle`. The task is named `copyWebAssets`.

For iOS, the build task can be found within the "Build Phases" of the "PortalsEcommerce" target. The task is named `Copy Web Assets`.

Additional tasks exist to copy the contents of `packages/live-update/build` as part of the build process for both iOS and Android.
