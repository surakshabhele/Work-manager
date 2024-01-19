async function TakeTime() {
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
}

export default async function ProfilePage() {
  await TakeTime();
  throw new Error("this is manual error");
  return (
    <div>
      <h1>profile page</h1>
    </div>
  );
}
