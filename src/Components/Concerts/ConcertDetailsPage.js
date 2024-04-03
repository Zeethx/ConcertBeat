import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ConcertDetailsPage.css';

const ConcertDetailsPage = () => {
    const { concertId } = useParams();
    const [concertDetails, setConcertDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchConcertDetails = async () => {
            const apiKey = process.env.REACT_APP_TICKETMASTER_API_KEY;
            const url = `https://app.ticketmaster.com/discovery/v2/events/${concertId}?apikey=${apiKey}`;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch concert details');
                }
                const data = await response.json();
                setConcertDetails(data);
            } catch (err) {
                setError('Could not load concert details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchConcertDetails();
    }, [concertId]);

    if (loading) return 
    if (error) return <p>{error}</p>;

    return (

    <div className="concert-details">
        {concertDetails && (
            <>
                <img src={concertDetails.images[0].url} alt={concertDetails.name} className="concert-main-image" />
                <h1 className="concert-name">{concertDetails.name}</h1>
                <div className='concert-line'></div>
                <div className="concert-info">
                    <p className="concert-date">{concertDetails.dates.start.localDate}</p>
                    <p className="concert-location">
                        {concertDetails._embedded.venues[0].name},&nbsp; 
                        {concertDetails._embedded.venues[0].city.name},&nbsp;
                        {concertDetails._embedded.venues[0].country.name}
                        </p>
                    <p className="concert-genre">Genre: {concertDetails.classifications[0].genre.name}</p><br />
                    <p className="concert-price">Price Range:&nbsp;
                        {concertDetails.priceRanges[0].min} - {concertDetails.priceRanges[0].max} {concertDetails.priceRanges[0].currency}
                    </p>
                    <a href={concertDetails.url} target="_blank" rel="noopener noreferrer" className="buy-tickets-button">Buy Tickets</a>
                </div>


            </>
        )}
    </div>

    );
};

export default ConcertDetailsPage;
