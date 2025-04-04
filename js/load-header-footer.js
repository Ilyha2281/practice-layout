const basePath = window.location.hostname.includes('github.io')
  ? '/practice-layout/'
  : '/'

document.addEventListener('DOMContentLoaded', function () {
  fetch(basePath + 'header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header').innerHTML = data
    })
    .catch(error => console.error('Error loading header:', error))

  fetch(basePath + 'footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer').innerHTML = data
    })
    .catch(error => console.error('Error loading footer:', error))

  document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
    if (link.href.includes('https://') || link.href.includes('http://')) {
      return
    }
    link.href = basePath + link.getAttribute('href')
  })

  document.querySelectorAll('script').forEach(script => {
    if (
      script.src &&
      (script.src.includes('https://') || script.src.includes('http://'))
    ) {
      return
    }
    if (script.src) {
      script.src = basePath + script.getAttribute('src')
    }
  })
})

var app = new Vue({
  el: '#app',
  data: {
    products: [
      {
        id: 1,
        title: 'Eureka Lemon',
        short_text: 'Classic, tangy, and juicy Eureka lemons. You`ll like it!',
        image: 'images/eureka_lemon.jpg',
        desc: 'A popular lemon variety with bright yellow skin and acidic juice.',
        characteristics: {
          resistance: 'HR: Citrus Canker; IR: Root Rot',
          plant: [
            'Vigorous and upright growth.',
            'Produces fruit year-round.',
            'Prefers warm and sunny climates.'
          ],
          fruit: [
            'Bright yellow with a textured skin.',
            'High acidity and strong citrus aroma.',
            'Average fruit size: 120 – 150 grams.'
          ],
          cycle: ['Year-round'],
          color: 'Yellow'
        }
      },
      {
        id: 2,
        title: 'Lisbon Lemon',
        short_text: 'A hardy lemon variety with rich citrus flavor.',
        image: 'images/lisbon_lemon.jpg',
        desc: 'A highly productive variety with a strong, tart flavor.',
        characteristics: {
          resistance: 'HR: Citrus Canker; IR: Cold Tolerance',
          plant: [
            'Tolerant to cooler temperatures.',
            'Dense foliage providing sun protection.',
            'Heavy fruit-bearing tree.'
          ],
          fruit: [
            'Bright yellow and smooth skin.',
            'Juicy and tangy flesh.',
            'Average fruit size: 140 – 160 grams.'
          ],
          cycle: ['Winter', 'Spring'],
          color: 'Yellow'
        }
      },
      {
        id: 3,
        title: 'Meyer Lemon',
        short_text: 'A sweet and fragrant hybrid lemon. You`ll like it!',
        image: 'images/meyer_lemon.jpg',
        desc: 'A cross between a lemon and a mandarin orange with a mild flavor.',
        characteristics: {
          resistance: 'HR: Citrus Canker; IR: Drought Tolerance',
          plant: [
            'Compact growth, suitable for pots.',
            'Cold-sensitive, thrives in warmer climates.',
            'Produces fewer seeds than standard lemons.'
          ],
          fruit: [
            'Thin skin with a deep yellow-orange hue.',
            'Sweeter and less acidic than common lemons.',
            'Average fruit size: 100 – 130 grams.'
          ],
          cycle: ['Fall', 'Winter'],
          color: 'Golden Yellow'
        }
      },
      {
        id: 4,
        title: 'Ponderosa Lemon',
        short_text: 'A large, bumpy-skinned lemon with intense citrus aroma.',
        image: 'images/ponderosa_lemon.jpg',
        desc: 'A unique lemon variety with an oversized fruit and thick rind.',
        characteristics: {
          resistance: 'HR: Root Rot; IR: Citrus Leaf Miner',
          plant: [
            'Requires ample space due to large growth.',
            'Prefers warm conditions and well-drained soil.',
            'Highly ornamental with large blossoms.'
          ],
          fruit: [
            'Large fruit with a thick, bumpy skin.',
            'Rich and intense citrus flavor.',
            'Average fruit size: 200 – 300 grams.'
          ],
          cycle: ['Spring', 'Summer'],
          color: 'Bright Yellow'
        }
      },
      {
        id: 5,
        title: 'Femminello Lemon',
        short_text: 'A premium Italian lemon variety. You`ll like it!',
        image: 'images/femminello_lemon.jpg',
        desc: 'Highly prized for its fragrant oils and culinary versatility.',
        characteristics: {
          resistance: 'HR: Citrus Greening; IR: Wind Resistance',
          plant: [
            'Fast-growing and productive.',
            'Requires consistent watering and sunlight.',
            'Popular in Mediterranean regions.'
          ],
          fruit: [
            'Smooth, thin-skinned fruit.',
            'Strong, fragrant lemon aroma.',
            'Average fruit size: 110 – 130 grams.'
          ],
          cycle: ['Year-round'],
          color: 'Lemon Yellow'
        }
      }
    ],
    product: {},
    cart: [],
    btnVisible: 0,
    orderSummary: null,
    orderProducts: []
  },
  mounted: function () {
    this.getProduct()
    this.getCart()
  },
  methods: {
    getProduct: function () {
      const productId = window.location.hash.replace('#', '')
      if (productId) {
        this.product = this.products.find(p => p.id == productId) || {}
        this.checkInCart(productId)
      }
    },
    addToCart (id) {
      let cart = JSON.parse(localStorage.getItem('cart')) || []
      if (!cart.includes(id)) {
        cart.push(id)
        localStorage.setItem('cart', JSON.stringify(cart))
      }
      this.btnVisible = 1
    },
    goToCart () {
      window.location.href = '/practice-layout/contact-us.html'
    },
    checkInCart: function (id) {
      let cart = JSON.parse(localStorage.getItem('cart')) || []
      this.btnVisible = cart.includes(parseInt(id)) ? 1 : 0
    },
    getCart: function () {
      this.cart = JSON.parse(localStorage.getItem('cart')) || []
    }
  }
})
