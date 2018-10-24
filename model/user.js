function User(id, username, password, email, fbid, image, fbName, role) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.fbid = fbid;
    this.image = image;
    this.fbName = fbName;
    this.role = role;
}

User.prototype = {
    contructor: User
}

module.exports = User;