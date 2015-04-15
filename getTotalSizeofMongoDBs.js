var dbNames = [];
var sum = 0;
var dblist = db.getMongo().getDBs();
for (var key in dblist){
        if(key=="databases"){
                for (var i = 0; i < dblist.databases.length; i++){
                        if(dblist.databases[i].name != "local"){
                                dbNames.push(dblist.databases[i].name);}
                }
        }
}

var bytesInGB = 1024 * 1024 * 1024;
function bytesToGB(bytes) {
   if(bytes == 0) return '0 Byte';
   var bytesInGB = 1024 * 1024 * 1024;
   return (bytes / bytesInGB).toPrecision(2) + ' GB ';
}

for (var i = 0; i < dbNames.length; i++) {
  var indexSize = db.getMongo().getDB(dbNames[i]).stats().indexSize;
  var dataSize = db.getMongo().getDB(dbNames[i]).stats().dataSize;
  var total = indexSize + dataSize;
  sum += total;
  print("db name: " + dbNames[i] + " indexSize: " + bytesToGB(indexSize) + "dataSize: " + bytesToGB(dataSize) + "total: " + bytesToGB(total));
}
print("total size of all dbs: " + bytesToGB(sum));
