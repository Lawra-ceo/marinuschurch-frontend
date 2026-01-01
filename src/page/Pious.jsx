import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Pious = () => {
  const [piousData, setPiousData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPiousData = async () => {
      try {
        const response = await axios.get('https://church-backend-qk9s.onrender.com/pious/piouspage');
        setPiousData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching pious data:', error);
        setIsLoading(false);
      }
    };
    fetchPiousData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  if (isLoading) {
    return <div className="loading-message">Loading...</div>;
  }
  if (!piousData || !piousData.sections) {
    return <div className="loading-message">No data found. Please add data via your backend API.</div>;
  }

  return (
    <div className="pious-page-wrapper">
      <motion.header
        className="pious-header"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="pious-header-content">
          <h1 className="pious-header-title">
            {piousData.header.title}
          </h1>
          <p className="pious-header-verse-text">
            {piousData.header.verse.text}
          </p>
          <p className="pious-header-verse-reference">
            {piousData.header.verse.reference}
          </p>
        </div>
      </motion.header>

      <main className="pious-main-content">
        {piousData.sections.map((section, index) => (
          <motion.section
            key={index}
            className="pious-section-container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <h2 className="pious-section-title">
              {section.title}
            </h2>
            <div className="pious-card-grid">
              {section.members.map((member, memberIndex) => (
                <motion.div
                  className="pious-card"
                  key={memberIndex}
                  variants={itemVariants}
                >
                  {member.role && (
                    <p className="pious-card-role">
                      {member.role}
                    </p>
                  )}
                  <p className="pious-card-name">
                    {member.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}
      </main>

      <motion.footer
        className="pious-footer"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="pious-footer-content">
          <p className="pious-footer-church-name">
            {piousData.footer.churchName}
          </p>
          <p className="pious-footer-developer-info">
            {piousData.footer.developerInfo.text}{' '}
            <span className="pious-developer-company">
              {piousData.footer.developerInfo.company}
            </span>
            , {piousData.footer.developerInfo.location}
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Pious;