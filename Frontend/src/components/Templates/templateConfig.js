export const templates = [
  {
    id: 1,
    name: "Landing Page",
    thumbnail:
      "https://cdn.dribbble.com/userupload/13133064/file/original-7647ca35f502f56fa5a58c5be7cd3613.jpg?resize=1024x768",
    elements: [
      {
        id: "header_1",
        type: "heading",
        content: "Welcome to Our Platform",
        x: 50,
        y: 50,
        width: 500,
        height: 60,
        styles: {
          fontSize: "48px",
          fontWeight: "bold",
          color: "#2D3748",
          textAlign: "center",
        },
      },
      {
        id: "hero_image",
        type: "image",
        src: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
        x: 50,
        y: 150,
        width: 500,
        height: 300,
        styles: {
          objectFit: "cover",
          borderRadius: "8px",
        },
      },
      {
        id: "cta_button",
        type: "button",
        content: "Get Started",
        x: 200,
        y: 500,
        width: 200,
        height: 50,
        styles: {
          backgroundColor: "#4299E1",
          color: "white",
          borderRadius: "25px",
          fontSize: "18px",
          fontWeight: "bold",
        },
      },
    ],
  },
  {
    id: 2,
    name: "Portfolio",
    thumbnail:
      "https://cdn.dribbble.com/userupload/13133188/file/original-2a5d76d1d6e7629e437cd4cd595b0b4f.jpg?resize=1024x768",
    elements: [
      {
        id: "profile_image",
        type: "image",
        src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
        x: 50,
        y: 50,
        width: 200,
        height: 200,
        styles: {
          borderRadius: "50%",
          objectFit: "cover",
        },
      },
      {
        id: "name_heading",
        type: "heading",
        content: "John Designer",
        x: 300,
        y: 100,
        width: 300,
        height: 50,
        styles: {
          fontSize: "36px",
          fontWeight: "bold",
          color: "#2D3748",
        },
      },
      {
        id: "bio_text",
        type: "paragraph",
        content:
          "Creative designer with 5+ years of experience in digital design and branding.",
        x: 300,
        y: 160,
        width: 300,
        height: 80,
        styles: {
          fontSize: "16px",
          color: "#4A5568",
          lineHeight: "1.6",
        },
      },
    ],
  },
  {
    id: 3,
    name: "Blog Post",
    thumbnail:
      "https://cdn.dribbble.com/userupload/13133246/file/original-5536f708b61c92b3a340f012e33e3a7d.jpg?resize=1024x768",
    elements: [
      {
        id: "blog_title",
        type: "heading",
        content: "The Future of Design",
        x: 50,
        y: 50,
        width: 600,
        height: 60,
        styles: {
          fontSize: "42px",
          fontWeight: "bold",
          color: "#1A202C",
        },
      },
      {
        id: "blog_image",
        type: "image",
        src: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84",
        x: 50,
        y: 150,
        width: 600,
        height: 300,
        styles: {
          objectFit: "cover",
          borderRadius: "8px",
        },
      },
      {
        id: "blog_content",
        type: "paragraph",
        content:
          "Explore the latest trends and innovations in modern design...",
        x: 50,
        y: 480,
        width: 600,
        height: 200,
        styles: {
          fontSize: "18px",
          color: "#4A5568",
          lineHeight: "1.8",
        },
      },
    ],
  },
];
