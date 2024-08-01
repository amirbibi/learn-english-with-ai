import { TextField, TextFieldProps } from "@mui/material";

interface FormTextFieldProps extends Omit<TextFieldProps, "name"> {
  name: string;
  label?: string;
}

const FormTextField: React.FC<FormTextFieldProps> = ({
  name,
  label,
  ...props
}) => {
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

export default FormTextField;
