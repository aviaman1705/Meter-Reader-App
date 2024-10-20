import { ChangeEvent, useEffect, useState } from "react";

import classes from "../../Form.module.css";

export default function ImageField(props: imageFieldProps) {
  const defaultImageSrc = "/images/logo192.png";
  const [imageURL, setImageURL] = useState(props.imageURL);

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
        id="image-upload"
        name={props.name}
        className={"form-control"}
        type="file"
        accept="image/*"
        onChange={showPreview}
      />
      <img src={imageURL} />
    </div>
  );
}

interface imageFieldProps {
  label: string;
  imageURL: string;
  name: string;
  onSelect?(file: File): void;
}

ImageField.defaultProps = {
  imageURL: "",
};
