import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { getItems } from "../../services/backendServices";
import useStore from "../../stores/useStore";

const ItemsResult = ()  => {
    const navigate = useNavigate();
    const [ searchParams ] = useSearchParams()
    const { searchTerm, items, setItems, setSearchTerm} = useStore((state) => state);
    const query = searchParams.get('search') || '';

    useEffect(() => {
        const controller = new AbortController()
        if(query !== searchTerm ){
            setSearchTerm(query);
            getItems(query)
                .then(setItems)
                .catch(console.error);
                return () => {
                    controller.abort()
                }
        } 
    }, [query, searchTerm, setItems, setSearchTerm]);

    const handleSelect = (id: string) => {
        navigate(`/items/${id}`);
    };

    return (
        <>
            <h1>Items</h1>
            <ul>
                {items && items.items.length ? items.items.map(item => (
                    <li 
                        key={item.id}
                        onClick={() => handleSelect(item.id)}
                    >
                        <img src={item.picture} alt="" />
                        <h2>{item.title}</h2>
                        <p>${item.price.amount}</p>
                        {item.free_shipping && <p>Envío gratis</p>}
                        <p>{item.condition}</p>
                    </li>
                ))
                : <li>No se encontraron articulos.</li>}
            </ul>
        </>
    )
}

export default ItemsResult