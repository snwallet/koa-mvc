let  pool = require("./pool");
module.exports = {
    query(sql,values="") {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err)
                } else {
                    connection.query(sql, values, (err, rows) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(rows)
                        }
                        connection.release()
                    })
                }
            })
        })
    },
    commit(){
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err)
                } else {
                    connection.commit(function (err) {
                        if (err) {
                            reject(err);
                        }else{
                            console.log('commit success');
                            resolve(true);
                        }
                    });
                }
            })
        })
    },

    getExactTime(time) {
        var date = new Date(time);
        var year = date.getFullYear() + '-';
        var month = (date.getMonth()+1 < 10 ? '0' + (date.getMonth()+1) : date.getMonth()+1) + '-';
        var dates = date.getDate() + ' ';
        var hour = date.getHours() + ':';
        var min = date.getMinutes() + ':';
        var second = date.getSeconds();
        return year + month + dates + hour + min + second ;
    },

}