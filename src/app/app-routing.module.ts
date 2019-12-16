import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactCreateComponent } from './contact-create/contact-create.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { PrintComponent } from './print/print.component';
import { FilesComponent } from './files/files.component';


const routes: Routes = [
  {path:  "", pathMatch:  "full",redirectTo:  "home"},
  {path: "home", component: HomeComponent},
  {path: "contact-create", 
      children: [
        {
          path: '',
          component: ContactCreateComponent
        },
        {
          path: ':id',
          component: ContactCreateComponent
        }
      ]
    },
  {path: "contact-list", component: ContactListComponent},
  {path: "print", component: PrintComponent},
  {path: "files", component: FilesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
