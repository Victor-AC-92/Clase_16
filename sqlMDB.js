import knexLib from "knex"

class ClientSql{
    constructor(config){
        this.knex = knexLib(config)
    }

    crearTablaProductos(){
        return this.knex.schema.dropTableIfExists('productos')
        .finally(()=>{
            return this.knex.schema.createTable('productos', table =>{
                table.increments('id').primary();
                table.string('nombre', 15).notNullable();
                table.string('codigo', 10).notNullable();
                table.float('precio');
                table.integer('stock');
            })
        })
    }

    insertarProductos(productos){
        return this.knex('productos').insert(productos);
    }

    listarProductos(){
        return this.knex('productos').select('*');
    }

    borrarProductosPorId(id){
        return this.knex.from('productos').where('id', id).delete();
    }

    actualizarStockPorId(stock, id){
        return this.knex.from('productos').where('id', id).update({stock: stock});
    }
   
    close(){
        this.knex.destroy();
    }
}

export default ClientSql