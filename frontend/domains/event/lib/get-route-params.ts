import { notFound } from "next/navigation";

export  function getRouteParams (params : {"id_slug": string}) {
    const { "id_slug": idSlug } =  params; 
    const parts = idSlug?.split("_");
    const id = Number(parts[0]);
    const slug = parts[1];
    if (isNaN(id) || !slug) {
        notFound();
    }
    return { id, slug }
}