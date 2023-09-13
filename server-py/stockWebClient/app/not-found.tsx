import { Header } from '@/components/atoms/Header/Header'
import { Paragraph } from '@/components/atoms/Paragraph/Paragraph'
import { Span } from '@/components/atoms/Span/Span'
import { ContentsLayout } from '@/components/molecules/Layout/ContentsLayout'
import { PageLayout } from '@/components/molecules/Layout/PageLayout'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <PageLayout className='flex flex-col items-center justify-center'>
        <ContentsLayout className='mt-4 borderBg' >
            <Header h3>Not Found</Header>
            <Paragraph className='mt-4'>Could not find requested resource</Paragraph>
            <Span className='mt-4'>
                View <Link href="/">HOME</Link>
            </Span>
        </ContentsLayout>
    </PageLayout>
  )
}