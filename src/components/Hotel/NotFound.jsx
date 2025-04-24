import React from 'react';

function NotFound() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center bg-white p-8 rounded-lg shadow-xl">
                <h1 className="text-4xl font-bold text-gray-700">404</h1>
                <h2 className="text-3xl font-semibold text-gray-700 mt-4">Page Not Found</h2>

                <button
                    className="mt-6 px-6 py-2 bg-sky-500 text-white rounded-md hover:bg-blue-600"
                    onClick={(e) => {
                        e.preventDefault(); 
                        window.location.href = '/'; 
                    }}
                >
                    Go Back Home
                </button>

            </div>
        </div>
    );
}

export default NotFound;
