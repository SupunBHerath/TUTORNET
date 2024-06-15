import {
  LinearProgress_default
} from "./chunk-NJZSRH5U.js";
import {
  Paper_default
} from "./chunk-XHS3VYMB.js";
import {
  capitalize_default,
  init_capitalize
} from "./chunk-TAHDDYE3.js";
import {
  init_integerPropType,
  integerPropType_default
} from "./chunk-3ML3VCRG.js";
import {
  init_styled,
  slotShouldForwardProp_default,
  styled_default
} from "./chunk-G7YKYPMV.js";
import {
  init_useThemeProps,
  useThemeProps
} from "./chunk-4QOVY3F5.js";
import {
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  init_composeClasses,
  init_generateUtilityClass,
  init_generateUtilityClasses
} from "./chunk-47PJ2K64.js";
import {
  _extends,
  _objectWithoutPropertiesLoose,
  init_extends,
  init_objectWithoutPropertiesLoose,
  require_jsx_runtime
} from "./chunk-BCEWK3T5.js";
import {
  clsx_default,
  init_clsx
} from "./chunk-E4Q4XAA4.js";
import {
  require_prop_types
} from "./chunk-NV2AUDXZ.js";
import {
  require_react
} from "./chunk-6P5PNMGD.js";
import {
  __toESM
} from "./chunk-WXXH56N5.js";

// node_modules/@mui/material/MobileStepper/MobileStepper.js
init_objectWithoutPropertiesLoose();
init_extends();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_clsx();
init_integerPropType();
init_composeClasses();
init_capitalize();
init_useThemeProps();
init_styled();

// node_modules/@mui/material/MobileStepper/mobileStepperClasses.js
init_generateUtilityClasses();
init_generateUtilityClass();
function getMobileStepperUtilityClass(slot) {
  return generateUtilityClass("MuiMobileStepper", slot);
}
var mobileStepperClasses = generateUtilityClasses("MuiMobileStepper", ["root", "positionBottom", "positionTop", "positionStatic", "dots", "dot", "dotActive", "progress"]);
var mobileStepperClasses_default = mobileStepperClasses;

// node_modules/@mui/material/MobileStepper/MobileStepper.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var _excluded = ["activeStep", "backButton", "className", "LinearProgressProps", "nextButton", "position", "steps", "variant"];
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    position
  } = ownerState;
  const slots = {
    root: ["root", `position${capitalize_default(position)}`],
    dots: ["dots"],
    dot: ["dot"],
    dotActive: ["dotActive"],
    progress: ["progress"]
  };
  return composeClasses(slots, getMobileStepperUtilityClass, classes);
};
var MobileStepperRoot = styled_default(Paper_default, {
  name: "MuiMobileStepper",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[`position${capitalize_default(ownerState.position)}`]];
  }
})(({
  theme,
  ownerState
}) => _extends({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  background: (theme.vars || theme).palette.background.default,
  padding: 8
}, ownerState.position === "bottom" && {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: (theme.vars || theme).zIndex.mobileStepper
}, ownerState.position === "top" && {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: (theme.vars || theme).zIndex.mobileStepper
}));
var MobileStepperDots = styled_default("div", {
  name: "MuiMobileStepper",
  slot: "Dots",
  overridesResolver: (props, styles) => styles.dots
})(({
  ownerState
}) => _extends({}, ownerState.variant === "dots" && {
  display: "flex",
  flexDirection: "row"
}));
var MobileStepperDot = styled_default("div", {
  name: "MuiMobileStepper",
  slot: "Dot",
  shouldForwardProp: (prop) => slotShouldForwardProp_default(prop) && prop !== "dotActive",
  overridesResolver: (props, styles) => {
    const {
      dotActive
    } = props;
    return [styles.dot, dotActive && styles.dotActive];
  }
})(({
  theme,
  ownerState,
  dotActive
}) => _extends({}, ownerState.variant === "dots" && _extends({
  transition: theme.transitions.create("background-color", {
    duration: theme.transitions.duration.shortest
  }),
  backgroundColor: (theme.vars || theme).palette.action.disabled,
  borderRadius: "50%",
  width: 8,
  height: 8,
  margin: "0 2px"
}, dotActive && {
  backgroundColor: (theme.vars || theme).palette.primary.main
})));
var MobileStepperProgress = styled_default(LinearProgress_default, {
  name: "MuiMobileStepper",
  slot: "Progress",
  overridesResolver: (props, styles) => styles.progress
})(({
  ownerState
}) => _extends({}, ownerState.variant === "progress" && {
  width: "50%"
}));
var MobileStepper = React.forwardRef(function MobileStepper2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiMobileStepper"
  });
  const {
    activeStep = 0,
    backButton,
    className,
    LinearProgressProps,
    nextButton,
    position = "bottom",
    steps,
    variant = "dots"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const ownerState = _extends({}, props, {
    activeStep,
    position,
    variant
  });
  let value;
  if (variant === "progress") {
    if (steps === 1) {
      value = 100;
    } else {
      value = Math.ceil(activeStep / (steps - 1) * 100);
    }
  }
  const classes = useUtilityClasses(ownerState);
  return (0, import_jsx_runtime.jsxs)(MobileStepperRoot, _extends({
    square: true,
    elevation: 0,
    className: clsx_default(classes.root, className),
    ref,
    ownerState
  }, other, {
    children: [backButton, variant === "text" && (0, import_jsx_runtime.jsxs)(React.Fragment, {
      children: [activeStep + 1, " / ", steps]
    }), variant === "dots" && (0, import_jsx_runtime2.jsx)(MobileStepperDots, {
      ownerState,
      className: classes.dots,
      children: [...new Array(steps)].map((_, index) => (0, import_jsx_runtime2.jsx)(MobileStepperDot, {
        className: clsx_default(classes.dot, index === activeStep && classes.dotActive),
        ownerState,
        dotActive: index === activeStep
      }, index))
    }), variant === "progress" && (0, import_jsx_runtime2.jsx)(MobileStepperProgress, _extends({
      ownerState,
      className: classes.progress,
      variant: "determinate",
      value
    }, LinearProgressProps)), nextButton]
  }));
});
true ? MobileStepper.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Set the active step (zero based index).
   * Defines which dot is highlighted when the variant is 'dots'.
   * @default 0
   */
  activeStep: integerPropType_default,
  /**
   * A back button element. For instance, it can be a `Button` or an `IconButton`.
   */
  backButton: import_prop_types.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * @ignore
   */
  className: import_prop_types.default.string,
  /**
   * Props applied to the `LinearProgress` element.
   */
  LinearProgressProps: import_prop_types.default.object,
  /**
   * A next button element. For instance, it can be a `Button` or an `IconButton`.
   */
  nextButton: import_prop_types.default.node,
  /**
   * Set the positioning type.
   * @default 'bottom'
   */
  position: import_prop_types.default.oneOf(["bottom", "static", "top"]),
  /**
   * The total steps.
   */
  steps: integerPropType_default.isRequired,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  /**
   * The variant to use.
   * @default 'dots'
   */
  variant: import_prop_types.default.oneOf(["dots", "progress", "text"])
} : void 0;
var MobileStepper_default = MobileStepper;

export {
  getMobileStepperUtilityClass,
  mobileStepperClasses_default,
  MobileStepper_default
};
//# sourceMappingURL=chunk-6YEEZY54.js.map
