import { useLoaderData } from "@remix-run/react";
import { getGuitarras } from "../models/guitarras.server";
import ListadoGuitarras from "../components/listado-guitarras";
import styles from '../styles/guitarras.css'

export function meta() {
    return [
        {
            title: 'GuitarLA - Tienda de Guitarras'
            
        },
        {
            name: "description",
            description: 'GuitarLa - Nuestra coleccion de guitarras'
        }
    ]
}

export function links() {
    return [
        {
            rel: 'stylesheet',
            href: styles
        }
    ]
}

export async function loader() { //no hay que importarla en root. se ejecuta automaticamente
    const guitarras = await getGuitarras()
    return guitarras.data;
}

const Tienda = () => {

    const guitarras = useLoaderData();
    return (
       <main className="contenedor">
           <ListadoGuitarras 
                guitarras={guitarras}
           />

       </main>
    );
}

export default Tienda;
