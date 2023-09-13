import dynamic from 'next/dynamic';

export const DynamicLoginRequired = dynamic(() => import('@/app/common/LoginRequired').then((mod) => mod.default), {
    ssr: false,
})