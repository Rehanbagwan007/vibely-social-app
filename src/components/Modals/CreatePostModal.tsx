import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '@/store/slices/postsSlice';
import { useUser } from '@clerk/clerk-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImagePlus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePostModal = ({ isOpen, onClose }: CreatePostModalProps) => {
  const [step, setStep] = useState<'select' | 'edit' | 'share'>('select');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const dispatch = useDispatch();
  const { user } = useUser();
  const { toast } = useToast();

  // Mock image selection - in real app, handle file upload
  const handleImageSelect = () => {
    // Simulate image selection with a random unsplash image
    const randomImages = [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=600&fit=crop'
    ];
    
    const randomImage = randomImages[Math.floor(Math.random() * randomImages.length)];
    setSelectedImage(randomImage);
    setStep('edit');
  };

  const handleShare = () => {
    if (!selectedImage) return;

    const newPost = {
      username: user?.username || 'user',
      userAvatar: user?.imageUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
      image: selectedImage,
      caption,
      likes: 0,
      comments: [],
      liked: false,
      saved: false,
      location
    };

    dispatch(addPost(newPost));
    
    toast({
      title: "Post shared!",
      description: "Your post has been shared successfully.",
    });

    // Reset modal state
    setStep('select');
    setSelectedImage('');
    setCaption('');
    setLocation('');
    onClose();
  };

  const handleClose = () => {
    setStep('select');
    setSelectedImage('');
    setCaption('');
    setLocation('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl p-0">
        <DialogHeader className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            {step !== 'select' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStep(step === 'edit' ? 'select' : 'edit')}
              >
                ← Back
              </Button>
            )}
            <DialogTitle>
              {step === 'select' && 'Create new post'}
              {step === 'edit' && 'Edit your post'}
              {step === 'share' && 'Share your post'}
            </DialogTitle>
            {step === 'edit' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStep('share')}
                className="text-primary"
              >
                Next
              </Button>
            )}
            {step === 'share' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="text-primary font-semibold"
              >
                Share
              </Button>
            )}
          </div>
        </DialogHeader>

        {step === 'select' && (
          <div className="p-12 text-center">
            <ImagePlus size={64} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Drag photos and videos here</h3>
            <p className="text-muted-foreground mb-6">Or click to select from your computer</p>
            <Button onClick={handleImageSelect} className="btn-instagram">
              Select from computer
            </Button>
          </div>
        )}

        {step === 'edit' && selectedImage && (
          <div className="flex">
            <div className="flex-1">
              <img 
                src={selectedImage} 
                alt="Selected" 
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        )}

        {step === 'share' && selectedImage && (
          <div className="flex">
            <div className="w-2/3">
              <img 
                src={selectedImage} 
                alt="Selected" 
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="w-1/3 p-4 space-y-4">
              <div className="flex items-center gap-3">
                <img 
                  src={user?.imageUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face'} 
                  alt="Your avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-semibold">{user?.username || 'user'}</span>
              </div>

              <div>
                <Label htmlFor="caption">Caption</Label>
                <Textarea
                  id="caption"
                  placeholder="Write a caption..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="resize-none"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Add location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;