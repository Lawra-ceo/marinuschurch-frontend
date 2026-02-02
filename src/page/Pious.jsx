import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Facebook, Youtube } from 'lucide-react';

const Pious = () => {
  const [piousData, setPiousData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [footerData, setFooterData] = useState({});

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchPiousData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/pious/piouspage`);
        setPiousData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching pious data:', error);
        setIsLoading(false);
      }
    };
    fetchPiousData();
  }, [API_BASE_URL]);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/land/footer`);
        setFooterData(response.data);
      } catch (error) {
        console.error(`Error fetching footer data:`, error);
      }
    };
    fetchFooterData();
  }, [API_BASE_URL]);

  // அனிமேஷன் செட்டிங்ஸ்
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }, // ஒவ்வொரு கார்டும் ஒன்றன் பின் ஒன்றாக வரும்
    },
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 }, // ஆரம்பத்தில் சிறியதாக இருக்கும்
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 120, damping: 12 }, // Scale ஆகி வரும் Animation
    },
  };

  const getSectionTitle = (arr) => arr?.[0]?.title || arr?.[0]?.[" title"] || "";

  if (isLoading) return <div className="loading-message">Loading...</div>;
  if (!piousData) return <div className="loading-message">No data found.</div>;

  return (
    <div className="pious-page-wrapper">
      {/* Header Animation */}
      <motion.header
        className="pious-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="pious-header-content">
          <h1 className="pious-header-title">{piousData.church_details.title}</h1>
          <p className="pious-header-verse-text">{piousData.church_details.text}</p>
          <p className="pious-header-verse-reference">{piousData.church_details.reference}</p>
        </div>
      </motion.header>

      <main className="pious-main-content">

        {/* 1. நியமன உறுப்பினர்கள் - Animated Section */}
        <section className="pious-section-wrapper">
          <h2 className="pious-section-title">{getSectionTitle(piousData.parish_council_nominated_members)}</h2>
          <motion.div
            className="pious-card-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {piousData.parish_council_nominated_members.slice(1).map((item, idx) => (
              <motion.div
                className="pious-card anbiyam-box"
                key={idx}
                variants={cardVariants}
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }} // Hover செய்யும் போது லேசாகப் பெருசாகும்
              >
                <h3 className="anbiyam-name-badge">{item.anbiyam}</h3>
                <div className="members-column">
                  {item.members.map((name, nIdx) => (
                    <p key={nIdx} className="member-name-item">{name}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* 2. அன்பிய பிரதிநிதிகள் - Animated Section */}
        <section className="pious-section-wrapper">
          <h2 className="pious-section-title">{getSectionTitle(piousData.anbiyam_representatives)}</h2>
          <motion.div
            className="pious-card-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {piousData.anbiyam_representatives.slice(1).map((item, idx) => (
              <motion.div
                className="pious-card anbiyam-box"
                key={idx}
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="anbiyam-name-badge">{item.anbiyam}</h3>
                <div className="members-column">
                  {item.members.map((name, nIdx) => (
                    <p key={nIdx} className="member-name-item">{name}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* 3. பக்தசபை தலைவர்கள் */}
        <section className="pious-section-wrapper">
          <h2 className="pious-section-title">{piousData.pious_associations_leaders[0]?.title}</h2>
          <motion.div
            className="pious-card-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {piousData.pious_associations_leaders.slice(1).map((item, idx) => (
              <motion.div className="pious-card" key={idx} variants={cardVariants} whileHover={{ scale: 1.05 }}>
                <p className="pious-card-role">{item.association}</p>
                <p className="pious-card-name">{item.leader}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* 4. நிர்வாகிகள் */}
        <section className="pious-section-wrapper">
          <h2 className="pious-section-title">{piousData.office_bearers.title}</h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
            <motion.div className="pious-card office-box" variants={cardVariants} whileHover={{ scale: 1.02 }}>
              <p className="office-item"><span>துணைத்தலைவர்:</span> {piousData.office_bearers.vice_president}</p>
              <p className="office-item"><span>செயலாளர்:</span> {piousData.office_bearers.secretary}</p>
              <p className="office-item"><span>பொருளாளர்:</span> {piousData.office_bearers.treasurer}</p>
              <p className="office-item"><span>துணைச் செயலாளர்:</span> {piousData.office_bearers.joint_secretary}</p>
              <p className="office-item"><span>துணைப் பொருளாளர்:</span> {piousData.office_bearers.assistant_treasurer}</p>
            </motion.div>
          </motion.div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer-section" style={{ backgroundColor: 'rgba(158, 204, 243, 1)' }}>
        <div className="footer-content" style={{backgroundColor: 'rgba(158, 204, 243, 1)'}}>
          <h3 className="footer-text">{footerData.title}</h3>
          <div className="mt-4 pt-4 border-top border-white text-white-100"></div>
          <h3 className="footer-reference" style={{fontWeight:'bold', color:'white', fontSize:'1.2rem'}}>{footerData.address}</h3>

          <div className="social-icons">
            <Youtube size={32} className="mt-3" style={{ cursor: 'pointer', color: 'red' }} onClick={() => window.open('https://www.youtube.com/', '_blank')} />
            <Facebook size={32} className="mt-3 ms-3" style={{ cursor: 'pointer', color: 'blue' }} onClick={() => window.open('https://www.facebook.com/', '_blank')} />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Pious;