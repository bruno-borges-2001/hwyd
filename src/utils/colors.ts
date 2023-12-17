export const colors = {
  "pastel_red": "#FFB6B6",
  "pastel_green": "#B6FFB6",
  "pastel_blue": "#B6B6FF",
  "pastel_yellow": "#FFFFB6",
  "pastel_magenta": "#FFB6FF",
  "pastel_cyan": "#B6FFFF",
  "pastel_orange": "#FFD8B6",
  "pastel_purple": "#D8B6FF",
  "pastel_pink": "#FFB6E1",
  "pastel_mint": "#B6FFD8",
  "pastel_peach": "#FFD8D8",
}

export function getRandomColor(excludeColors = [] as string[]) {
  const colorsArray = Object.values(colors).filter(el => !excludeColors.includes(el))
  return colorsArray.at(Math.random() * colorsArray.length)!
}