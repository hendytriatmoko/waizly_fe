export default function ({ $axios, app }) {
  $axios.onRequest((config) => {
    
    const user = app.$cookies.get('user') // Replace 'auth' with your store module name and 'token' with the actual token property
    if (user) {
      config.headers.common['Authorization'] = `${user.token}`
    }
    return config
  })
}
