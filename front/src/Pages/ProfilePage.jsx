import React, { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import ReactApexChart from 'react-apexcharts';
import { format } from 'date-fns';
import { es } from 'date-fns/locale'; // Importar el locale para español
import { useNavigate } from 'react-router-dom';


function ProfilePage() {
  const { profile, user, isAuthenticated, setIsAuthenticated } = useAuth();
  console.log(useAuth())
  const [profileData, setProfileData] = useState(null);
  const userId = sessionStorage.getItem("id");
  const navigate = useNavigate();



  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.clear(); // Borrar sessionStorage
    navigate('/login'); // Redirigir a la página de login
  };

  useEffect(() => {

    console.log(sessionStorage.getItem('id'))

    if (!sessionStorage.getItem('id')){
      console.log("No identificado")
      navigate('/404')

    }
   



    const fetchProfile = async () => {
      try {
        const profileInfo = await profile({ id: userId });
        setProfileData(profileInfo);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [profile, user]);

  // Preparar los datos para el gráfico de radar
  const radarChartData = [{
    name: 'Skills',
    data: [profileData?.python || 0, profileData?.java || 0, profileData?.js || 0, profileData?.C || 0, profileData?.Cplus || 0]
  }];

  // Opciones del gráfico de radar
  const radarChartOptions = {
    chart: {
      height: 350,
      type: 'radar',
      background: '#rgb(55 65 81)' // Fondo oscuro para el gráfico
    },
    title: {
      text: 'Skills Radar Chart',
      style: {
        color: '#fff'
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: ['#fff'] // Color de los valores en el eje y
        }
      }
    },
    xaxis: {
      categories: ['Python', 'Java', 'JavaScript', 'C', 'C++'],
      labels: {
        style: {
          colors: ['#fff'] // Color de las categorías en el eje x
        }
      }
    }
  };

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'MMMM yyyy', { locale: es });
  };

  return (
    <div className="flex h-screen items-center justify-center">
      {profileData && (
        <div className='bg-zinc-800 max-w-lg p-10 rounded-lg shadow-lg'>
          <div className="text-center mb-6">
            <h1 className='text-white text-3xl font-bold mb-2'>Welcome!</h1>
            {profileData.image && (
              <img
                src={profileData.image}
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
            )}
            <p className='text-gray-300'> Username: <strong>{profileData.username}</strong> </p>
            <p className='text-gray-300'>Email:  <strong>{profileData.email}</strong></p>
            <p className='text-gray-300'>Union Date:  <strong>{formatDate(profileData.create)}</strong></p>
          </div>
          {/* Renderizar el gráfico de radar */}
          <h1 className='text-gray-300 text-center mb-5'><strong>Your Skills</strong></h1>

          <div id="chart" className="bg-gray-700 p-4 rounded-lg">
            <ReactApexChart options={radarChartOptions} series={radarChartData} type="radar" height={350} />
          </div>

          <button onClick={handleLogout} className='w-full bg-red-500 text-white px-4 py-2 rounded-md my-2 mt-5'>
            Logout!
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
