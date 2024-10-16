
import { Injectable } from '@angular/core';
import { FormField } from '@app/_models/interface';


@Injectable({
  providedIn: 'root'
})
export class DynamicService {
  private fields: FormField[] = [];
  private idCounter = 0;

  addField(type: string, label: string, placeholder?: string, options?: string[], required?: boolean) {
    const newField: FormField = {
      id: this.idCounter++,
      type,
      label,
      placeholder,
      options,
      required
    };
    this.fields.push(newField);
  }

  removeField(id: number) {
    this.fields = this.fields.filter(field => field.id !== id);
  }

  getFields() {
    return this.fields;
  }
}

