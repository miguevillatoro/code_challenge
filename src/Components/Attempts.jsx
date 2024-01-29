import React from 'react';

const Attempts = ({ attempts }) => {
    return (
        <div>
        {attempts.map((attempt, index) => (
            <p key={index}>
            Intento {index + 1}
            </p>
        ))}
        </div>
    );
};

export default Attempts;
