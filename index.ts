import './style.css';
import { MCFloreria } from './MCFloreria';
import { HTMLUtils } from './HTMLUtils';


// Definición de cuadros de texto de la interfaz de usuario
const txtCantDias: HTMLInputElement = document.getElementById(
  'txtCantDias'
) as HTMLInputElement;
const txtIndiceDesde: HTMLInputElement = document.getElementById(
  'txtIndiceDesde'
) as HTMLInputElement;

//Definición de alerta: cartel de la ganancia
const alertGananciaPromDia: HTMLDivElement = document.getElementById(
  'alertGananciaPromDia'
) as HTMLDivElement;

// Definición de los combo box de la interfaz de usuario
const cboCantCajones: HTMLSelectElement = document.getElementById(
  'cboCantCajones'
) as HTMLSelectElement;
const cboCompraFaltante: HTMLSelectElement = document.getElementById(
  'cboCompraFaltante'
) as HTMLSelectElement;

// Definición de botones de la interfaz de usuario
const btnSimular: HTMLButtonElement = document.getElementById(
  'btnSimular'
) as HTMLButtonElement;

// Definición de las secciones de la simulación
const divTablaMontecarlo: HTMLDivElement = document.getElementById(
  'divTablaMontecarlo'
) as HTMLDivElement;

// Definición de la tabla de montercarlo
const tablaMontecarlo: HTMLTableElement = document.getElementById(
  'tablaMontecarlo'
) as HTMLTableElement;

//Definición del elemento spinner para que se vaya resaltando cuando pasamos por la tabla
const spinnerSimular: HTMLSpanElement = document.getElementById(
  'spinnerSimular'
) as HTMLSpanElement;

// Definición de los parámetros
let dias: number;
let indiceDesde: number;
let cajones: number;
let comprarFaltante:boolean;

// Definición del objeto que realiza la simulación del montercarlo
const monteCarlo: MCFloreria = new MCFloreria();

//Ocultamos la sección donde está la tabla de montecarlo hasta que no se toque el botón para simular
HTMLUtils.ocultarSeccion(divTablaMontecarlo);

// Arrancamos la simulación
btnSimular.addEventListener('click', async () => {
  await simular();
});

const simular = async () => {
  alertGananciaPromDia.innerHTML = 'Ganancia promedio por día: ';
  // Validamos los parámetros ingresados por el usuario.
  if (!validarParametros()) return;
  if (Number(cboCantCajones.value) == 1) {
    cajones = 3;
  }
  if (Number(cboCantCajones.value) == 2) {
    cajones = 4;
  }
  if (Number(cboCantCajones.value) == 3){
    cajones = 1
  }

  if (Number(cboCompraFaltante.value) ==1){
    comprarFaltante = false;
  }
  if (Number(cboCompraFaltante.value) ==2)
  {
    comprarFaltante= true;
  }

      HTMLUtils.limpiarTabla(tablaMontecarlo);
      HTMLUtils.mostrarSeccion(divTablaMontecarlo);
      await monteCarlo.simular(dias, indiceDesde, cajones, comprarFaltante);

      HTMLUtils.agregarEncabezadoATabla(tablaMontecarlo);
      for (let i: number = 0; i < monteCarlo.getTablaMuestra().length; i++) {
        await HTMLUtils.agregarFilaATabla(
          monteCarlo.getTablaMuestra()[i],
          tablaMontecarlo
        );
      }
      alertGananciaPromDia.innerHTML += monteCarlo
        .getGananciaPromDia()
        .toFixed(2);
}

function validarParametros(): boolean {
  if (txtCantDias.value === '' || txtIndiceDesde.value === '') {
    alert('Tiene que ingresar todos los datos solicitados.');
    return false;
  }
  if (Number(cboCantCajones.value) <= 0 || Number(cboCantCajones.value) > 3) {
    alert('Seleccione cuantos cajones desea comprar por día');
    return false;
  }

  dias = Number(txtCantDias.value);
  indiceDesde = Number(txtIndiceDesde.value);

  if (dias <= 0) {
    alert('La cantidad de días a simular debe ser mayor a cero.');
    return false;
  }

  if (indiceDesde <= 0 || indiceDesde > dias) {
    alert('El día desde debe estar comprendido entre 1 y ' + dias + '.');
    return false;
  }
  return true;
}
