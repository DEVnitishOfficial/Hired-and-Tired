
import { useState } from "react"

function ReactForm(){

    const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  // Handle input changes

const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name] : e.target.value})
}

const handleSubmit = (e : React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    // --- Validation Logic ---
    if (formData.name === '') {
      alert('Name is a mandatory field.');
      return; 
    }

    if (formData.email === '') {
      alert('Email is a mandatory field.');
      return; 
    }

    if (formData.password === '') {
      alert('Password is a mandatory field.');
      return;
    }

    alert('Form data has been submitted successfully');
    console.log('myFormData', formData);
    setFormData({name: '', email: '', password: ''});

}


    return(
        <div>
            <form   onSubmit={handleSubmit}>
                <div>

                    <div>
                        <label>Name :  </label>
                        <input
                         type="text"
                         name="name"
                         value={formData.name}
                         onChange={handleChange}
                          />
                    </div>

                    <div>
                        <label>Email : </label>
                        <input 
                        type="email"
                        name="email"
                        value={formData.email} 
                        onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Password : </label>
                        <input 
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        />

                    </div>

                </div>

                <button type="submit">
                    signup
                </button>
            </form>
        </div>
    )
}

export default ReactForm