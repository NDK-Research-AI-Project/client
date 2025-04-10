import {
  ArrowLeftIcon,
  ArrowUpOnSquareIcon,
  PlusIcon,
  RectangleGroupIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadGlossaries } from '../../services/api/glossary/glossaryService';
import { showPromise } from '../../utils/toaster';

const UploadGlossary = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [glossary, setGlossary] = useState([
    {
      term: '',
      definition: '',
    },
  ]);
  const navigate = useNavigate();

  const createNewGlossaryInput = () => {
    setGlossary((prev) => [...prev, { term: '', definition: '' }]);
  };

  const removeGlossaryItem = (idx: number) => {
    const glossaryItems = glossary.filter((item, index) =>
      index !== idx ? item : null
    );
    setGlossary(glossaryItems);
  };

  const handleGlossaryChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const { name, value } = e.target;

    setGlossary((prev) =>
      prev.map((item, index) =>
        index === idx ? { ...item, [name]: value } : item
      )
    );
  };

  const handleClearAll = () => {
    setGlossary([
      {
        term: '',
        definition: '',
      },
    ]);
  };

  const uploadGlossary = async () => {
    if (
      !glossary[glossary.length - 1].term ||
      !glossary[glossary.length - 1].definition
    ) {
      alert('Please fill all the feilds.');
      return;
    }

    // Set initial upload state
    setIsUploading(true);
    //setUploadStatus('Uploading in progress...');

    const uploadPromise = uploadGlossaries(glossary).then(({ data, error }) => {
      if (error) {
        // setUploadStatus('Error uploading file: ' + error);
        setIsUploading(false);
        throw new Error(error);
      }

      if (data) {
        setIsUploading(false);
        // Clear uploaded files
        handleClearAll();
        return data.message;
      }
    });

    showPromise(uploadPromise, {
      loading: 'Uploading in progress...',
      success: 'Success! Glossaries saved successfully.',
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
            onClick={() => navigate('/glossary/view')}
          >
            <span>
              <ArrowLeftIcon className="w-4 h-4 " />
            </span>
          </button>
          <h1 className="text-2xl font-bold">Add New Glossaries</h1>
        </div>

        {/* content area */}

        <div className="flex-1 overflow-y-auto transition-all duration-300">
          {!isUploading && (
            <div className="rounded-xl border border-stroke bg-white shadow-default ">
              <div className="border-b border-stroke py-6 px-7  flex justify-start items-center gap-3">
                <RectangleGroupIcon className="w-6 h-6" />
                <h3 className="text-base font-semibold text-[#1e1e1e] ">
                  Insert your glossaries
                </h3>
              </div>
              <div className="p-7 w-full">
                <form action="#" className="w-full">
                  <div
                    id="glossaryUpload"
                    className="flex flex-col gap-4 w-full"
                  >
                    <p className="text-base text-[#666f8d] mb-2">
                      Add your glossary items here. Each item should have a term
                      and its definition.
                    </p>

                    {glossary.map((item, idx) => (
                      <GlossaryInputFeild
                        key={idx}
                        id={idx}
                        term={item.term}
                        definition={item.definition}
                        handleChange={handleGlossaryChange}
                        handleRemove={removeGlossaryItem}
                        length={glossary.length}
                      />
                    ))}
                    <div className="w-full flex justify-between items-center gap-5">
                      <hr className="w-full" />
                      <button
                        aria-label="Add new Feild"
                        type="button"
                        className="flex justify-center items-center min-w-8 h-8 rounded-full bg-[#f7f8fa] hover:bg-slate-200 text-[#1e1e1e] font-semibold text-sm border disabled:bg-slate-100"
                        onClick={() => createNewGlossaryInput()}
                        disabled={
                          glossary[glossary.length - 1].term === '' ||
                          glossary[glossary.length - 1].definition === ''
                        }
                      >
                        <span>
                          <PlusIcon className="w-4 h-4" />
                        </span>
                      </button>
                      <hr className="w-full" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>

        {/*Footer*/}

        <div className="flex justify-end gap-4 mt-5">
          {!isUploading && (
            <>
              <button
                type="button"
                className="flex justify-center rounded-lg cursor-pointer py-2 px-3 font-semibold text-sm text-[#1e1e1e] hover:shadow-1 border"
                onClick={handleClearAll}
              >
                Clear all
              </button>
              <button
                type="button"
                className="flex justify-center items-center gap-1 py-2 px-4  rounded-lg cursor-pointer bg-[#2777fb] text-white font-semibold text-sm disabled:bg-slate-200"
                onClick={uploadGlossary}
                disabled={
                  glossary[glossary.length - 1].term === '' ||
                  glossary[glossary.length - 1].definition === ''
                }
              >
                <span>
                  <ArrowUpOnSquareIcon className="w-5 h-5" />
                </span>
                Save
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UploadGlossary;

interface IGlossaryInputFeildProps {
  id: number;
  term: string;
  definition: string;
  length: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void;
  handleRemove: (id: number) => void;
}

const GlossaryInputFeild = ({
  id,
  term,
  definition,
  length,
  handleChange,
  handleRemove,
}: IGlossaryInputFeildProps) => {
  return (
    <div className="flex justify-start w-full items-center  gap-4 ">
      <div className="flex justify-start  items-center  gap-2 w-full">
        <input
          type="text"
          name="term"
          placeholder="Enter Term here..."
          value={term}
          onChange={(e) => handleChange(e, id)}
          className="border  rounded-lg py-3 px-4 w-3/12 text-[#4d5268] text-sm font-medium"
        />
        <span className="text-[#a1a1a1]">:</span>
        <input
          type="text"
          name="definition"
          placeholder="Definition"
          value={definition}
          onChange={(e) => handleChange(e, id)}
          className="border  rounded-lg py-3 px-4 p-2 w-full  text-sm text-[#4d5268]"
        />
      </div>

      <button
        type="button"
        className="flex justify-center items-center w-8 h-8 rounded-full bg-[#f7f8fa] hover:bg-red-500 transition-all hover:text-white text-[#1e1e1e] font-semibold text-sm border disabled:bg-slate-200 disabled:text-[#1e1e1e]"
        onClick={() => handleRemove(id)}
        disabled={length <= 1}
      >
        <span>
          <XMarkIcon className="w-4 h-4" />
        </span>
      </button>
    </div>
  );
};
