import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import { Card } from './Card';


const meta: Meta<typeof Card> = {
    title: "Card/Card",
    component: Card,
    args: {
        image: {
            src: "/images/profile.jpg",
            alt: "profile"
        },
        title: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.국토와 자원은 국가의 보호를 받으며, 국가는 그 균형있는 개발과 이용을 위하여 필요한 계획을 수립한다. 국무위원은 국정에 관하여 대통령을 보좌하며, 국무회의의 구성원으로서 국정을 심의한다. 모든 국민은 양심의 자유를 가진다. 법률이 정하는 주요방위산업체에 종사하는 근로자의 단체행동권은 법률이 정하는 바에 의하여 이를 제한하거나 인정하지 아니할 수 있다. 법관은 탄핵 또는 금고 이상의 형의 선고에 의하지 아니하고는 파면되지 아니하며, 징계처분에 의하지 아니하고는 정직·감봉 기타 불리한 처분을 받지 아니한다. 국가는 주택개발정책등을 통하여 모든 국민이 쾌적한 주거생활을 할 수 있도록 노력하여야 한다.`,
        subTitle: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.국토와 자원은 국가의 보호를 받으며, 국가는 그 균형있는 개발과 이용을 위하여 필요한 계획을 수립한다. 국무위원은 국정에 관하여 대통령을 보좌하며, 국무회의의 구성원으로서 국정을 심의한다. 모든 국민은 양심의 자유를 가진다. 법률이 정하는 주요방위산업체에 종사하는 근로자의 단체행동권은 법률이 정하는 바에 의하여 이를 제한하거나 인정하지 아니할 수 있다. 법관은 탄핵 또는 금고 이상의 형의 선고에 의하지 아니하고는 파면되지 아니하며, 징계처분에 의하지 아니하고는 정직·감봉 기타 불리한 처분을 받지 아니한다. 국가는 주택개발정책등을 통하여 모든 국민이 쾌적한 주거생활을 할 수 있도록 노력하여야 한다.`,
        summary: 'Ladyship it daughter securing procured or am moreover mr. Put sir she exercise vicinity cheerful wondered. Continual say suspicion provision you neglected sir curiosity unwilling. Simplicity end themselves increasing led day sympathize yet. General windows effects not are drawing man garrets. Common indeed garden you his ladies out yet. Preference imprudence contrasted to remarkably in on. Taken now you him trees tears any. Her object giving end sister except oppose.국무회의는 대통령·국무총리와 15인 이상 30인 이하의 국무위원으로 구성한다. 지방자치단체는 주민의 복리에 관한 사무를 처리하고 재산을 관리하며, 법령의 범위안에서 자치에 관한 규정을 제정할 수 있다. 모든 국민은 근로의 권리를 가진다. 국가는 사회적·경제적 방법으로 근로자의 고용의 증진과 적정임금의 보장에 노력하여야 하며, 법률이 정하는 바에 의하여 최저임금제를 시행하여야 한다. 대법원에 대법관을 둔다. 다만, 법률이 정하는 바에 의하여 대법관이 아닌 법관을 둘 수 있다. 국가는 사회보장·사회복지의 증진에 노력할 의무를 진다. 국무총리·국무위원 또는 정부위원은 국회나 그 위원회에 출석하여 국정처리상황을 보고하거나 의견을 진술하고 질문에 응답할 수 있다.',
    }
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Normal: Story = {
    args: {
    },
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        expect(canvas.queryByRole('button')).toBeInTheDocument()
    }
}

export const Small: Story = {
    args: {
        size: 'sm'
    },
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        expect(canvas.queryByRole('button')).toBeInTheDocument()
    }
}

export const Medium: Story = {
    args: {
        size: 'md'
    },
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        expect(canvas.queryByRole('button')).toBeInTheDocument()
    }
}

export const Large: Story = {
    args: {
        size: 'lg'
    },
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        expect(canvas.queryByRole('button')).toBeInTheDocument()
    }
}
