const Event = use('Event');
const Mail = use('Mail');
const SendMail = require('@sendgrid/mail');

Event.on('new::user', async (user) => {
  await Mail.send('new.user', user, (message) => {
    message.to(user.email)
    message.from('from@email')
  })
})


Event.on('new::visitant', async (visitant) => {
  SendMail.setApiKey(ENV.get('SENDGRID_KEY'));
  await SendMail.send({
    to : 'mesquitadev@gmail.com',
    from : 'noreply@eyetech.digital',
    subject : 'Confirmação da Visita',
    html : view.render('emails.welcome', {
      name : data.nome,
      token : user_token,
      date: data.visit_date,
      expires : data.visit_expires
    })
  });

});
