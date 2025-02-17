import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalController} from '@ionic/angular';
import {GeneralService} from '../../../../../services/general.service';
import {SweetMessagesService} from '../../../../../services/sweet-messages.service';
import {ToastMessageService} from '../../../../../services/toast-message.service';
import {ConversionMonedaService} from '../../../../../services/conversion-moneda.service';
import {DivisasI} from '../../../../../interfaces/configuracion/divisas.interface';

@Component({
  selector: 'app-tipo-cambio-form',
  templateUrl: './tipo-cambio-form.component.html',
  styleUrls: ['./tipo-cambio-form.component.scss'],
})
export class TipoCambioFormComponent implements OnInit {

  @Input() asModal: boolean;
  @Input() tipo_cambio_id: number;
  public title: string;
  public tipoCambioForm: FormGroup;
  public divisasList: DivisasI[] = [];

  constructor(
    public modalCtrl: ModalController,
    private fb: FormBuilder,
    private conversionMonedaServ: ConversionMonedaService,
    private generalServ: GeneralService,
    private sweetMsg: SweetMessagesService,
    private toastServ: ToastMessageService
  ) {
    this.title = 'Formulario Tipo de Cambio';
    this.tipoCambioForm = this.fb.group({
      divisa_base_id: [null, Validators.required],
      divisa_base: [null, Validators.required],
      tipo_cambio: [null, Validators.required],
      divisa_conversion_id: [null, Validators.required],
      divisa_conversion: [null, Validators.required]
    });
  }

  get tc() {
    return this.tipoCambioForm.controls;
  }

  ngOnInit() {
    if (this.tipo_cambio_id) {
      this.loadTipoCambioData();
    } else {
      this.initTipoCambioForm();
    }

    this.loadDivisas();
  }

  initTipoCambioForm(data?) {
    this.tipoCambioForm.setValue({
      divisa_base_id: (data && data.divisa_base_id) ? data.divisa_base_id : null,
      divisa_base: (data && data.divisa_base) ? data.divisa_base : null,
      tipo_cambio: (data && data.tipo_cambio) ? data.tipo_cambio : null,
      divisa_conversion_id: (data && data.divisa_conversion_id) ? data.divisa_conversion_id : null,
      divisa_conversion: (data && data.divisa_conversion) ? data.divisa_conversion : null
    });
  }

  loadDivisas() {
    this.conversionMonedaServ.getAllDivisas().subscribe(res =>  {
      if (res.ok) {
        this.divisasList = res.data
      }
    }, error => {
      console.log(error);
      this.sweetMsg.printStatusArray(error.error.errors, 'error');
    })
  }



  loadTipoCambioData() {
    this.generalServ.presentLoading();
    let payload = {
      id: this.tipo_cambio_id
    }
    this.conversionMonedaServ.getDataById(payload).subscribe(res => {
      this.generalServ.dismissLoading();
      if (res.ok === true) {
        this.initTipoCambioForm(res.data);
      }
    }, error => {
      this.generalServ.dismissLoading();
      console.log(error);
    });
  }

  catchDivisaChange(formControlName: string) {
    let divisaData = this.divisasList.find((divisa) => divisa.id === this.tipoCambioForm.controls[formControlName].value);
    if (divisaData) {
      if (formControlName === 'divisa_base_id') {
        this.tipoCambioForm.controls.divisa_base.patchValue(divisaData.divisa_iso);
      } else if (formControlName === 'divisa_conversion_id') {
        this.tipoCambioForm.controls.divisa_conversion.patchValue(divisaData.divisa_iso);
      }
    }
  }

  saveUpdate() {
    if (this.tipoCambioForm.invalid) {
      this.sweetMsg.printStatus('Debe llenar los campos requeridos', 'warning');
      this.tipoCambioForm.markAllAsTouched();
      return;
    }
    this.generalServ.presentLoading('Guardando cambios ...');

    this.conversionMonedaServ.save(this.tipoCambioForm.value).subscribe(async res => {
      this.generalServ.dismissLoading();

      if (res.ok === true) {
        this.toastServ.presentToast('success', res.message, 'top');
        await this.conversionMonedaServ.loadTiposCambios()
        this.dismiss(true);
      }
    }, error => {
      console.log(error);
      this.generalServ.dismissLoading();
    });
  }

  dismiss(reload?) {
    this.modalCtrl.dismiss({
      reload
    });
  }


}
