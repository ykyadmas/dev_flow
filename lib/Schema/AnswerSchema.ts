import { z } from "zod"

const AnswerSchema=z.object({
    content:z.string().min(10),
})
export default AnswerSchema