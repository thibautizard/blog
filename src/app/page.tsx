import './global.css'
import { redirect } from 'next/navigation'

const Page = () => {
  redirect('/posts')
}

export default Page
