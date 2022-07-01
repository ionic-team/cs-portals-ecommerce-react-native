export const Colors = {
  primary: '#3880ff',
  secondary: '#EBF4FF',
  tertiary: '#5260ff',
  success: '#2dd36f',
  warning: '#ffc409',
  danger: '#eb445a',
  dark: '#222428',
  medium: '#92949c',
  light: '#f4f5f8',
  white: '#ffffff',
};

export const setForegroundColor = (color: string) => {
  return { color };
};

export const setBackgroundColor = (backgroundColor: string) => {
  return { backgroundColor };
};
