import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

const FeatureSkeleton = () => {
    return (
        <section className="bg-background px-4 py-12 sm:px-8 sm:py-16 lg:px-10">
            <div className="mx-auto max-w-[1900px]">
                <Skeleton className="h-9 w-64" />
                <Skeleton className="mt-3 h-5 w-96 max-w-full" />
                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="overflow-hidden rounded-2xl border border-border bg-card p-4">
                            <Skeleton className="aspect-[1.14/1] w-full" />
                            <Skeleton className="mt-4 h-5 w-4/5" />
                            <Skeleton className="mt-3 h-4 w-3/5" />
                            <Skeleton className="mt-4 h-7 w-2/5" />
                            <Skeleton className="mt-4 h-10 w-full rounded-full" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureSkeleton;