var Promise = require('es6-promise').Promise;
var fs = require('fs');
var path = require('path');

/**
 * 返回获取文件列表数组的promise
 * @param  {String} filePath 目录实际路径
 * @return {Promise}          
 */
module.exports = function(dirPath) {
    function stats(file) {
        return new Promise(function(resolve, reject) {
            fs.stat(path.join(dirPath, file), function(err, stats) {
                if (err) {
                    reject(err);
                } else {
                    if (stats.isDirectory()) {
                        resolve(file + '/');
                    } else if (stats.isFile()) {
                        resolve(file);
                    }
                }
            });
        });
    }

    return new Promise(function(resolve, reject) {
        fs.readdir(dirPath, function(err, files) {
            if (err) {
                reject(err);
            } else {
                var promises = files.map(stats);
                resolve(Promise.all(promises));
            }
        });
    });
}