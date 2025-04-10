import {
  ArrowTopRightOnSquareIcon,
  ArrowUpOnSquareIcon,
  ClockIcon,
  DocumentIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPdfDocuments } from '../../services/api/pdf/pdfServices';
import { showPromise } from '../../utils/toaster';
import { formatDate } from '../../utils/dateTime';

interface IDocument {
  id: string;
  name: string;
  fileType: string;
  uploadTime: string;
  downloadUrl: string;
}

interface IPdfDocument {
  _id: string;
  filename: string;
  numberOfPages: number;
  fileSize: number;
  fileType: string;
  uploadDate: string;
  azureBlobUrl: string;
  azureBlobName: string;
  downloadUrl: string;
}

const ViewDocument = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState<IDocument | null>(null);
  const [documents, setDocuments] = useState<IPdfDocument[]>([]);

  const handleSidebarOpen = ({
    id,
    name,
    fileType,
    uploadTime,
    downloadUrl,
  }: IDocument) => {
    setSelectedDoc({ id, name, fileType, uploadTime, downloadUrl });
    setIsCollapsed(false);
  };

  const handleSidebarClose = () => {
    setSelectedDoc(null);
    setIsCollapsed(true);
  };

  const fetchDocuments = async () => {
    const getAllDocumentsPromise = getAllPdfDocuments().then(
      ({ documents, error }) => {
        if (error) {
          throw new Error(error);
        }

        if (documents) {
          setDocuments(documents);
        }
      }
    );

    showPromise(getAllDocumentsPromise, {
      loading: 'Getting all the PDFs...',
      success: 'Success!',
      error: (error: string) => `${error}`,
    });
  };

  // Add this near your other state variables
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    if (!hasLoadedRef.current) {
      fetchDocuments();
      hasLoadedRef.current = true;
    }
  }, []);

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
              <p className="text-base font-semibold">
                All documents{' (' + documents.length + ')'}
              </p>
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
              {documents.length === 0 && (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">No documents available</p>
                </div>
              )}

              {documents.map((doc) => (
                <DocumentCard
                  key={doc._id}
                  handleClick={handleSidebarOpen}
                  isSelected={selectedDoc?.id === doc._id}
                  id={doc._id}
                  name={doc.filename}
                  fileType={doc.fileType}
                  uploadTime={formatDate(doc.uploadDate)}
                  downloadUrl={doc.downloadUrl}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Sidebar - Fixed */}
        {!isCollapsed && (
          <div className="w-3/12 bg-white overflow-y-auto h-full ">
            <div className="sticky top-0 p-4 h-full">
              <div className="border rounded-xl p-5 h-full relative">
                <button
                  className="absolute flex justify-end p-2 hover:bg-gray-200 top-1 right-1 rounded-lg"
                  onClick={handleSidebarClose}
                >
                  <XMarkIcon className="w-5 h-5 " />
                </button>
                <div className="flex flex-col items-center justify-between  gap-4 h-full">
                  <div className="flex flex-col items-center w-full  gap-4">
                    {/* Icon and File Name */}
                    <div className="flex flex-col gap-4 items-center my-4">
                      <DocumentTextIcon className="w-20 h-20" />
                      <p className="font-semibold text-lg">
                        {selectedDoc?.name}
                      </p>
                    </div>

                    {/* Description */}
                    {/* <div className="w-full">
                      <p className="font-semibold text-sm mb-1">Description</p>
                      <p className="text-sm text-[#666f8d]">
                        This is a detailed description of the document. It
                        provides more context and information about the
                        document.
                      </p>
                    </div> */}

                    {/* File Type */}
                    <div className="w-full">
                      <p className="font-semibold text-sm mb-1">File type</p>
                      <div className="flex items-center gap-1 text-[#666f8d]">
                        <DocumentIcon className="w-4 h-4" />
                        <p>
                          {selectedDoc?.fileType === 'application/pdf'
                            ? 'PDF'
                            : selectedDoc?.fileType}
                        </p>
                      </div>
                    </div>

                    {/* Upload Time */}
                    <div className="w-full">
                      <p className="font-semibold text-sm mb-1">
                        Uploaded time
                      </p>
                      <div className="flex items-center gap-1 text-[#666f8d]">
                        <ClockIcon className="w-4 h-4" />
                        <p>{selectedDoc?.uploadTime}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 mt-4 w-full">
                    <button className="flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-lg bg-red-500 text-white font-semibold text-sm">
                      Delete
                    </button>
                    <a
                      href={selectedDoc?.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-lg bg-[#2777fb] text-white font-semibold text-sm cursor-pointer"
                    >
                      <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                      Open
                    </a>
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
  handleClick: (doc: IDocument) => void;
  isSelected?: boolean;
  id: string;
  name: string;
  fileType: string;
  uploadTime: string;
  downloadUrl: string;
}

const DocumentCard = ({
  handleClick,
  isSelected,
  id,
  name,
  fileType,
  uploadTime,
  downloadUrl,
}: DocumentCardProps) => {
  return (
    <div
      className={`grid grid-cols-[1fr_60px_190px_40px] gap-4 items-center bg-white shadow-md rounded-lg p-3 w-full text-sm cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ${
        isSelected ? 'border-2 border-[#2777fb]' : ''
      }`}
      onClick={() =>
        handleClick({ id, name, fileType, uploadTime, downloadUrl })
      }
    >
      <div className="flex items-center gap-4 min-w-0">
        <DocumentTextIcon className="w-5 h-5 flex-shrink-0" />
        <p className="font-semibold truncate">{name}</p>
      </div>

      <div className="flex items-center gap-1 justify-start text-[#666f8d]">
        <DocumentIcon className="w-4 h-4 flex-shrink-0" />
        <p className="truncate">
          {fileType === 'application/pdf' ? 'PDF' : fileType}
        </p>
      </div>

      <div className="flex items-center gap-1 justify-end text-[#666f8d]">
        <ClockIcon className="w-4 h-4 flex-shrink-0" />
        <p className="truncate">{uploadTime}</p>
      </div>

      <button className="flex justify-center hover:bg-gray-200 rounded-lg p-2">
        <ArrowTopRightOnSquareIcon className="w-4 h-4 text-[#666f8d]" />
      </button>
    </div>
  );
};

export default ViewDocument;
