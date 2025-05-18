import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

// const refreshAccessToken = async (
//   setUserdata: (userdata: User | undefined) => void
// ) => {
//   const { data, error } = await supabase.auth.refreshSession();
//   if (error) {
//     console.log(
//       "リフレッシュトークンの取得に失敗しました。再ログインが必要です。"
//     );
//     return;
//   }
//   const newSession = data.session;
//   localStorage.setItem(
//     "sb-okcqyxkuwekiedoblznh-auth-token",
//     JSON.stringify(newSession)
//   );
//   setUserdata(newSession?.user);
// };

// const handleReLogin = () => {
//   localStorage.removeItem("sb-okcqyxkuwekiedoblznh-auth-token");
//   // ログイン画面を表示するためのロジックをここに追加
//   console.log("再ログインが必要です。");
// };

// // 再ログインの要求
// const attemptRefresh = async () => {
//   const { data, error } = await supabase.auth.refreshSession();
//   if (error) {
//     handleReLogin();
//     return;
//   }
//   const newSession = data.session;
//   localStorage.setItem(
//     "sb-okcqyxkuwekiedoblznh-auth-token",
//     JSON.stringify(newSession)
//   );
//   return newSession?.user;
// };

const useSession = () => {
  const [userdata, setUserdata] = useState<User | undefined>(undefined);

  useEffect(() => {
    const session = localStorage.getItem("sb-okcqyxkuwekiedoblznh-auth-token");

    // トークン有効期限確認
    if (session) {
      const parsedSession = JSON.parse(session);
      const currentTime = Math.floor(Date.now() / 1000); // 現在の時間を秒単位で取得
      if (parsedSession.expires_at > currentTime) {
        setUserdata(parsedSession.user);
      } else {
        console.log("アクセストークンが期限切れです。");
      }
    }

    // // トークンリフレッシュ
    // refreshAccessToken(setUserdata);

    // // 非同期処理の結果を待つ
    // const fetchUserData = async () => {
    //   const userdata = await attemptRefresh();
    //   setUserdata(userdata);
    // };

    // fetchUserData();
  }, []);

  return { userdata };
};

export default useSession;
