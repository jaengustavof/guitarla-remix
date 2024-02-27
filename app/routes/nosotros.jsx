import imagen from '../../public/img/nosotros.jpg';
import styles from '../styles/nosotros.css';

export function meta() {
  return [
    {
        title: 'GuitarLA - Sobre Nosotros'
    },
    {
      name: 'description',
      content: 'Venta de guitarras, blog de música'
    }
  ]
}

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles
    },
    {
      rel: 'preload',
      href: imagen,
      as: 'image'
    }
  ]
}


const Nosotros = () => {

    return (
        <main className="contenedor nosotros">
            <h2 className="heading">Nosotros</h2>

            <div className="contenido">
                <img src={imagen} alt='imagen sobre nosotros' />
                <div>
                    <p>
                    Praesent eu magna velit. Nunc volutpat nisl congue blandit laoreet. Donec eget consequat ipsum. Aenean vel leo porttitor, laoreet diam at, elementum enim. Etiam iaculis vehicula lacinia. Donec venenatis vitae mi a feugiat. Nullam bibendum neque vel diam semper, quis laoreet neque mattis. Fusce vel consequat lectus, eget rhoncus mi. Pellentesque convallis, urna et ornare porttitor, felis risus laoreet felis, vitae euismod ligula enim a orci. .
                    </p>

                    <p>
                    Praesent eu magna velit. Nunc volutpat nisl congue blandit laoreet. Donec eget consequat ipsum. Aenean vel leo porttitor, laoreet diam at, elementum enim. Etiam iaculis vehicula lacinia. Donec venenatis vitae mi a feugiat. Nullam bibendum neque vel diam semper, quis laoreet neque mattis. Fusce vel consequat lectus, eget rhoncus mi.
                    </p>
                </div>
            </div>
        </main>
    );
}

export default Nosotros;
