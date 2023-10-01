import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Materials.css';

function Materials() {
    const [materials, setMaterials] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [selectedMaterials, setSelectedMaterials] = useState([]); // New state
    const [searchTerm, setSearchTerm] = useState('');
    const [userId] = useState(1);
    const [isAddedToFav, setIsAddedToFav] = useState(false); // For showing confirmation message

    // Update useEffect to refetch favorites after a successful add operation
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/construction_web_app/materials/?search=${searchTerm}`)
            .then(response => {
                setMaterials(response.data);
            });
        fetchFavorites();
    }, [searchTerm, isAddedToFav]);

    const fetchFavorites = () => {
        axios.get(`http://127.0.0.1:8000/construction_web_app/get_user_favorites/?user_id=${userId}`)
            .then(response => {
                setFavorites(response.data);
            });
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Function to add multiple materials to favorites
    const addMultipleToFavorites = () => {
        selectedMaterials.forEach(material => {
            axios.post('http://127.0.0.1:8000/construction_web_app/favorite_materials/', {
                user_id: userId,
                material_id: material.id
            })
                .then(response => {
                    if (response.data.status === "success") {
                        setIsAddedToFav(true);
                    }
                })
                .catch(error => console.log(error));
        });
        setSelectedMaterials([]);
        setTimeout(() => setIsAddedToFav(false), 3000); // Hide confirmation message after 3 seconds
    };

    const handleCheckChange = (event, material) => {
        if (event.target.checked) {
            setSelectedMaterials(prev => [...prev, material]);
        } else {
            setSelectedMaterials(prev => prev.filter(m => m.id !== material.id));
        }
    };

    return (
        <div className="Materials">
            <h1>Materials</h1>
            <input className="Materials-input" type="text" value={searchTerm} onChange={handleSearchChange} />
            {materials.map(material => (
                <div className="Materials-material" key={material.id}>
                    <h2 className="Materials-material-name">{material.name}</h2>
                    <p className="Materials-material-price">{material.unit_price}</p>
                    <input type="checkbox" onChange={(event) => handleCheckChange(event, material)} />
                    {favorites.some(favorite => favorite.id === material.id) && <span className="Materials-material-favorite">✔️</span>}
                </div>
            ))}
            <button className="Materials-floating-button" onClick={addMultipleToFavorites}>Add Selected to Favorites</button>
            {isAddedToFav && <div className="Materials-confirm-message">Materials added to favorites!</div>}
        </div>
    );
}

export default Materials;
