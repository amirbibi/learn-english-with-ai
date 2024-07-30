import { TextField, TextFieldProps } from "@mui/material";

interface FormFieldProps extends Omit<TextFieldProps, "name"> {
  name: string;
  label?: string;
}

const FormField: React.FC<FormFieldProps> = ({ name, label, ...props }) => {
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <TextField
      {...props}
      margin="normal"
      required
      fullWidth
      id={name}
      label={label || capitalizedName}
      name={name}
    />
  );
};

export default FormField;
