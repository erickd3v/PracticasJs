const importHTML = (url, callback) => {
    fetch(url)
        .then(respone => {
            if(!respone.ok){
                throw new Error(`Error al cargar el archivo ${url}`);
            }
            return respone.text();
        })
        .then(data => {
            callback(data);
        })
        .catch(err => {
            console.error(err);
        });
}