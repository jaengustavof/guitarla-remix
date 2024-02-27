export async function getPosts () {
    const respuesta = await fetch(`${process.env.API_URL}/posts?populate=imagen`);
    return await respuesta.json();
}

export async function getPost (id) {

    const respuesta = await fetch(`${process.env.API_URL}/posts?filters[url]=${id}&populate=imagen`);
    return await respuesta.json();
}

