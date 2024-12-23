import React from 'react';
import { Upload, Search } from 'lucide-react';

const DocumentsPage = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="notion-heading">Documents</h1>
          <p className="notion-subheading">Manage and organize your files</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="btn btn-primary">
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </button>
        </div>
      </div>

      <div className="notion-card">
        {/* Document list will go here */}
      </div>
    </div>
  );
};

export default DocumentsPage;