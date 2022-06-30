export class MCFloreria {
  private tablaMuestra: number[][];
  private tablaProbClima: any[][];
  private tablaDemandaSoleado: number[][];
  private tablaDemandaNublado: number[][];
  private gananciaPromDia: number;

  public async simular(
    dias: number,
    indiceDesde: number,
    cajones: number,
    comprarFaltante: boolean
  ): Promise<void> {
    this.tablaMuestra = [];
    this.gananciaPromDia = 0;

    // Definimos el rango de filas que vamos a mostrar
    let indiceHasta: number = indiceDesde + 399;
    if (indiceHasta > dias - 1) indiceHasta = dias;

    //Generación de tabla de probabilidad del clima y las de demanda
    this.generarTablaClima();
    this.generarTablaDemandaNublado();
    this.generarTablaDemandaSoleado();

    let dia: any[];
    let ingresoAcum: number = 0;
    let costoAcum: number = 0;
    let demanda: number = 0;
    let ks: number = 0;
    let ko: number = 0;
    let ingresoCementerio: number = 0;
    let ingresoDiario: number = 0;
    let costoTotal: number = 0;
    let ingresoTotal: number = 0;
    let stockDiario: number = 0;
    let costoFaltante: number = 0;
    let demandaDíaAntes: number = 8;

    for (let i: number = 1; i <= dias; i++) {
      dia = [i];

      let rndClima: number = Math.random();
      const clima: string = this.getClima(rndClima);
      dia.push(rndClima.toFixed(4), clima);

      let rndDemanda: number = Math.random();
      if (clima == 'Soleado') {
        demanda = this.getDemandaSoleado(rndDemanda);
      }
      if (clima == 'Nublado') {
        demanda = this.getDemandaNublado(rndDemanda);
      }
      dia.push(rndDemanda.toFixed(4), demanda);

      if (cajones == 3 || cajones == 4) {
        stockDiario = cajones * 4;
      }
      if (cajones == 1) {
        stockDiario = demandaDíaAntes;
      }
      dia.push(stockDiario);

      ko = 9 * 4 * cajones;

      if (stockDiario - demanda >= 0) {
        ks = 0;
        ingresoCementerio = (stockDiario - demanda) * 12 * 0.09;
        ingresoDiario = demanda * 12;
      } else {
        ks = (demanda - stockDiario) * 12 * 0.1;
        ingresoDiario = stockDiario * 12;
        if (comprarFaltante == true) {
          costoFaltante = (demanda - stockDiario) * 16;
        }
      }
      dia.push(
        ko,
        ks.toFixed(2),
        costoFaltante,
        ingresoCementerio.toFixed(2),
        ingresoDiario
      );

      costoTotal = ko + ks;
      costoAcum += costoTotal;
      dia.push(costoTotal, costoAcum.toFixed(2));

      ingresoTotal = ingresoDiario + ingresoCementerio;
      ingresoAcum += ingresoTotal;
      dia.push(ingresoTotal, ingresoAcum.toFixed(2));

      if ((i >= indiceDesde && i <= indiceHasta) || i == dias) {
        this.tablaMuestra.push(dia);
      }
      demandaDíaAntes = demanda;
    }
    this.gananciaPromDia = (ingresoAcum - costoAcum) / dias;
  }

  private generarTablaClima() {
    this.tablaProbClima = [];
    // Definición de las probabilidades
    let probSoleado: number = 0.67;
    let probNublado: number = 0.33;

    this.tablaProbClima.push(
      ['Soleado', probSoleado],
      ['Nublado', probNublado]
    );

    let probAcum: number = 0;
    for (let i: number = 0; i < this.tablaProbClima.length; i++) {
      const fila: number[] = this.tablaProbClima[i];
      const probabilidad: number = fila[1];
      probAcum += probabilidad;
      fila.push(probAcum);
    }
  }

  private getClima(rnd: number): string {
    for (let i: number = 0; i < this.tablaProbClima.length; i++) {
      const fila: any[] = this.tablaProbClima[i];
      if (rnd < fila[2]) return fila[0];
    }
    return 'Error en probabilidad del clima';
  }

  private generarTablaDemandaSoleado() {
    this.tablaDemandaSoleado = [];

    let prob14: number = 0.05;
    let prob17: number = 0.2;
    let prob20: number = 0.45;
    let prob24: number = 0.3;

    this.tablaDemandaSoleado.push(
      [14, prob14],
      [17, prob17],
      [20, prob20],
      [24, prob24]
    );

    let probAcumSoleado: number = 0;
    for (let i: number = 0; i < this.tablaDemandaSoleado.length; i++) {
      const filaSoleado: number[] = this.tablaDemandaSoleado[i];
      const probabilidadSoleado: number = filaSoleado[1];
      probAcumSoleado += probabilidadSoleado;
      filaSoleado.push(probAcumSoleado);
    }
  }

  private getDemandaSoleado(rnd: number): number {
    for (let i: number = 0; i < this.tablaDemandaSoleado.length; i++) {
      const filaSoleado: number[] = this.tablaDemandaSoleado[i];
      if (rnd < filaSoleado[2]) return filaSoleado[0];
    }
    return -1;
  }

  private generarTablaDemandaNublado() {
    this.tablaDemandaNublado = [];

    let prob9: number = 0.05;
    let prob11: number = 0.15;
    let prob14: number = 0.35;
    let prob16: number = 0.25;
    let prob20: number = 0.2;

    this.tablaDemandaNublado.push(
      [9, prob9],
      [11, prob11],
      [14, prob14],
      [16, prob16],
      [20, prob20]
    );

    let probAcumNublado: number = 0;
    for (let i: number = 0; i < this.tablaDemandaNublado.length; i++) {
      const filaNublado: number[] = this.tablaDemandaNublado[i];
      const probabilidadNublado: number = filaNublado[1];
      probAcumNublado += probabilidadNublado;
      filaNublado.push(probAcumNublado);
    }
  }

  private getDemandaNublado(rnd: number): number {
    for (let i: number = 0; i < this.tablaDemandaNublado.length; i++) {
      const filaNublado: number[] = this.tablaDemandaNublado[i];
      if (rnd < filaNublado[2]) return filaNublado[0];
    }
    return -1;
  }

  public getTablaMuestra(): number[][] {
    return this.tablaMuestra;
  }

  public getTablaDemandaSoleado(): number[][] {
    return this.tablaDemandaSoleado;
  }

  public getTablaDemandaNublado(): number[][] {
    return this.tablaDemandaNublado;
  }

  public getTablaClima(): any[][] {
    return this.tablaProbClima;
  }

  public getGananciaPromDia(): number {
    return this.gananciaPromDia;
  }
}
