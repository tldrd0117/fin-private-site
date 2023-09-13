// __tests__/index.test.jsx

import { act, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { parsePostText } from '@/data/post/util'

describe('Home', () => {
  it("test post util", () => {
    console.log(parsePostText("---\ntitle: 새로운 제목\ncategory: 10\ntags: (/*/)무엇\n---\n입니다"))
  })
})