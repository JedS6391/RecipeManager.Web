import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [ProfileComponent],
    imports: [CommonModule, RouterModule],
    exports: [ProfileComponent]
})
export class ProfileModule {}
