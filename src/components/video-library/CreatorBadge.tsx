import Image from "next/image";

export function CreatorBadge({ creator, large }: { creator: string | any, large?: boolean }) {
    return (
        <div className="flex items-center gap-space-3">
            {creator.image && (
                <Image
                    src={creator.image}
                    alt={creator.name}
                    width={large ? 54 : 40}
                    height={large ? 54 : 40}
                    className="rounded-full object-cover"
                />
            )}

            <div className="flex flex-col">
                <span className="text-body-sm font-semibold text-text-primary">
                    {creator.name}
                </span>

                {creator.role && (
                    <span className="text-body-xs text-text-secondary">{creator.role}</span>
                )}
            </div>
        </div>
    );
}
