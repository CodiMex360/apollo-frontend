import {CardI} from '../cards/card.interface';
import {TiposCambioI} from '../configuracion/tipos-cambio';

export interface CobranzaProgI
{
    id?: number;
    contrato_id?: number;
    tarjeta_id?: number;
    cliente_id?: number;
    fecha_cargo?: string;
    tipo_cambio_id?: number;
    tipo_cambio?: number;
    monto?: number;
    monto_cobrado?: number;
    moneda?: string;
    moneda_cobrada?: string;
    tipo?: number;
    cobranza_seccion?: string;
    estatus?: number;
    fecha_procesado?: string;
    cod_banco?: string;
    res_banco?: string;
    fecha_reg?: string;
    created_at?: string;
    updated_at?: string;
    tarjeta?: CardI;
    cobranza_id: number;

    edit?: boolean;

    tipo_cambio_usado?: TiposCambioI
}

export type CobranzaTipo = 'tarjeta' | 'efectivo' | 'deposito' | 'cupon';
