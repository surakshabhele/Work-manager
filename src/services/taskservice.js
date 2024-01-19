import { httpAxios } from "@/helper/httphelper";
// synchronus call....
export async function addTask(task) {
  const result = await httpAxios
    .post("/api/tasks", task)
    .then((response) => response.data);
  return result;
}
export async function GetTaskOfUser(userid) {
  const result = await httpAxios
    .get(`/api/users/${userid}/tasks`)
    .then((response) => response.data);
  console.log("gettaskofuser", result);
  return result;
}

export async function DeleteTask(taskid) {
  const result = await httpAxios
    .delete(`/api/tasks/${taskid}`)
    .then((response) => response.data);
  return result;
}
