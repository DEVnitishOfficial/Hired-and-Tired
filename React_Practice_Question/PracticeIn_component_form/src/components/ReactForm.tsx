import { useState } from 'react'

function ReactForm () {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData({ ...formData, [name]: value })

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    type NewErrors = {
      name?: string
      email?: string
      password?: string
    }
    const newErrors: NewErrors = {}
    // --- Validation Logic ---
    if (formData.name === '') {
      newErrors.name = 'Name is a mandatory field'
    }

    if (formData.email === '') {
      newErrors.email = 'Email is a mandatory field.'
    }

    if (formData.password === '') {
      newErrors.password = 'Password is a mandatory field.'
    }

    // Update the errors state
    setErrors(newErrors)

    // If there are any errors, stop the form submission
    if (Object.keys(newErrors).length > 0) {
      return
    }

    alert('Form data has been submitted successfully')
    console.log('myFormData', formData)
    setFormData({ name: '', email: '', password: '' })
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
        <h2>Singup Form</h2>
      <form onSubmit={handleSubmit}>
        <div style={{display:'flex', flexDirection:'column', gap:'30px'}}>
          <div>
            <label>Name : </label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p style={{ color: 'red', margin: '0' }}>{errors.name}</p>
            )}
          </div>

          <div>
            <label>Email : </label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p style={{ color: 'red', margin: '0' }}>{errors.email}</p>
            )}
          </div>

          <div>
            <label>Password : </label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p style={{ color: 'red', margin: '0' }}>{errors.password}</p>
            )}
          </div>
        </div>

        <button type='submit'>signup</button>
      </form>
    </div>
  )
}

export default ReactForm
