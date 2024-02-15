module.exports = {
  packagerConfig: {
    asar: true,
    icon: "./assets/icon.png",
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        setupIcon: './assets/icon.ico',
      },
    },
    {
      name: "@electron-forge/maker-deb",
      config: {
        options: {
          icon: "./assets/icon.png",
        },
      },
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
  ],
};
