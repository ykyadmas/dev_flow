import * as z from 'zod'

const QuestionSchema=z.object({
    title:z.string().min(5).max(120),
    content:z.string().min(10)
})
export default QuestionSchema

