'use client';

import { useState, useCallback } from 'react';
import { Upload, Edit } from 'lucide-react';

export function ImageEditor() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [editPrompt, setEditPrompt] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedImage, setEditedImage] = useState<string | null>(null);

  // Inside the ImageEditor component
const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Reset state when new image is uploaded
    setEditPrompt('');
    setEditedImage(null);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      setOriginalImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleEdit = async () => {
    if (!originalImage || !editPrompt.trim()) return;
    
    setIsEditing(true);
    
    try {
      // Call our API endpoint
      const response = await fetch('/api/edit-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: originalImage,
          prompt: editPrompt,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to edit image');
      }
      
      const data = await response.json();
      
      // Poll for results
      const pollingInterval = setInterval(async () => {
        const pollResponse = await fetch('/api/poll', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: data.id,
            pollingUrl: data.polling_url,
          }),
        });
        
        const pollData = await pollResponse.json();
        
        if (pollData.status === 'Ready' && pollData.result?.sample) {
          setEditedImage(`data:image/jpeg;base64,${pollData.result.sample}`);
          clearInterval(pollingInterval);
          setIsEditing(false);
        } else if (pollData.status === 'Error') {
          throw new Error(pollData.error || 'Failed to process image');
        }
      }, 1000);
      
      // Clean up interval after 5 minutes (timeout)
      setTimeout(() => {
        clearInterval(pollingInterval);
        if (isEditing) {
          setIsEditing(false);
          alert('Image editing timed out. Please try again.');
        }
      }, 300000);
    } catch (error) {
      console.error('Error editing image:', error);
      alert('Failed to edit image. Please try again.');
      setIsEditing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Image Editor</h2>
        <p className="text-gray-600">
          Upload an image and describe how you want to edit it
        </p>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="space-y-4">
          <label className="block">
            <span className="sr-only">Choose image to edit</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            />
          </label>

          {originalImage && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <h3 className="font-medium mb-2">Original Image</h3>
                <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src={originalImage} 
                    alt="Original uploaded image" 
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Edited Result</h3>
                <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  {isEditing ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                    </div>
                  ) : editedImage ? (
                    <img 
                      src={editedImage} 
                      alt="AI edited image" 
                      className="object-contain w-full h-full"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <p>Edit result will appear here</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Edit Instructions
              </label>
              <textarea
                value={editPrompt}
                onChange={(e) => setEditPrompt(e.target.value)}
                placeholder="Describe how you want to edit the image..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                rows={3}
                disabled={!originalImage || isEditing}
              />
            </div>
            
            <button
              onClick={handleEdit}
              disabled={isEditing || !editPrompt.trim() || !originalImage}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isEditing ? 'Processing...' : 'Edit Image'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}