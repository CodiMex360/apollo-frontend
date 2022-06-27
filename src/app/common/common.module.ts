import { NgModule } from '@angular/core';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {HotelesListComponent} from "./components/hoteles/listado-hoteles/hoteles-list/hoteles-list.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../material/material.module";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";
import {HotelFormComponent} from "./components/hoteles/listado-hoteles/hotel-form/hotel-form.component";
import {SucursalesListComponent} from "./components/control-accesso/sucursales/sucursales-list/sucursales-list.component";
import {SucursalFormComponent} from "./components/control-accesso/sucursales/sucursal-form/sucursal-form.component";
import {MarcasVehiculosListComponent} from "./components/marcas-vehiculos/marcas-vehiculos-list/marcas-vehiculos-list.component";
import {MarcaVehiculoFormComponent} from "./components/marcas-vehiculos/marca-vehiculo-form/marca-vehiculo-form.component";
import {CategoriaVehiculosListComponent} from "./components/categorias-vehiculos/categoria-vehiculos-list/categoria-vehiculos-list.component";
import {CategoriaVehiculosFormComponent} from "./components/categorias-vehiculos/categoria-vehiculos-form/categoria-vehiculos-form.component";
import {UserFormComponent} from "./components/control-accesso/users/user-form/user-form.component";
import {UsersListComponent} from "./components/control-accesso/users/users-list/users-list.component";
import {AreasTrabajoListComponent} from "./components/control-accesso/areas-trabajo/areas-trabajo-list/areas-trabajo-list.component";
import {AreaTrabajoFormComponent} from "./components/control-accesso/areas-trabajo/area-trabajo-form/area-trabajo-form.component";
import {RolesListComponent} from "./components/control-accesso/roles/roles-list/roles-list.component";
import {RolFormComponent} from "./components/control-accesso/roles/rol-form/rol-form.component";
import {VehiculosListComponent} from "./components/vehiculos/vehiculos-list/vehiculos-list.component";
import {VehiculoFormComponent} from "./components/vehiculos/vehiculo-form/vehiculo-form.component";
import {ComisionistasTableComponent} from "./components/comisionistas/comisionistas-table/comisionistas-table.component";
import {ComisionistaFormComponent} from "./components/comisionistas/comisionista-form/comisionista-form.component";
import {ClientesTableComponent} from "./components/clientes/clientes-table/clientes-table.component";
import {ClienteFormComponent} from "./components/clientes/cliente-form/cliente-form.component";
import {TarjetaFormComponent} from "./components/tarjetas/tarjeta-form/tarjeta-form.component";
import {MatChipsModule} from "@angular/material/chips";
import {CameraComponent} from "./components/camera/camera.component";
import {SignatureCaptureComponent} from "./components/signature-capture/signature-capture.component";
import {MultiTableFilterComponent} from "./components/multi-table-filter/multi-table-filter.component";
import {ClaseVehiculoFormComponent} from './components/clases-vehiculos/clase-vehiculo-form/clase-vehiculo-form.component';
import {ClasesVehiculosTableComponent} from './components/clases-vehiculos/clases-vehiculos-table/clases-vehiculos-table.component';
import {TarifasExtrasFormComponent} from './components/configuracion/precios/tarifas-extras-form/tarifas-extras-form.component';
import {TarifasExtrasTableComponent} from './components/configuracion/precios/tarifas-extras-table/tarifas-extras-table.component';
import {UbicacionesFormComponent} from './components/configuracion/ubicaciones/ubicaciones-form/ubicaciones-form.component';
import {UbicacionesTableComponent} from './components/configuracion/ubicaciones/ubicaciones-table/ubicaciones-table.component';
import {TarifasApolloConfFormComponent} from './components/configuracion/precios/tarifas-apollo-conf-form/tarifas-apollo-conf-form.component';
import {ModelosDocsComponent} from './components/modelos-docs/modelos-docs.component';
import {TarifasCategoriasTableComponent} from './components/configuracion/precios/tarifas-categorias-table/tarifas-categorias-table.component';
import {TarifaCategoriaFormComponent} from './components/configuracion/precios/tarifa-categoria-form/tarifa-categoria-form.component';
import {FrecuenciaConfComponent} from './frecuencia-conf/frecuencia-conf.component';
import {InputModalComponent} from './components/input-modal/input-modal.component';
import {ChecklistInspectorZoneComponent} from './components/checklist-inspector-zone/checklist-inspector-zone.component';
import {DraggableResizableComponent} from './draggable-resizable/draggable-resizable.component';
import {ModalDragElementDetailsComponent} from './components/modal-drag-element-details/modal-drag-element-details.component';
import {CargosExtrasTableComponent} from './components/configuracion/precios/cargos-extras-table/cargos-extras-table.component';
import { CargosExtrasFormComponent } from './components/configuracion/precios/cargos-extras-form/cargos-extras-form.component';
import { VehiculosListContractComponent } from './components/vehiculos/vehiculos-list-contract/vehiculos-list-contract.component';


