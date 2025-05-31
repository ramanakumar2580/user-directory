import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent {
  userForm: FormGroup;
  roles = ['Admin', 'User', 'Guest'];
  isEditMode: boolean;
  title: string = 'User Form';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = data.mode === 'edit';

    this.userForm = this.fb.group({
      name: [
        data.user?.name || '',
        [Validators.required, Validators.minLength(3)],
      ],
      email: [data.user?.email || '', [Validators.required, Validators.email]],
      role: [data.user?.role || '', Validators.required],
    });
    if (data?.title) this.title = data.title;
  }

  ngOnInit(): void {
    if (this.data?.user) {
      this.userForm.patchValue(this.data.user);
    }
  }

  submit() {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }

  close() {
    this.dialogRef.close();
  }

  get name() {
    return this.userForm.get('name');
  }
  get email() {
    return this.userForm.get('email');
  }
  get role() {
    return this.userForm.get('role');
  }
}
