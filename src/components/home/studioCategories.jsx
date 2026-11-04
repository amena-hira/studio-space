import React from 'react';
import StudioCard from '../common/studioCard';

const apiUrl = process.env.BACKEND_URL;

const StudioCategories = async () => {
    let categories = []
    if (apiUrl) {
        try {
            const response = await fetch(`${apiUrl}/categories`);
            if (response.ok) categories = await response.json();
        } catch {
            categories = [];
        }
    }

    if (!Array.isArray(categories) || categories.length === 0) {
        return null;
    }
    return (
        <section className="bg-background sm:px-8 sm:py-5 lg:px-10">
            <div className='mx-auto max-w-7xl pt-14 px-2 lg:pt-0 md:px-0'>
                <h2 className="mb-10 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
                    Browse by <span className="text-primary">Studio Categories</span>
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                    {
                        categories.map((category) => (
                            <StudioCard key={category._id} category={category} />
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

export default StudioCategories;