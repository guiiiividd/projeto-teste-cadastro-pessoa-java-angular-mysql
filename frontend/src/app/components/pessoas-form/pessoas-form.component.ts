import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { PessoasService } from '../../services/pessoas.service';

@Component({
  selector: 'app-pessoas-form',
  templateUrl: './pessoas-form.component.html',
  styleUrl: './pessoas-form.component.css',
})
export class PessoasFormComponent {
  formGroupPessoa: FormGroup;

  status: string = '';

  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private cookieService: CookieService, private pessoasService: PessoasService) {
    this.formGroupPessoa = formBuilder.group({
      id: '',
      nome: '',
      idade: '',
    });
  }

  ngOnInit(): void {
    this.checkSelectedContact();
  }

  checkSelectedContact(): void {
    if (this.cookieService.check('pessoaId')) {
      this.showContact(Number(this.cookieService.get('pessoaId')));
      this.status = 'viewing';
    } else {
      this.status = 'saving';
    }
  }

  showContact(contactId: number): void {
    this.pessoasService.getPessoa(contactId).subscribe({
      next: (data) => this.formGroupPessoa.setValue(data),
    });
    this.status = 'viewing';
    this.formGroupPessoa.disable();
  }

  isSaving(): void {
    this.cookieService.delete('contactId');
    this.formGroupPessoa.reset();
    this.formGroupPessoa.enable();
    this.checkSelectedContact();
  }

  save(): void {
    this.submitted = true;
    if (this.formGroupPessoa.valid) {
      if (this.status == 'saving') {
        this.pessoasService.save(this.formGroupPessoa.value).subscribe({
          next: () => this.formGroupPessoa.reset(),
        });
      } else {
        this.pessoasService.update(this.formGroupPessoa.value).subscribe({
          next: () => {
            this.formGroupPessoa.reset();
            this.status = '';
            this.cookieService.delete('pessoaId');
            this.checkSelectedContact();
          },
        });
      }
      this.submitted = false;
    }
  }


  isEditing() {
    this.status = 'editing';
    this.formGroupPessoa.enable();
  }

  get nome(): any {
    return this.formGroupPessoa.get('nome');
  }

  get idade(): any {
    return this.formGroupPessoa.get('idade');
  }
}
