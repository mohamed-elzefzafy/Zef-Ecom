import  { FocusEvent } from "react"
import { Form } from "react-bootstrap"
import { FieldValues, Path, UseFormRegister } from "react-hook-form"

type TInputProps <TFieldsValue extends FieldValues> = {
  label : string,
  name : Path<TFieldsValue>,
  type? : string,
  register : UseFormRegister<TFieldsValue>,
  error : string,
  onBlur ?: (e : FocusEvent<HTMLInputElement>) => void,
  formText? : string,
  success? : string,
  disabled ? : boolean,
}

const Input = <TFieldsValue extends FieldValues> ({ label , type = "text" , register , 
  name  , error , onBlur , formText ,success , disabled} : TInputProps<TFieldsValue>) => {

  const onBlurHandler = (e : FocusEvent<HTMLInputElement>) => {
if (onBlur) {
onBlur(e);
register(name).onBlur(e);

} else {
  register(name).onBlur(e);
}

  };

  return (
    <Form.Group >
    <Form.Label>{label}</Form.Label>
    <Form.Control type={type}  
    {...register(name)}
    onBlur={onBlurHandler}
    isInvalid={error ? true : false}
    isValid={success ? true : false}
    disabled={disabled}
    />
    <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    <Form.Control.Feedback type="valid">{success}</Form.Control.Feedback>
    {formText && <Form.Text muted > {formText}</Form.Text>}
  </Form.Group>
  )
}

export default Input;