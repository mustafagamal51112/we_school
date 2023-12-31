import React, { useState } from 'react';
import Modal from 'react-modal';
import { AiOutlineDownload } from 'react-icons/ai';
import { MdClose } from 'react-icons/md';

Modal.setAppElement('#root');

const FilesModal = ({ postFiles,isOpen ,onClose}) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [files, setFiles] = useState(postFiles);
  

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    onClose()
  };




  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={toggleModal}
      className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] overflow-y-auto    rounded-lg border-none outline-none bg-[#f7f2fb] p-2 drop-shadow-lg   h-96 w-80  md:w-[400px]   lg:w-[600px]     dark:bg-slate-700  "
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

      <div className="flex flex-col gap-4   ">
        <h1 className='text-xl text-sec text-center  dark:text-white'>Files : {files.length}</h1>
        {!files ? (
          <>No files</>
        ) : (
          files.map((file) => (
            <div
              key={file._id}
              className="flex items-center justify-between lg:px-10 px-2 bg-white drop-shadow rounded-md h-20 lg:w-[80%] m-auto dark:bg-slate-800"
            >
              <div className="flex items-center justify-center lg:w-1/2 bg-white h-full dark:bg-slate-800 dark:text-white">
                <svg
                  className="h-full p-3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  id="file"
                >
                  <path
                    fill="#8c9eff"
                    d="M26,3V29a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V9a1,1,0,0,1,.23-.64l5-6A1,1,0,0,1,12,2H25A1,1,0,0,1,26,3Z"
                  ></path>
                  <path
                    fill="#5f7cf9"
                    d="M14,2v8a1,1,0,0,1-1,1H6V9a1,1,0,0,1,.23-.64l5-6A1,1,0,0,1,12,2Z"
                  ></path>
                </svg>
                <div>
                <h1>{file.fileName ? (file.fileName.length > 15 ? `${file.fileName.slice(0, 10)}...${file.fileName.slice(-5)}` : file.fileName) : "file"}</h1>
                  <p>{file.fileSize || "unKnown"}</p>
                </div>
              </div>

              <a
                download
                href={ "https://we-school-api.vercel.app"+ file.fileLink  }
                className="bg-white drop-shadow-lg hover:bg-main hover:text-white rounded-full p-2 cursor-pointer text-xl"
              >
                <AiOutlineDownload />
              </a>
            </div>
          ))
        )}
      </div>
    </Modal>
  );
};

export default FilesModal;
