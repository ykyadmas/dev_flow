import { z } from "zod";

const ContactSchema=z.object({
    messsage:z.string()
})
export default ContactSchema