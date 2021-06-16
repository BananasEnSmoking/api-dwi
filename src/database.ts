import { createPool } from "mysql2/promise";

export async function connect(){

   const connection = await createPool({
        host: 'bnauiirolhqo9kbhgazg-mysql.services.clever-cloud.com',
        user: 'usne3ykhh1ervdi0',
        password: 'XpYx77VetQ7FhF3orLzv',
        database: 'bnauiirolhqo9kbhgazg',
    });
    
    return connection;   
}