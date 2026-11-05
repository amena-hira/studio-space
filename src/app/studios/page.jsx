import FeatureCard from '@/components/common/featureCard';
import StudiosBanner from '@/components/studios/studios-banner';
import EmptyState from '@/components/common/empty-state';
import { SearchX } from 'lucide-react';
import React from 'react';

const apiUrl = process.env.BACKEND_URL;

export const dynamic = 'force-dynamic';

const StudiosPage = async () => {
    let studios = [];
    if (apiUrl) {
        try {
            const response = await fetch(`${apiUrl}/studios`, { cache: 'no-store' });
            if (response.ok) studios = await response.json();
        } catch {
            studios = [];
        }
    }

    const hasStudios = Array.isArray(studios) && studios.length > 0;

    return (
        <section>
            <StudiosBanner />
            <div className="bg-background px-4 py-8 sm:px-8 lg:px-10">
                <div className="mx-auto grid max-w-7xl">

                    {hasStudios ? (
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                            {studios.map((studio) => <FeatureCard key={studio._id} studio={studio} variant="studio" />)}
                        </div>
                    ) : (
                        <EmptyState
                            icon={SearchX}
                            title="No studios found"
                            description="We couldn't find a creative space matching your search. Try another search or return home."
                            actionLabel="Return to Home"
                            actionHref="/"
                        />
                    )}
                </div>
            </div>

        </section>
    );
};

export default StudiosPage;
