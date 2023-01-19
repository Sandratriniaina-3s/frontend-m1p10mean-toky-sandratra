import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private formBuilder:FormBuilder) { }

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.initForm();
  }

  private initForm():FormGroup{
    return this.formBuilder.group({
      login:['', [Validators.required, Validators.email]],
      password:['', Validators.required]
    })
  }

}
