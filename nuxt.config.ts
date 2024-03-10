// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      "meta": [
        {
          "name": "viewport",
          "content": "width=device-width, initial-scale=1"
        },
        {
          "charset": "utf-8"
        }
      ],
      "link": [
        {
          rel:"preconnect",
          href:"https://fonts.googleapis.com"
        },
        {
          rel:"preconnect",
          href:"https://fonts.gstatic.com"
        },
        {
          rel:"stylesheet",
          href:"https://fonts.googleapis.com/css2?family=Kanit:ital,wght@1,300&display=swap"
        },
        {
          rel: "stylesheet", 
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        },
        {
          rel: "icon",
          href: "https://1417094351.rsc.cdn77.org/articles/2585/2584018/thumbnail/large.gif?3"
        }
      ],
      "style": [],
      "script": [
        {
          src: "https://cdn.jsdelivr.net/npm/sweetalert2@11"
        }
      ],
      "noscript": []
    }
  },
  modules: [
    '@nuxtjs/tailwindcss'
  ]
})
