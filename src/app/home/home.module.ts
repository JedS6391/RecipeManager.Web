import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { ProfileModule } from '../profile/profile.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule, RouterModule]
})
export class HomeModule {}
