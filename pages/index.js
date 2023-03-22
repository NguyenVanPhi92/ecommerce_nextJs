import Footer from '@/components/footer'
import Header from '@/components/header'
import { Inter } from '@next/font/google'
import axios from 'axios'
import { useSession, signIn, signOut } from 'next-auth/react'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const { data: session } = useSession()
    return (
        <>
            <Header country='Viet Nam' />
            {session ? <p>You are logged in</p> : <p>You are not logged in</p>}
            <Footer country='Viet Nam' />
        </>
    )
}

/// getServerSideProps => Server trả về data cho client
// export async function getServerSideProps() {
//     let data = await axios
//         .get('https://api.ipregistry.co/?key=wyctx5ozaqx0wh37')
//         .then((res) => {
//             return res.data.location.country
//         })
//         .catch((error) => {
//             console.log('eroror ', error)
//         })
//     return {
//         props: {
//             country: { name: data.name, flag: data.flag.emojitwo }
//         }
//     }
// }
