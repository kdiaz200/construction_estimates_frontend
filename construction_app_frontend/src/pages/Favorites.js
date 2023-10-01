// Favorites.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Favorites.css';

function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [userId] = useState(1); // this would normally be set after user login
    const [selectedFavorites, setSelectedFavorites] = useState([]);
    const [isRemoved, setIsRemoved] = useState(false);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/construction_web_app/get_user_favorites/?user_id=${userId}`)
            .then(response => {
                setFavorites(response.data);
            });
    }, []);

    const handleFavoriteSelect = (favoriteId) => {
        if(selectedFavorites.includes(favoriteId)){
            setSelectedFavorites(selectedFavorites.filter(id => id !== favoriteId));
        } else {
            setSelectedFavorites([...selectedFavorites, favoriteId]);
        }
    };

    const removeSelectedFavorites = () => {
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        selectedFavorites.forEach(favoriteId => {
            axios.delete(`http://127.0.0.1:8000/construction_web_app/favorite_materials/${favoriteId}/`)
                .then(response => {
                    if(response.status === 204){
                        setFavorites(favorites.filter(favorite => favorite.id !== favoriteId));
                    }
                })
                .catch(error => console.log(error));
        });
        setSelectedFavorites([]);
        setIsRemoved(true);
        setTimeout(() => setIsRemoved(false), 3000); // Hide confirmation message after 3 seconds
    };

    return (
        <div className="Favorites">
            <h1>Favorites</h1>
            <button className="remove-button" onClick={removeSelectedFavorites}>Remove Selected</button>
            {isRemoved && <p>Selected favorites have been removed!</p>}
            {favorites.map(favorite => (
                <div className="Favorites-material" key={favorite.id} onClick={() => handleFavoriteSelect(favorite.id)}
                     style={selectedFavorites.includes(favorite.id) ? {backgroundColor: 'lightblue'} : {}}>
                    <h2 className="Favorites-material-name">{favorite.material.name}</h2>
                    <p className="Favorites-material-price">{favorite.material.unit_price}</p>
                </div>
            ))}
        </div>
    );
}

export default Favorites;
