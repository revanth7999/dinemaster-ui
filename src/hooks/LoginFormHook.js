import { useState } from "react";

const LoginFormHook = (
  initialValues,
  validateOnChange = false,
  validate = () => ({}),
) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  // Handle field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    if (validateOnChange) {
      const newErrors = validate({ ...values, [name]: value });
      setErrors(newErrors);
    }
  };

  // Run full validation
  const runValidation = () => {
    const newErrors = validate(values);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // true if no errors
  };

  // Reset form
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleChange,
    runValidation,
    resetForm,
  };
};

export default LoginFormHook;
