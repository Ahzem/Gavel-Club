import { useState, useEffect } from "react";
import { ImageUpload } from "../../pages/admin/ImageUpload";
import { Loader2 } from "lucide-react";
import { specialEventApi } from "../../services/api";
import { toast } from "sonner";

interface SpecialEvent {
  _id: string;
  title: string;
  subtitle: string;
  image1: { url: string; publicId: string };
  image2: { url: string; publicId: string };
  text1: string;
  text2: string;
}

export function SpecialEventManagement() {
  const [loading, setLoading] = useState(false);
  const [exists, setExists] = useState(false);
  const [specialEvent, setSpecialEvent] = useState<SpecialEvent | null>(null);
  const [image1File, setImage1File] = useState<File | null>(null);
  const [image2File, setImage2File] = useState<File | null>(null);

  useEffect(() => {
    fetchSpecialEvent();
  }, []);

  async function fetchSpecialEvent() {
    try {
      const data = await specialEventApi.getSpecialEvent();
      if (data) {
        setSpecialEvent(data);
        setExists(true);
      }
    } catch {
      toast.error("Failed to fetch special event");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      const form = e.target as HTMLFormElement;

      // Add text fields
      formData.append(
        "title",
        (form.title as unknown as HTMLInputElement).value
      );
      formData.append("subtitle", form.subtitle.value);
      formData.append("text1", form.text1.value);
      formData.append("text2", form.text2.value);

      // Only append images if they were changed
      if (image1File) {
        formData.append("image1", image1File);
      }
      if (image2File) {
        formData.append("image2", image2File);
      }

      let data;
      if (exists && specialEvent?._id) {
        data = await specialEventApi.updateSpecialEvent(
          specialEvent._id,
          formData
        );
        toast.success("Special event updated successfully");
      } else {
        data = await specialEventApi.createSpecialEvent(formData);
        toast.success("Special event created successfully");
      }

      setSpecialEvent(data);
      setExists(true);
      setImage1File(null);
      setImage2File(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to save special event");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="special-event-management">
      <form onSubmit={handleSubmit} className="special-event-management__form">
        <div className="special-event-management__header">
          <div className="special-event-management__title-group">
            <label htmlFor="title">Event Title</label>
            <input
              type="text"
              id="title"
              name="title"
              maxLength={100}
              defaultValue={specialEvent?.title}
              placeholder="Enter event title"
              required
            />
            <span className="special-event-management__char-count">
              {specialEvent?.title?.length || 0}/100
            </span>
          </div>

          <div className="special-event-management__title-group">
            <label htmlFor="subtitle">Event Subtitle</label>
            <input
              type="text"
              id="subtitle"
              name="subtitle"
              maxLength={200}
              defaultValue={specialEvent?.subtitle}
              placeholder="Enter event subtitle"
              required
            />
            <span className="special-event-management__char-count">
              {specialEvent?.subtitle?.length || 0}/200
            </span>
          </div>
        </div>
        <div className="special-event-management__grid">
          <div className="special-event-management__section">
            <h3>First Image</h3>
            <ImageUpload
              onImageChange={(file) => setImage1File(file as File)}
              currentImage={specialEvent?.image1.url}
            />
            <div className="special-event-management__text">
              <label htmlFor="text1">First Description</label>
              <textarea
                id="text1"
                name="text1"
                maxLength={300}
                defaultValue={specialEvent?.text1}
                placeholder="Enter description (max 300 characters)"
                required
              />
              <span className="special-event-management__char-count">
                {specialEvent?.text1?.length || 0}/300
              </span>
            </div>
          </div>

          <div className="special-event-management__section">
            <h3>Second Image</h3>
            <ImageUpload
              onImageChange={(file) => setImage2File(file as File)}
              currentImage={specialEvent?.image2.url}
            />
            <div className="special-event-management__text">
              <label htmlFor="text2">Second Description</label>
              <textarea
                id="text2"
                name="text2"
                maxLength={300}
                defaultValue={specialEvent?.text2}
                placeholder="Enter description (max 300 characters)"
                required
              />
              <span className="special-event-management__char-count">
                {specialEvent?.text2?.length || 0}/300
              </span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="button button--primary"
          disabled={loading}
        >
          {loading && <Loader2 className="animate-spin" />}
          <span>{exists ? "Save Changes" : "Create Special Event"}</span>
        </button>
      </form>
    </div>
  );
}
