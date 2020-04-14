import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [ProfileComponent],
    imports: [CommonModule],
    exports: [ProfileComponent]
})
export class ProfileModule {}
