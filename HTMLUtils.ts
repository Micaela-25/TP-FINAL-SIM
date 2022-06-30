export module HTMLUtils {
  // Función para ocultar una sección (elemento div)
  export function ocultarSeccion(div: HTMLDivElement): void {
    div.style.display = 'none';
  }

  // Función para mostrar una sección (elemento div)
  export function mostrarSeccion(div: HTMLDivElement): void {
    div.style.display = 'block';
  }

  // Función que elimina todas las filas de la tabla HTML, incluyendo los encabezados.
  export function limpiarTabla(tabla: HTMLTableElement): void {
    for (let i: number = tabla.rows.length; i > 0; i--) {
      tabla.deleteRow(i - 1);
    }
  }

  // Función que carga el spinner y deshabilita el botón.
  export function mostrarSpinner(
    spinner: HTMLSpanElement,
    boton: HTMLButtonElement
  ) {
    spinner.hidden = false;
    boton.disabled = true;
  }

  // Función que oculta el spinner y habilita el botón.
  export function ocultarSpinner(
    spinner: HTMLSpanElement,
    boton: HTMLButtonElement
  ) {
    spinner.hidden = true;
    boton.disabled = false;
  }

  // Agregar una fila a una tabla html a partir de un vector pasado por parámetro.
  export async function agregarFilaATabla(
    fila: any[],
    tabla: HTMLTableElement
  ): Promise<void> {
    const tamFila: number = fila.length;
    let filaHTML: HTMLTableRowElement = tabla
      .getElementsByTagName('tbody')[0]
      .insertRow();
    for (let i: number = 0; i < fila.length; i++) {
      let celda: HTMLTableDataCellElement = filaHTML.insertCell();
      celda.appendChild(document.createTextNode(String(fila[i])));
    }
  }

  // Agregar las columnas al encabezado de la tabla.
  export function agregarEncabezadoATabla(tabla: HTMLTableElement): void {
    let filaHTML: HTMLTableRowElement = tabla
      .getElementsByTagName('thead')[0]
      .insertRow();

    let colReloj: HTMLTableHeaderCellElement = filaHTML.insertCell();
    colReloj.appendChild(document.createTextNode('Reloj (Días)'));

    let colRndClima: HTMLTableHeaderCellElement = filaHTML.insertCell();
    colRndClima.appendChild(document.createTextNode('RND Clima'));

    let colClima: HTMLTableHeaderCellElement = filaHTML.insertCell();
    colClima.appendChild(document.createTextNode('Clima '));

    let colRndDemanda: HTMLTableHeaderCellElement = filaHTML.insertCell();
    colRndDemanda.appendChild(document.createTextNode('RND Demanda'));

    let colDemanda: HTMLTableHeaderCellElement = filaHTML.insertCell();
    colDemanda.appendChild(document.createTextNode('Demanda'));

    let colStockDiario: HTMLTableHeaderCellElement = filaHTML.insertCell();
    colStockDiario.appendChild(document.createTextNode('Stock Diario'));

    let colko: HTMLTableHeaderCellElement = filaHTML.insertCell();
    colko.appendChild(document.createTextNode('Ko'));

    let colks: HTMLTableHeaderCellElement = filaHTML.insertCell();
    colks.appendChild(document.createTextNode('Ks'));

    let colCostoFaltante: HTMLTableHeaderCellElement = filaHTML.insertCell();
    colCostoFaltante.appendChild(document.createTextNode('Costo por faltante'));

    let colIngresoCementerio: HTMLTableHeaderCellElement =
      filaHTML.insertCell();
    colIngresoCementerio.appendChild(
      document.createTextNode('Ingreso Cementerio')
    );

    let colIngresoDiario: HTMLTableHeaderCellElement = filaHTML.insertCell();
    colIngresoDiario.appendChild(document.createTextNode('Ingreso por ventas'));

    let colCostoTotal: HTMLTableHeaderCellElement = filaHTML.insertCell();
    colCostoTotal.appendChild(document.createTextNode('Costo Total'));

    let colCostoAcumulado: HTMLTableHeaderCellElement = filaHTML.insertCell();
    colCostoAcumulado.appendChild(document.createTextNode('Costo Acumulado'));

    let colIngresoTotal: HTMLTableHeaderCellElement = filaHTML.insertCell();
    colIngresoTotal.appendChild(document.createTextNode('Ingreso Total'));

    let colIngresoAcumulado: HTMLTableHeaderCellElement = filaHTML.insertCell();
    colIngresoAcumulado.appendChild(
      document.createTextNode('Ingreso Acumulado')
    );
  }
}
