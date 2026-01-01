import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const API_BASE_URL = 'https://church-backend-qk9s.onrender.com/anbiyam';

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
            const response = await axios.get(`${API_BASE_URL}/anbiyampage`);
            setAnbiyamPageData(response.data);
        } catch (error) {
            console.error(`Error fetching Anbiyam data:`, error);
        }
    };

    const fetchFooterData = async () => {
        try {
            const response = await axios.get('https://church-backend-qk9s.onrender.com/land/footer');
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

                <footer className="footer-section">
                    <Container>
                        <Row className="justify-content-center text-center">
                            <Col md={10}>
                                <h3 className="footer-text">{footerData.title}</h3>
                                <p className='footer-reference'>{footerData.address}</p>
                            </Col>
                        </Row>
                    </Container>
                </footer>
            </div>
        </>
    );
};

export default Anbiyam;
