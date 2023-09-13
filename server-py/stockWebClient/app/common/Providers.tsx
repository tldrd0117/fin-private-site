'use client'

import React from "react";
import { RecoilRoot } from "recoil";
import QueryClientProvider from './QueryClientProvider'
import { NetworkErrorHandle } from "./NetworkErrorHandle";

const Providers = ({ children }: any) => {
    return <>
        <RecoilRoot>
            <QueryClientProvider>
                <NetworkErrorHandle>
                    {children}
                </NetworkErrorHandle>
            </QueryClientProvider>
        </RecoilRoot>
    </>
}

export default Providers