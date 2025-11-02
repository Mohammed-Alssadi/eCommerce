import React, { } from 'react'
import CategoryCard from '../components/CategoryCard'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react';
import CategoryCardSkeleton from '../components/CategoryCardSkeleton';
function AllCategories() {
    const categories = useSelector(state => state.category.items);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        const taimer = setTimeout(() => {
            setLoading(false)
        }, 1000);
        return () => clearTimeout(taimer);
    }, []);


    if (categories.length === 0) {
        return (
            <div className="container mx-auto px-4 py-24 text-center">
                <h1 className="text-2xl font-bold text-red-500 mb-4">404!</h1>
                <p className="text-gray-600">Page Not Found.</p>
                <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
                    Return to Home
                </Link>
            </div>
        );
    }


    return (

        <div className="min-h-[60vh]">


            <h1 className='my-4 text-3xl font-semibold text-gray-800 '> All Category</h1>



            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 gap-4">
                    {categories.map((cat) => {
                        return <CategoryCardSkeleton key={cat.id} />
                    })}
                </div>

            ) : (

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 gap-8">
                    {categories.map((cat) => {
                        return <CategoryCard key={cat.id} category={cat} />

                    })}

                </div>

            )}






        </div>



    )
}

export default AllCategories