import { useNavigate } from 'react-router-dom'
const Home = () => {
  const navigate = useNavigate()
  return (
    <>
      <div>Home</div>
      <button onClick={() => { navigate('/dashboard/tournaments') }}>go</button>
    </>
  )
}

export default Home