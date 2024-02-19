module.exports = {
  packagerConfig: {
    asar: true,
    icon: "./assets/test.png",
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        setupIcon: './assets/test.png',
      },
    },
    {
      name: "@electron-forge/maker-deb",
      config: {
        options: {
          icon: "./assets/test.png",
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
