import { NextRouter } from "next/router";

/* Terms */
export const validateCheckTerms = (formData: any, router: any) => {
  if (!formData.terms && !formData.personal) {
    alert("약관에 동의해 주세요");
  } else if (!formData.terms) {
    alert("이용 약관에 동의해 주세요");
  } else if (!formData.personal) {
    alert("개인정보 수집에 동의해 주세요");
  } else {
    router.push("/signup/form");
  }
};

/* Form */
export const validateCheckForm = (formData: any, refs: any): Boolean => {
  let checkFlag = true;

  if (!formData.userName) {
    alert("이름 입력해 주세요.");
    console.log("refs.userNameRef.current:", refs.userNameRef.current);
    refs.userNameRef.current?.focus();
    checkFlag = false;
  } else if (!formData.userNickName) {
    alert("닉네임을 입력해 주세요.");
    refs.userNickNameRef.current.focus();
    checkFlag = false;
  } else if (!formData.email) {
    alert("이메일을 입력해 주세요.");
    refs.emailRef.current.focus();
    checkFlag = false;
  } else if (!formData.userPass) {
    alert("비밀번호를 입력해 주세요.");
    refs.userPassRef.current.focus();
    checkFlag = false;
  } else if (!formData.userPassCheck) {
    alert("비밀번호 확인을 입력해 주세요.");
    refs.userPassCheckRef.current.focus();
    checkFlag = false;
  }
  return checkFlag;
};

export const passCheck = (formData: any, refs: any): Boolean => {
  const pass = refs.userPassRef.current;
  const passCheck = refs.userPassCheckRef.current;

  if (formData.userPass !== formData.userPassCheck) {
    alert("비밀번호가 일치하지 않습니다.");
    /*    pass.value = "";
    passCheck.value = "";
    refs.userPassRef.current.focus(); */
    return false;
  }
  return true;
};

export const validateUserPass = (formData: any, refs: any): Boolean => {
  const passRegEx =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,16}$/;
  if (!formData.userPass || !passRegEx.test(formData.userPass)) {
    alert(
      "비밀번호는 대소문자, 숫자, 특수문자 중 3가지 이상을 조합하여 8자에서 16자 사이로 입력해 주세요."
    );
    refs.userPassRef.current.focus();
    return false;
  }
  return true;
};
