import React, { useState } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface TextField {
  type: 'text';
  name: string;
  label: string;
  defaultValue: string;
}

interface SelectField {
  type: 'select';
  name: string;
  label: string;
  options: SelectOption[];
  defaultValue: string;
}

interface CheckboxField {
  type: 'checkbox';
  name: string;
  label: string;
  defaultChecked: boolean;
}

type FormField = TextField | SelectField | CheckboxField;

type FormData = Record<string, string | boolean>;

class FormBuilder {
  private formId: string;
  private fields: FormField[];

  constructor(formId: string) {
    this.formId = formId;
    this.fields = [];
  }

  addTextField(
    name: string,
    label: string,
    defaultValue: string = ''
  ): FormBuilder {
    this.fields.push({
      type: 'text',
      name,
      label,
      defaultValue,
    });
    return this;
  }

  addSelectField(
    name: string,
    label: string,
    options: SelectOption[]
  ): FormBuilder {
    this.fields.push({
      type: 'select',
      name,
      label,
      options,
      defaultValue: options.length > 0 ? options[0].value : '',
    });
    return this;
  }

  addCheckbox(
    name: string,
    label: string,
    defaultChecked: boolean = false
  ): FormBuilder {
    this.fields.push({
      type: 'checkbox',
      name,
      label,
      defaultChecked,
    });
    return this;
  }

  build(): React.ComponentType {
    const formId = this.formId;
    const fields = [...this.fields];

    return function FormComponent() {
      // Initialize state based on field configurations
      const initialState: FormData = fields.reduce(
        (acc: FormData, field: FormField) => {
          if (field.type === 'checkbox') {
            acc[field.name] = field.defaultChecked;
          } else {
            acc[field.name] = field.defaultValue;
          }
          return acc;
        },
        {}
      );

      const [formData, setFormData] = useState<FormData>(initialState);

      const handleInputChange = (
        name: string,
        value: string | boolean
      ): void => {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };

      const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        console.log(formData);
        window.alert(JSON.stringify(formData));
      };

      return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <form id={formId} onSubmit={handleSubmit}>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Dynamic Form
            </h2>

            {fields.map((field: FormField, index: number) => (
              <div key={`${field.name}-${index}`} className="mb-4">
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {field.label}
                </label>

                {field.type === 'text' && (
                  <input
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] as string}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(field.name, e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}

                {field.type === 'select' && (
                  <select
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] as string}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      handleInputChange(field.name, e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {field.options.map((option: SelectOption) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}

                {field.type === 'checkbox' && (
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={field.name}
                      name={field.name}
                      checked={formData[field.name] as boolean}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange(field.name, e.target.checked)
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {field.label}
                    </span>
                  </div>
                )}
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
            >
              Submit
            </button>
          </form>
        </div>
      );
    };
  }
}
export default FormBuilder;
