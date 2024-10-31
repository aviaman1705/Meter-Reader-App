import { ChangeEvent, useEffect, useState } from "react";
import { useField } from "formik";

import classes from "../../Form.module.css";

export default function ImageField(props: imageFieldProps) {
  const defaultImageSrc = "/images/logo192.png";

  const customProp = { label: props.label, type: props.type, name: props.name };
  const [field, meta] = useField(customProp);
  const [imageURL, setImageURL] = useState<string>("");

  useEffect(() => {}, [imageURL]);

  const showPreview = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setImageURL(x.target.result as string);
      };
      reader.readAsDataURL(imageFile);
      props.onSelect(imageFile);
    } else {
      setImageURL(defaultImageSrc);
    }
  };

  return (
    <div id={classes["image-form-container"]}>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        id={props.name}
        name={props.name}
        className={"form-control"}
        type="file"
        accept="image/*"
        onChange={showPreview}
      />
      {!imageURL ? (
        <img id="img-field" src={field.value} />
      ) : (
        <img id="img-url" src={imageURL} />
      )}
    </div>
  );
}

interface imageFieldProps {
  label: string;
  name: string;
  type: "file";
  onSelect?(file: File): void;
}

ImageField.defaultProps = {
  type: "file",
};
