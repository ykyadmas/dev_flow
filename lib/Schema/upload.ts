import * as z from 'zod'

const uploadSchema=z.object({
    title:z.string().min(5).max(120),
    content:z.string().min(10),
    imageUrl:z.string()
})
export default uploadSchema

// title         String?
// content       String?
// imageUrl      String?