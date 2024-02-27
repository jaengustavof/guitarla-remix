import { useLoaderData } from "@remix-run/react";
import { getPost } from "../models/post.server";
import { formatearFecha } from "../utils/helpers";
import styles from '../styles/blog.css'

export function links () {
    return [
        {
            rel: "stylesheet",
            href: styles
        }
    ]
}
export async function loader({params}) {
    const {url} = params;
    const post = await getPost(url);

    if(post.data.length === 0) {
        throw new Response('',{
            status: 404,
            statusText: 'Post no encontrado'
        })
    }

    return post
}

export function meta({data}) {
    //console.log(data.data[0].attributes.nombre) //Este data proviende del loader. Una vez que el loader ha sido ejecutado, la data esta disponible en el componente. Es un data de Remix
    return [
     {
         title: `GuitarLA - ${data.data[0].attributes.titulo}`
     },
     {
         name: "description",
         content: `${data.data[0].attributes.contenido}`,
     }
   ]
 }

const Post = () => {

    const post = useLoaderData();

    const { titulo, contenido, publishedAt, imagen} = post?.data[0].attributes;

    return (
        <article className="contenedor post mt-3">
            <img className='imagen' src={imagen?.data.attributes.url} alt={`imagen blog ${titulo}`}/>
            <div className='contenido'>
                <h3>{titulo}</h3>
                <p className='fecha'>{formatearFecha(publishedAt)}</p>
                <p className='texto'>{contenido}</p>
            </div>
        </article>
    );
}

export default Post;
