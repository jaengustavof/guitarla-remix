import { useState, useEffect } from 'react';
import {
    Meta,
    Links,
    Outlet,
    Scripts,
    LiveReload, 
    isRouteErrorResponse,
    useRouteError,
    Link
} from '@remix-run/react';
import styles from './styles/index.css';
import Header from './components/header';
import Footer from './components/footer';

export function meta(data) { //informacion meta, esta funcion hace que este disponibe en esta ruta. Para utilizarlo debemos importar el componente Meta

    let message = '';

    if(!data.data) {
        const error = useRouteError();
        error && error.statusText ? message = error.statusText : message =  'Remix'
    }else {
        message = 'Remix'
    }

    return (
        [
            {
                charset: 'utf-8',
                title: `GuitarLA - ${message}`,
                viewport: 'width=device-width,initial-scale=1'
            }    
        ]
    )
}

/*
Google Fonts - add an object to links for each one
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Lato:wght@400;700;900&family=Outfit:wght@400;700;900&display=swap" rel="stylesheet"></link>
*/

export function links() {
    return [
        {
            rel: 'stylesheet',
            href: 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
        },
        {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com'
        },
        {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossOrigin: 'true'
        },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Lato:wght@400;700;900&family=Outfit:wght@400;700;900&display=swap'
        },
        {
            rel: 'stylesheet',
            href: styles
        }
    ]
}

export default function App () {

    const carritoLS = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('carrito')) ?? [] : null;
    const [carrito, setCarrito] = useState(carritoLS);

    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito])

    const agregarCarrito = (guitarraSeleccionada) => {
        
        if(carrito.some((guitarraCarrito) => guitarraCarrito.id === guitarraSeleccionada.id)){
            const carritoActualizado = carrito.map((guitarraCarrito) => {
                if(guitarraCarrito.id === guitarraSeleccionada.id){
                    guitarraCarrito.cantidad = guitarraSeleccionada.cantidad;
                }
                return guitarraCarrito;
            });
            setCarrito(carritoActualizado);
        }else {
            setCarrito([...carrito, guitarraSeleccionada]);
        }
    }

    const actualizarCantidad = (guitarra) => {
        const carritoActualizado = carrito.map((guitarraCarrito) => {
            if(guitarra.id == guitarraCarrito.id) {
                guitarraCarrito.cantidad = guitarra.cantidad;
            }
            return guitarraCarrito;
        })

        setCarrito(carritoActualizado);
    }

    const eliminarGuitarra = (id) => {
        const carritoActualizado = carrito.filter((guitarraCarrito) => guitarraCarrito.id !== id)
        setCarrito(carritoActualizado);
    }

    return (
        <Document>
            <Outlet 
                context={{
                    
                    agregarCarrito,
                    actualizarCantidad,
                    eliminarGuitarra,
                    carrito

                }}
            />
        </Document>
    )
}

function Document({children}) {
    return (
        <html lang="es">
            <head>
                <Meta/> {/* La info es establecida en la function meta() */}
                <Links/>
            </head>
            <body>
                <Header/>
                {children}
                <Footer />
                <Scripts /> {/* para que no recargue cuando cambiamos de pagina. */}
                <LiveReload /> {/* para que no tengamos que recargar cuando hacemos cambios */}
            </body>
        </html>
    )
}

/** Manejo de errores */
export function ErrorBoundary() {
    const error = useRouteError();
  
    if (isRouteErrorResponse(error)) {

      return (
        <Document>
                <p className='error'>{error.status}</p>
                <p className='error'>{error.statusText} </p>
                <Link to="/" className='error-enlace'>Volver a la pagina principal</Link>
        </Document>
     
      );
    } else if (error instanceof Error) {
      return (
        <Document>
          <h1>Error</h1>
          <p>{error.message}</p>
          <p>The stack trace is:</p>
          <pre>{error.stack}</pre>
          <Link to="/" className='error-enlace'>Volver a la pagina principal</Link>
        </Document>
      );
    } else {
      return <h1>Unknown Error</h1>;
    }
}