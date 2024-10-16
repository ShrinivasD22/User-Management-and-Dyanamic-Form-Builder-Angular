import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

interface FieldConfig {
    type: string;
    label: string;
    placeholder: string;
    options?: string[];
    validation: any[];
}

@Component({
    selector: 'app-dynamic-form-builder',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.less'],
})
export class DynamicFormBuilderComponent {
  form: FormGroup;
  fields: FieldConfig[] = [];
  selectedFieldType!: string;

  fieldTypes = [
      { label: 'Text', value: 'text' },
      { label: 'Textarea', value: 'textarea' },
      { label: 'Dropdown', value: 'select' },
      { label: 'Checkbox', value: 'checkbox' },
      { label: 'Radio Button', value: 'radio' },
  ];

  // Predefined options for dropdown and radio button
  dropdownOptions: string[] = ['Option 1', 'Option 2', 'Option 3'];
  radioOptions: string[] = ['M', 'F', 'Other'];

  constructor(private fb: FormBuilder) {
      this.form = this.fb.group({});
  }

  addField(selectedType: string) {
      let newField: FieldConfig;

      // Set the default values based on the selected type
      if (selectedType === 'select') {
          newField = {
              type: selectedType,
              label: 'Dropdown Field',
              placeholder: 'Select an option',
              options: this.dropdownOptions,
              validation: [],
          };
      } else if (selectedType === 'radio') {
          newField = {
              type: selectedType,
              label: 'Radio Button Field',
              placeholder: '',
              options: this.radioOptions,
              validation: [],
          };
      } else {
          newField = {
              type: selectedType,
              label: 'Label',
              placeholder: 'Placeholder',
              validation: [],
          };
      }

      this.fields.push(newField);
      this.createFormControl(newField);
  }

  createFormControl(field: FieldConfig) {
      const control = new FormControl(field.type === 'checkbox' ? false : '', field.validation);
      this.form.addControl(field.label, control);
  }

  removeField(index: number) {
      this.fields.splice(index, 1);
      this.form.removeControl(this.fields[index].label);
  }

  submit() {
      if (this.form.valid) {
          console.log(this.form.value);
          alert('Form submitted successfully!');
      } else {
          alert('Form is invalid. Please check your input.');
      }
  }
}





// // import { Component, OnInit } from '@angular/core';

// // @Component({
// //   selector: 'app-dynamic-form',
// //   templateUrl: './dynamic-form.component.html',
// //   styleUrls: ['./dynamic-form.component.less']
// // })
// // export class DynamicFormComponent implements OnInit {

// //   constructor() { }

// //   ngOnInit(): void {
// //   }

// // }
// // src/app/form-builder/form-builder.component.ts
// import { Component } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { FormField } from '@app/_models/interface';
// // import { FormField } from '../models/form-field.model';
// import { DynamicService } from '@app/_services/dynamic.service';

// @Component({
//   selector: 'app-form-builder',
//   templateUrl: './dynamic-form.component.html',
//   styleUrls: ['./dynamic-form.component.less']
// })
// export class FormBuilderComponent {
//   formFields: any[] = [];
//   dynamicForm: FormGroup;

//   constructor(private fb: FormBuilder) {
//     this.dynamicForm = this.fb.group({});
//   }

//   addField(type: string) {
//     const newField = {
//       name: `field${this.formFields.length + 1}`,
//       type,
//       label: '',
//       placeholder: '',
//       required: false
//     };
//     this.formFields.push(newField);
//     this.updateForm();
//   }

//   removeField(index: number) {
//     this.formFields.splice(index, 1);
//     this.updateForm();
//   }

//   updateForm() {
//     const formGroup: any = {};
//     this.formFields.forEach(field => {
//       const validators = field.required ? [Validators.required] : [];
//       formGroup[field.name] = ['', validators];
//     });
//     this.dynamicForm = this.fb.group(formGroup);
//   }

//   submitForm() {
//     if (this.dynamicForm.valid) {
//       console.log(this.dynamicForm.value);
//       alert('Form submitted successfully!');
//     } else {
//       alert('Please fill in the required fields.');
//     }
//   }
// }


