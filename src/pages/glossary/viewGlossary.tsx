import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllGlossaries } from '../../services/api/glossary/glossaryService';
import { showPromise } from '../../utils/toaster';

interface IGlossary {
  term: string;
  definition: string;
}

const ViewGlossary = () => {
  const [glossaries, setGlossaries] = useState<IGlossary[]>([]);
  const navigate = useNavigate();

  const fetchGlossary = async () => {
    const getAllGlossaryPromise = getAllGlossaries().then(({ data, error }) => {
      if (error) {
        throw new Error(error);
      }

      if (data) {
        setGlossaries(data);
      }
    });

    showPromise(getAllGlossaryPromise, {
      loading: 'Getting all the glossaries...',
      success: 'Success!',
      error: (error: string) => `${error}`,
    });
  };

  // Add this near your other state variables
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    if (!hasLoadedRef.current) {
      fetchGlossary();
      hasLoadedRef.current = true;
    }
  }, []);

  return (
    <div className="flex flex-col h-full border border-[#e3e6ea] rounded-2xl">
      {/* Header - Fixed */}
      <div className="flex items-center justify-between border-b p-4">
        <h1 className="text-2xl font-bold">Glosseries</h1>
        <button
          className="flex justify-center items-center gap-1 py-2 px-3 rounded-lg cursor-pointer bg-[#2777fb] text-white font-semibold text-sm"
          onClick={() => navigate('/glossary/upload')}
        >
          <PlusIcon className="w-4 h-4" />
          Add New
        </button>
      </div>

      {/* Main Content Area - Flexible with Fixed Sidebar */}
      <div className="flex flex-1 min-h-0 h-full">
        {' '}
        {/* min-h-0 is important for nested flexbox scrolling */}
        {/* Documents List - Scrollable */}
        <div
          className={`w-full flex flex-col min-h-0 transition-all duration-300`}
        >
          {/* Search Bar - Fixed */}
          <div className="p-4 ">
            <div className="flex justify-between items-center w-full">
              <p className="text-base font-semibold">
                All glossaries{' (' + glossaries.length + ')'}
              </p>
              <div className="flex items-center gap-2 px-3 py-3 shadow-lg rounded-lg bg-white">
                <MagnifyingGlassIcon className="w-4 h-4" />
                <input
                  placeholder="Search glossaries..."
                  type="text"
                  className="text-sm focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Documents List - Scrollable */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex flex-col gap-2">
              {glossaries.length === 0 && (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">No glossaries available</p>
                </div>
              )}

              {glossaries.length > 0 && (
                <>
                  <div
                    className={`grid grid-cols-[1fr_1150px] gap-4 bg-slate-100 rounded-xl items-center  p-3 w-full mb-2 }`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <p className="font-semibold truncate">Term</p>
                    </div>

                    <div className="flex items-center gap-1 justify-start text-[#666f8d]">
                      <p className="truncate">Description</p>
                    </div>
                  </div>

                  {glossaries.map((glo, idx) => (
                    <GlossaryCard
                      key={idx}
                      term={glo.term}
                      description={glo.definition}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
        {/* Sidebar - Fixed */}
      </div>
    </div>
  );
};

export default ViewGlossary;

interface GlossaryCardProps {
  term: string;
  description: string;
}

const GlossaryCard = ({ term, description }: GlossaryCardProps) => {
  return (
    <div
      className={`grid grid-cols-[1fr_1150px] gap-4 items-center bg-white shadow-md rounded-lg p-3 w-full text-sm cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300 
      }`}
    >
      <div className="flex items-center gap-4 min-w-0">
        <p className="font-semibold truncate">{term}</p>
      </div>

      <div className="flex items-center gap-1 justify-start text-[#666f8d]">
        <p className="truncate">{description}</p>
      </div>
    </div>
  );
};
