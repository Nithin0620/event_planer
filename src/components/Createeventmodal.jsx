import React from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineClose } from "react-icons/ai";
import { setcreateEventmodal } from '../Reducer/slices/modalSlics';
import { useDispatch } from 'react-redux';

const CreateEventmodal = () => {
  const {register , handleSubmit , formState:{errors} , } = useForm();
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <div>
          <div>
            Create Event -
          </div>
          <div onClick={()=>dispatch(setcreateEventmodal(false))}>
              <AiOutlineClose/>
          </div>
        </div>
        <div>
          

        </div>
        <div className="bg-gray-200 text-center py-2 text-sm text-gray-700">
          All rights reserved &copy; Nithin
        </div>
      </div>
    </div>
  )
}

export default CreateEventmodal