import theme from '../globals/theme';

export const colors = () => {
  for (let color in theme.colorPalette) {
    console.log(color);
  }

  for (let color in theme.colors) {
    console.log(color);
  }
}
