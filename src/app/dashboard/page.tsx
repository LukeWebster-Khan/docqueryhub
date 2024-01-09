import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/db";

const Page = async () => {
    const {getUser} = getKindeServerSession()
    const user = getUser();
    console.log('user',typeof user)

    const actualUser = await getUser();
    if (!actualUser || !actualUser.id) redirect('/auth-callback?origin=dashboard');
    
    const renderUserEmail = async () => {
        const user = await getUser();
        if (user) {
            return <div><span>here:</span>{user.email}</div>;
        }
        return null;
    }

    const dbUser = await db.user.findFirst({
        where: {
            id: user.id
        }
    })

    if(!dbUser) redirect('/auth-callback?origin=dashboard')

    return renderUserEmail();
}

export default Page