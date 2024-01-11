import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/db";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = getUser();
  const actualUser = await getUser();
  console.log(actualUser);
  if (!actualUser || !actualUser.id)
    redirect("/auth-callback?origin=dashboard");
  const dbUser = await db.user.findFirst({
    where: {
      id: actualUser.id
    },
  });
  // console.log(dbUser, 'HERE')
  // create user in db
  if(!dbUser) {
    await db.user.create({
      data: {
        id: actualUser.id,
        email: actualUser.email,
      }
    })
  }
  // const actualUser = await getUser();
  // if (!actualUser || !actualUser.id) redirect('/auth-callback?origin=dashboard');

  // const renderUserEmail = async () => {
  //     const user = await getUser();
  //     if (user) {
  //         return <div><span>here:</span>{user.email}</div>;
  //     }
  //     return null;
  // }

  // const dbUser = await db.user.findFirst({
  //   where: {
  //     id: actualUser.id,
  //   },
  // });

  // if(!dbUser) redirect('/auth-callback?origin=dashboard')

  // return renderUserEmail();

  return <div>info:{actualUser?.email}</div>;
};


export default Page;
