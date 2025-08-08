import React from 'react';
import useFetch from './useFetch'; 

const App = () => {
  const { data: products, loading, error } = useFetch(
    'https://api.escuelajs.co/api/v1/products'
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 p-8 font-inter">
      

      <div className="container mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">
          Product Catalog 🛒
        </h1>

        {loading && (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-500"></div>
            <p className="ml-4 text-gray-600 text-lg">Loading products...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center" role="alert">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error.message}. Please try again later.</span>
          </div>
        )}

        {!loading && !error && products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, 20).map((product) => (
              <div
                key={product.id}
                className="bg-gray-50 p-4 rounded-lg shadow-md flex flex-col items-center text-center transition-transform transform hover:scale-105"
              >
                <img
                  src={product.images[0] || 'https://placehold.co/150x150/E0E7FF/5C6BC0?text=No+Image'}
                  alt={product.title}
                  className="w-full h-32 object-cover rounded-md mb-3"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/150x150/E0E7FF/5C6BC0?text=No+Image';
                  }}
                />
                <h2 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
                  {product.title}
                </h2>
                <p className="text-indigo-600 font-bold">${product.price}</p>
              </div>
            ))}
          </div>
        ) : (
          !loading && !error && <p className="text-center text-gray-600 text-lg mt-8">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default App;