import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import '../../src/App.css';
import axios from 'axios'
import { Link } from 'react-router-dom';
const Read = () => {
  const [post, setPost] = useState([]);
  const [number, setNumber] = useState(1); // No of pages
  const [postPerPage] = useState(5);

  function getData() {
    axios.get('https://6527cb1f931d71583df1650f.mockapi.io/crud')
    .then((response) => {
        // console.log(response.data);
        setPost(response.data);
    });
}
  function handleDelete(id) {
    axios.delete(`https://6527cb1f931d71583df1650f.mockapi.io/crud/${id}`)
    .then(() => {
        getData();
    })
  }

  useEffect(() =>{
    getData();
},[])
  function setDataToStorage(id, name, age, email){
    localStorage.setItem('id',id);
    localStorage.setItem('name',name);
    localStorage.setItem('age',age);
    localStorage.setItem('email',email);
}
  const lastPost = number * postPerPage;
  const firstPost = lastPost - postPerPage;
  const currentPost = post.slice(firstPost, lastPost);
  const PageCount = Math.ceil(post.length / postPerPage + 1);
  const ChangePage = ({ selected  }) => {
    setNumber(selected );
  };
  
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className='mb-2 mt-2'>
            <Link to='/create'>
                <button className='btn btn-primary'>Add new Data</button>
            </Link>
          </div>
          <table className="table table-bordered table-striped table-hover table-info table-responsive">
            <thead>
              <tr className="border-2 border-dark text-center my-2">
                <th className="col-1 border-2 border-dark fs-4 text-capitalize">
                ID
                </th>
                <th className="col-3 border-2 border-dark fs-4 text-capitalize">
                  Name
                </th>
                <th className="col-3 border-2 border-dark fs-4 text-capitalize">
                  Age
                </th>
                <th className="col-2 border-2 border-dark fs-4 text-capitalize">
                  Email
                </th>
                <th className="col-6 border-2 border-dark fs-4 text-capitalize">
                  Edit
                </th>
                <th className="col-6 border-2 border-dark fs-4 text-capitalize">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {currentPost.map((Val,index) => {
                return (
                  <>
                    <tr
                      className="border-2 border-dark text-center"
                      key={index}
                    >
                      <td className="border-2 border-dark text-capitalize">
                        {Val.id}
                      </td>
                      <td className="border-2 border-dark text-capitalize">
                        {Val.e_name}
                      </td>
                      <td className="border-2 border-dark text-capitalize">
                        {Val.e_age}
                      </td>
                      <td className="border-2 border-dark text-capitalize">
                        {Val.e_email}
                      </td>
                      <td className="border-2 border-dark text-capitalize">
                          <Link to='/edit'>
                              <button className='btn btn-success' onClick={() => setDataToStorage(Val.id,Val.e_name,Val.e_age,Val.e_email)}>Edit</button>    
                          </Link>
                      </td>
                      <td className="border-2 border-dark text-capitalize">
                        <button className='btn btn-danger' onClick={()=> {if(window.confirm('Are you sure delete this data?')) handleDelete(Val.id)}}>Delete</button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={PageCount}
            onPageChange={ChangePage}
            containerClassName={"pagination"}
            pageLinkClassName={'page-number'}
            activeClassName={"paginationActive"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            renderOnZeroPageCount={null}
            disabledClassName={"pagination__disable"}
            disableInitialCallback={true}
          ></ReactPaginate>
        </div>
      </div>
    </>
  );
};

export default Read;
