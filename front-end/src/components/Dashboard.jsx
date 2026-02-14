import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [cart, setCart] = useState([]);
    const [selectedCoffee, setSelectedCoffee] = useState(null); // For modal

    const handleLogout = () => {
        navigate('/login');
    };

    const categories = ['All', 'Hot Coffee', 'Cold Coffee', 'Desserts'];

    const coffees = [
        {
            id: 1,
            name: 'Cappuccino',
            price: '₱145.00',
            category: 'Hot Coffee',
            description: 'A classic Italian coffee drink that is traditionally prepared with equal parts double espresso, steamed milk, and steamed milk foam on top.',
            ingredients: ['Espresso', 'Steamed Milk', 'Milk Foam']
        },
        {
            id: 2,
            name: 'Latte',
            price: '₱135.00',
            category: 'Hot Coffee',
            description: 'A coffee drink of Italian origin made with espresso and steamed milk.',
            ingredients: ['Espresso', 'Steamed Milk', 'Light Layer of Foam']
        },
        {
            id: 3,
            name: 'Espresso',
            price: '₱110.00',
            category: 'Hot Coffee',
            description: 'A full-flavored, concentrated form of coffee that is served in "shots".',
            ingredients: ['Finely Ground Coffee Beans', 'Hot Water']
        },
        {
            id: 4,
            name: 'Mocha',
            price: '₱155.00',
            category: 'Hot Coffee',
            description: 'A chocolate-flavoured variant of a caffè latte.',
            ingredients: ['Espresso', 'Chocolate Syrup', 'Steamed Milk', 'Whipped Cream']
        },
        {
            id: 5,
            name: 'Iced Latte',
            price: '₱140.00',
            category: 'Cold Coffee',
            description: 'A latte served over ice, perfect for a hot day.',
            ingredients: ['Espresso', 'Cold Milk', 'Ice Cubes', 'Sweetener (Optional)']
        },
        {
            id: 6,
            name: 'Frappuccino',
            price: '₱175.00',
            category: 'Cold Coffee',
            description: 'A trademarked brand of the Starbucks Corporation for a line of highly-sweetened, iced, blended coffee drinks.',
            ingredients: ['Coffee or Creme Base', 'Blended Ice', 'Syrups', 'Whipped Cream']
        },
        {
            id: 7,
            name: 'Coffee Cake',
            price: '₱120.00',
            category: 'Desserts',
            description: 'A moist, tender cake typically flavored with cinnamon and topped with a crumb streusel.',
            ingredients: ['Flour', 'Sugar', 'Butter', 'Cinnamon', 'Sour Cream']
        },
        {
            id: 8,
            name: 'Croissant',
            price: '₱85.00',
            category: 'Desserts',
            description: 'A buttery, flaky, viennoiserie pastry of Austrian origin.',
            ingredients: ['Flour', 'Butter', 'Yeast', 'Sugar', 'Milk']
        },
    ];

    const parsePrice = (priceStr) => {
        return parseFloat(priceStr.replace('₱', ''));
    };

    const addToCart = (coffee) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === coffee.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === coffee.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...coffee, quantity: 1, priceValue: parsePrice(coffee.price) }];
        });
    };

    const removeFromCart = (coffeeId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== coffeeId));
    };

    const updateQuantity = (coffeeId, delta) => {
        setCart(prevCart => {
            return prevCart.map(item => {
                if (item.id === coffeeId) {
                    const newQuantity = item.quantity + delta;
                    return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
                }
                return item;
            });
        });
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.priceValue * item.quantity), 0).toFixed(2);
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        alert(`Order placed successfully! Total: ₱${calculateTotal()}`);
        setCart([]);
    };

    const filteredCoffees = selectedCategory === 'All'
        ? coffees
        : coffees.filter(coffee => coffee.category === selectedCategory);

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Coffee App</h1>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </header>

            <div className="dashboard-layout">
                {/* Sidebar */}
                <aside className="sidebar">
                    <h3>Menu</h3>
                    <ul>
                        {categories.map(category => (
                            <li
                                key={category}
                                className={`sidebar-item ${selectedCategory === category ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Main Content */}
                <main className="dashboard-main">
                    <h2>{selectedCategory} Menu</h2>
                    <div className="coffee-grid">
                        {filteredCoffees.map(coffee => (
                            <div key={coffee.id} className="coffee-card">
                                <h3>{coffee.name}</h3>
                                <p className="category-label">{coffee.category}</p>
                                <p className="price">{coffee.price}</p>
                                <div className="card-actions">
                                    <button className="details-btn" onClick={() => setSelectedCoffee(coffee)}>
                                        View Details
                                    </button>
                                    <button className="add-to-cart-btn" onClick={() => addToCart(coffee)}>
                                        Add to Order
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>

                {/* Order Panel */}
                <aside className="order-panel">
                    <h3>Your Order</h3>
                    <div className="cart-items">
                        {cart.length === 0 ? (
                            <p className="empty-cart">No items added yet.</p>
                        ) : (
                            cart.map(item => (
                                <div key={item.id} className="cart-item">
                                    <div className="cart-item-info">
                                        <h4>{item.name}</h4>
                                        <p>₱{(item.priceValue * item.quantity).toFixed(2)}</p>
                                    </div>
                                    <div className="cart-item-controls">
                                        <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                        <button className="remove-btn" onClick={() => removeFromCart(item.id)}>&times;</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    {cart.length > 0 && (
                        <div className="order-summary">
                            <div className="total-row">
                                <span>Total:</span>
                                <span className="total-price">₱{calculateTotal()}</span>
                            </div>
                            <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
                        </div>
                    )}
                </aside>
            </div>

            {/* Product Detail Modal */}
            {selectedCoffee && (
                <div className="modal-overlay" onClick={() => setSelectedCoffee(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setSelectedCoffee(null)}>&times;</button>
                        <h2>{selectedCoffee.name}</h2>
                        <span className="category-label">{selectedCoffee.category}</span>
                        <p className="modal-description">{selectedCoffee.description}</p>

                        <div className="modal-ingredients">
                            <h4>Ingredients:</h4>
                            <ul>
                                {selectedCoffee.ingredients.map((ing, index) => (
                                    <li key={index}>{ing}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="modal-footer">
                            <span className="price">{selectedCoffee.price}</span>
                            <button className="add-to-cart-btn" onClick={() => {
                                addToCart(selectedCoffee);
                                setSelectedCoffee(null);
                            }}>
                                Add to Order
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
