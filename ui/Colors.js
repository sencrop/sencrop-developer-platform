export const colors = {
  blue: {
    default: '#276798', // forecast 1
    light: '#8de0ff', // rain
    dark: '#2a3540', // filters, footer
  },
  brand: {
    default: '#006838', // brandgreen 1
    light: '#8bc43e', // brandgreen 2
  },
  green: {
    default: '#22a36e', // green 1
    light: '#69c028', // green 2
    fade: '#a8d765', // green 3
    pale: '#e9f5d8', // hover menu
  },
  bluedata: {
    0: '#f1f3f4',
    1: '#dee8f1',
    2: '#c6d9ea',
    3: '#9dbad2',
  },
  greendata: {
    0: '#f1f3f4',
    1: '#e7f3d7',
    2: '#cee4b2',
    3: '#a8d765',
  },
  yellow: {
    default: '#ffbb00', // sun
    darker: '#ff9000', // notifications
  },
  red: {
    default: '#f2c600', // alerts,
    'actual-red': '#f96565',
  },
  grey: {
    default: '#cccccc', // clouds
    light: '#ebeef0', // light grey
    dark: '#b8bfc3', // icons
    fade: '#bcc2c6',
  },
  anthracite: {
    default: '#869097', // text 3
    dark: '#52667a', // text 2
    darker: '#2a3540', // text 1
    light: '#c9d0d6', // text 4
  },
  'forecast-blue': {
    default: '#276798', // forecast 1
    'shade-1': '#3e709b', // forecast 2
    'shade-2': '#4a7aa1', // forecast 3
  },
};

export const color = (name, shade = 'default') =>
  colors[name] && colors[name][shade];

export const colorsUi = {
  text: color('anthracite'),
  'text--dark': color('anthracite', 'dark'),
  'text--darker': color('anthracite', 'darker'),
  'text--light': color('grey', 'light'),
  brand: color('green'),
  'brand--light': color('green', 'light'),
  clouds: color('grey'),
  'light--grey': color('grey', 'light'),
  rain: color('blue', 'light'),
  alerts: color('red'),
  danger: color('red', 'actual-red'),
  notifications: color('yellow', 'darker'),
};

export const ui = name => colorsUi[name];
