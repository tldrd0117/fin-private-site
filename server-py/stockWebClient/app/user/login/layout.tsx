import { ContentsLayout } from "@/components/molecules/Layout/ContentsLayout";
import { PageLayout } from "@/components/molecules/Layout/PageLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PageLayout className="flex justify-center items-center">
        <ContentsLayout className='w-80 borderBg'>
            {children}
        </ContentsLayout>
    </PageLayout>
}