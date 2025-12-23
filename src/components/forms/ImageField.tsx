import { ChangeEvent, useEffect, useState } from "react";
import Input from "./Input";
import { useField } from "formik";

import classes from "../../Form.module.css";

export default function ImageField(props: imageFieldProps) {
  const defaultImageSrc = "/images/logo192.png";

  const customProp = { label: props.label, type: props.type, name: props.name };
  const [field, meta] = useField<any>(customProp);
  const [imageURL, setImageURL] = useState<string>(field.value);

  useEffect(() => {
    setImageURL(field.value);
  }, [field.value]);

  const showPreview = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setImageURL((prevState) => x.target.result as string);
      };
      reader.readAsDataURL(imageFile);
      props.onSelect(imageFile);
    } else {
      setImageURL((prevState) => prevState);
    }
  };

  return (
    <div id={classes["image-form-container"]}>
      <Input
        id={props.name}
        name={props.name}
        className="form-control"
        type="file"
        accept="image/*"
        onChange={showPreview}
        label={props.label}
        invalid={false}
      />

      {imageURL ? (
        <img id="img-url" src={imageURL} alt={field.name} title={field.name} />
      ) : null}
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
