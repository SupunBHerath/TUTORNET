import {
  init_useId,
  useId_default
} from "./chunk-GXBH6Z6Y.js";
import {
  init_unsupportedProp,
  unsupportedProp_default
} from "./chunk-UA7YE2GN.js";
import {
  init_requirePropFactory,
  requirePropFactory_default
} from "./chunk-LZIVX2O7.js";
import {
  init_useEventCallback,
  init_useIsFocusVisible,
  useEventCallback_default,
  useIsFocusVisible_default
} from "./chunk-KXUPFHRY.js";
import {
  debounce_default,
  init_debounce,
  init_ownerDocument,
  init_ownerWindow,
  ownerDocument_default,
  ownerWindow_default
} from "./chunk-Q3YCH3DO.js";
import {
  init_useEnhancedEffect,
  useEnhancedEffect_default
} from "./chunk-VBQMMIQ7.js";
import {
  init_useControlled,
  useControlled_default
} from "./chunk-R4RNA25D.js";
import {
  createSvgIcon,
  init_createSvgIcon
} from "./chunk-2GWUTY4T.js";
import {
  init_useForkRef,
  useForkRef_default
} from "./chunk-LR7PXSLF.js";
import {
  init_isMuiElement,
  isMuiElement_default
} from "./chunk-PW6U2OXL.js";
import {
  capitalize_default,
  init_capitalize
} from "./chunk-TAHDDYE3.js";
import {
  createChainedFunction,
  deprecatedPropType,
  init_createChainedFunction,
  init_deprecatedPropType,
  init_setRef,
  init_utils,
  setRef
} from "./chunk-3ML3VCRG.js";
import {
  ClassNameGenerator_default
} from "./chunk-47PJ2K64.js";
import {
  __esm,
  __export
} from "./chunk-WXXH56N5.js";

// node_modules/@mui/material/utils/createChainedFunction.js
var createChainedFunction_default;
var init_createChainedFunction2 = __esm({
  "node_modules/@mui/material/utils/createChainedFunction.js"() {
    init_createChainedFunction();
    createChainedFunction_default = createChainedFunction;
  }
});

// node_modules/@mui/material/utils/deprecatedPropType.js
var deprecatedPropType_default;
var init_deprecatedPropType2 = __esm({
  "node_modules/@mui/material/utils/deprecatedPropType.js"() {
    init_deprecatedPropType();
    deprecatedPropType_default = deprecatedPropType;
  }
});

// node_modules/@mui/material/utils/setRef.js
var setRef_default;
var init_setRef2 = __esm({
  "node_modules/@mui/material/utils/setRef.js"() {
    init_setRef();
    setRef_default = setRef;
  }
});

// node_modules/@mui/material/node_modules/@mui/base/ClassNameGenerator/index.js
var init_ClassNameGenerator = __esm({
  "node_modules/@mui/material/node_modules/@mui/base/ClassNameGenerator/index.js"() {
    init_utils();
  }
});

// node_modules/@mui/material/utils/index.js
var utils_exports = {};
__export(utils_exports, {
  capitalize: () => capitalize_default,
  createChainedFunction: () => createChainedFunction_default,
  createSvgIcon: () => createSvgIcon,
  debounce: () => debounce_default,
  deprecatedPropType: () => deprecatedPropType_default,
  isMuiElement: () => isMuiElement_default,
  ownerDocument: () => ownerDocument_default,
  ownerWindow: () => ownerWindow_default,
  requirePropFactory: () => requirePropFactory_default,
  setRef: () => setRef_default,
  unstable_ClassNameGenerator: () => unstable_ClassNameGenerator,
  unstable_useEnhancedEffect: () => useEnhancedEffect_default,
  unstable_useId: () => useId_default,
  unsupportedProp: () => unsupportedProp_default,
  useControlled: () => useControlled_default,
  useEventCallback: () => useEventCallback_default,
  useForkRef: () => useForkRef_default,
  useIsFocusVisible: () => useIsFocusVisible_default
});
var unstable_ClassNameGenerator;
var init_utils2 = __esm({
  "node_modules/@mui/material/utils/index.js"() {
    "use client";
    init_ClassNameGenerator();
    init_capitalize();
    init_createChainedFunction2();
    init_createSvgIcon();
    init_debounce();
    init_deprecatedPropType2();
    init_isMuiElement();
    init_ownerDocument();
    init_ownerWindow();
    init_requirePropFactory();
    init_setRef2();
    init_useEnhancedEffect();
    init_useId();
    init_unsupportedProp();
    init_useControlled();
    init_useEventCallback();
    init_useForkRef();
    init_useIsFocusVisible();
    unstable_ClassNameGenerator = {
      configure: (generator) => {
        if (true) {
          console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join("\n"));
        }
        ClassNameGenerator_default.configure(generator);
      }
    };
  }
});

export {
  createChainedFunction_default,
  init_createChainedFunction2 as init_createChainedFunction,
  deprecatedPropType_default,
  setRef_default,
  unstable_ClassNameGenerator,
  utils_exports,
  init_utils2 as init_utils
};
//# sourceMappingURL=chunk-W63DMWEQ.js.map