@NgModule({
  declarations: [
    HotelesListComponent,
    HotelFormComponent,
    SucursalesListComponent,
    SucursalFormComponent,
    MarcasVehiculosListComponent,
    MarcaVehiculoFormComponent,
    CategoriaVehiculosListComponent,
    CategoriaVehiculosFormComponent,
    UserFormComponent,
    UsersListComponent,
    AreasTrabajoListComponent,
    AreaTrabajoFormComponent,
    RolesListComponent,
    RolFormComponent,
    VehiculosListComponent,
    VehiculoFormComponent,
    ComisionistasTableComponent,
    ComisionistaFormComponent,
    ClientesTableComponent,
    ClienteFormComponent,
    TarjetaFormComponent,
    CameraComponent,
    SignatureCaptureComponent,
    MultiTableFilterComponent,
    ClaseVehiculoFormComponent,
    ClasesVehiculosTableComponent,
    TarifasExtrasFormComponent,
    TarifasExtrasTableComponent,
    UbicacionesFormComponent,
    UbicacionesTableComponent,
    TarifasApolloConfFormComponent,
    ModelosDocsComponent,
    TarifaCategoriaFormComponent,
    TarifasCategoriasTableComponent,
    FrecuenciaConfComponent,
    InputModalComponent,
    ChecklistInspectorZoneComponent,
    DraggableResizableComponent,
    ModalDragElementDetailsComponent,
    CargosExtrasTableComponent,
    CargosExtrasFormComponent,
    VehiculosListContractComponent
  ],
  exports: [
    HotelesListComponent,
    HotelFormComponent,
    SucursalesListComponent,
    SucursalFormComponent,
    MarcasVehiculosListComponent,
    MarcaVehiculoFormComponent,
    CategoriaVehiculosListComponent,
    CategoriaVehiculosFormComponent,
    UserFormComponent,
    UsersListComponent,
    AreasTrabajoListComponent,
    AreaTrabajoFormComponent,
    RolesListComponent,
    RolFormComponent,
    VehiculosListComponent,
    VehiculoFormComponent,
    ComisionistasTableComponent,
    ComisionistaFormComponent,
    ClientesTableComponent,
    ClienteFormComponent,
    TarjetaFormComponent,
    CameraComponent,
    SignatureCaptureComponent,
    MultiTableFilterComponent,
    ClaseVehiculoFormComponent,
    ClasesVehiculosTableComponent,
    TarifasExtrasFormComponent,
    TarifasExtrasTableComponent,
    UbicacionesFormComponent,
    UbicacionesTableComponent,
    TarifasApolloConfFormComponent,
    ModelosDocsComponent,
    TarifaCategoriaFormComponent,
    TarifasCategoriasTableComponent,
    FrecuenciaConfComponent,
    InputModalComponent,
    ChecklistInspectorZoneComponent,
    DraggableResizableComponent,
    ModalDragElementDetailsComponent,
    CargosExtrasTableComponent,
    CargosExtrasFormComponent,
    VehiculosListContractComponent
  ],
  entryComponents: [
    HotelesListComponent,
    HotelFormComponent,
    SucursalesListComponent,
    SucursalFormComponent,
    MarcasVehiculosListComponent,
    MarcaVehiculoFormComponent,
    CategoriaVehiculosListComponent,
    CategoriaVehiculosFormComponent,
    UserFormComponent,
    UsersListComponent,
    AreasTrabajoListComponent,
    AreaTrabajoFormComponent,
    RolesListComponent,
    RolFormComponent,
    VehiculosListComponent,
    VehiculoFormComponent,
    ComisionistasTableComponent,
    ComisionistaFormComponent,
    ClientesTableComponent,
    ClienteFormComponent,
    TarjetaFormComponent,
    CameraComponent,
    SignatureCaptureComponent,
    MultiTableFilterComponent,
    ClaseVehiculoFormComponent,
    ClasesVehiculosTableComponent,
    TarifasExtrasFormComponent,
    TarifasExtrasTableComponent,
    UbicacionesFormComponent,
    UbicacionesTableComponent,
    TarifasApolloConfFormComponent,
    ModelosDocsComponent,
    TarifaCategoriaFormComponent,
    TarifasCategoriasTableComponent,
    FrecuenciaConfComponent,
    InputModalComponent,
    ChecklistInspectorZoneComponent,
    DraggableResizableComponent,
    ModalDragElementDetailsComponent,
    CargosExtrasTableComponent,
    CargosExtrasFormComponent,
    VehiculosListContractComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        IonicModule,
        RouterModule,
        ReactiveFormsModule,
        MatChipsModule
    ],
  providers: [
    CurrencyPipe
  ]
})
export class AppCommonModule { }
