/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/v1': {
      target: 'http://192.168.101.31:8999',
      // target: 'http://47.105.159.183:8998',
      changeOrigin: true,
      
    },
  },
};
