const db = require('./db');

async function  getDatas() {
    const rows = await db.query('SELECT * FROM users');
    return rows?rows:[]
    
}

async function create(user) {
    console.log("User?",user);

    const result = await db.query(`
        Insert into users (first_name, last_name, gender, email, address, phone_number)
        values (?,?,?,?,?,?)`,
        
        [user.first_name,
        user.last_name,
        user.gender,
        user.email,
        user.address,
        user.phone_number
        ])

        let message = "User can not be created";
        if (result.affectedRows) {
            message = "User created";
        }
        return {message};
    
        
}

async function update(id, user) {
    const result = await db.query(`
        update users set first_name=?, last_name=?, gender=?, email=?, address=?, phone_number=? where id=?`,
        [user.first_name,
        user.last_name,
        user.gender,
        user.email,
        user.address,
        user.phone_number,
        id]);

        let message = "User can not be updated";
        if (result.affectedRows) {
            message = "User updated";
        }
        return {message};
}

async function remove(id) {
    const result = await db.query(`
        delete from users where id=?`,
        [id]);

        let message = "User can not be deleted";
        if (result.affectedRows) {
            message = "User deleted";
        }
        return {message};
}

async function patch(id, user) {
    let fields = Object.keys(user).nap((field)=>field+"=?").join(",");
    let updateValues = Object.values(user);
    updateValues.push(id);

    const result = await db.query(`
        update users set ${fields} where id=?`,
        updateValues);

        let message = "User can not be updated";
        if (result.affectedRows) {
            message = "User updated";
        }
        return {message};
}

module.exports={
    getDatas,
    create,
    update,
    remove,
    patch}