import { Link } from "react-router";
import type { FormProps, Input } from "../../types/interfaces";
import Button from "../Button/Button";
import "./form.css";
import ImageUploader from "../ImageUploader/ImageUploader";
import { useState } from "react";
//@eslint-disable
function Form<T>({
  submit,
  title,
  description,
  secondaryLink,
  inputs,
  onSubmit,
  isLoading,
  formType,
}: FormProps) {
  function classNameAssign(input: Input) {
    if (input.name.toLowerCase().includes("password")) return "half";
    if (input.name.includes("Name")) return "half";
    return "full";
  }
  const [formData,setFormData] = useState<T | undefined>({} as T);
  const formType1 = submit === "sign in" ? "login" : "register";
  const buttonType =
    submit === "sign in" || submit === "sign up" ? "submit" : "button";

  function onSubmitHandler(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(formData as T);
  }
console.log(formData)
  return formType !== "itemsManipulation" ? (
    <form className="form" onSubmit={onSubmitHandler}>
      {" "}
      <div className="heading">
        <div className="logo">
          <img src="/assets/Logo.png" alt="logo" />
        </div>
        <h1 className="title">{title}</h1>
      </div>
      <p className="description">{description}</p>
      <div className="inputs-container">
        {inputs.map((input) => (
          <div className="input-container" key={input.name}>
            {<label htmlFor={input.name}>{input.label}</label>}
            <div
              className={`${formType1 === "login" ? "full" : classNameAssign(input)}`}
            >
              {input.type === "file" ? (
                <div className="file-container">
                  <ImageUploader
                    onChange={(file: File) => (
                      setFormData({...formData,[input.name]:file})
                    )}
                  />
                </div>
              ) : (
                <input
                id={input.name}
                key={input.name}
                name={input.name}
                  required
                  type={input.type || "text"}
                  placeholder={input.placeholder}
                  onChange={(event) =>
                    setFormData({...formData,[input.name]:event.target.value})
                  }
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <Button
        content={submit as string}
        type={buttonType}
        isLoading={isLoading}
      />
      {secondaryLink ? (
        <p className="account">
          {secondaryLink.text}
          <span>
            <Link to={secondaryLink.to}>{secondaryLink.label}</Link>
          </span>
        </p>
      ) : null}
    </form>
  ) : (
    <form onSubmit={onSubmitHandler}>
      <div className="items_inputs-container">
        {inputs.map((input) => (
          <div
            className={`items_input-container ${input.type === "file" ? "items_file-container" : ""}`}
            key={input.name}
          >
            <label htmlFor={input.name}>{input.label}</label>
            {input.type === "file" ? (
              <>
                <ImageUploader
                defaultValue={input.value}
                  onChange={(file: File) => {
                     setFormData({...formData,[input.name]:file})
                  }}
                />
              </>
            ) : (
              <input
                {...input}
                id={input.name}
                key={input.name}
                name={input.name}
                defaultValue={input.value}
                value={formData[input.name]}
                required
                type={input.type || "text"}
                placeholder={input.placeholder}
                onChange={(event) =>
                   setFormData({...formData,[input.name]:event.target.value})
                }
              />
            )}
          </div>
        ))}
      </div>
      <div className="submit-btn">
        <Button content="Save" isLoading={isLoading} type="submit" />
      </div>
    </form>
  );
}

export default Form;
