import { Component, Input } from '@angular/core';
import { EOIApplicationForm } from '../eoi-application/eoi-application-form';
import { IFormGroup } from '@rxweb/reactive-form-validators';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'drr-step-8',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  templateUrl: './step-8.component.html',
  styleUrl: './step-8.component.scss',
})
export class Step8Component {
  @Input()
  eoiApplicationForm!: IFormGroup<EOIApplicationForm>;
}
