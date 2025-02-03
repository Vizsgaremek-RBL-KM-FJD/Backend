const db = require('./db');

async function getRents() {
    try{
        const query = `
            SELECT r.rentID,  r.placeID, r.UserID, r.StartDate, r.EndDate, r.TotalAmount,
            p.place_name, u.first_name as user_name, u.phone_number as user_phone
            FROM rents r
            JOIN places p ON r.placeID = p.placeID
            JOIN users u ON r.UserID = u.id
        `; 
        
        const [rows] = await db.query(query);
        return rows?rows:[];
    } catch (error) {
        throw error;
    }
}

async function createRent(placeID, userID, startDate, endDate) {
    try{
        const [place] = await db.query('SELECT price, owner_name, owner_phone FROM places WHERE placeID = ?', [placeID]

        );
        const [user] = await db.query('SELECT first_name, last_name, phone_number FROM users WHERE ID = ?', 
            [userID]
        );

        const start = new Date(startDate);
        const end = new Date(endDate);
        const duration = (end - start) / (1000 * 60 * 60);
        const totalAmount = duration * place.price;

        const result = await db.query(
            'INSERT INTO rents (placeID, UserID, OwnerPhoneNumber, UserName, UserPhoneNumber, StartDate, EndDate, TotalAmount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [placeID,
            userID,
            place.phone_number,
            `${user.first_name} ${user.last_name}`,
            user.phone_number, 
            startDate, 
            endDate, 
            totalAmount]
        );
     return result  
    } catch (error) {
        throw error;
    }
    
}

module.exports = {
    getRents,
    createRent
}