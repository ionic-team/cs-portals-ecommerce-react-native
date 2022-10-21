import { addPortals, Portal, register } from '@ionic/portals-react-native';
import { PORTALS_API_KEY } from '@env';
import { LiveUpdate } from './shared';

const shopPortal: Portal = {
  name: 'shopwebapp',
  startDir: 'portals/shopwebapp',
  initialContext: { startingRoute: '/help' },
  androidPlugins: ['com.capacitorjs.plugins.camera.CameraPlugin'],
};

const featuredProductsPortal: Portal = {
  name: 'featuredproductsapp',
  startDir: 'portals/featuredproductsapp',
  liveUpdate: {
    appId: LiveUpdate.appId,
    channel: LiveUpdate.channel,
    syncOnAdd: false,
  },
};

const initializePortals = async () => {
  await register(PORTALS_API_KEY);
  await addPortals([shopPortal, featuredProductsPortal]);
};
export default initializePortals;
