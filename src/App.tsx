import { useState } from 'react'
import './App.css'

type Burger = {
  id: number
  name: string
  description: string
  price: number
  image: string
  rating: number
  ingredients?: string[]
}

const burgers: Burger[] = [
  {
    id: 1,
    name: 'Classic Cheeseburger',
    description: 'Juicy beef patty with fresh vegetables and melted cheese.',
    price: 99,
    rating: 4.5,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvkQBdhYrMLNJa6AViIxafWLWg0L7slbjKaPhPb2UAjg&s=10',
      ingredients: ["Beef Patty", "Cheddar Cheese", "Lettuce", "Tomato", "Pickles"]
  },
  {
    id: 2,
    name: 'Bacon Burger',
    description: 'Crispy bacon, beef patty, cheese, and our special sauce.',
    price: 129,
    rating: 4,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHmXi18ws8vNJxwV-PyIDrqsZ3shJczekQHjMWnWVRIw&s=10',
      ingredients: ["Beef Patty", "Crispy Bacon", "Cheddar Cheese", "Special Sauce"]
  },
  {
    id: 3,
    name: 'Double Burger',
    description: 'Two juicy beef patties with cheese and fresh toppings.',
    price: 149,
    rating: 5,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOSaOybXw5TSWwWdBSUFmlYQFRi6KMFdrRHf4QLzgWnA&s=10',
      ingredients: ["2 Beef Patties", "Double Cheddar Cheese", "Red Onion", "Pickles", "Burger Sauce"]
  },
]


function App() {
  const [cart, setCart] = useState<Record<number, number>>({})
  const [favorites, setFavorites] = useState<Record<number, boolean>>({}) 
  const [selectedBurger, setSelectedBurger] = useState<Burger | null>(null)

  const addToCart = (id: number) => {
    setCart((current) => ({
      ...current,
      [id]: (current[id] || 0) + 1,
    }))
  }
  const toggleFavorite = (id: number) => {
  setFavorites((current) => ({
    ...current,
    [id]: !current[id],
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
      <header className="navbar">
        <div className="logo">
          <img
            className="logo-icon"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9PlYPTlJob_5lw6-zmzwTvv-t9iWB0klHK87OKFTZyA&s=10"
            alt="Burger logo"
          />
        </div>

        <nav>
          <a href="#">ABOUT</a>
          <a href="#">OUR MENU</a>
          <a href="#">SHOP</a>
          <a href="#">CONTACT</a>

          <button className="cart-button">
            🛒
            <span className="cart-badge">{totalItems}</span>
          </button>
        </nav>
      </header>

      <main>
        <section className="hero-section">
          <h2>OUR CRAZY BURGER</h2>
          <p className="hero-description">
            Get ready for a wild ride of flavors! Our crazy burgers are loaded
            with juicy patties, bold toppings, and irresistible sauces, all
            stacked on a perfectly toasted bun. Whether you like it cheesy or
            extra meaty, we've got a burger that will blow your mind!
          </p>
        </section>

        <section className="menu-section">
          <h2>Our Popular Burgers</h2>

          <div className="burger-grid">
            {burgers.map((burger) => {
              const quantity = cart[burger.id] || 0
              return (
              <div
                className="burger-card"
                key={burger.id}
                onClick={() => setSelectedBurger(burger)}
                >
                  <div className="burger-image">
                    <img src={burger.image} alt={burger.name} />
                  </div>

                  
                  <div className="burger-card-header">
                    <div className="burger-rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={
                            burger.rating >= star
                              ? 'star full'
                              : burger.rating >= star - 0.5
                              ? 'star half'
                              : 'star empty'
                          }
                        >
                          ★
                        </span>
                      ))}
                    </div>

                   <button
                    className="favorite-button"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(burger.id)
                    }}
                      >
                    {favorites[burger.id] ? '♥' : '♡'}
                    </button>
                  </div>  

                  <h3>{burger.name}</h3>

                  <p>{burger.description}</p>

                  <strong>₱{burger.price}</strong>

                  {quantity === 0 ? (
  <button
    onClick={(e) => {
      e.stopPropagation()
      addToCart(burger.id)
    }}
  >
    Add to Cart
  </button>
) : (
  <div className="quantity-controls">
    <button
      onClick={(e) => {
        e.stopPropagation()
        removeFromCart(burger.id)
      }}
    >
      −
    </button>

    <span>{quantity}</span>

    <button
      onClick={(e) => {
        e.stopPropagation()
        addToCart(burger.id)
      }}
    >
      +
    </button>
  </div>
)}
                </div>
              )
            })}
          </div>
        </section>
                {selectedBurger && (
          <div
            className="burger-modal"
            onClick={() => setSelectedBurger(null)}
          >
            <div
              className="burger-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="close-modal"
                onClick={() => setSelectedBurger(null)}
              >
                ×
              </button>

              <img
                src={selectedBurger.image}
                alt={selectedBurger.name}
              />

              <h2>{selectedBurger.name}</h2>

              <div className="burger-rating">
                ⭐ {selectedBurger.rating}
              </div>

              <p>{selectedBurger.description}</p>
              {/* Ingredients tag list */}
              <div className="modal-ingredients">
                <h4>Ingredients:</h4>
                <div className="ingredient-tags">
                  {selectedBurger.ingredients?.map((item, index) => (
                    <span key={index} className="ingredient-tag">{item}</span>
                  ))}
                </div>
              </div>

              <strong>₱{selectedBurger.price}</strong>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App