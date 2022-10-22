import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CardsConfig} from "../../../../interfaces/cards/cards-config";
import {Months} from "../../../../interfaces/shared/months";
import {CardConfig} from "../../../../interfaces/cards/cardConfig";
import * as moment from 'moment';
import {SweetMessagesService} from "../../../../services/sweet-messages.service";
import {ModalController} from "@ionic/angular";
import {CardI} from "../../../../interfaces/cards/card.interface";
import {TarjetaService} from "../../../../services/tarjeta.service";
import {GeneralService} from "../../../../services/general.service";
import {ToastMessageService} from "../../../../services/toast-message.service";
import {CobranzaTipoE} from '../../../../enums/cobranza-tipo.enum';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import {ConversionMonedaService} from '../../../../services/conversion-moneda.service';
import {TiposCambioI} from '../../../../interfaces/configuracion/tipos-cambio';

@Component({
  selector: 'app-tarjeta-form',
  templateUrl: './tarjeta-form.component.html',
  styleUrls: ['./tarjeta-form.component.scss'],
})
export class TarjetaFormComponent implements OnInit {

  //@Output() closeModal = new EventEmitter();
  //@Output() submitCard = new EventEmitter();
  //@Input() disableLocations: boolean;
  //@Input() ownerName: string;
  @Input() returnCapture = false;
  // @ViewChild('compInfo') compInfo :

  public cardData: CardI;
  @Input() asModal: boolean;
  @Input() card_id: number;
  @Input() cliente_id: number;
  @Input() loadLoading = true;
  @Input() needCaptureAmount = false;
  @Input() cod_banco: string;
  @Input() montoCobrado: number;
  @Input() tipoPago = null;
  @Input() titularTarj = null;
  @Input() montoCobrar: number;

  @Input() divisa_id: number = 1;

  public title = 'Formulario Tarjeta';

  public cardForm: FormGroup;
  public cardConf = CardsConfig;
  public cardConfig: CardConfig;
  public months = Months;
  public validYears: any[];
  public cn1Value = [];
  public saveBtnText = 'Add Card';

  public minValidDate = moment().format('YYYY-MM-DD');

