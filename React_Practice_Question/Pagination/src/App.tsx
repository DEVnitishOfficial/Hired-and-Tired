import './App.css'
import { useState, useEffect } from 'react'

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

function App () {
  const [allData, setAllData] = useState<Post[]>([])
  const [fakeData, setFakeData] = useState<Post[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const itemsPerPage = 5

  useEffect(() => {
    async function fetchData () {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts')
      const data: Post[] = await res.json()
      console.log(data)
      setAllData(data)
      setFakeData(data.slice(0, itemsPerPage))
    }

    fetchData()
  }, [])

  function handleNextData () {
    const newStartIndex = currentIndex + itemsPerPage

    if (newStartIndex < allData.length) {
      const pageData = allData.slice(
        newStartIndex,
        newStartIndex + itemsPerPage
      )

      setFakeData(pageData)
      setCurrentIndex(newStartIndex)
    } else {
      alert('No more data left, reached to end of the list')
    }
  }

  function handlePrev () {
    const prevIndex = currentIndex - itemsPerPage
    if (prevIndex >= 0) {
      const pageData = allData.slice(prevIndex, prevIndex + itemsPerPage)
      setFakeData(pageData)
      setCurrentIndex(prevIndex)
    } else {
      alert('No more data press next to see more next data')
    }
  }

  return (
    <>
      <h1> Fetch data from api </h1>
      <ul>
        {fakeData.map(currData => {
          return (
            <li key={currData.id}>
              <h3> {currData.title} </h3>
              <p> {currData.body} </p>
            </li>
          )
        })}
      </ul>
        <div>
      <button style={{margin:"40px"}} onClick={handlePrev}> Prev </button>
      <button onClick={handleNextData}> Next </button>
        </div>
    </>
  )
}

export default App
