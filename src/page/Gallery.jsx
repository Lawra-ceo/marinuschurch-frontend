import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Gallery = () => {
    const [galleryData, setGalleryData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGalleryData = async () => {
            try {
                const response = await axios.get('https://church-backend-qk9s.onrender.com/gallery/gallery');
                setGalleryData(response.data); // Store the entire object
            } catch (err) {
                setError("Failed to fetch gallery data.");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchGalleryData();
    }, []);

    if (isLoading) {
        return <div className="loading-message">Loading gallery...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!galleryData || !galleryData.photos || galleryData.photos.length === 0) {
        return <div className="no-data-message">No photos to display.</div>;
    }

    return (
        <section className="gallery-section">
            <h2 className="gallery-title">{galleryData.title}</h2>
            <div className="gallery-grid">
                {galleryData.photos.map((photo, index) => (
                    <div className="gallery-item" key={index}>
                        <img className="gallery-image" src={photo.url} alt={photo.alt || `Gallery image ${index + 1}`} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Gallery;