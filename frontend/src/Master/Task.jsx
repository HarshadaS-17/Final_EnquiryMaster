// import React, { useRef } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const TaskForm = () => {
//   const fileInputRef = useRef(null);

//   const formStyle = {
//     maxWidth: '900px',
//     margin: '20px auto',
//     border: '1px solid #ccc',
//     borderRadius: '8px',
//     padding: '20px',
//     backgroundColor: '#f8f9fa',
//     marginLeft: '35rem'
//   };

//   const headerStyle = {
//     backgroundColor: '#d9edf7',
//     padding: '10px 20px',
//     borderTopLeftRadius: '8px',
//     borderTopRightRadius: '8px',
//     margin: '-20px -20px 20px',
//     fontWeight: 'bold',
//     fontSize: '18px'
//   };

//   const uploadBoxStyle = {
//     border: '2px dashed #ccc',
//     borderRadius: '6px',
//     padding: '30px',
//     textAlign: 'center',
//     color: '#888',
//     cursor: 'pointer'
//   };

//   const handleUploadClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileChange = (event) => {
//     const files = event.target.files;
//     console.log('Selected files:', files);
//     // You can store or upload files here as needed
//   };

//   return (
//     <div style={formStyle}>
//       <div style={headerStyle}>Create New Task</div>
//       <form>
//         <div className="row mb-3">
//           <div className="col">
//             <label>Task Title</label>
//             <input type="text" className="form-control" placeholder="Enter Task title" />
//           </div>
//           <div className="col">
//             <label>Assign By<span style={{ color: 'red' }}>*</span></label>
//             <select className="form-control">
//               <option>Select</option>
//             </select>
//           </div>
//         </div>

//         <div className="mb-3">
//           <label>Assign To<span style={{ color: 'red' }}>*</span></label>
//           <select className="form-control">
//             <option>Select</option>
//           </select>
//         </div>

//         <div className="mb-3">
//           <label>Task Description</label>
//           <textarea className="form-control" rows="3" placeholder="Enter description..."></textarea>
//         </div>

//         <div className="row mb-3">
//           <div className="col">
//             <label>Due Date</label>
//             <input type="date" className="form-control" />
//           </div>
//           <div className="col">
//             <label>Priority</label>
//             <select className="form-control">
//               <option>Select Priority</option>
//             </select>
//           </div>
//         </div>

//         <div className="mb-3" style={uploadBoxStyle} onClick={handleUploadClick}>
//           <div>
//             <i className="bi bi-cloud-upload" style={{ fontSize: '24px' }}></i>
//             <p>Drop files here or click to upload.</p>
//           </div>
//           <input
//             type="file"
//             ref={fileInputRef}
//             style={{ display: 'none' }}
//             multiple
//             onChange={handleFileChange}
//           />
//         </div>

//         <div className="d-flex justify-content-end">
//           <button type="button" className="btn btn-secondary me-2">Close</button>
//           <button type="submit" className="btn btn-primary">Add Task</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default TaskForm;
