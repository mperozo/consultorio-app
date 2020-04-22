class LocalStorageService {

    static addItem(chave, valor) {
        localStorage.setItem(chave, JSON.stringify(valor) );
    }

    static getItem(chave) {
        const item = localStorage.getItem(chave);
        return JSON.parse(item);
    }
}
export default LocalStorageService