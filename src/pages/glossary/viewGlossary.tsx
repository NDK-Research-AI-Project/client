import { MagnifyingGlassIcon, PlusIcon, PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllGlossaries, updateGlossary, deleteGlossary } from '../../services/api/glossary/glossaryService';
import { showPromise, showError, showSuccess } from '../../utils/toaster';

interface IGlossary {
  _id?: string; // Add ID for backend operations
  term: string;
  definition: string;
}

const ViewGlossary = () => {
  const [glossaries, setGlossaries] = useState<IGlossary[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingGlossary, setEditingGlossary] = useState<IGlossary | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
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

  const handleEditGlossary = (glossary: IGlossary) => {
    setEditingGlossary(glossary);
    setShowEditModal(true);
  };

  const handleUpdateGlossary = async (updatedGlossary: IGlossary) => {
    if (!updatedGlossary._id) return;

    try {
      const response = await updateGlossary(updatedGlossary._id, {
        term: updatedGlossary.term,
        definition: updatedGlossary.definition
      });

      if (response.error) {
        showError(response.error);
        return;
      }

      showSuccess('Glossary updated successfully!');
      setShowEditModal(false);
      setEditingGlossary(null);
      fetchGlossary(); // Refresh the list
    } catch (error) {
      showError('Failed to update glossary');
    }
  };

  const handleDeleteGlossary = async (id: string) => {
    try {
      const response = await deleteGlossary(id);

      if (response.error) {
        showError(response.error);
        return;
      }

      showSuccess('Glossary deleted successfully!');
      setShowDeleteConfirm(false);
      setDeletingId(null);
      fetchGlossary(); // Refresh the list
    } catch (error) {
      showError('Failed to delete glossary');
    }
  };

  const confirmDelete = (id: string) => {
    setDeletingId(id);
    setShowDeleteConfirm(true);
  };

  // Filter glossaries based on search term
  const filteredGlossaries = glossaries.filter(glossary =>
    glossary.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    glossary.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      {/* Edit Modal */}
      {showEditModal && editingGlossary && (
        <EditGlossaryModal
          glossary={editingGlossary}
          onSave={handleUpdateGlossary}
          onClose={() => {
            setShowEditModal(false);
            setEditingGlossary(null);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-background-primary border border-border-primary rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Delete Glossary</h3>
            <p className="text-text-secondary mb-6">
              Are you sure you want to delete this glossary term? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeletingId(null);
                }}
                className="px-4 py-2 rounded-lg border border-border-primary text-text-secondary hover:bg-background-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() => deletingId && handleDeleteGlossary(deletingId)}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header - Fixed */}
      <div className="flex items-center justify-between border-b p-4 border-border-primary">
        <h1 className="text-2xl font-bold text-text-primary">Glossaries</h1>
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
        {/* Documents List - Scrollable */}
        <div className={`w-full flex flex-col min-h-0 transition-all duration-300`}>
          {/* Search Bar - Fixed */}
          <div className="p-4">
            <div className="flex justify-between items-center w-full">
              <p className="text-base font-semibold text-text-primary">
                All glossaries ({filteredGlossaries.length})
              </p>
              <div className="flex items-center gap-2 px-3 py-3 shadow-lg rounded-lg bg-input-background border border-border-primary">
                <MagnifyingGlassIcon className="w-4 h-4 text-input-text" />
                <input
                  placeholder="Search glossaries..."
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-sm focus:outline-none bg-input-background text-input-text"
                />
              </div>
            </div>
          </div>

          {/* Documents List - Scrollable */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex flex-col gap-2">
              {filteredGlossaries.length === 0 && (
                <div className="flex items-center justify-center h-full">
                  <p className="text-disabled-text">
                    {searchTerm ? 'No glossaries found matching your search.' : 'No glossaries available'}
                  </p>
                </div>
              )}

              {filteredGlossaries.length > 0 && (
                <>
                  <div className={`flex justify-start items-center gap-4 w-full mb-2`}>
                    <div className="flex items-center gap-4 w-3/12 bg-background-secondary border border-border-primary rounded-xl px-5 py-3 text-text-primary">
                      <p className="font-semibold">Term</p>
                    </div>
                    <div className="flex items-center gap-1 justify-start bg-background-secondary border border-border-primary rounded-xl px-5 py-3 w-full text-text-primary">
                      <p className="font-semibold">Description</p>
                    </div>
                    <div className="flex items-center justify-center bg-background-secondary border border-border-primary rounded-xl px-5 py-3 w-32 text-text-primary">
                      <p className="font-semibold">Actions</p>
                    </div>
                  </div>

                  {filteredGlossaries.map((glo, idx) => (
                    <GlossaryCard
                      key={glo._id || idx}
                      glossary={glo}
                      onEdit={handleEditGlossary}
                      onDelete={confirmDelete}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewGlossary;

interface GlossaryCardProps {
  glossary: IGlossary;
  onEdit: (glossary: IGlossary) => void;
  onDelete: (id: string) => void;
}

const GlossaryCard = ({ glossary, onEdit, onDelete }: GlossaryCardProps) => {
  return (
    <div className={`flex justify-start gap-4 items-center text-sm hover:scale-[1.01] transition-all duration-300`}>
      <div className="flex items-center bg-background-primary border border-border-primary rounded-lg px-5 py-3 w-3/12 text-text-primary">
        <p className="font-semibold truncate">{glossary.term}</p>
      </div>

      <div className="flex items-center gap-1 justify-start bg-background-primary border border-border-primary rounded-lg px-5 py-3 w-full text-text-secondary">
        <p className="truncate">{glossary.definition}</p>
      </div>

      <div className="flex items-center justify-center gap-3 bg-background-primary border border-border-primary rounded-lg px-3 py-2 w-32">
        <button
          onClick={() => onEdit(glossary)}
          className="p-2 rounded-lg hover:bg-background-secondary text-text-secondary hover:text-accent-primary transition-colors"
          title="Edit"
        >
          <PencilIcon className="w-4 h-4" />
        </button>
        <button
          onClick={() => glossary._id && onDelete(glossary._id)}
          className="p-2 rounded-lg hover:bg-background-secondary text-text-secondary hover:text-red-500 transition-colors"
          title="Delete"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

interface EditGlossaryModalProps {
  glossary: IGlossary;
  onSave: (glossary: IGlossary) => void;
  onClose: () => void;
}

const EditGlossaryModal = ({ glossary, onSave, onClose }: EditGlossaryModalProps) => {
  const [term, setTerm] = useState(glossary.term);
  const [definition, setDefinition] = useState(glossary.definition);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (term.trim() && definition.trim()) {
      onSave({
        ...glossary,
        term: term.trim(),
        definition: definition.trim()
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-background-primary border border-border-primary rounded-xl p-6 max-w-2xl w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-text-primary">Edit Glossary</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-background-secondary text-text-secondary"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Term
            </label>
            <input
              type="text"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="w-full px-3 py-2 bg-input-background border border-input-border rounded-lg text-input-text focus:outline-none focus:ring-2 focus:ring-accent-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Definition
            </label>
            <textarea
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 bg-input-background border border-input-border rounded-lg text-input-text focus:outline-none focus:ring-2 focus:ring-accent-primary resize-none"
              required
            />
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-border-primary text-text-secondary hover:bg-background-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-accent-primary text-text-button-primary hover:bg-accent-primary-hover"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
