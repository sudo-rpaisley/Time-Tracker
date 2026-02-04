// Compatibility wrapper: load the legacy application script as a module.
// This keeps the large existing `public/script.js` intact while allowing
// it to be imported in the ES module bootstrap. Over time we will extract
// pieces into smaller modules and remove the legacy script.

import '../script.js';

export const legacyLoaded = true;
