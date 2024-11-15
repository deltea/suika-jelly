interface Palette {
  base: string;
  background: string;
  fruits: string[];
}

export const palettes: Palette[] = [
  // Fire and Ice
  {
    base: "#ffffff",
    background: "#eeeeee",
    fruits: [
      "#A73169",
      "#C24B6E",
      "#D9626C",
      "#EC9A6D",
      "#FFC27A",
      "#FFEB99",
      "#94C5AC",
      "#6AAF9D",
      "#345D68",
      "#1C1E34",
      "#201333",
    ],
  },

  // Catppuccin
  {
    base: "#1E1E2E",
    background: "#181825",
    fruits: [
      "#f4dbd6",
      "#f5bde6",
      "#c6a0f6",
      "#ed8796",
      "#f5a97f",
      "#eed49f",
      "#a6da95",
      "#8bd5ca",
      "#7dc4e4",
      "#8aadf4",
      "#cad3f5"
    ]
  }
];
