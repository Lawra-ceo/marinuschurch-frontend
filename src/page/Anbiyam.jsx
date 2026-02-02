import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Facebook,  Youtube } from 'lucide-react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Anbiyam = () => {
    // State to hold the hero and list data from the API
    const [anbiyamPageData, setAnbiyamPageData] = useState({
        heroSection: {},
        anbiyamsListSection: []
    });
    const [footerData, setFooterData] = useState({});

    // State for the popup modal
    const [showModal, setShowModal] = useState(false);
    const [selectedAnbiyam, setSelectedAnbiyam] = useState(null);

    const fetchSectionData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/anbiyam/anbiyampage`);
            setAnbiyamPageData(response.data);
        } catch (error) {
            console.error(`Error fetching Anbiyam data:`, error);
        }
    };

    const fetchFooterData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/land/footer`);
            setFooterData(response.data);
        } catch (error) {
            console.error(`Error fetching footer data:`, error);
        }
    };
    
    useEffect(() => {
        fetchSectionData();
        fetchFooterData();
    }, []);

    const handleReadMoreClick = (anbiyam) => {
        setSelectedAnbiyam(anbiyam);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedAnbiyam(null);
    };

    return (
        <>
            <div>
                {/* Hero Section */}
                <div className="anbiyams-container">
                    <div className="anbiyams-content">
                        <h1>{anbiyamPageData.heroSection.title}</h1>
                        <p>{anbiyamPageData.heroSection.description}</p>
                    </div>
                </div>

                {/* Anbiyams List Section */}
                <div className="anbiyam-gallery-section container-fluid py-2">
                    <div className="container">
                        <div className="row justify-content-center">
                            {anbiyamPageData.anbiyamsListSection && anbiyamPageData.anbiyamsListSection.map((anbiyam) => (
                                <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center" key={anbiyam.id}>
                                    <div className="anbiyam-card">
                                        <div className="card-image-wrapper">
                                            <img src={anbiyam.imageSrc} alt={anbiyam.title} className="img-fluid card-image" />
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">{anbiyam.title}</h5>
                                            <button className="read-more-link" onClick={() => handleReadMoreClick(anbiyam)}>
                                                {anbiyam.link}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Popup Modal */}
                {showModal && selectedAnbiyam && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <button className="modal-close-btn" onClick={handleCloseModal}>
                                &times;
                            </button>
                            <h2 className="modal-title">{selectedAnbiyam.head}</h2>
                            <p className="modal-description">{selectedAnbiyam.content}</p>
                        </div>
                    </div>
                )}

                 <footer className="footer-section" style={{ backgroundColor: 'rgba(158, 204, 243, 1)' }}>
                <Container className="footer-content" style={{ backgroundColor: 'rgba(158, 204 , 243, 1)' }}>
                    <h3 className="footer-text">{footerData.title}</h3>
                    <div className="mt-4 pt-4 border-top border-white text-white-100"></div>
                    <h3 className="footer-reference" style={{fontWeight:'bold',color:'white', fontSize:'1.2rem'}}>{footerData.address}</h3>
                    <Youtube size={32} className="mt-3" style={{ cursor: 'pointer', color: 'red' }} onClick={() => window.open('https://www.youtube.com/shorts/0VEV5nsJve0', '_blank')} />
                    <Facebook size={32} className="mt-3 ms-3" style={{ cursor: 'pointer', color: 'blue' }} onClick={() => window.open('https://www.facebook.com/thooyaarockiya.annaichurch/', '_blank')} />
                </Container>
            </footer>
            </div>
        </>
    );
};

export default Anbiyam;
