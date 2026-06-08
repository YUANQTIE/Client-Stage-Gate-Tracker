'use client'

import {createContext, useContext, useEffect, useState, type ReactNode} from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

interface prop
{
    children: React.ReactNode
}

const auth_context = createContext<{user: User | null}>
(
    {
        user:null
    }
)

export function AuthProvider({children}: prop)
{
    const [user, setUser] = useState<User | null>(null)
    const supabase = createClient()

    useEffect(() => 
    {
        supabase.auth.getUser().then(({data}) => setUser(data.user))
        const { data: {subscription}} = supabase.auth.onAuthStateChange((_var, session) => {
            setUser(session?.user ?? null)
        })
        return subscription.unsubscribe()
    }, [])

    return <auth_context.Provider value={{user}}>
        {children}
    </auth_context.Provider>
}

export function useAuth()
{
    useContext(auth_context)
}