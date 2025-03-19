export const searchValidationRules = {
  required: [
    (value: string) => {
      if (value && value.trim() !== '') return true

      return 'Campo requerido'
    }
  ]
}
