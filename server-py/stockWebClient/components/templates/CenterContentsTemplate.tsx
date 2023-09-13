import LoginRequired from "@/app/common/LoginRequired"
import { ReactNode, Suspense } from "react"


export interface AppBarPageTemplateProps{
    children: ReactNode
}

export const AppBarContentsTemplate = ({children}: AppBarPageTemplateProps) => {
    return <>
        <div className='mt-4 p-4 bordeBg'>
            <Suspense fallback={<p>loading...</p>}>
                {children}
            </Suspense>
        </div>
    </>
}