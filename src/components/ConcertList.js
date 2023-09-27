import React from 'react';

function ConcertList({ concerts }) {
  return (
    <div>
      <h2>Concerts</h2>
      <ul>
        {concerts.map((concert) => (
          <li key={concert.id}>
            {concert.artist} - {concert.venue} - {concert.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ConcertList;
