import knexLib from "knex"

class ClientSql{
    constructor(config){
        this.knex = knexLib(config)
    }

   
    close(){
        this.knex.destroy();
    }
}

export default ClientSql