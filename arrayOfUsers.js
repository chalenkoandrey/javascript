var User=require('./User');
var arrayUsers=[];
for (var i=0;i<10;i++){
   arrayUsers[i] = new User.UserObj("vasia"+i,"vasilev"+i);
}
module.exports ={
    arrayUsers: arrayUsers
};
