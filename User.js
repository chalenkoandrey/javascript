class User{
    constructor(name,secondName){
        this.name=name;
        this.secondName=secondName;
    }
    fullName(){
        console.log("My name "+this.name+ "My second name "+this.secondName);
        return "My name "+this.name+" My second name" +this.secondName;
    }
}
module.exports ={
    UserObj: User
};
