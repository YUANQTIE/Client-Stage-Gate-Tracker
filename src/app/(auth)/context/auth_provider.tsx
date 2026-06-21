'use client'

import {createContext, useContext, useEffect, useState, type ReactNode} from 'react'
import { createClient } from '@/lib/supabase/client'
import { UserType } from '@/types'

interface prop
{
    children: React.ReactNode
}

const auth_context = createContext<{user: UserType | null}>
(
    {
        user:null
    }
)

export function AuthProvider({children}: prop)
{
    const [user, setUser] = useState<UserType | null>(null)
    const supabase = createClient()

    useEffect(() => 
    {
        async function set_prisma_user(id: string)
        {
            if(id != ""){
                const {data} = await supabase.from('Users').select().eq('user_id', id).single()
                
                const new_user : UserType = {
                    client_id: data.client_id,
                    department_id: data.department_id,
                    phone: data.phone,
                    email: data.email,
                    image_id: data.image_id,
                    name: data.name,
                    user_id: data.user_id,
                }
                
                setUser(new_user)
            }
        }

        supabase.auth.getUser().then(({data}) => set_prisma_user(data.user?.id ? data.user?.id : ""))
        const { data: {subscription}} = supabase.auth.onAuthStateChange((_var, session) => {
            set_prisma_user(session?.user?.id ? session?.user?.id : "")
        })
        return () => subscription.unsubscribe()
    }, [])

    return <auth_context.Provider value={{user}}>
        {children}
    </auth_context.Provider>
}

export function useAuth() {
  const context = useContext(auth_context);
  
  return context;
}