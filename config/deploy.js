module.exports = function(deployTarget) {  
  return {
    pagefront: {
      app: 'emberx-select',
      key: process.env.PAGEFRONT_KEY
    }
  };
};
