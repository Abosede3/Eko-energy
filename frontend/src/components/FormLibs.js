import { useState } from "react";
import { useField } from "formik";
import { ErrorMsg, StyledIcons, StyledLabel, StyledTextInput, StyledTextInputEmail } from './Styles'
import { FiEyeOff, FiEye } from "react-icons/fi";



export const TextInput = ({ icon, ...props }) => {
 const [field, meta] = useField(props)
 const [show, setShow] = useState(false)

 return (
   <div style={{ position: 'relative' }}>
     <StyledLabel htmlFor={props.name}>{props.label}</StyledLabel>
     {props.type !== 'password' && (
       <StyledTextInput
         invalid={meta.touched && meta.error}
         {...field}
         {...props}
       />
     )}



     {props.type === 'password' && (
       <StyledTextInput
         invalid={meta.touched && meta.error}
         {...field}
         {...props}
         type={show ? 'text' : 'password'}
       />
     )}

     <StyledIcons>{icon}</StyledIcons>

     {props.type === 'password' && (
       <StyledIcons onClick={() => setShow(!show)} right>
         {show && <FiEye />}
         {!show && <FiEyeOff />}
       </StyledIcons>
     )}
     {meta.touched && meta.error ? (
       <ErrorMsg>{meta.error}</ErrorMsg>
     ) : (
       <ErrorMsg style={{ visibility: 'hidden' }}>.</ErrorMsg>
     )}
   </div>
 )
   
  
}

export const TextInputEmail = ({ icon, ...props }) => {
   const [field, meta] = useField(props)
  
  return (
    <div style={{ position: 'relative' }}>
      <StyledLabel htmlFor={props.name}>{props.label}</StyledLabel>
      <StyledTextInputEmail
        invalid={meta.touched && meta.error}
        {...field}
        {...props}
      />

      <StyledIcons>{icon}</StyledIcons>

      {meta.touched && meta.error ? (
        <ErrorMsg>{meta.error}</ErrorMsg>
      ) : (
        <ErrorMsg style={{ visibility: 'hidden' }}>.</ErrorMsg>
      )}
    </div>
  )
}

