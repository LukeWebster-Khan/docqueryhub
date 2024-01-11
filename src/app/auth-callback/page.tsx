'use client'

// import any necessary hooks or components
import { useEffect } from 'react'
import { useRouter, useSearchParams} from 'next/navigation'
import { Loader2 } from 'lucide-react'


const Page = () => {
  console.log('auth-callback before fetch')
    const router = useRouter()
    const fetchData = async () => {
      try {
        const res = await fetch('/api/auth-callback')
        const data = await res.json()
  
        if (data.success) {
          router.push(origin ? `/${origin}` : '/dashboard')
        }
      } catch (error) {
        console.log(error, 'this is the error')
        if(error.data?.code === 'UNAUTHORIZED') {
          router.push('/login')
        }
      }
    }
    
    useEffect(() => {
      fetchData()
    }, [router])
  
    const searchParams = useSearchParams()
    const origin = searchParams.get('origin')
  
    // The rest of your component code...
  
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
  