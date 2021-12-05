import { createPool } from "mysql2/promise";

export async function connect(){

   const connection = await createPool({
        host: 'bhgvxlerhtaw5lx1ohij-mysql.services.clever-cloud.com',
        user: 'usvnqcivxah04gae',
        password: 'Pf4NRUXnMTKBt3A5qf2',
        database: 'bhgvxlerhtaw5lx1ohij',
        port: 21171
    });
    
    return connection;   
}