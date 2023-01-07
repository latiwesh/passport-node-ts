import mysql from "mysql";
import config from "../config/config";

class UserRespository {


        readonly connectionPool = mysql.createPool({
            connectionLimit: 10,
            host: 'localhost',
            port: 13306,
            user: 'root',
            password: config.DB_PASSWORD,
            database: 'test',
            ssl: false
        });
    

    async executeSelectQuery (query: string) : Promise<any> {

        return new Promise((resolve, reject) => {
            this.connectionPool.getConnection((err, connection) => {
                if(err) reject(err);
                
                    connection.query(query, (err,result) => {
                        connection.release();
                        if(err) reject(err);
                        return resolve(result);
                     });
          
            });
    }).catch(function(error) {

        console.log(error);
        throw new Error("Failed to get users from the db")
      
      });

    }
}


export default new UserRespository();
