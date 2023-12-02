export function WithFallback({
    children,
    criteria,
    fallback,
}: {
    children: React.ReactNode;
    criteria: boolean;
    fallback: React.ReactNode;
}) {
    return <>{criteria ? children : fallback}</>;
}
