import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useAppDispatch } from '@/store';
import { createProduct } from '@/store/productSlice';

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isCustomizable, setIsCustomizable] = useState(false);
  
  // Dynamic Size State
  const [sizes, setSizes] = useState<{size: string, stock: number}[]>([]);
  const [newSize, setNewSize] = useState('');
  const [newStock, setNewStock] = useState('');

  const handleAddSize = () => {
    if (!newSize.trim()) {
        toast.error('Please enter a size name');
        return;
    }
    if (!newStock || Number(newStock) < 0) {
        toast.error('Please enter a valid stock quantity');
        return;
    }
    
    // Check for duplicates
    if (sizes.some(s => s.size.toLowerCase() === newSize.trim().toLowerCase())) {
        toast.error('This size already exists');
        return;
    }

    setSizes([...sizes, { size: newSize.trim(), stock: Number(newStock) }]);
    setNewSize('');
    setNewStock('');
  };

  const handleRemoveSize = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  // Handle selecting files from dialog or drop
  const handleFileChange = (files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);
    
    // Generate preview URLs for UI (temporary browser blobs)
    const newPreviews = fileArray.map(file => URL.createObjectURL(file));
    
    setImages(prev => [...prev, ...fileArray]);
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileChange(e.dataTransfer.files);
  };

  const removeImage = (index: number) => {
    // Remove from both arrays to keep them in sync
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 1. Validation
    if (images.length === 0) {
      toast.error('Please upload at least one image');
      setLoading(false);
      return;
    }

    // 2. Build FormData (Required for sending files)
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    // price appended twice in original code, removing duplicate
    // formData.append('price', price); 
    formData.append('category', category);
    formData.append('isCustomizable', String(isCustomizable));
    
    formData.append('sizes', JSON.stringify(sizes));
    
    // Default Color
    formData.append('colors', JSON.stringify([{ name: 'Standard', hex: '#000000' }]));

    // Append every image file
    images.forEach((image) => {
      formData.append('images', image);
    });

    // 3. Dispatch to Redux -> Backend -> Cloudinary
    try {
      await dispatch(createProduct(formData)).unwrap();
      toast.success('Product created successfully!');
      navigate('/admin/dashboard'); 
    } catch (err: any) {
      toast.error(err || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-10 max-w-4xl">
      <h2 className="font-serif text-3xl mb-8">Add New Product</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Product Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 border border-border rounded-sm shadow-sm">
             <h3 className="font-serif text-lg mb-4">Basic Information</h3>
             
             <div className="space-y-4">
                <div>
                    <label className="luxury-button text-muted-foreground block mb-2">Product Name</label>
                    <input 
                        required 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-border px-4 py-3 font-body text-sm outline-none focus:border-foreground transition-colors bg-transparent" 
                        placeholder="e.g. Classic Oxford Shirt"
                    />
                </div>
                <div>
                    <label className="luxury-button text-muted-foreground block mb-2">Description</label>
                    <textarea 
                        rows={4} 
                        required 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border border-border px-4 py-3 font-body text-sm outline-none focus:border-foreground transition-colors bg-transparent resize-none" 
                        placeholder="Product details, material, care instructions..."
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="luxury-button text-muted-foreground block mb-2">Price (₹)</label>
                        <input 
                            type="number" 
                            required 
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full border border-border px-4 py-3 font-body text-sm outline-none focus:border-foreground transition-colors bg-transparent" 
                        />
                    </div>
                    <div>
                        <label className="luxury-button text-muted-foreground block mb-2">Category</label>
                        <select 
                            required 
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full border border-border px-4 py-3 font-body text-sm outline-none focus:border-foreground transition-colors bg-white"
                        >
                            <option value="">Select Category</option>
                            <option value="Standard Tees">Standard Tees</option>
                            <option value="Custom Tees">Custom Tees</option>
                            <option value="Blankets">Blankets</option>
                        </select>
                    </div>
                    {/* Customizable Checkbox */}
                    <div className="flex items-center gap-2 mt-4 col-span-2">
                        <input
                            type="checkbox"
                            checked={isCustomizable}
                            onChange={(e) => setIsCustomizable(e.target.checked)}
                            className="w-4 h-4 accent-foreground"
                            id="customizable"
                        />
                        <label htmlFor="customizable" className="text-sm font-medium cursor-pointer">
                            Is this product customizable? (e.g. T-Shirts with custom text)
                        </label>
                    </div>
                </div>
             </div>
          </div>

          <div className="bg-white p-6 border border-border rounded-sm shadow-sm">
             <h3 className="font-serif text-lg mb-4">Inventory</h3>
             <p className="text-sm text-muted-foreground mb-4">Select available sizes and enter stock quantity.</p>
             
             <div className="space-y-4">
                {/* Input Row */}
                <div className="flex gap-2 items-end">
                    <div className="flex-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Size Name</label>
                        <input
                            value={newSize}
                            onChange={(e) => setNewSize(e.target.value)}
                            placeholder="e.g. S, XL, King Size"
                            className="w-full border border-border px-3 py-2 text-sm outline-none focus:border-foreground"
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSize())}
                        />
                    </div>
                    <div className="w-24">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Stock</label>
                        <input
                            type="number"
                            value={newStock}
                            onChange={(e) => setNewStock(e.target.value)}
                            placeholder="Qty"
                            className="w-full border border-border px-3 py-2 text-sm outline-none focus:border-foreground"
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSize())}
                        />
                    </div>
                    <button 
                        type="button"
                        onClick={handleAddSize}
                        className="bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-800 transition-colors h-[38px]"
                    >
                        Add
                    </button>
                </div>

                {/* Sizes List */}
                {sizes.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                        {sizes.map((s, idx) => (
                            <div key={idx} className="flex justify-between items-center bg-gray-50 border border-gray-100 p-2 rounded-sm group">
                                <div>
                                    <span className="font-bold text-sm block">{s.size}</span>
                                    <span className="text-xs text-muted-foreground">Stock: {s.stock}</span>
                                </div>
                                <button 
                                    type="button" 
                                    onClick={() => handleRemoveSize(idx)}
                                    className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-400 italic">No sizes added yet.</p>
                )}
             </div>
          </div>
        </div>

        {/* Right Column: Images & Actions */}
        <div className="space-y-6">
           <div className="bg-white p-6 border border-border rounded-sm shadow-sm">
              <h3 className="font-serif text-lg mb-4">Product Images</h3>
              
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed p-8 text-center cursor-pointer transition-colors rounded-sm ${
                    dragOver ? 'border-foreground bg-secondary' : 'border-border hover:border-foreground'
                }`}
              >
                 <Upload size={32} className="mx-auto text-muted-foreground mb-3" />
                 <p className="font-body text-sm text-muted-foreground">
                    Drag images here or click to browse
                 </p>
                 {/* Hidden Input for File Selection */}
                 <input 
                    type="file" 
                    multiple 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => handleFileChange(e.target.files)}
                 />
              </div>

              {/* Image Previews */}
              {previews.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-4">
                      {previews.map((src, i) => (
                          <div key={i} className="relative aspect-[3/4] group">
                              <img src={src} alt="" className="w-full h-full object-cover rounded-sm border border-border" />
                              <button
                                type="button"
                                onClick={() => removeImage(i)}
                                className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                  <X size={12} />
                              </button>
                          </div>
                      ))}
                  </div>
              )}
           </div>

           <div className="flex flex-col gap-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-foreground text-background py-4 luxury-button hover:bg-black/80 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" /> : 'Publish Product'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/dashboard')}
                className="w-full border border-border py-4 luxury-button hover:border-foreground transition-colors"
              >
                Cancel
              </button>
           </div>
        </div>

      </form>
    </div>
  );
};

export default AddProduct;