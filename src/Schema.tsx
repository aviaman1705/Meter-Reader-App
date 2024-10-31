import * as yup from "yup";
import YupPassword from "yup-password";
import { parse } from "date-fns";

YupPassword(yup);

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .min(2, "שם חייב להכיל להכיל 2 תווים לפחות")
    .required("חובה להזין שם"),
  email: yup.string().email("הזן מייל תקין").required("חובה להזין מייל"),
  password: yup
    .string()
    .password()
    .min(6, "סיסמא חייבת להכיל 6 תווים לפחות")
    .minNumbers(1, "סיסמא חייבת להכיל ספרה 1 לפחות")
    .minSymbols(1, "סיסמא חייבת להכיל תו מיוחד 1")
    .minLowercase(1, "סיסמא חייבת להכיל אות 1 קטנה")
    .minUppercase(1, "סיסמא חייבת להכיל אות 1 גדולה")
    .required("חובה להזין סיסמא"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("הזן מייל תקין").required("חובה להזין מייל"),
  password: yup
    .string()
    .password()
    .min(6, "סיסמא חייבת להכיל 6 תווים לפחות")
    .minNumbers(1, "סיסמא חייבת להכיל ספרה 1 לפחות")
    .minSymbols(1, "סיסמא חייבת להכיל תו מיוחד 1")
    .minLowercase(1, "סיסמא חייבת להכיל אות 1 קטנה")
    .minUppercase(1, "סיסמא חייבת להכיל אות 1 גדולה")
    .required("חובה להזין סיסמא"),
});

export const userDetailsSchema = yup.object().shape({
  userName: yup
    .string()
    .required("שם משתמש הוא שדה חובה")
    .min(2, "שם משתמש חייב להכיל 2 תווים לפחות"),
  email: yup.string().required("מייל הוא שדה חובה").email("שדה מייל לא תקין"),
  phone: yup
    .string()
    .required("טלפון הוא שדה חובה")
    .matches(
      /[0]{1}[2-9]{1,2}\-?[0-9]{7}/,
      "שדה טלפון חייב להיות עם קידומית מישראל"
    ),
});

export const trackSchema = yup.object({
  fromDate: yup
    .date()
    .transform(function (value, originalValue) {
      if (this.isType(value)) {
        return value;
      }
      const result = parse(originalValue, "dd.MM.yyyy", new Date());
      return result;
    })
    .required("שדה מ-תאריך הוא שדה חובה!"),
  toDate: yup
    .date()
    .transform(function (value, originalValue) {
      if (this.isType(value)) {
        return value;
      }
      const result = parse(originalValue, "dd.MM.yyyy", new Date());
      return result;
    })
    .min(
      yup.ref("fromDate"),
      "שדה עד תאריך חייב להיות גדול הוא שווה לשדה מ-תאריך"
    )
    .required("שדה עד תאריך הוא שדה חובה!"),
  notebookId: yup.string().required("חובה לבחור מספר פנקס!"),
  desc: yup
    .string()
    .required("שדה תיאור הוא שדה חובה!")
    .min(2, "חובה להזין 2 תווים לפחות!"),
  called: yup
    .number()
    .required("שדה נקרא הוא שדה חובה!")
    .min(0, "לא ניתן להזין מספר שלילי"),
  unCalled: yup
    .number()
    .required("שדה לא נקרא הוא שדה חובה!")
    .min(0, "לא ניתן להזין מספר שלילי"),
});
