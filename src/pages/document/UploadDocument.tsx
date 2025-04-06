import {
  ArrowLeftIcon,
  ArrowUpOnSquareIcon,
  CircleStackIcon,
  DocumentIcon,
  DocumentTextIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { ChangeEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileType } from '../../types/types';
import { formatFileSize } from '../../utils/fileSizeCalculate';
import { uploadPdfDocument } from '../../services/api/pdf/pdfServices';
import { showPromise } from '../../utils/toaster';

interface DocumentDetails {
  name: string;
  type: string;
  file: File;
  error: string;
  progress: number;
  selected: boolean;
  size: number;
}

const UploadDocument = () => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [documents, setDocuments] = useState<DocumentDetails[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  //const [uploadStatus, setUploadStatus] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    //setUploadStatus('');
    const selectedFiles = Array.from(e.target.files || []);
    const documentsArray = selectedFiles.map((file) => {
      return {
        name: file.name,
        type: file.type,
        file,
        error: '',
        progress: 0,
        selected: false,
        size: file.size,
      };
    });

    setDocuments((prev) => [...prev, ...documentsArray]);
  };

  const handleRemoveDocument = (docName: string) => {
    const filteredDocs = documents.filter((doc) => doc.name !== docName);
    setDocuments(filteredDocs);
  };

  const handleClearAll = () => {
    setDocuments([]);
  };

  const uploadFile = async () => {
    if (!documents.length) {
      alert('Please select files to upload.');
      return;
    }

    // Reset progress for all files
    setUploadProgress(
      documents.reduce((acc, file) => ({ ...acc, [file.name]: 0 }), {})
    );

    // Set initial upload state
    setIsUploading(true);
    //setUploadStatus('Uploading in progress...');

    const uploadPromise = uploadPdfDocument(documents[0].file).then(
      ({ data, error }) => {
        if (error) {
          // setUploadStatus('Error uploading file: ' + error);
          setIsUploading(false);
          setDocuments([]);
          throw new Error(error);
        }

        if (data) {
          setIsUploading(false);
          // Clear uploaded files
          setDocuments([]);
          return data.message;
        }
      }
    );

    showPromise(uploadPromise, {
      loading: 'Uploading in progress...',
      success: 'Success! File uploaded successfully.',
      error: (error: string) => `${error}`,
    });
  };

  return (
    <>
      <div
        className={`flex flex-col h-full  border border-[#e3e6ea] rounded-2xl py-4 px-5`}
      >
        <div className="flex items-center justify-start gap-3 border-b pb-3 mb-5">
          <button
            className="flex justify-center items-center gap-1 py-2 px-4 rounded-lg cursor-pointer bg-[#f7f8fa] text-[#1e1e1e] font-semibold text-sm border"
            onClick={() => navigate('/document/view')}
          >
            <span>
              <ArrowLeftIcon className="w-4 h-4 " />
            </span>
          </button>
          <h1 className="text-2xl font-bold">Upload File</h1>
        </div>

        {/* content area */}

        <div className="flex-1 overflow-y-auto transition-all duration-300">
          {!isUploading && (
            <div className="rounded-xl border border-stroke bg-white shadow-default ">
              <div className="border-b border-stroke py-6 px-7  flex justify-start items-center gap-3">
                <DocumentTextIcon className="w-6 h-6" />
                <h3 className="text-base font-semibold text-[#1e1e1e] ">
                  Upload your document
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div
                    id="FileUpload"
                    className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-[#a1a1a1] bg-[#f7f8fa] py-9 px-4  sm:py-7.5"
                  >
                    {/* Drag and drop area */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf"
                      // multiple
                      onChange={handleFileChange}
                      className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                    />
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke  bg-white ">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                            fill="#2777fb"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                            fill="#2777fb"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                            fill="#2777fb"
                          />
                        </svg>
                      </span>
                      <p>
                        <span className="text-primary">
                          <u>Click here to upload</u>
                        </span>{' '}
                        or drag and drop
                      </p>
                      <p className="mt-1.5">PDF documents only</p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* {uploadStatus && (
            <div className="mt-5">
              <h3 className="text-base font-semibold text-[#1e1e1e] ">
                {uploadStatus}
              </h3>
            </div>
          )} */}

          {/* Show selected documents here */}

          <div className="flex flex-col mb-5 mt-5 px-2">
            {documents.map((document, idx) => (
              <UploadDocumentCard
                key={idx}
                error={document.error}
                fileType={document.type}
                name={document.name}
                progress={uploadProgress[document.name] || 0}
                size={document.size}
                handleRemove={handleRemoveDocument}
                isUploading={isUploading}
              />
            ))}
          </div>
        </div>

        {/*Footer*/}

        {documents.length > 0 && (
          <div className="flex justify-end gap-4 mt-5">
            {!isUploading && (
              <>
                <button
                  className="flex justify-center rounded-lg cursor-pointer py-2 px-3 font-semibold text-sm text-[#1e1e1e] hover:shadow-1 border"
                  onClick={handleClearAll}
                >
                  Clear Selection
                </button>
                <button
                  className="flex justify-center items-center gap-1 py-2 px-4  rounded-lg cursor-pointer bg-[#2777fb] text-white font-semibold text-sm "
                  onClick={uploadFile}
                >
                  <span>
                    <ArrowUpOnSquareIcon className="w-5 h-5" />
                  </span>
                  Upload
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default UploadDocument;

interface DocumentCardProps {
  handleRemove: (name: string) => void;
  name: string;
  fileType: string;
  progress: number;
  error: string;
  size: number;
  isUploading: boolean;
}

const UploadDocumentCard = ({
  handleRemove,
  name,
  fileType,
  progress,
  error,
  size,
  isUploading,
}: DocumentCardProps) => {
  return (
    <div
      className={`grid grid-cols-[1fr_100px_60px_210px__40px] gap-4 items-center mb-1 bg-white shadow-md rounded-lg p-3 w-full text-sm cursor-pointer hover:shadow-xl transition-all duration-300 ${
        error ? 'border-2 border-[#f87171]' : ''
      }`}
    >
      <div className="flex items-center gap-4 min-w-0">
        <DocumentTextIcon className="w-5 h-5 flex-shrink-0" />
        <p className="font-semibold truncate">{name}</p>
      </div>

      <div className="flex items-center gap-1 justify-start text-[#666f8d]">
        <CircleStackIcon className="w-4 h-4 flex-shrink-0" />
        <p className="truncate">{formatFileSize(size)}</p>
      </div>

      <div className="flex items-center gap-1 justify-start text-[#666f8d]">
        <DocumentIcon className="w-4 h-4 flex-shrink-0" />
        <p className="truncate">
          {fileType === 'application/pdf' ? FileType.PDF : FileType.OTHER}
        </p>
      </div>

      <div className="flex items-center gap-1 justify-end text-[#666f8d]">
        <div className="w-full bg-gray-200 rounded-full h-2.5 ">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${progress}` }}
          ></div>
        </div>
      </div>

      {isUploading ? (
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-6 h-6 text-gray-200 animate-spin fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <button
          className="flex justify-center hover:bg-gray-200 rounded-lg p-2"
          onClick={() => handleRemove(name)}
        >
          <XMarkIcon className="w-4 h-4 text-[#666f8d]" />
        </button>
      )}

      {/* <CheckCircleIcon className="w-4 h-4 text-[#666f8d]" /> */}
    </div>
  );
};
