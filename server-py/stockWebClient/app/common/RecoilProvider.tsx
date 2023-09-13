'use client'

import React, { Suspense, useEffect } from 'react'
import { RecoilRoot } from 'recoil'

export const RecoilProvider = ({ children }: { children: React.ReactNode }) => {
    
    return <RecoilRoot>
        { children }
    </RecoilRoot>
}