import FeatureCard from '@/components/common/featureCard';
import StudiosBanner from '@/components/studios/studios-banner';
import React from 'react';

const apiUrl = process.env.BACKEND_URL;

const StudiosPage = async () => {
    let studios = [];
    if (apiUrl) {
        try {
            const response = await fetch(`${apiUrl}/studios`);
            if (response.ok) studios = await response.json();
        } catch {
            studios = [];
        }
    }

    if (!Array.isArray(studios) || studios.length === 0) return null;

    return (
        <section>
            <StudiosBanner />
            <div className="bg-background px-4 py-8 sm:px-8 lg:px-10">
                <div className="mx-auto grid max-w-7xl">

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {studios.slice(0, 12).map((studio) => <FeatureCard key={studio._id} studio={studio} variant="studio" />)}
                    </div>
                </div>
            </div>

        </section>
    );
};

export default StudiosPage;