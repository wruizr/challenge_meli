import { useNavigate } from "react-router-dom"

export const SearchForm = () => {
    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        navigate(`/items?search=${e.currentTarget.search.value}`)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="search" />
            <button type="submit">Search</button>
        </form>
    )
}