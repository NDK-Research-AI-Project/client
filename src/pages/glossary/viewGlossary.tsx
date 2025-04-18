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
    <div className="flex flex-col h-full border rounded-2xl border-border-primary bg-background-primary">
      {/* Header - Fixed */}
      <div className="flex items-center justify-between border-b p-4 border-border-primary">
        <h1 className="text-2xl font-bold text-text-primary">Glosseries</h1>
        <button
          className="flex justify-center items-center gap-1 py-2 px-3 rounded-lg cursor-pointer bg-accent-primary text-text-button-primary font-semibold text-sm"
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
              <p className="text-base font-semibold text-text-primary">
                All glossaries{' (' + glossaries.length + ')'}
              </p>
              <div className="flex items-center gap-2 px-3 py-3 shadow-lg rounded-lg bg-input-background border border-border-primary">
                <MagnifyingGlassIcon className="w-4 h-4 text-input-text" />
                <input
                  placeholder="Search glossaries..."
                  type="text"
                  className="text-sm focus:outline-none  bg-input-background text-input-text"
                />
              </div>
            </div>
          </div>

          {/* Documents List - Scrollable */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex flex-col gap-2">
              {glossaries.length === 0 && (
                <div className="flex items-center justify-center h-full">
                  <p className="text-disabled-text">No glossaries available</p>
                </div>
              )}

              {glossaries.length > 0 && (
                <>
                  <div
                    className={`flex justify-start items-center gap-4  w-full mb-2 }`}
                  >
                    <div className="flex items-center gap-4  w-3/12 bg-background-secondary border border-border-primary rounded-xl px-5 py-3 text-text-primary">
                      <p className="font-semibold ">Term</p>
                    </div>

                    <div className="flex items-center gap-1 justify-start  bg-background-secondary border border-border-primary rounded-xl px-5 py-3 w-full text-text-primary">
                      <p className="font-semibold">Description</p>
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
      className={`flex justify-start  gap-4 items-center  text-sm cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300 
      }`}
    >
      <div className="flex items-center bg-background-primary border border-border-primary rounded-lg px-5 py-3 w-3/12 text-text-primary">
        <p className="font-semibold truncate">{term}</p>
      </div>

      <div className="flex items-center gap-1 justify-start g-background-primary border border-border-primary rounded-lg px-5 py-3 w-full text-text-secondary">
        <p className="truncate">{description}</p>
      </div>
    </div>
  );
};
