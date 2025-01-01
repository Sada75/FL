import React from 'react';

const Chatbox = () => {
    return (
        <iframe
            src="http://localhost:8501" // Ensure this matches the URL where Streamlit is hosted
            title="Healthcare AI Assistant"
            style={{
                width: '100%',
                height: '100vh', // Use full viewport height for better UI
                border: 'none',
            }}
        ></iframe>
    );
};

export default Chatbox;
