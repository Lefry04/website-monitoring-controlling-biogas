const GrafikPopup = ({ open, onClose, title, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{title}</h2>
          <button onClick={onClose} className="text-red-500">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default GrafikPopup;
