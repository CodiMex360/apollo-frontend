export enum ContratosStatusE
{
  ELIMINADO = 0,
  BORRADOR = 1,
  RENTADO = 2,
  RETORNO = 3
}

export class ContratosStatus
{
  static labelStatus(estatus) {
    switch (estatus) {
      case 0:
        return 'ELIMINADO';
      case 1:
        return 'BORRADOR';
      case 2:
        return 'RENTADO';
      case 3:
        return 'RETORNO';
      default:
        return '--'
    }
  }
}
