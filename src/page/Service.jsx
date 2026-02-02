import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { Facebook, Youtube } from 'lucide-react';


const Service = () => {
  const [servicesData, setServicesData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [footerData, setFooterData] = useState({});

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/serv/servicespage`);
        setServicesData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching services data:', error);
        setIsLoading(false);
      }
    };
    fetchServicesData();
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

export default Service;