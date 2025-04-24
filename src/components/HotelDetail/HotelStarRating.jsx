export const HotelStarRating = ({ rating }) => {
    const displayRating = rating !== null ? rating : 3; // Default to 3 if undefined
    const fullStars = Math.floor(displayRating);
    const hasHalfStar = displayRating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const validFullStars = Math.max(0, Math.min(5, fullStars));
    const validEmptyStars = Math.max(0, Math.min(5, emptyStars));

    return (
        <div className="flex items-center">
            {Array.from({ length: validFullStars }).map((_, index) => (
                <span key={`full-${index}`} className="text-yellow-500 text-lg">★</span>
            ))}
            {hasHalfStar && validFullStars + validEmptyStars < 5 && (
                <span
                    className="text-lg"
                    style={{
                        background: 'linear-gradient(90deg, #FBBF24 50%, #E5E7EB 50%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    ★
                </span>
            )}
            {Array.from({ length: validEmptyStars }).map((_, index) => (
                <span key={`empty-${index}`} className="text-gray-300 text-lg">★</span>
            ))}
        </div>
    );
};
