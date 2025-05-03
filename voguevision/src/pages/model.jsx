// FASHNTryOn.jsx
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import '../FASHNTryOn.css';

// You may need to install axios if you don't have it:
// npm install axios

const FASHNTryOn = () => {
  // State for API configuration
  const [apiKey, setApiKey] = useState('');

  // State for images
  const [modelImage, setModelImage] = useState(null);
  const [garmentImage, setGarmentImage] = useState(null);
  const [modelImagePreview, setModelImagePreview] = useState(null);
  const [garmentImagePreview, setGarmentImagePreview] = useState(null);
  
  // State for options
  const [category, setCategory] = useState('tops');

  // State for generation process
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);
  
  // State for results
  const [resultImage, setResultImage] = useState(null);
  
  // Refs
  const pollingIntervalRef = useRef(null);
  
  // Effect to clean up polling interval on unmount
  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);
  
  // Check if form is complete enough to enable generation
  const isFormComplete = apiKey && modelImage && garmentImage && !isGenerating;
  
  // Handle API key change
  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value);
  };
  
  // Handle model image upload
  const handleModelImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setModelImage(file);
      setModelImagePreview(URL.createObjectURL(file));
    }
  };
  
  // Handle garment image upload
  const handleGarmentImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setGarmentImage(file);
      setGarmentImagePreview(URL.createObjectURL(file));
    }
  };
  
  // Clear model image
  const clearModelImage = () => {
    setModelImage(null);
    setModelImagePreview(null);
  };
  
  // Clear garment image
  const clearGarmentImage = () => {
    setGarmentImage(null);
    setGarmentImagePreview(null);
  };
  
  // Handle category change
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  
  // Add a log message
  const addLog = (message) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };
  
  // Convert file to Base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };
  
  // Start a new try-on
  const resetForNewTryOn = () => {
    setResultImage(null);
    setProgress(0);
    setLogs([]);
    setError(null);
  };
  
  // Check status using the correct endpoint
  const checkStatus = async (requestId) => {
    try {
      const statusResponse = await axios.get(`https://api.fashn.ai/v1/status/${requestId}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });
      
      const statusData = statusResponse.data;
      addLog(`Status check: ${statusData.status || 'unknown'}`);
      
      return statusData;
    } catch (error) {
      console.error('Status check error:', error);
      addLog(`Status check error: ${error.message}`);
      throw error;
    }
  };
  
  // Generate try-on image using FASHN API
  const generateTryOn = async () => {
    try {
      setProgress(10);
      addLog('Preparing images for upload...');
      
      // Convert images to base64 or URLs
      let modelImageUrl;
      let garmentImageUrl;
      
      // Convert local file to base64 or use URL if needed
      if (modelImage instanceof File) {
        modelImageUrl = await fileToBase64(modelImage);
      } else if (typeof modelImage === 'string') {
        modelImageUrl = modelImage;
      }
      
      if (garmentImage instanceof File) {
        garmentImageUrl = await fileToBase64(garmentImage);
      } else if (typeof garmentImage === 'string') {
        garmentImageUrl = garmentImage;
      }
      
      setProgress(20);
      addLog('Sending request to FASHN API...');
      
      // Prepare request body as JSON
      const requestBody = {
        model_image: modelImageUrl,
        garment_image: garmentImageUrl,
        category: category
      };
      
      // Make initial API request
      const response = await axios.post('https://api.fashn.ai/v1/run', requestBody, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      setProgress(40);
      addLog('Processing API response...');
      
      // Handle direct response (if the API returns the result immediately)
      if (response.data && response.data.output && response.data.output.length > 0) {
        setProgress(100);
        setResultImage(response.data.output[0]);
        setIsGenerating(false);
        addLog('Try-on successfully generated!');
        return;
      }
      
      // If async operation, get request ID and poll
      if (response.data && response.data.id) {
        const requestId = response.data.id;
        addLog(`Request accepted! ID: ${requestId?.substring(0, 8) || 'unknown'}...`);
        
        // Set up polling to check status
        pollingIntervalRef.current = setInterval(async () => {
          try {
            const statusData = await checkStatus(requestId);
            
            if (statusData.status === 'completed') {
              clearInterval(pollingIntervalRef.current);
              pollingIntervalRef.current = null;
              
              setProgress(100);
              // Use the first output URL as the result image
              if (statusData.output && statusData.output.length > 0) {
                setResultImage(statusData.output[0]);
                addLog('Try-on successfully generated!');
              } else {
                throw new Error('No output URLs found in completed response');
              }
              setIsGenerating(false);
            } else if (statusData.status === 'processing') {
              setProgress(70);
              addLog('Still processing...');
            } else if (statusData.status === 'failed') {
              clearInterval(pollingIntervalRef.current);
              pollingIntervalRef.current = null;
              
              setIsGenerating(false);
              setError(`Generation failed: ${statusData.error || 'Unknown error'}`);
              addLog(`Failed: ${statusData.error || 'Unknown error'}`);
            }
          } catch (error) {
            clearInterval(pollingIntervalRef.current);
            pollingIntervalRef.current = null;
            
            setIsGenerating(false);
            setError(`Status check error: ${error.message}`);
            addLog(`Error: ${error.message}`);
          }
        }, 2000); // Check every 2 seconds
      } else {
        throw new Error('No output URLs or request ID returned');
      }
      
    } catch (error) {
      setIsGenerating(false);
      setError(`API Error: ${error.message}`);
      addLog(`Error: ${error.message}`);
    }
  };

  // Start generation process
  const handleGenerate = async () => {
    setError(null);
    setIsGenerating(true);
    setProgress(0);
    setLogs([]);
    
    await generateTryOn();
  };
  
  // Download result image
  const handleDownload = () => {
    if (resultImage) {
      const link = document.createElement('a');
      link.href = resultImage;
      link.download = 'try-on-result.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  // Copy result image URL
  const handleCopyUrl = () => {
    if (resultImage) {
      navigator.clipboard.writeText(resultImage)
        .then(() => {
          addLog('Image URL copied to clipboard!');
        })
        .catch(err => {
          setError(`Failed to copy URL: ${err.message}`);
        });
    }
  };

  return (
    <div className="fashn-container">
      <div className="fashn-card">
        {/* Header */}
        <div className="fashn-header">
          <h1>FASHN AI Virtual Try-On</h1>
          <p>Try on garments virtually with AI technology</p>
        </div>
        
        {/* Main Content */}
        <div className="fashn-content">
          {/* API Key Input */}
          <div className="fashn-section api-section">
            <h2>1. Enter Your API Key</h2>
            <div className="api-input-container">
              <input 
                type="password" 
                value={apiKey}
                onChange={handleApiKeyChange}
                placeholder="Enter your FASHN API key"
                className="api-input"
              />
            </div>
            <p className="api-info">
              Get your API key from <a href="https://fashn.ai/api" target="_blank" rel="noopener noreferrer">fashn.ai/api</a>
            </p>
          </div>
          
          {/* Image Upload Section */}
          <div className="fashn-grid">
            {/* Model Image Upload */}
            <div className="fashn-section">
              <h2>2. Upload Model Image</h2>
              {!modelImagePreview ? (
                <label className="file-input-label">
                  <div className="upload-icon">+</div>
                  <span>Click to upload a person's image</span>
                  <input type="file" onChange={handleModelImageChange} accept="image/*" />
                </label>
              ) : (
                <div className="image-preview-container">
                  <img src={modelImagePreview} alt="Model preview" className="image-preview" />
                  <button onClick={clearModelImage} className="clear-image-btn">Remove</button>
                </div>
              )}
            </div>
            
            {/* Garment Image Upload */}
            <div className="fashn-section">
              <h2>3. Upload Garment Image</h2>
              {!garmentImagePreview ? (
                <label className="file-input-label">
                  <div className="upload-icon">+</div>
                  <span>Click to upload a clothing item</span>
                  <input type="file" onChange={handleGarmentImageChange} accept="image/*" />
                </label>
              ) : (
                <div className="image-preview-container">
                  <img src={garmentImagePreview} alt="Garment preview" className="image-preview" />
                  <button onClick={clearGarmentImage} className="clear-image-btn">Remove</button>
                </div>
              )}
            </div>
          </div>
          
          {/* Options Section */}
          <div className="fashn-grid">
            {/* Garment Category */}
            <div className="fashn-section">
              <h2>4. Garment Category</h2>
              <select 
                value={category}
                onChange={handleCategoryChange}
                className="category-select"
              >
                <option value="tops">Tops (T-shirts, Blouses)</option>
                <option value="bottoms">Bottoms (Pants, Skirts)</option>
                <option value="dresses">Dresses (Full-body)</option>
                <option value="outerwear">Outerwear (Jackets, Coats)</option>
              </select>
            </div>
            
          </div>
          
          {/* Generate Button */}
          <button 
            onClick={handleGenerate}
            disabled={!isFormComplete}
            className={`generate-button ${!isFormComplete ? 'disabled' : ''}`}
          >
            {isGenerating ? 'Generating...' : 'Generate Try-On Image'}
          </button>
          
          {/* Error Message */}
          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}
          
          {/* Loading Indicator */}
          {isGenerating && (
            <div className="loading-container">
              <div className="progress-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
              </div>
              <p className="progress-text">Processing your request ({progress}%)...</p>
              
              {/* Logs */}
              {logs.length > 0 && (
                <div className="logs-container">
                  <h3>Processing Log:</h3>
                  <div className="logs-content">
                    {logs.map((log, index) => (
                      <div key={index} className="log-entry">{log}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Result Section */}
          {resultImage && (
            <div className="result-section">
              <h2>Try-On Result</h2>
              <div className="result-image-container">
                <img src={resultImage} alt="Try-on result" className="result-image" />
              </div>
              <div className="result-actions">
                <button onClick={handleDownload} className="download-button">
                  Download Image
                </button>
                <button onClick={handleCopyUrl} className="copy-url-button">
                  Copy Image URL
                </button>
                <button onClick={resetForNewTryOn} className="new-try-on-button">
                  New Try-On
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="fashn-footer">
          <h3>Tips for Best Results:</h3>
          <ul className="tips-list">
            <li>Use clean, front-facing photos of people (against simple backgrounds if possible)</li>
            <li>For garments, use flat-lay images on white backgrounds when possible</li>
            <li>Make sure the garment image contains only one clothing item</li>
            <li>Select the correct category for your garment</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FASHNTryOn;