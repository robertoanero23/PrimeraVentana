export async function getcodprojects(codProyecto:string) {
  let data = null;
  
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/proyecto/getallprojectsbycode/${codProyecto}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const jsonData = await response.json();
    const firstFiveElements = jsonData.slice();
    data = firstFiveElements;
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  console.log(data);
  return data;
}


export async function getClientes(nombreCliente: string) {
  let data2 = null;
  
  try {

    const endpoint = nombreCliente
      ? `http://127.0.0.1:8000/api/cliente/getallclientsname/${nombreCliente}`
      : `http://127.0.0.1:8000/api/cliente/getallclients`;

    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const jsonData = await response.json();
    const firstFiveElements = jsonData.slice(); // Puedes ajustar este límite según sea necesario
    data2 = firstFiveElements;
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  console.log(data2);
  return data2;
}



export async function getBoss(idUsuario:string) {
  let data3 = null;
  
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/proyecto/getallprojectsbyprojectboss/${idUsuario}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const jsonData = await response.json();
    const firstFiveElements = jsonData.slice();
    data3 = firstFiveElements;
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  //console.log(data3);
  return data3;
}

export async function getPMO(idUsuario:string) {
  let data4 = null;
  
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/proyecto/getallprojectsbyprojectpmo/${idUsuario}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const jsonData = await response.json();
    const firstFiveElements = jsonData.slice();
    data4 = firstFiveElements;
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  //console.log(data4);
  return data4;
}


export async function getAllProjectsByClientName(idUsuario:string) {
  let data4 = null;
  
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/proyecto/getallprojectsbyclientname/${idUsuario}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const jsonData = await response.json();
    const firstFiveElements = jsonData.slice();
    data4 = firstFiveElements;
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  //console.log(data4);
  return data4;
}
export async function getClientName(clientName:string) {
  let data = null;
  
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/proyecto/getallprojectsbyclientname/${clientName}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const jsonData = await response.json();
    const firstFiveElements = jsonData.slice();
    data = firstFiveElements;
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  console.log(data);
  return data;
}


export async function getIdClient(idCliente:string) {
  let data = null;
  
  try {
    const response = await fetch(`http://localhost:8000/api/cliente/getallclientsbyid/${idCliente}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const jsonData = await response.json();
    const firstFiveElements = jsonData.slice();
    data = firstFiveElements;
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  console.log(data);
  return data;
}

export async function getIdproyecto(id_proyecto:string) {
  let data = null;
  
  try {
    const response = await fetch(`http://localhost:8000/api/grado-avance/getalldegreeprogressbyprojectid/${id_proyecto}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const jsonData = await response.json();
    const firstFiveElements = jsonData.slice();
    data = firstFiveElements;
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  console.log(data);
  return data;
}