  public converionSaldo: number;
  public tipoCambioTomado: TiposCambioI;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: SweetMessagesService,
    public modalCtrl: ModalController,
    public tarjetaServ: TarjetaService,
    public generalServ: GeneralService,
    private toastServ: ToastMessageService,
    public convMonedaServ: ConversionMonedaService
  ) { }

  ngOnInit() {
    this.initCardForm();

    this.validYears = this.getYears();
    if (this.card_id) {
      this.loadTarjetaData();
    } else {
      this.fillCardForm();
    }

    if (this.divisa_id && this.divisa_id !== 1) {
      this.handleDivisaChange();
    }
  }

  private getYears() {
    const years = [];
    const dateStart = moment();
    const dateEnd = moment().add(10, 'y');
    while (dateEnd.diff(dateStart, 'years') >= 0) {
      years.push(dateStart.format('YYYY'));
      dateStart.add(1, 'year');
    }
    return years;
  }

  initCardForm() {
    this.cardForm = this.formBuilder.group({
      c_name: ['', [Validators.required]],
      c_cn1: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      c_cn2: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      c_cn3: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      c_cn4: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      c_month: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      c_year: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      c_code: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      c_type: ['', [Validators.required]],
      c_charge_method: [''],

      cod_banco: [null],
      monto: [null]
    });

    if (this.needCaptureAmount) {
      this.cardForm.controls.cod_banco.setValidators(Validators.required);
      this.cardForm.controls.monto.setValidators(Validators.required);
    }
  }

  async fillCardForm(data?) {
    //this.initCardForm();
    if (!data) {
      this.saveBtnText = 'Add Card';
    } else {
      this.saveBtnText = 'Save Card';
    }
    // await this.getCountries();
    this.cardForm.setValue({
      c_name: data && data.c_name ? data.c_name : this.titularTarj,
      c_cn1: data && data.c_cn1 ? parseInt(data.c_cn1, 10)  : null,
      c_cn2: data && data.c_cn2 ? parseInt(data.c_cn2, 10) : null,
      c_cn3: data && data.c_cn3 ? parseInt(data.c_cn3, 10) : null,
      c_cn4: data && data.c_cn4 ? parseInt(data.c_cn4, 10) : null,
      c_month: data && data.c_month ? data.c_month : null,
      c_year: data && data.c_year ? data.c_year : null,
      c_code: data && data.c_code ? data.c_code : null,
      c_type: data && data.c_type ? data.c_type : null,
      c_charge_method: (data && data.c_charge_method) ? data.c_charge_method : this.tipoPago,

      cod_banco: this.cod_banco ? this.cod_banco : null,
      monto: this.montoCobrado ? this.montoCobrado : null
    });
  }

  loadTarjetaData() {
    if (this.loadLoading) {
      this.generalServ.presentLoading();
    }
    this.tarjetaServ.getDataById(this.card_id).subscribe(async res => {
      if (this.loadLoading) {
        this.generalServ.dismissLoading();
      }
      if (res.ok === true) {
        this.cardData = res.tarjeta;
        await this.fillCardForm(res.tarjeta);
      }
    }, error => {
      if (this.loadLoading) {
        this.generalServ.dismissLoading();
      }
      console.log(error);
    });
  }

  changeInputMax(value) {
    this.cardConfig = this.cardConf.find((x) => x.desc === value);
    this.cardForm.controls.c_cn4.setValue(null);
    this.cardForm.controls.c_code.setValue(null);

    if (this.cardForm.controls.c_type.value !== 'DINERS CLUB') {
      this.cardForm.controls.c_type.setValue(this.cardConfig.desc);
    }
  }

  // Función para manejar si el usuario da enter y pasar al siguiente input
  keytab(event, _maxLength) {
    // tratamos de predecir que tipo de tarjeta es
    if (event.srcElement.id === 'c_cn1') {
      let cardType: CardConfig[];

      const valueEnter = event.target.value;

      if (!valueEnter) {
        this.cn1Value = [];
      } else {
        const numValue = valueEnter;
        this.cn1Value = [];

        for (let i = 0; i < numValue.length - 1; i++) {
          this.cn1Value[i] = numValue[i];
        }

        this.cn1Value.push(numValue);

        cardType = this.cardConf.filter((x) => {
          const element = x.divine;

          const results = element.filter((n) => {
            for (let i = 0; i < this.cn1Value.length; i++) {
              return n[i].includes(this.cn1Value[i]);
            }
          });
          return results.length;
        });

        if (cardType && cardType.length > 0) {
          this.changeInputMax(cardType[0].desc);
        } else {
          if (this.cardForm.controls.c_type.value !== 'DINERS CLUB') {
            this.cardForm.controls.c_type.setValue(null);
            this.cardForm.controls.c_type.markAsTouched();
          }
        }
      }
    }

    // return;
    if (
      event.srcElement.id === 'c_cn1' &&
      event.target.value.length === _maxLength
    ) {
      document.getElementById('c_cn2').focus();
    }
    if (
      event.srcElement.id === 'c_cn2' &&
      event.target.value.length === _maxLength
    ) {
      document.getElementById('c_cn3').focus();
    }
    if (
      event.srcElement.id === 'c_cn3' &&
      event.target.value.length === _maxLength
    ) {
      document.getElementById('c_cn4').focus();
    }

  }


  //#endregion

  handleDivisaChange() {
    this.tipoCambioTomado = this.convMonedaServ.tiposCambio.find(tipoC => tipoC.divisa_base_id === this.divisa_id);
    if (this.tipoCambioTomado && this.tipoCambioTomado.divisa_base !== 'MXN') {
      this.converionSaldo = (this.montoCobrar / Number(this.tipoCambioTomado.tipo_cambio));
    } else {
      this.converionSaldo = this.montoCobrar;
      this.tipoCambioTomado = {
        id: null,
        tipo_cambio: 1,
        divisa_base: 'MXN'
      };
    }
  }

  saveUpdate() {

    if (this.cardForm.invalid) {
      this.messageService.printStatus('Revisa el formulario, hay campos por validar', 'warning');
      this.cardForm.markAllAsTouched();
      return;
    }
    if (this.cardForm.controls.c_charge_method.value === CobranzaTipoE.PAGOTARJETA) {
      if (!this.card_id && this.cardForm.controls.monto.value > this.converionSaldo){
        this.messageService.printStatus('El monto es mayor al saldo a cobrar', 'warning');
        return;
      }
    }
    const cardData = this.cardForm.value;
    const c_number =
      String(cardData.c_cn1) +
      String(cardData.c_cn2) +
      String(cardData.c_cn3) +
      String(cardData.c_cn4);

    let montoBase = cardData.monto;
    if (this.tipoCambioTomado && this.tipoCambioTomado.divisa_base !== 'MXN') {
      montoBase = (cardData.monto * Number(this.tipoCambioTomado.tipo_cambio));
    }
    const card = {
      id: (this.card_id) ? this.card_id : null,
      c_number,
      c_name: cardData.c_name,
      c_cn1: cardData.c_cn1,
      c_cn2: cardData.c_cn2,
      c_cn3: cardData.c_cn3,
      c_cn4: cardData.c_cn4,
      c_month: cardData.c_month,
      c_year: cardData.c_year,
      c_code: cardData.c_code,
      c_type: cardData.c_type,
      c_charge_method: cardData.c_charge_method,
      c_address: (cardData.c_address) ? cardData.c_address : null,
      c_country: (cardData.c_country) ? cardData.c_country : null,
      c_state: (cardData.c_state) ? cardData.c_state : null,
      c_city: (cardData.c_city) ? cardData.c_city : null,
      c_zip: (cardData.c_zip) ? cardData.c_zip : null,
      cliente_id: (this.cliente_id) ? this.cliente_id : null,
      cod_banco: cardData.cod_banco,
      monto: montoBase,
      monto_cobrado: cardData.monto,
      tipoCambio: this.tipoCambioTomado,
      divisaId: this.divisa_id
    };


    if (this.loadLoading) {
      this.generalServ.presentLoading('Guardando cambios ...');
    }
    this.tarjetaServ.saveUpdate(card, this.card_id).subscribe(res => {
      if (this.loadLoading) {
        this.generalServ.dismissLoading();
      }
      if (res.ok === true) {
        this.card_id = res.card_id;
        card.id = res.card_id;
        if (this.returnCapture == true) {
          this.dismiss(false, card);
        } else {
          this.dismiss(true, null);
        }
        this.toastServ.presentToast('success', res.message, 'top');
      }
    }, error => {
      console.log(error);
      this.messageService.printStatusArray(error.error.errors, 'error');
      if (this.loadLoading) {
        this.generalServ.dismissLoading();
      }
    });
  }

  dismiss(reload?, _data?) {
    this.modalCtrl.dismiss({
      reload,
      info: _data
    });
  }
}
