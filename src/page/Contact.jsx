import React, { useState, useEffect } from 'react';
import axios from 'axios';

// The main App component that contains the contact form.
function Contact() {
    // A placeholder API URL for form submission.
    const CONTACT_API_URL = 'https://church-backend-qk9s.onrender.com/api/email';
    // API URL to fetch church details dynamically.
    const CHURCH_INFO_API_URL = 'https://church-backend-qk9s.onrender.com/church/admin/info';

    // State to store the dynamic church information.
    const [churchInfo, setChurchInfo] = useState(null);
    const [isInfoLoading, setIsInfoLoading] = useState(true);
    const [infoError, setInfoError] = useState(null);

    // State to store the form data (inputs)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
    });

    // State to manage the form's status (messages, loading)
    const [status, setStatus] = useState({
        message: '',
        isError: false,
        isSubmitting: false,
    });

    // Fetch church information on component mount.
    useEffect(() => {
        const fetchChurchInfo = async () => {
            try {
                const response = await axios.get(CHURCH_INFO_API_URL);
                setChurchInfo(response.data);
            } catch (error) {
                setInfoError("Failed to load church information.");
                console.error("Error fetching church info:", error);
            } finally {
                setIsInfoLoading(false);
            }
        };
        fetchChurchInfo();
    }, []); // Empty dependency array ensures this runs only once

    // Handles changes to the input fields and updates the formData state.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handles the form submission.
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simple front-end validation
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
            setStatus({ message: "Please fill all required fields.", isError: true, isSubmitting: false });
            return;
        }

        setStatus({ message: 'Sending...', isError: false, isSubmitting: true });

        try {
            const response = await fetch(CONTACT_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to send message.');
            }

            setStatus({ message: 'Message Delivered', isError: false, isSubmitting: false });
            setFormData({ firstName: '', lastName: '', email: '', message: '' });
        } catch (error) {
            setStatus({ message: `Failed to send message: ${error.message}`, isError: true, isSubmitting: false });
        }
    };

    // Conditional rendering based on API fetch status.
    if (isInfoLoading) {
        return <p className="text-center p-10">Loading contact details...</p>;
    }

    if (infoError) {
        return <p className="text-center p-10 text-red-600">{infoError}</p>;
    }
    
    // The JSX for the contact form layout.
    return (
        <>
            <div className="main-container">
                <div className="form-card">
                    <div className="form-content">
                        {/* Contact Details Section */}
                        <div className="contact-details">
                            <h2>{churchInfo.head}</h2>
                            <div className="details-list">
                                 <div className="detail-item">
                                    <span>📍</span>
                                    <p>{churchInfo.title}</p>
                                </div>
                                <div className="detail-item">
                                    <span>📍</span>
                                    <p>{churchInfo.address}</p>
                                </div>
                                <div className="detail-item">
                                    <span>📞</span>
                                    <p>{churchInfo.phoneNumber}</p>
                                </div>
                                <div className="detail-item">
                                    <span>✉️</span>
                                    <p>{churchInfo.emailId}</p>
                                </div>
                            </div>
                        </div>

                        {/* Form Section */}
                        <div className="form-section">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="form-row">
                                    <div className="form-field">
                                        <label htmlFor="firstName">First Name</label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label htmlFor="lastName">Last Name</label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="form-field">
                                        <label htmlFor="email">Email *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="form-field">
                                        <label htmlFor="message">Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows="5"
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="submit-area">
                                    {status.message && (
                                        <p className={`status-message ${status.isError ? 'status-error' : 'status-success'}`}>
                                            {status.message}
                                        </p>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={status.isSubmitting}
                                        className="submit-button"
                                    >
                                        {status.isSubmitting ? 'Sending...' : 'Send'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Contact;