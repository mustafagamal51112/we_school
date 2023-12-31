import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { MdClose } from 'react-icons/md';
import { BiLoader } from 'react-icons/bi';
import { uploadTask } from '../functions/tasks';

const UploadTaskModal = ({ isOpen, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [uploading, setUploading] = useState(false);
  const [content, setContent] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [grade, setGrade] = useState("");

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    onClose();
  };

  const handleUploadTask = async () => {
    setUploading(true); 
    const { msg } = await uploadTask(content ,grade, selectedDate);

    setUploading(false);
    if (msg) {
      msg && toggleModal();
      setContent("");
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg border-none outline-none bg-[#f7f2fb] dark:bg-slate-800 p-2 drop-shadow-lg min-h-[500px] h-fit w-80 md:w-[800px] lg:w-[1000px]"
      overlayClassName="bg-[#48535a] bg-opacity-50 w-full h-full fixed top-0 left-0"
    >
      <div>
        <button
          onClick={toggleModal}
          className="absolute top-2 right-2 text-gray-500 hover:bg-sec hover:rounded-full hover:text-white p-1"
        >
          <MdClose size={24} />
        </button>
        <div className="h-10"></div>
      </div>
      <div className="w-full flex flex-col items-center text-main">
        <h1 className="text-center uppercase text-2xl p-3">Upload your Task</h1>
        <div className="flex flex-col items-center w-full">
          <div className="w-[70%] flex flex-col md:flex-row md:w-[70%] border-gray-300 border m-auto rounded-xl bg-gray-100 dark:bg-slate-800 p-2 md:p-5">
            <textarea
              type="text"
              className="w-full px-4 py-2 rounded-lg text-lg dark:bg-transparent dark:text-white dark:placeholder-white focus:outline-none placeholder-text-main outline-none"
              placeholder="Enter your text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="mt-4 w-[70%] flex flex-col items-center justify-center text-center">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-md text-lg dark:bg-transparent dark:text-white dark:placeholder-white focus:outline-none placeholder-text-main outline-none"
            />
            <select
              className="w-full border mt-6 border-gray-300 bg-white text-gray-900 rounded-md px-8 py-2 pr-8 focus:text-main appearance-none"
              name="role"
              value={grade}
              onChange={(e) => {
                setGrade(e.target.value);
              }}
            >
              <option value="" disabled>
                Select grade
              </option>
              <option value="A">Grade A</option>
              <option value="B">Grade B</option>
              <option value="C">Grade C</option>
              <option value="All">ALL</option>

            </select>
          </div>

        </div>
        <button
          className={`mt-8 btn-share bg-main hover:bg-sec text-white px-4 py-2 rounded-md cursor-pointer items-center flex gap-2`}
          onClick={handleUploadTask}
          disabled={uploading}
        >
          {uploading ? <BiLoader className="animate-spin mr-2" /> : null}
          {uploading ? "UPLOADING..." : "Share Task"}
        </button>
      </div>
    </Modal>
  );
}

export default UploadTaskModal;
