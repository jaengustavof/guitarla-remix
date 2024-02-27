import Guitarra from "./guitarra";

const ListadoGuitarras = ({guitarras}) => {
    return (
        <>
        <h2 className="'heading">Nuestra Coleccion</h2>
          {guitarras?.length && (
            <div className='giutarras-grid'>
                {guitarras.map((guitarra) => (
                    <Guitarra 
                        key={guitarra?.id}
                        guitarra={guitarra?.attributes}
                    />
                ))}
            </div>
          )}
        </>
    );
}

export default ListadoGuitarras;
