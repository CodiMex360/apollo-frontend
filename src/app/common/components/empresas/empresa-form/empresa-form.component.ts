import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {FormBuilder, FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {EmpresasService} from "../../../../services/empresas.service";
import {EmpresasI} from "../../../../interfaces/empresas.interface";
import {GeneralService} from "../../../../services/general.service";
import {SweetMessagesService} from "../../../../services/sweet-messages.service";
import {ToastMessageService} from "../../../../services/toast-message.service";

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styleUrls: ['./empresa-form.component.scss'],
})
export class EmpresaFormComponent implements OnInit {
  @Input() asModal: boolean;
  @Input() empresa_id: number;
  public title: string;
  public empresaForm: FormGroup;
  public empresaData: EmpresasI;
  constructor(
    public modalCtrl: ModalController,
    private fb: FormBuilder,
    private empresasService: EmpresasService,
    private generalServ: GeneralService,
    private sweetMsg: SweetMessagesService,
    private toastServ: ToastMessageService
  ) {
    this.title = 'Formulario Empresa';
    this.empresaForm = this.fb.group({
      id: [null],
      nombre: [null, Validators.required],
      rfc: [null, Validators.required],
      direccion: [null, Validators.required],
      tel_contacto: [null, Validators.required],
      activo: [null]
    });
  }

  get ef() {
    return this.empresaForm.controls;
  }

  ngOnInit() {
    if (this.empresa_id) {
      this.loadEmpresaData();
    } else {
      this.initEmpresaForm();
    }
  }

  initEmpresaForm(data?) {
    this.empresaForm.setValue({
      id: (data && data.id) ? data.id : null,
      nombre: (data && data.nombre) ? data.nombre : null,
      rfc: (data && data.rfc) ? data.rfc : null,
      direccion: (data && data.direccion) ? data.direccion : null,
      tel_contacto: (data && data.tel_contacto) ? data.tel_contacto : null,
      activo: (data && data.activo) ? data.activo : 0,
    });
  }



  loadEmpresaData() {
    this.generalServ.presentLoading();
    this.empresasService.getDataById(this.empresa_id).subscribe(res => {
      this.generalServ.dismissLoading();
      if (res.ok === true) {
        this.initEmpresaForm(res.empresa);
      }
    }, error => {
      this.generalServ.dismissLoading();
      console.log(error);
    });
  }

  saveUpdate() {
    if (this.empresaForm.invalid) {
      this.sweetMsg.printStatus('Debe llenar los campos requeridos', 'warning');
      this.empresaForm.markAllAsTouched();
      return;
    }
    this.generalServ.presentLoading('Guardando cambios ...');
    this.empresasService.saveUpdate(this.empresaForm.value, this.empresa_id).subscribe(res => {
      this.generalServ.dismissLoading();
      this.dismiss(true);
      if (res.ok === true) {
        this.toastServ.presentToast('success', res.message, 'top');
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
