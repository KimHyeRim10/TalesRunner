"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface FormData {
  terms: boolean;
  personal: boolean;
  sns: boolean;
  userName: string;
  userNickName: string;
  email: string;
  userPass: string;
  userPassCheck: string;
}

interface FormContextProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheck: (type: string, isChecked: boolean) => void;
  clearFormData: () => void;
}

const defaultFormData: FormData = {
  terms: false,
  personal: false,
  sns: false,
  userName: "",
  userNickName: "",
  email: "",
  userPass: "",
  userPassCheck: "",
};

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheck = (type: string, isChecked: boolean): void => {
    if (type === "all") {
      setFormData((prevState) => ({
        ...prevState,
        terms: isChecked,
        personal: isChecked,
        sns: isChecked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [type]: isChecked,
      }));
    }
  };

  const clearFormData = (): void => {
    setFormData(defaultFormData);
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        handleChange,
        handleCheck,
        clearFormData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
};
