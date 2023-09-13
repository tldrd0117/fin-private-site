import LoginRequired from "@/app/common/LoginRequired"
import { ReactNode, Suspense } from "react"
import { AppBar } from "../organisms/AppBar/AppBar"
import { TopMenu } from "../organisms/TopMenu/TopMenu"


export interface AppBarPageTemplateProps{
    children: ReactNode
}

export const AppBarContentsTemplate = ({children}: AppBarPageTemplateProps) => {
    return <>
        <div className="p-4">
            <AppBar title='BLOG'/>
            <TopMenu className="mt-4" items={[{
                title: "홈",
                path: "/"
            },{
                title: "글목록",
                path: "/post/list"
            },{
                title: "글작성",
                path: "/post/write"
            }]}></TopMenu>
            <div className='mt-4 p-4 borderBg'>
                <Suspense fallback={<p>loading...</p>}>
                    {children}
                </Suspense>
            </div>
        </div>
    </>
}