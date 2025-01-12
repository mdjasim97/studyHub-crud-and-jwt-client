import React from 'react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';


const AssignmentUpdate = () => {

    const navigate = useNavigate()
    const updateData = useLoaderData()
    const [startDate, setStartDate] = useState(new Date());
    const [options, setOptions] = useState(" ");

    // console.log(updateData)


    const selectOptions = (e) => {
        setOptions(e.target.value)
    }

    const handleUpdateAssignment = (e) => {
        e.preventDefault()

        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const marks = form.marks.value;
        const image_url = form.image_url.value;
        const ass_lavel = options;
        const selectDate = startDate;

        const updateAssign = { title, description, marks, image_url, ass_lavel, selectDate }
        // console.log(updateAssign)

        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios.put(`https://crud-and-jwt-server-nine.vercel.app/updateAssign/${updateData._id}`,updateAssign, {withCredentials : true})
                    .then(data => {
                        // console.log(data)
                        if (data.data.modifiedCount > 0) {
                            Swal.fire("Saved!", "", "success");
                            navigate("/assignments")
                        }
                    })

            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    }




    return (
        <div>

            <div className='flex justify-center min-h-screen items-center bg-[url("https://i.postimg.cc/3r4zrzzn/pexels-katerina-holmes-5905615.jpg")] bg-no-repeat bg-cover'>
                {/* <img className='w-full relative' src="https://i.postimg.cc/3r4zrzzn/pexels-katerina-holmes-5905615.jpg" alt="" /> */}


                <div className='w-full m-5 lg:my-8 lg:w-1/2'>
                    <div className="card bg-base-200">
                        <form onSubmit={handleUpdateAssignment} className="card-body">

                            <h1 className='text-2xl lg:text-5xl font-bold text-center'>Assignment Update Form</h1>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input type="text" defaultValue={updateData.title} name="title" placeholder="Title name" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="">Description</span>
                                </label>
                                <textarea type="text" defaultValue={updateData.description} name="description" placeholder="Descriptions" className="input input-bordered h-20 resize-none" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Marks</span>
                                </label>
                                <input type="text" defaultValue={updateData.marks} name="marks" placeholder="Input marks" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Thumbnail Image URL</span>
                                </label>
                                <input type="text" defaultValue={updateData.image_url} name="image_url" placeholder="Thumbnail Image URL" className="input input-bordered" required />
                            </div>


                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">User Email</span>
                                </label>
                                <input type="email" defaultValue={updateData.user_email} name="userEmail" placeholder="User email" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Difficulty label</span>
                                </label>
                                <select defaultValue={updateData.ass_lavel} onChange={selectOptions} className='p-3 rounded-xl border-2'>
                                    <option className='p-4' disabled>Chosse an options</option>
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                            </div>



                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Date</span>
                                </label>

                                <DatePicker className='w-full p-3 border-2 border-base-300' selected={startDate} onChange={(date) => setStartDate(date)} />

                            </div>


                            <div className="form-control mt-6">
                                <button className="btn bg-orange-600 text-white font-bold text-xl">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AssignmentUpdate;