import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

import { validation } from "./utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onChange",
    resolver: zodResolver(validation),
  });
  
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data); // 名前を渡すことで入力値を監視
    console.log("onsubmit")
  };

  

  return (
    /* "handleSubmit" は "onSubmit" を呼び出す前に入力を検証します */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* "register" 関数を呼び出して入力をフックに登録します */}
      <input defaultValue="your name" {...register("name")} />
      <br />
      <p>{errors.name?.message as React.ReactNode}</p>
      
      <br />
      {/* 必須または他の標準HTML検証ルールで検証を含めます */}
      <input defaultValue="email" {...register("email")} />
      <br />
      {/* フィールド検証が失敗したときにエラーが返されます */}
      <p>{errors.email?.message as React.ReactNode}</p>
      <br />
      <input defaultValue="password" {...register("password")} />
      <br />
      {/* フィールド検証が失敗したときにエラーが返されます */}
      <p>{errors.password?.message as React.ReactNode}</p>
      <br />

      <input type="submit" />
    </form>
  );
}
