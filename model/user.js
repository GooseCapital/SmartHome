function User(id, username, password, email, fbid, image, fbName) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.fbid = fbid;
    this.image = image;
    this.fbName = fbName;
}

User.prototype = {
    contructor: User,
    getId: () => {
        return this.id
    },
    getPassword: () => {
        return this.password
    },
    getEmail: () => {
        return this.email
    },
    getFbid: () => {
        return this.fbid
    },
    getImage: () => {
        return this.image
    },
    getfbName: () =>{
        return this.fbName
    }
}

module.exports = User;