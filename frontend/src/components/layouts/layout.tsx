import { Outlet } from 'react-router-dom'
import { Header } from '../headers/header';

export const Layout = () => {
    return (
        <>
            <Header />
            <main>
                <section>
                    <Outlet />
                </section>
            </main>
        </>
    )
}