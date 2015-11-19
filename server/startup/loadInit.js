Meteor.startup(function () {

Accounts.emailTemplates.resetPassword.text = function (user, url) {
   return "Hola! Para restaurar la contraseña por favor click en el siguiente link: " + url;
};


  if (Meteor.users.find().count() === 0) {
    var user = {
      email: 'afcardenas0@gmail.com',
      password: '1030581000',
      profile:{
        rol:'Admin'
      }
    };
    var ac = Accounts.createUser(user);
  }
  //Config mail
  //process.env.MAIL_URL = 'smtp://jimenez.ing.sis%40gmail.com:jj30037031@smtp.gmail.com:465';//587
  process.env.MAIL_URL = 'smtp://'+encodeURIComponent('afcardenas0@gmail.com')+':'+encodeURIComponent('1030581000')+'@'+encodeURIComponent('smtp.gmail.com:465');//587
});
