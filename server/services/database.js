const mysql = require('mysql');

class Database {
    constructor(host = 'localhost', user = 'root', password = 'vasi2326', database = 'som_db', port = '8889') {
        this.host      = host;
        this.user      = user;
        this.password  = password;
        this.database  = database;
        this.port      = port;

        this.connection = mysql.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database,
            port: this.port
        });

        this.connection.connect((err) => {
            if (err) {
                console.log('Error found: ', err);
                this.closeConnection();
            }
            console.log("Database Connected!");
        });
    }

    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
            this.closeConnection();
        } );
    }

    closeConnection() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
            console.log("Database Disconnected!");
        } );
    }
}

module.exports = Database;