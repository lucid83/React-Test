import React, { useState } from 'react';

type TextField = {
  type: 'text';
  name: string;
  label: string;
  defaultValue?: string;
};

type SelectField = {
  type: 'select';
  name: string;
  label: string;
  options: Array<{ value: string; label: string }>;
};

type CheckboxField = {
  type: 'checkbox';
  name: string;
  label: string;
  defaultChecked?: boolean;
};

type Field = TextField | SelectField | CheckboxField;

export class FormBuilder {
  private formId: string;
  private fields: Field[] = [];

  constructor(formId: string) {
    this.formId = formId;
  }

  addTextField(name: string, label: string, defaultValue = '') {
    this.fields.push({ type: 'text', name, label, defaultValue });
    return this;
  }

  addSelectField(
    name: string,
    label: string,
    options: Array<{ value: string; label: string }>
  ) {
    this.fields.push({ type: 'select', name, label, options });
    return this;
  }

  addCheckbox(name: string, label: string, defaultChecked = false) {
    this.fields.push({ type: 'checkbox', name, label, defaultChecked });
    return this;
  }

  build(): React.FC {
    const formId = this.formId;
    const fields = this.fields;

    const FormComponent: React.FC = () => {
      const [formState, setFormState] = useState<Record<string, any>>(() => {
        const initial: Record<string, any> = {};
        fields.forEach((field) => {
          switch (field.type) {
            case 'text':
              initial[field.name] = field.defaultValue ?? '';
              break;
            case 'select':
              initial[field.name] = field.options[0]?.value ?? '';
              break;
            case 'checkbox':
              initial[field.name] = field.defaultChecked ?? false;
              break;
          }
        });
        return initial;
      });

      const handleChange = (name: string, value: any) => {
        setFormState((prev) => ({ ...prev, [name]: value }));
      };

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Submitted:', formState);
      };

      return (
        <form id={formId} onSubmit={handleSubmit}>
          {fields.map((field) => {
            switch (field.type) {
              case 'text':
                return (
                  <div key={field.name}>
                    <label>
                      {field.label}:
                      <input
                        type="text"
                        name={field.name}
                        value={formState[field.name]}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                      />
                    </label>
                  </div>
                );
              case 'select':
                return (
                  <div key={field.name}>
                    <label>
                      {field.label}:
                      <select
                        name={field.name}
                        value={formState[field.name]}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                      >
                        {field.options.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                );
              case 'checkbox':
                return (
                  <div key={field.name}>
                    <label>
                      <input
                        type="checkbox"
                        name={field.name}
                        checked={formState[field.name]}
                        onChange={(e) => handleChange(field.name, e.target.checked)}
                      />
                      {field.label}
                    </label>
                  </div>
                );
            }
          })}
          <button type="submit">Submit</button>
        </form>
      );
    };

    return FormComponent;
  }
}
