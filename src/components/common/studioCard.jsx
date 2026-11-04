
import {
    Card,
    CardHeader
} from "@/components/ui/card"
import Image from "next/image";
import {
    Camera,
    Clapperboard,
    MicVocal,
    Music2,
    Palette,
} from "lucide-react";

const categoryIcons = {
    camera: Camera,
    clapperboard: Clapperboard,
    mic: MicVocal,
    music: Music2,
    palette: Palette,
};

const StudioCard = ({ category }) => {
    const Icon = categoryIcons[category.icon] || Camera;
    return (
        <Card className="relative mx-auto w-full max-w-sm pt-0">
            <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
            <Image
                src={category.image}
                width={600}
                height={400}
                alt="Event cover"
                className="relative z-20 aspect-video w-full object-cover"
            />
            <CardHeader>
                <div className="flex gap-4 items-center">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-muted">
                        <Icon className="size-7 text-purple-500 dark:text-purple-400" />
                    </div>
                    <h2 className="text-xl">{category?.name}</h2>
                </div>
            </CardHeader>
        </Card>
    );
};

export default StudioCard;