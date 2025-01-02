import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Menu from '../components/Menu';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`/api/products/${id}`);
            setProducts(products.filter(product => product._id !== id));
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
            <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            <Menu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            <main className={`container mx-auto p-6 mt-16 transition-all duration-300 ${isMenuOpen ? 'ml-64' : ''}`}>
                <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                    Lista de Productos
                </h1>
                <div className="mt-8">
                    <Link to="/create-product" className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium rounded-lg hover:opacity-90 transition">
                        Crear Producto
                    </Link>
                </div>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map(product => (
                        <div key={product._id} className="rounded-lg shadow-lg bg-gray-800 p-4">
                            <Link to={`/product/${product._id}`}>
                                <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-lg" />
                            </Link>
                            <h2 className="text-xl font-semibold text-purple-400 mt-4">{product.name}</h2>
                            <p className="text-gray-400 text-sm">{product.description}</p>
                            <p className="text-lg font-bold text-indigo-400 mt-2">${product.price}</p>
                            <div className="mt-4 flex justify-between items-center">
                                <Link to={`/edit-product/${product._id}`} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium rounded-lg hover:opacity-90 transition">
                                    Editar
                                </Link>
                                <button onClick={() => deleteProduct(product._id)} className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:opacity-90 transition">
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default ProductList;