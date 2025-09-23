import React, { useEffect, useState } from 'react'
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { bookBaseUrl } from '../../axiosInstance';

const Home = () => {
  const [bookForm, setBookForm] = useState({
    BookName: "",
    BookTitle: "",
    Author: "",
    SellingPrice: "",
    PublishDate: "",
    id: ""
  });
  const [bookList, setBookList] = useState([]);
  const [isUpdateing, setIsUpdateing] = useState(false);
  const getAllBookList = async () => {
    try {
      const { data } = await bookBaseUrl.get("/booklists");
      setBookList(data?.bookList)
      console.log('bookList', data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllBookList();
  }, []);
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setBookForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async () => {
    try {
      if (isUpdateing) {
        // Update case
        const { data } = await bookBaseUrl.put("/updatebook", bookForm);
  
        if (data?.success) {
          alert(data?.message);
          await getAllBookList(); // refresh the list
          setBookForm({
            BookName: "",
            BookTitle: "",
            Author: "",
            SellingPrice: "",
            PublishDate: "",
            id: ""
          });
          setIsUpdateing(false);
        }
      } else {
        // Create case
        const { data } = await bookBaseUrl.post("/addbook", bookForm);
  
        if (data?.success) {
          alert(data?.message);
          await getAllBookList(); // refresh the list
          setBookForm({
            BookName: "",
            BookTitle: "",
            Author: "",
            SellingPrice: "",
            PublishDate: "",
            id: ""
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleDelete = async (id) => {
    try {
      const { data } = await bookBaseUrl.post("deletebook", {
        id: id
      });

      if (data?.success) {
        alert(data?.message);
        getAllBookList();
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdate = async (data) => {
    setBookForm({
      BookName: data?.BookName,
      BookTitle: data?.BookTitle,
      Author: data?.Author,
      SellingPrice: data?.SellingPrice,
      PublishDate: data?.PublishDate,
      id: data?._id,
    });
    setIsUpdateing(true);
  };


  return (
    <div className='w-full px-5 min-h-[calc(100vh-60px)]'>
      <div className="w-full grid grid-cols-5 gap-3 my-4">
        <div className='w-full flex flex-col gap-2'>
          <label htmlFor="">Book Name</label>
          <input
            type="text"
            placeholder='Book Name'
            name="BookName"
            value={bookForm.BookName}
            onChange={handleFormChange}
            className='w-full border-2 text-gray-800 border-gray-300 rounded-sm outline-none outline-gray-500 h-8 px-2' />
        </div>
        <div className='w-full flex flex-col gap-2'>
          <label htmlFor="">Book Title</label>
          <input
            type="text"
            placeholder='Book Title'
            name="BookTitle"
            value={bookForm.BookTitle}
            onChange={handleFormChange}
            className='w-full border-2 text-gray-800 border-gray-300 rounded-sm outline-none outline-gray-500 h-8 px-2' />
        </div>
        <div className='w-full flex flex-col gap-2'>
          <label htmlFor="">Author</label>
          <input
            type="text"
            placeholder='Author'
            name="Author"
            value={bookForm.Author}
            onChange={handleFormChange}
            className='w-full border-2 text-gray-800 border-gray-300 rounded-sm outline-none outline-gray-500 h-8 px-2' />
        </div>
        <div className='w-full flex flex-col gap-2'>
          <label htmlFor="">Selling Price</label>
          <input
            type="text"
            placeholder='Selling Price'
            name="SellingPrice"
            value={bookForm.SellingPrice}
            onChange={handleFormChange}
            className='w-full border-2 text-gray-800 border-gray-300 rounded-sm outline-none outline-gray-500 h-8 px-2' />
        </div>
        <div className='w-full flex flex-col gap-2'>
          <label htmlFor="">Publish Date</label>
          <input
            type="date"
            placeholder='Publish Date'
            name="PublishDate"
            value={bookForm.PublishDate}
            onChange={handleFormChange}
            className='w-full border-2 text-gray-800 border-gray-300 rounded-sm outline-none outline-gray-500 h-8 px-2' />
        </div>
      </div>
      <div className="w-full flex justify-end">
        <button
          onClick={handleSubmit}
          className='bg-gray-700 text-white h-9 w-22 rounded-md cursor-pointer' >SUBMIT</button>
      </div>

      <div className="w-full mt-10">
        <div className="w-full">
          <table className='w-full bg-white divide-y  divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Book Name</th>
                <th className='tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Book Title</th>
                <th className='tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Author</th>
                <th className='tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Selling Price</th>
                <th className='tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Publish Date</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y  divide-gray-200'>
              {
                bookList?.map((book, index) => {
                  return (
                    <tr className="hover:bg-gray-200" key={index}>
                      <td className='px-6 py-3 whitespace-nowrap'>{book?.BookName}</td>
                      <td className='px-6 py-3 whitespace-nowrap'>{book?.BookTitle}</td>
                      <td className='px-6 py-3 whitespace-nowrap'>{book?.Author}</td>
                      <td className='px-6 py-3 whitespace-nowrap'>{book?.SellingPrice}</td>
                      <td className='px-6 py-3 whitespace-nowrap'>{book?.PublishDate}</td>
                      <td className='px-6 py-3 whitespace-nowrap'>
                        <div className="w-20 flex justify-center gap-5">
                          <div
                            onClick={() => handleDelete(book._id)}
                            className="h08 w-8 flex justify-center items-center bg-red-100 text-red-600  rounded text-lg cursor-pointer">
                            <span><MdDelete /></span>
                          </div>
                          <div
                            onClick={() => handleUpdate(book)}
                            className="h08 w-8 flex justify-center items-center bg-green-100 text-green-600  rounded text-lg cursor-pointer">
                            <span><FaPen /></span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Home
