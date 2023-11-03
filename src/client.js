import {createClient} from "@sanity/client"
import imageBuilder from "@sanity/image-url"

export const client  = createClient({
    projectId : import.meta.env.VITE_REACT_SANITY_PROJECT_ID, 
    dataset : 'production',
    apiVersion : '2023-07-05',
    useCdn :true,
    token : import.meta.env.VITE_REACT_SANITY_TOKEN
})
const builder = imageBuilder(client)
export const urlFor = (src) => builder.image(src)