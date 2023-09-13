'use client'
import { CardListItem } from '@/components/molecules/ListItem/CardListItem'
import { DynamicCalendarCart } from './DynamicCalendarCart'
import { useRecentPostList } from '@/data/query/post/query'
import { useRouter } from 'next/navigation'
import { usePopularVisit, useVisit } from '@/data/query/visit/query'
import { VISIT_TARGET, VISIT_TYPES } from '@/data/query/common/constants'
import { parseISO } from 'date-fns'
import { Breadcrumbs } from '@/components/organisms/Breadcrums/Breadcrumbs'
import { Header } from '@/components/atoms/Header/Header'
import { FlexList } from '@/components/organisms/List/FlexList'
import { TagInput } from '@/components/molecules/Input/TagInput'
import { INPUT_STYLE_TYPE } from '@/components/molecules/Input/StylableInput'

export function Home() {
    const { data: recentPostList, isFetching} = useRecentPostList()
    const { data: tags} = usePopularVisit(500, VISIT_TYPES.TAG)
    const { data: categories} = usePopularVisit(30, VISIT_TYPES.CATEGORY)
    const { data: posts} = usePopularVisit(10, VISIT_TYPES.POST)
    const { data: calendar } = useVisit(VISIT_TARGET.TODAY, VISIT_TYPES.BLOG)
    const router = useRouter()
    const handleItemClick = (id: string) => {
        router.push(`/post/${id}`)
        
    }
    return <>
        <Breadcrumbs items={[{
            href: "/",
            label: "Home"
        }]}/>
        <Header className='mt-8' h5>최신 포스트</Header>
        {
            <FlexList className='flex-nowrap overflow-auto mt-4'>
            {
                recentPostList?.list?.map((item: any) => {
                    return <CardListItem onClick={() => handleItemClick(item._id)} 
                        key={item._id} 
                        title={item.title} 
                        date={parseISO(item.createAt)}
                        tags={item.tags.map((tag:any) => tag.name)}
                        author={item.authorName}/>
                })
            }
            </FlexList>
        }
        <Header className='mt-8' h5>인기 포스트</Header>
        {
            <FlexList className='flex-nowrap overflow-auto mt-4'>
            {
                posts?.map((post: any) => {
                    const item = post.target
                    return <CardListItem onClick={() => handleItemClick(item._id)} 
                        key={item._id} 
                        title={item.title} 
                        date={parseISO(item.createAt)}
                        tags={item.tags.map((tag:any) => tag.name)}
                        author={item.authorName}/>
                })
            }
            </FlexList>
        }
        <Header className='mt-8' h5>인기 카테고리</Header>
        <TagInput inputStyleType={INPUT_STYLE_TYPE.NONE} className="mt-4 bg-transparent" 
            tagValue={categories?.map((item:any) => item.target.name)} readOnly/>
        <Header className='mt-8' h5>인기 태그</Header>
        <TagInput inputStyleType={INPUT_STYLE_TYPE.NONE} className="mt-4 bg-transparent" 
            tagValue={tags?.map((item:any) => item.target.name)} readOnly/>
        
        <Header className='mt-8' h5>방문자</Header>
        <DynamicCalendarCart data={calendar}/>
    </>
}
