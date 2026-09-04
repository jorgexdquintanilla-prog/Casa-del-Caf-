document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('contenedor');
  const cajaLogin = document.querySelector('.caja-formulario.login');
  const cajaRegistro = document.querySelector('.caja-formulario.registro');
  const btnRegistro = document.getElementById('btn-ir-registro');
  const btnLogin = document.getElementById('btn-ir-login');

  function cambiarModo(destino){
    const irARegistro = destino === 'registro';
    contenedor.classList.toggle('modo-registro', irARegistro);
    cajaLogin.classList.toggle('visible-movil', !irARegistro);
    cajaRegistro.classList.toggle('visible-movil', irARegistro);
  }

  btnRegistro.addEventListener('click', () => cambiarModo('registro'));
  btnLogin.addEventListener('click', () => cambiarModo('login'));

  document.querySelectorAll('.btn-cambiar-movil').forEach((boton) => {
    boton.addEventListener('click', () => cambiarModo(boton.dataset.irA));
  });

  document.getElementById('form-login').addEventListener('submit', (evento) => {
    evento.preventDefault();
    cambiarModo('registro');
  });

  document.getElementById('form-registro').addEventListener('submit', (evento) => {
    evento.preventDefault();
    cambiarModo('login');
  });

  cambiarModo('login');
});
