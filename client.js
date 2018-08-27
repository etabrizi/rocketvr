// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import { ReactInstance } from 'react-360-web';
import { Location } from 'react-360-web';

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    ...options,
  });
  // Create a location two meters in front of the user, and one meter down
  const location = new Location([0, 0, 0]);

  r360.renderToLocation(
    r360.createRoot('React3DView'),
    location,
  );



  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL('360_world.png'));
  r360.compositor.setCursorVisibility('visible');
  //r360.controls.clearRaycasters();
  //r360.controls.addRaycaster(SimpleRaycaster);
}

window.React360 = { init };
