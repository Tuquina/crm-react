import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Formulario from '../components/Formulario'
import Spinner from '../components/Spinner'

const EditarCliente = () => {

  const [cliente, setCliente] = useState({})
  const [cargando, setCargando] = useState(true)

  const { id } = useParams()

  useEffect(() => {
    
    const obtenerClienteAPI = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        setCliente(resultado)
      } catch (error) {
        console.log(error)
      }
      setCargando(!cargando) 
    }
    obtenerClienteAPI()
  }, []);

  return (
    <>
        <h1 className='font-black text-3xl text-blue-900'>Editar Cliente</h1>
        <p className='mt-3'>Utiliza este formulario para editar datos de un cliente</p>

        {cargando ? <Spinner/> : cliente?.nombre ? (
          <Formulario 
            cliente={cliente}
            cargando={cargando}
          />
        ) : <p className='text-red-800 uppercase font-bold text-2xl text-center mt-5'>Cliente ID no válido</p>}
        
    </>
  )
}

export default EditarCliente