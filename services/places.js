const db = require('./db');

async function getPlaces() {
    const rows = await db.query('SELECT * FROM places');
    return rows;
}


async function deletePlace(id) {
    const result = await db.query('DELETE * FROM places WHERE PlaceID = ?', [id]);
    return {message: 'Place deleted'};
}

async function createPlace(userId, address, placeName, price) {
    const userResult = await db.query('Select first_name, last_name, phone_number FROM users WHERE id = ?', [userId]

    );

    if (userResult.length === 0) {
        throw new Error('User not found');
    }
    
    const {first_name, last_name, phone_number} = userResult[0];
    const ownerName = `${first_name} ${last_name}`;

    const result = await db.query(
        'INSERT INTO places (owner_name, owner_phone, address, place_name, price) VALUES (?, ?, ?, ?, ?)',
         [ownerName, phone_number, address, placeName, price]
        );
        return {message: 'Place created', placeId: result.insertId};
}

async function updatePlace(id, place) {
    const result = await db.query(
        'UPDATE places SET  address = ?, place_name = ?, price = ? WHERE id = ?',
        [place.address, place.placeName, place.price, id]
    );
    return (
        {message: 'Place updated'}
    )
}

module.exports = {
    getPlaces,
    
    deletePlace,
    createPlace,
    updatePlace
};

