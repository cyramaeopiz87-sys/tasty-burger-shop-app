import { useState } from 'react'
import './App.css'

type Burger = {
  id: number
  name: string
  description: string
  price: number
  image: string
}
const burgers: Burger[] = [
  {
    id: 1,
    name: 'Classic Cheeseburger',
    description: 'Juicy beef patty with fresh vegetables and melted cheese.',
    price: 99,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvkQBdhYrMLNJa6AViIxafWLWg0L7slbjKaPhPb2UAjg&s=10',
  },
  {
    id: 2,
    name: 'Bacon Burger',
    description: 'Crispy bacon, beef patty, cheese, and our special sauce.',
    price: 129,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHmXi18ws8vNJxwV-PyIDrqsZ3shJczekQHjMWnWVRIw&s=10',
  },
  {
    id: 3,
    name: 'Double Burger',
    description: 'Two juicy beef patties with cheese and fresh toppings.',
    price: 149,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOSaOybXw5TSWwWdBSUFmlYQFRi6KMFdrRHf4QLzgWnA&s=10',
  },
]
function App() {
  const [cart, setCart] = useState<Record<number, number>>({})

  const addToCart = (id: number) => {
    setCart((current) => ({
      ...current,
      [id]: (current[id] || 0) + 1,
    }))
  }

  const removeFromCart = (id: number) => {
    setCart((current) => {
      const quantity = current[id] || 0

      if (quantity <= 1) {
        const updated = { ...current }
        delete updated[id]
        return updated
      }

      return {
        ...current,
        [id]: quantity - 1,
      }
    })
  }

  const totalItems = Object.values(cart).reduce(
    (total, quantity) => total + quantity,
    0
  )

  return (
    <div>
      <header>
        <h1>🍔 Tasty Burger Shop</h1>

        <nav>
          <a href="#">Home</a>
          <a href="#">Menu</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <button>🛒 Cart ({totalItems})</button>
        </nav>
      </header>

      <main>
        <section className="hero-section">
          <h2>Delicious Burgers, Made for You!</h2>

          <p>
            Fresh ingredients, juicy burgers, and amazing flavors.
          </p>

          <button>Order Now</button>
        </section>

        <section className="menu-section">
          <h2>Our Popular Burgers</h2>

          <div className="burger-grid">
            {burgers.map((burger) => {
              const quantity = cart[burger.id] || 0

              return (
                <div className="burger-card" key={burger.id}>
                 <div className="burger-image">
                  <img src={burger.image} alt={burger.name} />
                  </div>
                  <h3>{burger.name}</h3>

                  <p>{burger.description}</p>

                  <strong>₱{burger.price}</strong>

                  {quantity === 0 ? (
                    <button onClick={() => addToCart(burger.id)}>
                      Add to Cart
                    </button>
                  ) : (
                    <div className="quantity-controls">
                      <button onClick={() => removeFromCart(burger.id)}>
                        −
                      </button>

                      <span>{quantity}</span>

                      <button onClick={() => addToCart(burger.id)}>
                        +
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App