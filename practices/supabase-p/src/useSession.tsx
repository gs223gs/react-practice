import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
//ローカルストレージ例
//key : sb-okcqyxkuwekiedoblznh-auth-token
// access_token
// :
// "eyJhbGciOiJIUzI1NiIsImtpZCI6Ii95THNuTWJPbjROanBiSEUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL29rY3F5eGt1d2VraWVkb2Jsem5oLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI3YTdkMDI4Yi1kZDEzLTRkMjItODJiZi0yMWE2ZDU0YmI4ODIiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzQ3NTM4ODUwLCJpYXQiOjE3NDc1MzUyNTAsImVtYWlsIjoibXRhaWdhMDIxM0BpY2xvdWQuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJnaXRodWIiLCJwcm92aWRlcnMiOlsiZ2l0aHViIl19LCJ1c2VyX21ldGFkYXRhIjp7ImF2YXRhcl91cmwiOiJodHRwczovL2F2YXRhcnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvMTQ0MzEyMjQ0P3Y9NCIsImVtYWlsIjoibXRhaWdhMDIxM0BpY2xvdWQuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZ1bGxfbmFtZSI6IlQuTWl1cmEiLCJpc3MiOiJodHRwczovL2FwaS5naXRodWIuY29tIiwibmFtZSI6IlQuTWl1cmEiLCJwaG9uZV92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6ImdzMjIzZ3MiLCJwcm92aWRlcl9pZCI6IjE0NDMxMjI0NCIsInN1YiI6IjE0NDMxMjI0NCIsInVzZXJfbmFtZSI6ImdzMjIzZ3MifSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJvYXV0aCIsInRpbWVzdGFtcCI6MTc0NzUzNTI1MH1dLCJzZXNzaW9uX2lkIjoiNzhmOWY5NzAtZWE2MS00OTU4LWE3MDEtMWYxMjVmYzM5Y2E5IiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.yUcS4GRFUnxQkanwXKmM8TMh_mP09yh1kZhWZq5DIEU"
// expires_at
// :
// 1747538850
// expires_in
// :
// 3600
// provider_token
// :
// refresh_token
// :
// "lhj7f6eizbmj"
// token_type
// :
// "bearer"
// user
// :
// {id: "7a7d028b-dd13-4d22-82bf-21a6d54bb882", aud: "authenticated", role: "authenticated",…}

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
