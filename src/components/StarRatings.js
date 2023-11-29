import { useState } from "react";
import { Star } from "./Star";

const containerStyle = {
    display: 'flex',
    gap: '16px',
    alignItems: 'center'
}

const starContainerStyle = {
    display: 'flex'
}

export const StarRatings = ({ maxRatings = 5,
    color = '#fcc419',
    size = 48,
    defaultRating = 0,
    onSetRatings = (ratings) => console.log(ratings) }) => {
    const [ratings, setRatings] = useState(defaultRating);
    const [tempRatings, setTempRatings] = useState(0);
    const handleRating = (ratings) => {
        setRatings(ratings);
        onSetRatings(ratings);
    }

    const textStyle = {
        lineHeight: '1',
        margin: '0',
        color: color,
        fontSize: `${size / 1.5}px`
    }

    return (
        <div style={containerStyle}>
            <div style={starContainerStyle}>
                {Array.from({ length: maxRatings }, (_, i) =>
                    <Star key={i}
                        onRate={() => handleRating(i + 1)}
                        full={tempRatings ? tempRatings >= i + 1 : ratings >= i + 1}
                        onHoverIn={() => setTempRatings(i + 1)}
                        onHoverOut={() => setTempRatings(0)}
                        color={color}
                        size={size}
                    />
                )}
            </div>
            <p style={textStyle}>{tempRatings || ratings || ''}</p>
        </div>
    );
}