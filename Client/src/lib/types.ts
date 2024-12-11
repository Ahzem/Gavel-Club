export interface Event {
  _id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: "Educational meeting" | "Fun activity" | "other";
  image: {
    url: string;
    publicId: string;
  };
  status: "upcoming" | "ongoing" | "completed";
  registrationUrl?: string;
  capacity?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  image: string;
}

export interface GalleryImage {
  _id: string;
  src: {
    url: string;
    publicId: string;
  };
  alt: string;
  captureDate: string;
}