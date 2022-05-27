import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './add-product/add-product.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddNewsComponent } from './add-news/add-news.component';
import { EditNewsComponent } from './edit-news/edit-news.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminNewsComponent } from './admin-news/admin-news.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularToastifyModule } from 'angular-toastify';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ImgUploadComponent } from '../upload/upload.component';
import { AdminMessagesComponent } from './admin-messages/admin-messages.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AuthorizeGuard } from '../../api-authorization/authorize.guard';
import { RoleGuard } from '../role.guard';
import { ProfileComponent } from '../shop/profile/profile.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { EditRoleComponent } from './edit-role/edit-role.component';
import { AdminRoleComponent } from './admin-role/admin-role.component';
import { AddUserRoleComponent } from './add-user-role/add-user-role.component';



@NgModule({
  declarations: [DashboardComponent, ProfileComponent, ImgUploadComponent,SidebarComponent, AddProductComponent, AddCategoryComponent, AddUserComponent, AddNewsComponent, EditNewsComponent, EditUserComponent, EditProductComponent, EditCategoryComponent, AdminCategoryComponent, AdminUserComponent, AdminProductComponent, AdminNewsComponent, AdminMessagesComponent, AdminOrdersComponent, AddRoleComponent, EditRoleComponent, AdminRoleComponent, AddUserRoleComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularToastifyModule,
    RouterModule.forRoot([
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthorizeGuard, RoleGuard], data: { roles: 'Admin' }},
      { path: 'add/product/:id', component: AddProductComponent, canActivate: [AuthorizeGuard, RoleGuard], data: { roles: 'Admin' } },
      { path: 'add/category', component: AddCategoryComponent, canActivate: [AuthorizeGuard, RoleGuard], data: { roles: 'Admin' } },
      { path: 'add/user', component: AddUserComponent, canActivate: [AuthorizeGuard, RoleGuard], data: { roles: 'Admin' } },
      { path: 'add/news', component: AddNewsComponent, canActivate: [AuthorizeGuard, RoleGuard], data: { roles: 'Admin' } },
      { path: 'edit/news/:id', component: EditNewsComponent, canActivate: [AuthorizeGuard, RoleGuard], data: { roles: 'Admin' } },
      { path: 'edit/user/:id', component: EditUserComponent, canActivate: [AuthorizeGuard, RoleGuard], data: { roles: 'Admin' } },
      { path: 'edit/product/:id', component: EditProductComponent, canActivate: [AuthorizeGuard, RoleGuard], data: { roles: 'Admin' } },
      { path: 'edit/category/:id', component: EditCategoryComponent, canActivate: [AuthorizeGuard, RoleGuard], data: { roles: 'Admin' }},
      { path: 'admin/category', component: AdminCategoryComponent, canActivate: [AuthorizeGuard, RoleGuard], data: { roles: 'Admin' } },
      { path: 'admin/user', component: AdminUserComponent, canActivate: [AuthorizeGuard, RoleGuard], data: { roles: 'Admin' }},
      { path: 'admin/product', component: AdminProductComponent, canActivate: [AuthorizeGuard, RoleGuard], data: { roles: 'Admin' } },
      { path: 'admin/news', component: AdminNewsComponent, canActivate: [AuthorizeGuard, RoleGuard], data: { roles: 'Admin' } },
      { path: 'sidebar', component: SidebarComponent, canActivate: [AuthorizeGuard, RoleGuard], data: { roles: 'Admin' } },
      { path: 'admin/messages', component: AdminMessagesComponent, canActivate: [AuthorizeGuard, RoleGuard], data: { roles: 'Admin' } },
      { path: 'admin/order/:id', component: AdminOrdersComponent, canActivate: [AuthorizeGuard, RoleGuard], data: { roles: 'Admin' } },
      { path: 'admin/role', component: AdminRoleComponent, canActivate: [AuthorizeGuard, RoleGuard], data: { roles: 'Admin' } },
      { path: 'edit/role/:id', component: EditRoleComponent, canActivate: [AuthorizeGuard, RoleGuard], data: { roles: 'Admin' } },
      { path: 'add/role', component: AddRoleComponent, canActivate: [AuthorizeGuard, RoleGuard], data: { roles: 'Admin' } },
      { path: 'add/user/role/:name/:id', component: AddUserRoleComponent, canActivate: [AuthorizeGuard, RoleGuard], data: { roles: 'Admin' } },
      { path: 'upload', component: ImgUploadComponent },
      { path: 'profile/:id', component: ProfileComponent },
   
    ])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AdminModule { }
