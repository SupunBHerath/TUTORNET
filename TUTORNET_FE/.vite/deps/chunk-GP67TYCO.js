import {
  defaultTheme_default,
  identifier_default,
  init_defaultTheme,
  init_identifier
} from "./chunk-47PJ2K64.js";
import {
  useTheme_default
} from "./chunk-BCEWK3T5.js";
import {
  require_react
} from "./chunk-6P5PNMGD.js";
import {
  __toESM
} from "./chunk-WXXH56N5.js";

// node_modules/@mui/material/styles/useTheme.js
var React = __toESM(require_react());
init_defaultTheme();
init_identifier();
function useTheme() {
  const theme = useTheme_default(defaultTheme_default);
  if (true) {
    React.useDebugValue(theme);
  }
  return theme[identifier_default] || theme;
}

export {
  useTheme
};
//# sourceMappingURL=chunk-GP67TYCO.js.map
