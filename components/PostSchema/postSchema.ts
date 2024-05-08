import { z } from "zod";

const PostSchema=z.object({
    title:z.string().min(5).max(120),
    detail:z.string().min(10),
})
export default PostSchema




// title String
// detail String