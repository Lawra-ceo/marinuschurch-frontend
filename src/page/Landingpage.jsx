import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Facebook, X, Youtube } from 'lucide-react';

const Landingpage = () => {
    const API_BASE_URL = "https://church-backend-qk9s.onrender.com/land";


    const [heroData, setHeroData] = useState({ backgroundImages: [] }); // Initialize with empty array
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // Image Slider state
    const [readmoreData, setReadmoreData] = useState(null);
    const [eventData, setEventData] = useState({});
    const [vasagamData, setVasagamData] = useState({});
    const [foundationData, setFoundationData] = useState({});
    const [priestsData, setPriestsData] = useState([]);
    const [bibleData, setBibleData] = useState({});
    const [anbiyamData, setAnbiyamData] = useState({});
    const [prayeventData, setPrayeventData] = useState({});
    const [contactData, setContactData] = useState({});
    const [footerData, setFooterData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [eventShowModal, setEventShowModal] = useState(false);

    const navigate = useNavigate();

    const fetchSectionData = async (section, setData) => {
        try {
            const res = await axios.get(`${API_BASE_URL}/${section}`);
            const apiData = res.data.data || res.data;
            if (section === 'readmore') {
                const parsedContent = JSON.parse(apiData.content);
                setData({ title: apiData.title, ...parsedContent });
            } else {
                setData(apiData);
            }
        } catch (error) {
            console.error(`Error fetching ${section} data:`, error);
        }
    };

    useEffect(() => {
        const fetchAllData = async () => {
            await fetchSectionData('hero', setHeroData);
            await fetchSectionData('readmore', setReadmoreData);
            await fetchSectionData('event', setEventData);
            await fetchSectionData('vasagam', setVasagamData);
            await fetchSectionData('foundation', setFoundationData);
            await fetchSectionData('priests', setPriestsData);
            await fetchSectionData('bible', setBibleData);
            await fetchSectionData('anbiyam', setAnbiyamData);
            await fetchSectionData('prayevent', setPrayeventData);
            await fetchSectionData('contact', setContactData);
            await fetchSectionData('footer', setFooterData);
        };
        fetchAllData();
    }, []);

    // --- Image Slider Logic ---
    useEffect(() => {
        if (heroData.backgroundImages && heroData.backgroundImages.length > 0) {
            const interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) =>
                    (prevIndex + 1) % heroData.backgroundImages.length
                );
            }, 5000); // 5 seconds change

            return () => clearInterval(interval);
        }
    }, [heroData.backgroundImages]);

    const openDirectionsInGoogleMaps = () => {
        const lat = 9.472273095423537;
        const lng = 77.77304005024683;

        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

        window.open(googleMapsUrl, '_blank');
    };
    // --- Animation Hooks ---
    const [refTop, inViewTop] = useInView({ triggerOnce: true });
    const [ref3, inView3] = useInView({ triggerOnce: true });
    const [ref4, inView4] = useInView({ triggerOnce: true });
    const [ref5, inView5] = useInView({ triggerOnce: true });
    const [ref6, inView6] = useInView({ triggerOnce: true });
    const [refVasagam, inViewVasagam] = useInView({ triggerOnce: true, threshold: 0.2 });

    const animLeftText = useSpring({
        opacity: inViewVasagam ? 1 : 0,
        transform: inViewVasagam ? 'translateX(0)' : 'translateX(-100px)',
        config: { duration: 800 }
    });

    const animRightImg = useSpring({
        opacity: inViewVasagam ? 1 : 0,
        transform: inViewVasagam ? 'translateX(0)' : 'translateX(150px)', // வலது பக்கத்திலிருந்து வரும்
        config: { duration: 1000 }
    });
    const animLeft = useSpring({ opacity: inViewTop ? 1 : 0, transform: inViewTop ? 'translateX(0)' : 'translateX(-50px)' });
    const animRight = useSpring({ opacity: inViewTop ? 1 : 0, transform: inViewTop ? 'translateX(0)' : 'translateX(50px)' });
    const animPriest = useSpring({ opacity: inView3 ? 1 : 0, transform: inView3 ? 'translateY(0)' : 'translateY(50px)' });
    const animBible = useSpring({ opacity: inView4 ? 1 : 0, transform: inView4 ? 'translateY(0)' : 'translateY(50px)' });
    const animAnbiyam = useSpring({ opacity: inView5 ? 1 : 0, transform: inView5 ? 'translateY(0)' : 'translateY(50px)' });
    const animContact = useSpring({ opacity: inView6 ? 1 : 0, transform: inView6 ? 'translateY(0)' : 'translateY(50px)' });

    return (
        <div className="landing-page-wrapper">
            {/* Hero Section */}
            <section className="main-header-area py-4" ref={refTop}>
                <Container fluid className="px-md-5">
                    <Row className="g-4 align-items-stretch">

                        {/* LEFT SIDE: HERO SECTION WITH SLIDER */}
                        <Col lg={9}>
                            <animated.div
                                style={{
                                    ...animLeft,
                                    backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${heroData.backgroundImages?.[currentImageIndex] || '/images/placeholder.jpg'})`
                                }}
                                className="hero-box-left"
                            >

                            </animated.div>
                        </Col>

                        {/* RIGHT SIDE: ANNOUNCEMENT */}
                        <Col lg={3}>
                            <animated.div style={animRight} className="announcement-box-right">
                                <div className="announcement-header">
                                    <h3>Announcement</h3>
                                </div>
                                <div className="announcement-body">
                                    <h4 className="event-title-small">{eventData.title}</h4>
                                    <p className="event-meta">📅 {eventData.datetime}</p>
                                    <p className="event-meta">📍 {eventData.location}</p>
                                    <button className="details-link-btn" onClick={() => setEventShowModal(true)}>View Details</button>
                                </div>
                            </animated.div>
                        </Col>

                    </Row>
                </Container>
            </section>

            <section>
                <div className='readmore'>
                    <div className="hero-content">
                        <h1 className="hero-title">{heroData.title}</h1>
                        <p className="hero-description">{heroData.description}</p>
                        <button className="read-more-btn" onClick={() => setShowModal(true)}>Read More</button>
                    </div>
                </div>
            </section>

            <section id="vasagam" className="vasagam-section" ref={refVasagam}>
                <Container>
                    <Row className="align-items-center">
                        {/* இடது பக்கம்: எழுத்துக்கள் (Title, Description) */}
                        <Col md={7}>
                            <animated.div style={animLeftText} className="vasagam-content">
                                {/* டேட்டா சரியாக இருக்கிறதா என்று செக் செய்து காட்டவும் */}
                                <h2 className="vasagam-title">
                                    {vasagamData?.title || "இறைவனின் பேரன்பு (The Great Love)"}
                                </h2>
                                <p className="vasagam-description">
                                    {vasagamData?.description || "உலகத்தின் ஒளியாய் உதித்தவரே, உம் பாதம் சரணடைந்தோம்,\nஇருள் சூழ்ந்த வாழ்வில் இன்ப ஜோதியாய் வந்தவரே,\nதடுமாறும் வேளையில் தாங்கிப் பிடிக்கும் தயாளரே,\nமன்னிக்கத் தெரிந்த மாபெரும் தெய்வமே,\nஉம் அன்பினால் எம் இதயங்களை நிரப்பும்,\nஎன்றென்றும் உம் வழியில் எங்களை நடத்தும்."}
                                </p>
                                <p className='vasagam-reference' style={{ fontWeight: 'bold', color: '#2575fc' }}>
                                    {vasagamData?.reference || "— யோவான் 8:12, 1 யோவான் 4:16"}
                                </p>
                            </animated.div>
                        </Col>

                        {/* வலது பக்கம்: படம் */}
                        <Col md={5} className='text-center'>
                            <animated.div style={animRightImg} className="vasagam-img-container">
                                <img
                                    src={vasagamData.images || '/images/father.jpeg'}
                                    alt="Vasagam"
                                    className="vasagam-image"
                                />
                            </animated.div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Bible Section */}
            <animated.section id="bible" className="quote-section" ref={ref4} style={animBible}>
                <Container>
                    <Row className="align-items-center">
                        <Col md={6}><img src={bibleData.image} alt="Bible" className="side-img" /></Col>
                        <Col md={6} className="ps-md-5">
                            <p className="quote-text">"{bibleData.quote}"</p>
                            <p className="quote-reference">-{bibleData.reference}</p>
                        </Col>
                    </Row>
                </Container>
            </animated.section>

            {/* Anbiyam Section */}
            <animated.section id="anbiyams" className="anbiyam-section" ref={ref5} style={animAnbiyam}>
                <Container>
                    <Row className="align-items-center flex-md-row-reverse">
                        <Col md={6}><img src={anbiyamData.image} alt="Anbiyam" className="side-img" /></Col>
                        <Col md={6} className="pe-md-5">
                            <h2 className="section-title">{anbiyamData.title}</h2>
                            <p className="quote-text">{anbiyamData.quote}</p>
                            <button className="read-more-btn" onClick={() => navigate('/anbiyam')} >Know More</button>
                        </Col>
                    </Row>
                </Container>
            </animated.section>

            {/* Priests Section */}
            <animated.section id="priests" className="priests-section" ref={ref3} style={animPriest}>
                <Container>
                    <h2 className="section-title text-center">Our Priests</h2>
                    <Row className="justify-content-center mt-5">
                        {priestsData.priestsList?.map((priest) => (
                            <Col key={priest.id} md={4} className="mb-4">
                                <div className="priest-card">
                                    <div className="priest-image-wrapper">
                                        <img src={priest.image} alt={priest.nameTamil} className="priest-image" />
                                    </div>
                                    <h3 className="priest-name-tamil">{priest.nameTamil}</h3>
                                    <p className="priest-title-tamil">{priest.titleTamil}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </animated.section>

            {/* Contact Section */}
            <animated.section className="contact-cta-section" ref={ref6} style={{ ...animContact, backgroundImage: `linear-gradient(rgba(13, 71, 161, 0.8), rgba(0,0,0,0.8)), url(${contactData.backgroundImage})` }}>
                <Container className="text-center text-white">
                    <h2 className="mb-4">{contactData.title}</h2>
                    <button onClick={() => navigate('/contact')} className="read-more-btn">{contactData.contactbtn}</button>
                </Container>
            </animated.section>

            {/* Footer */}
            <footer className="footer-section" style={{ backgroundColor: 'rgba(158, 204, 243, 1)' }}>
                <Container className="footer-content" style={{ backgroundColor: 'rgba(158, 204 , 243, 1)' }}>
                    <h3 className="footer-text">{footerData.title}</h3>
                    <p className="footer-reference">{footerData.address}</p>
                    <button className="map-link-btn" style={{ backgroundColor: 'blueviolet' }} onClick={openDirectionsInGoogleMaps}>Open in Google Maps</button>
                    <div className="mt-4 pt-4 border-top border-white text-white-100">© 2024 Church. All rights reserved.</div>
                    <Youtube size={32} className="mt-3" style={{ cursor: 'pointer', color: 'red' }} onClick={() => window.open('https://www.youtube.com/shorts/0VEV5nsJve0', '_blank')} />
                    <Facebook size={32} className="mt-3 ms-3" style={{ cursor: 'pointer', color: 'blue' }} onClick={() => window.open('https://www.facebook.com/thooyaarockiya.annaichurch/', '_blank')} />
                </Container>
            </footer>

            {/* Modals */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button onClick={() => setShowModal(false)} className="modal-close-btn"><X size={24} /></button>
                        <h2 className="modal-title">{readmoreData?.title}</h2>
                        <p className="modal-text">{readmoreData?.introduction}</p>
                        {readmoreData?.history?.paragraphs.map((p, i) => <p key={i} className="modal-text">{p}</p>)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Landingpage;