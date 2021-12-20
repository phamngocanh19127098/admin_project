import db from '../utilis/db.js'

export default {
    selectAll(){
        return db('user');
    },
    getUsername(username){
        return db('admin').where('username',username);
    },
    selectUser(id){
        return db('user').where('id',id);
    },
    async delUser(id){
        console.log(id)
        return db('user').where('id',id).del();
    },
    async updateUser(entity){
        const id = entity.id;
        console.log(id)
        delete entity.id;
        return db('user').where('id',id).update(entity);
    },
    add(entity){
        console.log(entity);

        return db('user').insert(entity);
    },
    getUserByUsername(username){
        return db('user').where('username',username);
    }
}