export default {
  routes: [
    {
      match: 'routes',
      src: '.*',
      dest: '/index.html',
    },
  ],
  mount: {
    public: { url: '/', static: true },
    src: '/dist',
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-typescript',
    '@snowpack/plugin-postcss',
  ],
};
