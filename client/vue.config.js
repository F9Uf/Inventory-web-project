module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: process.env.VUE_APP_API_BASE_URL || 'http://localhost:5000',
                changeOrigin: true,
            }
        }
    }
}