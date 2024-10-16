// src/app/models/form-field.model.ts
export interface FormField {
  id: number;
  type: string;
  label: string;
  placeholder?: string;
  options?: string[]; // For dropdowns and radio buttons
  required?: boolean;
}
