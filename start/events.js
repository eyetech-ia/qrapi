const Event = use('Event');
const Mail = use('Mail');
const ENV = use('Env');
const SendMail = require('@sendgrid/mail');
Event.on('new::user', async (user) => {
  await Mail.send('new.user', user, (message) => {
    message.to(user.email)
    message.from('from@email')
  });
});


Event.on('new::visitant', async (visitant) => {
  SendMail.setApiKey(ENV.get('SENDGRID_KEY'));
  await SendMail.send({
    to : 'clara@eyetech.digital',
    from : 'noreply@eyetech.digital',
    subject : 'Confirmação da Visita',
    html : '<strong>Olá '+ visitant.nome +', click no link para confirmar a visita!</strong> ' +
      '<a href="https://6a7806ec.ngrok.io/api/visitante/validate/'+ visitant.access_token +'">Confirmar Visita</a>'
  });
});
