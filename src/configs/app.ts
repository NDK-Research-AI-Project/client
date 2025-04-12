export const isDemo = true;

export enum ThemeColor {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

export enum AccentColor {
  RED = 'red',
  BLUE = 'blue',
  GREEN = 'green',
  YELLOW = 'yellow',
  PURPLE = 'purple',
}

export const GradientColors = {
  [AccentColor.RED]:
    'bg-[radial-gradient(circle_at_bottom,rgba(127,29,29,0.2)_10%,rgba(153,27,27,0.12)_25%,rgba(220,38,38,0.1)_40%,rgba(0,0,0,0)_70%)]',
  [AccentColor.BLUE]:
    'bg-[radial-gradient(circle_at_bottom,rgba(50,119,251,0.2)_55%,rgba(130,150,254,0.15)_40%,rgba(135,180,255,0.1)_80%,rgba(255,255,255,0)_100%)]',
  [AccentColor.GREEN]:
    'bg-[radial-gradient(circle_at_bottom,rgba(20,83,45,0.3)_10%,rgba(21,128,61,0.2)_25%,rgba(34,197,94,0.2)_40%,rgba(0,0,0,0)_70%)]',
  [AccentColor.YELLOW]:
    'bg-[radial-gradient(circle_at_bottom,rgba(202,138,4,0.2)_30%,rgba(234,179,8,0.2)_30%,rgba(253,224,71,0.1)_60%,rgba(0,0,0,0)_40%)]',
  [AccentColor.PURPLE]:
    'bg-[radial-gradient(circle_at_bottom,rgba(76,29,149,0.2)_20%,rgba(107,33,168,0.3)_25%,rgba(168,85,247,0.2)_50%,rgba(0,0,0,0)_80%)]',
};
