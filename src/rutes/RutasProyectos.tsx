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


export async function getClientes() {
  let data2 = null;
  
  try {
    const response = await fetch('http://127.0.0.1:8000/api/cliente/getallclientsname');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const jsonData = await response.json();
    const firstFiveElements = jsonData.slice();
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

  console.log(data3);
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

  console.log(data4);
  return data4;
}
