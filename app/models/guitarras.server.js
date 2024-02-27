//al estabblecer .server en el nombre, remix la ejecutara en la parte del sevidor y no en el cliente
export async function getGuitarras () {
    const respuesta = await fetch(`${process.env.API_URL}/guitarras?populate=imagen`);
    return await respuesta.json();
}

export async function getGuitarra (id) {

    const respuesta = await fetch(`${process.env.API_URL}/guitarras?filters[url]=${id}&populate=imagen`);
    return await respuesta.json();
}