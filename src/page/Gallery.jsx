import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Facebook, Youtube } from 'lucide-react';


const Gallery = () => {
    const [galleryData, setGalleryData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [footerData, setFooterData] = useState({});

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        const fetchGalleryData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/gallery/gallery`);
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


    const fetchFooterData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/land/footer`);
            setFooterData(response.data);
        } catch (error) {
            console.error(`Error fetching footer data:`, error);
        }
    };

    useEffect(() => {
        fetchFooterData();
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
        <div>
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
            <footer className="footer-section" style={{ backgroundColor: 'rgba(158, 204, 243, 1)' }}>
                <div className="footer-content" style={{ backgroundColor: 'rgba(158, 204 , 243, 1)' }}>
                    <h3 className="footer-text">{footerData.title}</h3>
                    <div className="mt-4 pt-4 border-top border-white text-white-100"></div>
                     <h3 className="footer-reference" style={{fontWeight:'bold', color:'white', fontSize:'1.2rem'}}>{footerData.address}</h3>
                    <Youtube size={32} className="mt-3" style={{ cursor: 'pointer', color: 'red' }} onClick={() => window.open('https://www.youtube.com/shorts/0VEV5nsJve0', '_blank')} />
                    <Facebook size={32} className="mt-3 ms-3" style={{ cursor: 'pointer', color: 'blue' }} onClick={() => window.open('https://www.facebook.com/thooyaarockiya.annaichurch/', '_blank')} />
                </div>
            </footer>
        </div>
    );
};

export default Gallery;