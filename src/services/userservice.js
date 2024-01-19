import { httpAxios } from "@/helper/httphelper";
// synchronus call....
export async function SignUp(user) {
  const result = await httpAxios
    .post("/api/users", user)
    .then((Response) => Response.data);
  return result;
}
export async function LoginApi(login) {
  const result = await httpAxios
    .post("/api/login", login)
    .then((Response) => Response.data);
  return result;
}
export async function CurrentUser() {
  const result = await httpAxios
    .get("/api/current")
    .then((Response) => Response.data);
  // console.log("result", result);
  return result;
}
export async function Logout() {
  const result = await httpAxios
    .post("/api/logout")
    .then((Response) => Response.data);
  return result;
}
