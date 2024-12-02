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

  // 폼 데이터 초기화 함수
  // 폼 데이터를 전역으로 뿌려주기 때문에 다른 페이지에 이동해도 form페이지에 입력했던 폼데이터가 남아있게 되는 이슈 발생함.
  // 그래서 clear함수를 만들어서 전부 지워줌.
  const clearFormData = (): void => {
    setFormData(defaultFormData); // 초기 상태로 리셋
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

// Custom Hook
export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
};
