import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';


const Service = () => {
  const [servicesData, setServicesData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const response = await axios.get('https://church-backend-qk9s.onrender.com/serv/servicespage');
        setServicesData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching services data:', error);
        setIsLoading(false);
      }
    };
    fetchServicesData();
  }, []);

  if (isLoading) {
    return <p className="loading-message">Loading services data...</p>;
  }

  if (!servicesData) {
    return <p className="loading-message">No services data found.</p>;
  }

  const { heroSection, servicesListSection } = servicesData;
  const { weeklyServices, monthlyServices } = servicesListSection;

  return (
    <div className="service-page-wrapper">
      <section className="services-section">
        {heroSection && (
          <>
            <h2 className="section-title">{heroSection.title}</h2>
            <div className="verse-container">
              <p className="verse-text">{heroSection.description}</p>
              <p className="verse-reference">{heroSection.reference}</p>
            </div>
          </>
        )}
      </section>

      <div className="section-container">
        {weeklyServices.map((service, index) => (
          <div className="card" key={index} style={{ animationDelay: `${index * 0.2}s` }}>
            <img className="card-image" src={service.image} alt={service.title} />
            <h3 className="card-title">{service.title}</h3>
            <p className="card-description">{service.description}</p>
          </div>
        ))}
      </div>

      <div className="section-container">
        {monthlyServices.map((service, index) => (
          <div className="card" key={index} style={{ animationDelay: `${index * 0.2}s` }}>
            <img className="card-image" src={service.image} alt={service.title} />
            <h3 className="card-title">{service.title}</h3>
            <p className="card-description">{service.description}</p>
          </div>
        ))}
      </div>

      <footer className="footer-container">
        <p className="church-name">தூய ஆரோக்கிய அன்னை ஆலயம்</p>
        <p className="developer-info">
          Devloped and Maintained by <span className="bold-text">CoolDreamers LLP</span>, Sivakasi
        </p>
      </footer>
    </div>
  );
};

export default Service;