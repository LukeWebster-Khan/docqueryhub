'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { trpc } from '@/app/_trpc/client'
import { Loader2 } from 'lucide-react'

const Page = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const origin = searchParams.get('origin')
   trpc.authCallback.useQuery(undefined, {
        onSuccess: ({success}) => {
            if(success){
                // user is synced
                router.push(origin ? `/${origin}` : '/dashboard')
            }
        },
        onError : (err) => {
        console.log(err, 'Error')

            if(err.data?.code === "UNAUTHORIZED") {
                console.log('error has occured')
                router.push("/sign-in")
            }
        },
        retry: true,
        retryDelay: 10000,
    }) 

    return (
        <div className='w-full mt-24 flex justify-center'>
            <div className='flex flex-col items-center gap-2'>
                <Loader2 className='h-8 w-8 text-zinc-800 animate-spin' />
                <h3 className='font-semibold text-xl'>Setting up your account...</h3>
                <p>You will be redirected automatically.</p>
            </div>
        </div>
    )
}

export default Page