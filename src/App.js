import React, {  useEffect, useState } from 'react';
import './App.css';
import { nanoid  } from 'nanoid';
import ReactPaginate from 'react-paginate';
function App() {
  const [bool,setbool]=useState(true);
  const [sort,setSort]=useState(true);

  const [id,setId]=useState(null);
  const [serach,setSearch]=useState('');
const [input, setInput]=useState({
  id:"",
  name:'',
  email:""
});
const [userData, setUserData]=useState([]);


const deleteUset=(id)=> {
  console.log(id)
  const delteData=userData.filter((data)=> data.id !== id);
  setUserData(delteData)
}

const editUser=(e)=> {
  e.preventDefault();
  setUserData((prev)=> prev.map((val)=>val.id == id ? {...val, name:input.name, email:input.email}:val))
}
const addSubmit=(e)=> {
  e.preventDefault();
  setUserData((prev)=> [
    ...prev,
   {
     ...input,
     id:nanoid()
   }
  ]);

  setInput({
    name:"",
    email:""
  })  
}

const asc=(a,b)=> {
  return a.name.localeCompare(b.name)
}
const dsc=(a,b)=> {
  return b.name.localeCompare(a.name)
}
console.log(userData);

  return (
    <div>

      {bool ? 
     ( <div>
     <h1>ADD</h1>
     <form onSubmit={addSubmit}>
      <div>
        <input name='name' value={input.name} onChange={(e)=> {
          setInput((prev)=> ({
            ...prev,
            name:e.target.value
          }))
        }} />
      </div>
      <div>
        <input name='email' value={input.email} onChange={(e)=> {
          setInput((prev)=> ({
            ...prev,
            email:e.target.value
          }))
        }} />
      </div>
      <div>
        <button>submit</button>
      </div>
      </form>
      </div> ) 
      : (
       

        
<div>
<h1>Update</h1>
      <form onSubmit={editUser}>
      <div>
        <input value={input.name} onChange={(e)=> {
          setInput((prev)=> ({
            ...prev,
            name:e.target.value
          }))
        }} />
      </div>
      <div>
        <input value={input.email} onChange={(e)=> {
          setInput((prev)=> ({
            ...prev,
            email:e.target.value
          }))
        }} />
      </div>
      <div>
        <button>submit</button>
      </div>
      </form>

      </div> )}

      <div>
        <input placeholder='Search' type={"text"} onChange={(e)=> {setSearch(e.target.value)}}/>
        <button onClick={()=>{setSort(true)}}>ASC</button>
        <button onClick={()=>{setSort(false)}}>DSC</button>

      </div>
          <div>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>name</th>
                  <th>Email</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody>
                {
                  userData && userData.filter(val=> {
                    if(val == ''){
                      return val;
                    } else if(val.name.toLocaleLowerCase().includes(serach.toLocaleLowerCase())){
                      return val;
                    }
                  }).sort(sort ? asc :dsc).map((val)=> {
                    return(
                      <tr key={val.id}>
                        <td>{val.id}</td>
                        <td>{val.name}</td>
                        <td>{val.email}</td>
                        <td><button onClick={()=>{deleteUset(val.id)}}>Delete</button>
                        <button onClick={()=>(
                          setInput(
                            {
                              
                              name:val.name,
                              email:val.email
                            }
                          ),
                          setId(val.id),
                          setbool(false)
                        )}>Edit</button></td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>

          </div>
         
      
    </div>
  )
}
export default App;
