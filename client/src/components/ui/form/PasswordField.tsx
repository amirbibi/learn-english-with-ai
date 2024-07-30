import { useState } from "react";
import { IconButton, InputAdornment, TextFieldProps } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FormField from "./FormField";

interface FormFieldProps extends Omit<TextFieldProps, "name"> {
  name: string;
  label?: string;
}

const PasswordField: React.FC<FormFieldProps> = ({ name, label, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((show) => !show);

  return (
    <FormField
      {...props}
      name={name}
      label={label}
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={togglePasswordVisibility}
              edge="end"
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordField;
