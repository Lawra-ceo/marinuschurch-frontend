import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Facebook, X, Youtube } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {  Autoplay } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { Modal } from 'react-bootstrap';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const Landingpage = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const [heroData, setHeroData] = useState({ backgroundImages: [] });
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [readmoreData, setReadmoreData] = useState(null);
    const [eventData, setEventData] = useState({});
    const [vasagamData, setVasagamData] = useState({});
    const [priestsData, setPriestsData] = useState([]);
    const [bibleData, setBibleData] = useState({});
    const [anbiyamData, setAnbiyamData] = useState({});
    const [contactData, setContactData] = useState({});
    const [footerData, setFooterData] = useState({});
    const [showEventModal, setShowEventModal] = useState(false); 
    const [showReadMoreModal, setShowReadMoreModal] = useState(false); 
    const [activeEvent, setActiveEvent] = useState(null);
    const [selectedImg, setSelectedImg] = useState(null);

    const navigate = useNavigate();

    const fetchSectionData = async (section, setData) => {
        try {
            const res = await axios.get(`${API_BASE_URL}/land/${section}`);
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
            await fetchSectionData('priests', setPriestsData);
            await fetchSectionData('bible', setBibleData);
            await fetchSectionData('anbiyam', setAnbiyamData);
            await fetchSectionData('contact', setContactData);
            await fetchSectionData('footer', setFooterData);
        };
        fetchAllData();
    }, []);

    useEffect(() => {
        if (heroData.backgroundImages?.length > 0) {
            const interval = setInterval(() => {
                setCurrentImageIndex((prev) => (prev + 1) % heroData.backgroundImages.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [heroData.backgroundImages]);

    const openDirectionsInGoogleMaps = () => {
        window.open(`https://www.google.com/maps?q=9.472273,77.773040`, '_blank');
    };

    const [refTop, inViewTop] = useInView({ triggerOnce: true });
    const [ref3, inView3] = useInView({ triggerOnce: true });
    const [ref4, inView4] = useInView({ triggerOnce: true });
    const [ref5, inView5] = useInView({ triggerOnce: true });
    const [ref6, inView6] = useInView({ triggerOnce: true });
    const [refVasagam, inViewVasagam] = useInView({ triggerOnce: true, threshold: 0.2 });

    const animLeft = useSpring({ opacity: inViewTop ? 1 : 0, transform: inViewTop ? 'translateX(0)' : 'translateX(-50px)' });
    const animRight = useSpring({ opacity: inViewTop ? 1 : 0, transform: inViewTop ? 'translateX(0)' : 'translateX(50px)' });
    const animLeftText = useSpring({ opacity: inViewVasagam ? 1 : 0, transform: inViewVasagam ? 'translateX(0)' : 'translateX(-100px)' });
    const animRightImg = useSpring({ opacity: inViewVasagam ? 1 : 0, transform: inViewVasagam ? 'translateX(0)' : 'translateX(150px)' });
    const animPriest = useSpring({ opacity: inView3 ? 1 : 0, transform: inView3 ? 'translateY(0)' : 'translateY(50px)' });
    const animBible = useSpring({ opacity: inView4 ? 1 : 0, transform: inView4 ? 'translateY(0)' : 'translateY(50px)' });
    const animAnbiyam = useSpring({ opacity: inView5 ? 1 : 0, transform: inView5 ? 'translateY(0)' : 'translateY(50px)' });
    const animContact = useSpring({ opacity: inView6 ? 1 : 0, transform: inView6 ? 'translateY(0)' : 'translateY(50px)' });



    // நிகழ்வை கிளிக் செய்யும் போது Modal-ஐ திறக்க
    const handleEventClick = (event) => {
        setActiveEvent(event);
        setShowEventModal(true);
    };

    return (
        <div className="landing-page-wrapper">
            {/* Hero Section */}
            <section className="main-header-area py-4" ref={refTop}>
                <Container fluid className="px-md-5">
                    <Row className="g-4 align-items-stretch">
                        <Col lg={9}>
                            <animated.div
                                style={{
                                    ...animLeft,
                                    backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${heroData.backgroundImages?.[currentImageIndex] || '/images/placeholder.jpg'})`
                                }}
                                className="hero-box-left"
                            />
                        </Col>

                        <Col lg={3}>
                            <animated.div style={animRight} className="announcement-box-right">
                                <div className="announcement-header">
                                    <div style={{ textAlign: 'center', border: '1px solid #5e35b1', borderRadius: '10px', padding: '5px' }}>
                                        <h6 style={{ color: 'blue', margin: 0 }}>புனித ஆரோக்கிய அன்னை ஆலயம்</h6>
                                        <p style={{ color: 'blue', fontSize: '12px', margin: 0 }}>மரியானுஸ் நகர்</p>
                                    </div>
                                    <h3 style={{ marginTop: '10px', color: '#5e35b1', fontWeight: 'bold' }}>ஆலய அறிவிப்புகள்</h3>
                                </div>

                                <div className="announcement-body" style={{ backgroundColor: 'white', borderRadius: '10px', padding: '15px', border: '1px solid #ddd' }}>
                                    <div style={{ height: '300px', overflow: 'hidden' }}>
                                        <Swiper
                                            direction={'vertical'}
                                            slidesPerView={5} // ஒரே நேரத்தில் 5 வரிகள் தெரியும்
                                            spaceBetween={0}
                                            loop={true}
                                            autoplay={{
                                                delay: 2000,
                                                disableOnInteraction: false,
                                            }}
                                            modules={[Autoplay]}
                                            style={{ height: '100%' }}
                                        >
                                            {eventData.event_images?.map((item, index) => (
                                                <SwiperSlide key={index}>
                                                    <div style={{
                                                        borderBottom: '1px dashed #ccc',
                                                        padding: '10px 0',
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        height: '60px' // ஸ்லைடரின் உயரம்
                                                    }}>
                                                        {/* நிகழ்வின் பெயர் மற்றும் ஐகான் */}
                                                        <div
                                                            onClick={() => handleEventClick(item)}
                                                            style={{
                                                                fontSize: '14px',
                                                                color: '#333',
                                                                cursor: 'pointer',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '8px'
                                                            }}
                                                        >
                                                            <span style={{ flex: 1 }}>{item.eventName}</span>
                                                            <span style={{ color: '#4caf50' }}>🔗</span>
                                                        </div>

                                                        {/* Click Here லிங்க் */}
                                                        {item.invitation_link && (
                                                            <a
                                                                href={item.invitation_link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                style={{
                                                                    fontSize: '13px',
                                                                    color: '#2e7d32',
                                                                    fontWeight: 'bold',
                                                                    textDecoration: 'none',
                                                                    marginLeft: '10px'
                                                                }}
                                                            >
                                                               
                                                            </a>
                                                        )}
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>
                                </div>
                            </animated.div>

                            {/* POP-UP MODAL */}
                            <Modal show={showEventModal} onHide={() => setShowEventModal(false)} centered>
                                <Modal.Header closeButton>
                                    {/* <Modal.Title style={{ fontSize: '18px', color: '#5e35b1' }}>நிகழ்வு விவரம்</Modal.Title> */}
                                </Modal.Header>
                                <Modal.Body style={{ textAlign: 'center' }}>
                                    <h5 style={{ color: 'blue' }}>{activeEvent?.eventName}</h5>

                                    {/* படம் இருந்தால் காட்டும் */}
                                    {activeEvent?.eventImage && (
                                        <img src={activeEvent.eventImage} alt="Event" style={{ width: '100%', borderRadius: '10px', marginTop: '10px' }} />
                                    )}

                                    <hr />

                                    {/* Click Here Link */}
                                    {activeEvent?.invitation_link ? (
                                        <div style={{ marginTop: '15px' }}>
                                            <p>அழைப்பிதழைப் பார்க்க:
                                                <a
                                                    href={activeEvent.invitation_link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{ marginLeft: '10px', color: 'red', fontWeight: 'bold', textDecoration: 'underline' }}
                                                >
                                                    Click Here
                                                </a>
                                            </p>
                                        </div>
                                    ) : (
                                        <p style={{ color: 'gray' }}>இந்த நிகழ்விற்கு தனி லிங்க் இல்லை.</p>
                                    )}
                                </Modal.Body>
                            </Modal>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Image Popup Modal */}
            <AnimatePresence>
                {selectedImg && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setSelectedImg(null)}
                        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <motion.img initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }} src={selectedImg} style={{ maxWidth: '90%', maxHeight: '90%', borderRadius: '10px' }} />
                        <button style={{ position: 'absolute', top: 30, right: 30, color: 'white', background: 'none', border: 'none', fontSize: '40px' }}>&times;</button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Readmore Section */}
            <section className='readmore'>
                <div className="hero-content">
                    <h1 className="hero-title">{heroData.title}</h1>
                    <p className="hero-description">{heroData.description}</p>
                    <button className="read-more-btn" onClick={() => setShowReadMoreModal(true)}>Read More</button>
                </div>
            </section>

            {/* Vasagam Section */}
            <section id="vasagam" className="vasagam-section" ref={refVasagam}>
                <Container>
                    <Row className="align-items-center">
                        <Col md={7}>
                            <animated.div style={animLeftText} className="vasagam-content">
                                <h2 className="vasagam-title">{vasagamData?.title}</h2>
                                <p className="vasagam-description">{vasagamData?.description}</p>
                                <p style={{ fontWeight: 'bold', color: '#2575fc' }}>{vasagamData?.reference}</p>
                            </animated.div>
                        </Col>
                        <Col md={5} className='text-center'>
                            <animated.div style={animRightImg} className="vasagam-img-container">
                                <img src={vasagamData.images || '/images/father.jpeg'} alt="Vasagam" className="vasagam-image" />
                            </animated.div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Bible, Anbiyam, Priests, etc. Sections - Unchanged but fixed Structure */}
            <animated.section id="bible" className="quote-section" ref={ref4} style={animBible}>
                <Container>
                    <Row className="align-items-center">
                        <Col md={6}><img src={bibleData.image} alt="Bible" className="side-img" /></Col>
                        <Col md={6} className="ps-md-5">
                            <h2 style={{ color: '#2575fc' }}>{bibleData.title}</h2>
                            <p className="quote-text-tamil">"{bibleData.quote}"</p>
                            <h4 className="quote-text">{bibleData.subTamil}</h4>
                            <p className="quote-text">{bibleData.quoteTamil}</p>
                            <p className="quote-reference">{bibleData.reference}</p>
                        </Col>
                    </Row>
                </Container>
            </animated.section>

            <animated.section id="anbiyams" className="anbiyam-section" ref={ref5} style={animAnbiyam}>
                <Container>
                    <Row className="align-items-center flex-md-row-reverse">
                        <Col md={6}><img src={anbiyamData.image} alt="Anbiyam" className="side-img" /></Col>
                        <Col md={6} className="pe-md-5">
                            <h2 className="section-title">{anbiyamData.title}</h2>
                            <p className="quote-text">{anbiyamData.quote}</p>
                            <button className="read-more-btn" onClick={() => navigate('/anbiyam')}>Know More</button>
                        </Col>
                    </Row>
                </Container>
            </animated.section>

            <animated.section id="priests" className="priests-section" ref={ref3} style={animPriest}>
                <Container>
                    <h2 className="section-title text-center">Our Priests</h2>
                    <Row className="justify-content-center mt-5">
                        {priestsData.priestsList?.map((priest) => (
                            <Col key={priest.id} md={4} className="mb-4">
                                <div className="priest-card">
                                    <div className="priest-image-wrapper"><img src={priest.image} alt={priest.nameTamil} className="priest-image" /></div>
                                    <h3 className="priest-name-tamil">{priest.nameTamil}</h3>
                                    <p className="priest-title-tamil">{priest.titleTamil}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </animated.section>

            <animated.section className="contact-cta-section" ref={ref6} style={{ ...animContact, backgroundImage: `linear-gradient(rgba(13, 71, 161, 0.8), rgba(0,0,0,0.8)), url(${contactData.backgroundImage})` }}>
                <Container className="text-center text-white">
                    <h2 className="mb-4">{contactData.title}</h2>
                    <button onClick={() => navigate('/contact')} className="read-more-btn">{contactData.contactbtn}</button>
                </Container>
            </animated.section>

            <footer className="footer-section" style={{ backgroundColor: 'rgba(158, 204, 243, 1)' }}>
                <Container className="footer-content" style={{backgroundColor: 'rgba(158, 204, 243, 1)'}}>
                    <h3 className="footer-text">{footerData.title}</h3>
                    <button className="map-link-btn" style={{ backgroundColor: 'blueviolet' }} onClick={openDirectionsInGoogleMaps}>Open in Google Maps</button>
                    <div className="mt-4 pt-4 border-top border-white color:white font-weight-bold"></div>
                     <h3 className="footer-reference" style={{fontWeight:'bold', color:'white', fontSize:'1.2rem'}}>{footerData.address}</h3>
                    <div className="d-flex justify-content-center gap-3 mt-3">
                        <Youtube size={32} style={{ cursor: 'pointer', color: 'red' }} onClick={() => window.open('https://youtube.com', '_blank')} />
                        <Facebook size={32} style={{ cursor: 'pointer', color: 'blue' }} onClick={() => window.open('https://facebook.com', '_blank')} />
                    </div>
                </Container>
            </footer>

            {/* Read More HISTORY Modal */}
            {showReadMoreModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button onClick={() => setShowReadMoreModal(false)} className="modal-close-btn"><X size={24} /></button>
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