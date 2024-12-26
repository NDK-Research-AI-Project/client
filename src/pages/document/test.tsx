import {
  ArrowTopRightOnSquareIcon,
  ArrowUpOnSquareIcon,
  ClockIcon,
  DocumentIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewDocument = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleClick = () => setIsCollapsed(!isCollapsed);

  return (
    <>
      <div
        className={`flex flex-col h-full  border border-[#e3e6ea] rounded-2xl py-4 px-5 relative`}
      >
        {/* title section */}
        <div className="flex items-center justify-between border-b pb-3 mb-5">
          <h1 className="text-2xl font-bold">Documents</h1>
          <button
            className="flex justify-center items-center gap-1 py-2 px-3  rounded-lg cursor-pointer bg-[#2777fb] text-white font-semibold text-sm "
            onClick={() => navigate('/document/upload')}
          >
            <span>
              <ArrowUpOnSquareIcon className="w-4 h-4 " />
            </span>
            Upload File
          </button>
        </div>

        {/* content section */}
        <div className="flex-1 overflow-y-auto flex flex-row justify-between items-start h-full">
          {/* right document data section */}
          <div
            className={`overflow-y-auto p-4 ${
              isCollapsed ? 'w-full' : 'w-2/3'
            }`}
          >
            <div className="flex flex-col items-center mr-auto ml-auto  gap-5">
              <div className="flex justify-between items-center w-full">
                {/* TODO : ADD chat count */}
                <p className="text-base font-semibold"> All documents(14)</p>
                <div className="flex items-center gap-2 justify-start px-3 py-3 shadow-lg rounded-lg  bg-white">
                  <MagnifyingGlassIcon className="w-4 h-4" />

                  <input
                    placeholder="Search for chats..."
                    type="text"
                    className="text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col w-full gap-2">
                {/* TODO : single Chat Card */}
                <DocumentCard handleClick={handleClick} />
                <DocumentCard handleClick={handleClick} />
                <DocumentCard handleClick={handleClick} />
                <DocumentCard handleClick={handleClick} />
                <DocumentCard handleClick={handleClick} />
                <DocumentCard handleClick={handleClick} />
                <DocumentCard handleClick={handleClick} />
                <DocumentCard handleClick={handleClick} />
                <DocumentCard handleClick={handleClick} />
                <DocumentCard handleClick={handleClick} />
                <DocumentCard handleClick={handleClick} />
                <DocumentCard handleClick={handleClick} />
                <DocumentCard handleClick={handleClick} />
                <DocumentCard handleClick={handleClick} />
                <DocumentCard handleClick={handleClick} />
                <DocumentCard handleClick={handleClick} />
                <DocumentCard handleClick={handleClick} />
                <DocumentCard handleClick={handleClick} />
                <DocumentCard handleClick={handleClick} />
                <DocumentCard handleClick={handleClick} />
                <DocumentCard handleClick={handleClick} />
                <DocumentCard handleClick={handleClick} />
              </div>
            </div>
          </div>

          {/* document details view side panal */}
          {!isCollapsed && (
            <div className={` h-full overflow-y-auto p-4 w-1/3`}>
              <div className="border rounded-xl p-4 ">
                <div className="flex flex-col items-center gap-4">
                  {/* Icon and File Name */}
                  <div className="flex flex-col items-center mt-9 mb-9">
                    <DocumentTextIcon className="w-20 h-20" />
                    <p className="font-semibold text-lg">Lorem ipsum</p>
                  </div>

                  {/* Description */}
                  <div>
                    <p className="font-semibold  text-sm mb-1">Description</p>
                    <p className=" text-sm text-[#666f8d]">
                      This is a detailed description of the document. It
                      provides more context and information about the document.
                    </p>
                  </div>

                  {/* Meta Data */}

                  <div className="w-full">
                    <p className="font-semibold  text-sm mb-1">File type</p>
                    <div className="flex justify-start items-center gap-1  text-[#666f8d]">
                      <DocumentIcon className="w-4 h-4" />
                      <p>Pdf</p>
                    </div>
                  </div>

                  {/* Meta Data */}

                  <div className="w-full">
                    <p className="font-semibold  text-sm mb-1">Uploaded time</p>
                    <div className="flex justify-start items-center gap-1  text-[#666f8d]">
                      <ClockIcon className="w-4 h-4" />
                      <p>15/02/2025 05:48 pm</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 mt-auto">
                    <button className="flex items-center gap-1 py-2 px-3 rounded-lg bg-red-500 text-white font-semibold text-sm">
                      Delete
                    </button>
                    <button className="flex items-center gap-1 py-2 px-3 rounded-lg bg-[#2777fb] text-white font-semibold text-sm">
                      <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                      Open
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewDocument;

interface DocumentCardProps {
  handleClick: () => void;
}

export const DocumentCard = ({ handleClick }: DocumentCardProps) => {
  return (
    <>
      {/* TODO : single Chat Card */}
      <div
        className="flex flex-row justify-between items-center bg-white shadow-md rounded-lg p-4 w-full text-sm cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
        onClick={handleClick}
      >
        <div className="flex items-center gap-4">
          {/* icon */}
          <DocumentTextIcon className="w-5 h-5" />
          {/* Document Name */}
          <p className="font-semibold ">Lorem ipsum</p>
        </div>
        {/* Other data and functions */}
        <div className="flex justify-between items-center gap-4 text-[#666f8d]">
          <div className="flex items-center gap-1">
            <DocumentIcon className="w-4 h-4" />
            <p>Pdf</p>
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4" />
            <p>2 mins ago</p>
          </div>
          <button>
            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
};
