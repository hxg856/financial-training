function testUserID(name) {
    var pattern = /^\d{19}$/;
    return pattern.test(name);
};
//signin deleteReport searchReport
function testUserPassword(pass) {
    var pattern = /^\d{6}$/;
    return pattern.test(pass);
};
//signin revisepassword
function testload(quota) {
    var pattern = /^\d{0,10}$/;
    return pattern.test(quota);
};
//enterinfo2
function testtime(quota) {
    var pattern = /^\d{0,2}$|^(1|2)\d{0,2}$/;
    return pattern.test(quota);
};
//enterinfo2
function testAccount(Account) {
    var pattern = /^\d{0,8}$|^-\d{0,8}$/;
    return pattern.test(Account);
};
//enterinfo3
