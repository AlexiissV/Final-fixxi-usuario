import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'new-user',
    loadChildren: () => import('./pages/new-user/new-user.module').then( m => m.NewUserPageModule)
  },
  {
    path: 'new-tarea',
    loadChildren: () => import('./pages/new-tarea/new-tarea.module').then( m => m.NewTareaPageModule)
  },
  {
    path: 'view-proveedor',
    loadChildren: () => import('./pages/view-proveedor/view-proveedor.module').then( m => m.ViewProveedorPageModule)
  },
  {
    path: 'detalle-tarea',
    loadChildren: () => import('./pages/detalle-tarea/detalle-tarea.module').then( m => m.DetalleTareaPageModule)
  },
  {
    path: 'view-tareas',
    loadChildren: () => import('./pages/view-tareas/view-tareas.module').then( m => m.ViewTareasPageModule)
  },
  {
    path: 'view-presupuestos',
    loadChildren: () => import('./pages/view-presupuestos/view-presupuestos.module').then( m => m.ViewPresupuestosPageModule)
  },
  {
    path: 'detail-proveedor',
    loadChildren: () => import('./pages/detail-proveedor/detail-proveedor.module').then( m => m.DetailProveedorPageModule)
  },
  {
    path: 'detail-presupuesto',
    loadChildren: () => import('./pages/detail-presupuesto/detail-presupuesto.module').then( m => m.DetailPresupuestoPageModule)
  },
  {
    path: 'view-address',
    loadChildren: () => import('./pages/view-address/view-address.module').then( m => m.ViewAddressPageModule)
  },
  {
    path: 'add-address',
    loadChildren: () => import('./pages/add-address/add-address.module').then( m => m.AddAddressPageModule)
  },
  {
    path: 'modalchat',
    loadChildren: () => import('./pages/modalchat/modalchat.module').then( m => m.ModalchatPageModule)
  },
  {
    path: 'contacto',
    loadChildren: () => import('./pages/contacto/contacto.module').then( m => m.ContactoPageModule)
  },
  {
    path: 'modal-cali',
    loadChildren: () => import('./pages/modal-cali/modal-cali.module').then( m => m.ModalCaliPageModule)
  },
  {
    path: 'modal-miprst',
    loadChildren: () => import('./pages/modal-miprst/modal-miprst.module').then( m => m.ModalMiprstPageModule)
  },
  {
    path: 'view-card',
    loadChildren: () => import('./pages/view-card/view-card.module').then( m => m.ViewCardPageModule)
  },
  {
    path: 'views-diagnosticos',
    loadChildren: () => import('./pages/views-diagnosticos/views-diagnosticos.module').then( m => m.ViewsDiagnosticosPageModule)
  },
  {
    path: 'detalle-diagnostico',
    loadChildren: () => import('./pages/detalle-diagnostico/detalle-diagnostico.module').then( m => m.DetalleDiagnosticoPageModule)
  },
  {
    path: 'view-reclamo',
    loadChildren: () => import('./pages/view-reclamo/view-reclamo.module').then( m => m.ViewReclamoPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'add-card',
    loadChildren: () => import('./pages/add-card/add-card.module').then( m => m.AddCardPageModule)
  },
  {
    path: 'all-servi',
    loadChildren: () => import('./pages/all-servi/all-servi.module').then( m => m.AllServiPageModule)
  },
  {
    path: 'reset-pass',
    loadChildren: () => import('./pages/reset-pass/reset-pass.module').then( m => m.ResetPassPageModule)
  },
  {
    path: 'infocvv',
    loadChildren: () => import('./pages/infocvv/infocvv.module').then( m => m.InfocvvPageModule)
  },
  {
    path: 'view-img',
    loadChildren: () => import('./pages/view-img/view-img.module').then( m => m.ViewImgPageModule)
  },
  {
    path: 'view-noti',
    loadChildren: () => import('./pages/view-noti/view-noti.module').then( m => m.ViewNotiPageModule)
  },
  {
    path: 'mis-reclamos',
    loadChildren: () => import('./pages/mis-reclamos/mis-reclamos.module').then( m => m.MisReclamosPageModule)
  },
  {
    path: 'detail-reclamo',
    loadChildren: () => import('./pages/detail-reclamo/detail-reclamo.module').then( m => m.DetailReclamoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
