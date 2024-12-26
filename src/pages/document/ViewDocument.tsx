import {
  ArrowTopRightOnSquareIcon,
  ArrowUpOnSquareIcon,
  ClockIcon,
  DocumentIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewDocument = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

  const handleSidebarOpen = (docId: string) => {
    setSelectedDoc(docId);
    setIsCollapsed(false);
  };

  const handleSidebarClose = () => {
    setSelectedDoc(null);
    setIsCollapsed(true);
  };

  return (
    <div className="flex flex-col h-full border border-[#e3e6ea] rounded-2xl">
      {/* Header - Fixed */}
      <div className="flex items-center justify-between border-b p-4">
        <h1 className="text-2xl font-bold">Documents</h1>
        <button
          className="flex justify-center items-center gap-1 py-2 px-3 rounded-lg cursor-pointer bg-[#2777fb] text-white font-semibold text-sm"
          onClick={() => navigate('/document/upload')}
        >
          <ArrowUpOnSquareIcon className="w-4 h-4" />
          Upload File
        </button>
      </div>

      {/* Main Content Area - Flexible with Fixed Sidebar */}
      <div className="flex flex-1 min-h-0 h-full">
        {' '}
        {/* min-h-0 is important for nested flexbox scrolling */}
        {/* Documents List - Scrollable */}
        <div
          className={`${
            isCollapsed ? 'w-full' : 'w-9/12'
          } flex flex-col min-h-0 transition-all duration-300`}
        >
          {/* Search Bar - Fixed */}
          <div className="p-4 ">
            <div className="flex justify-between items-center w-full">
              <p className="text-base font-semibold">All documents(14)</p>
              <div className="flex items-center gap-2 px-3 py-3 shadow-lg rounded-lg bg-white">
                <MagnifyingGlassIcon className="w-4 h-4" />
                <input
                  placeholder="Search documents..."
                  type="text"
                  className="text-sm focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Documents List - Scrollable */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex flex-col gap-2">
              {Array.from({ length: 20 }).map((_, index) => (
                <DocumentCard
                  key={index}
                  handleClick={() => handleSidebarOpen(`doc-${index}`)}
                  isSelected={selectedDoc === `doc-${index}`}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Sidebar - Fixed */}
        {!isCollapsed && (
          <div className="w-3/12 bg-white overflow-y-auto h-full ">
            <div className="sticky top-0 p-4 h-full">
              <div className="border rounded-xl p-4 h-full relative">
                <button
                  className="absolute flex justify-end p-2 hover:bg-gray-200 top-1 right-1 rounded-lg"
                  onClick={handleSidebarClose}
                >
                  <XMarkIcon className="w-5 h-5 " />
                </button>
                <div className="flex flex-col items-center justify-between  gap-4 h-full">
                  <div className="flex flex-col items-center  gap-4">
                    {/* Icon and File Name */}
                    <div className="flex flex-col items-center my-4">
                      <DocumentTextIcon className="w-20 h-20" />
                      <p className="font-semibold text-lg">Lorem ipsum</p>
                    </div>

                    {/* Description */}
                    <div className="w-full">
                      <p className="font-semibold text-sm mb-1">Description</p>
                      <p className="text-sm text-[#666f8d]">
                        This is a detailed description of the document. It
                        provides more context and information about the
                        document.
                      </p>
                    </div>

                    {/* File Type */}
                    <div className="w-full">
                      <p className="font-semibold text-sm mb-1">File type</p>
                      <div className="flex items-center gap-1 text-[#666f8d]">
                        <DocumentIcon className="w-4 h-4" />
                        <p>PDF</p>
                      </div>
                    </div>

                    {/* Upload Time */}
                    <div className="w-full">
                      <p className="font-semibold text-sm mb-1">
                        Uploaded time
                      </p>
                      <div className="flex items-center gap-1 text-[#666f8d]">
                        <ClockIcon className="w-4 h-4" />
                        <p>15/02/2025 05:48 pm</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 mt-4 w-full">
                    <button className="flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-lg bg-red-500 text-white font-semibold text-sm">
                      Delete
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-lg bg-[#2777fb] text-white font-semibold text-sm">
                      <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                      Open
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface DocumentCardProps {
  handleClick: () => void;
  isSelected?: boolean;
}

const DocumentCard = ({ handleClick, isSelected }: DocumentCardProps) => {
  return (
    <div
      className={`flex flex-row justify-between items-center bg-white shadow-md rounded-lg p-4 w-full text-sm cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ${
        isSelected ? 'border-2 border-[#2777fb]' : ''
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center gap-4">
        <DocumentTextIcon className="w-5 h-5" />
        <p className="font-semibold">Lorem ipsum</p>
      </div>
      <div className="flex justify-between items-center gap-4 text-[#666f8d]">
        <div className="flex items-center gap-1">
          <DocumentIcon className="w-4 h-4" />
          <p>PDF</p>
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
  );
};

export default ViewDocument;
