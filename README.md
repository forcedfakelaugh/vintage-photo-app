# 📸 Vintage Photo Editor

A mobile-first web application that transforms your photos with authentic vintage filters. Built with modern web technologies for a seamless, Instagram-like editing experience.

![Vintage Photo Editor](https://img.shields.io/badge/PWA-Ready-blue) ![Next.js](https://img.shields.io/badge/Next.js-15-black) ![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)

## ✨ Features

### 🎨 **Vintage Filters**
- **4 Authentic Presets**: Vintage Film, Warm Sunset, Faded Cool, Matte Black & White
- **Ultra-Grainy Texture**: Maximum grain settings for authentic film aesthetic
- **One-Click Toggle**: Tap to apply, tap again to remove filters
- **Real-time Preview**: Instant filter application using Canvas API

### 📱 **Mobile-First Design**
- **Touch-Optimized UI**: 44px+ buttons for perfect mobile interaction
- **Responsive Layout**: Adapts seamlessly from mobile to desktop
- **Gesture-Friendly**: Horizontal scrolling preset carousel
- **PWA Support**: Install on home screen like a native app

### 📷 **Image Handling**
- **Multiple Input Methods**: Upload files or capture with device camera
- **Smart Camera Integration**: Prefers rear camera for better photo quality
- **High-Quality Processing**: Canvas-based image manipulation
- **Efficient Downloads**: JPEG compression for optimal file sizes

### 🔄 **Share & Export**
- **Web Share API**: Native mobile sharing experience
- **Direct Download**: Fallback for non-supporting devices
- **Cross-Platform**: Works on iOS, Android, and desktop

## 🛠️ **Tech Stack**

### **Frontend Framework**
- **[Next.js 15](https://nextjs.org)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org)** - Type safety and better DX
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first styling

### **Image Processing**
- **Canvas API** - Browser-native image manipulation
- **Custom Filter Algorithm** - Brightness, contrast, saturation, sepia, grain
- **Real-time Processing** - No external dependencies for fast performance

### **UI Components**
- **[Lucide React](https://lucide.dev)** - Beautiful, consistent icons
- **Mobile-First Components** - Custom responsive design system
- **Dark Mode Ready** - Theme-aware styling

### **PWA Features**
- **Web App Manifest** - Native app-like experience
- **Responsive Icons** - Proper PWA icon sets
- **Mobile Optimized** - Viewport and touch configurations

### **Development Tools**
- **ESLint** - Code quality and consistency
- **Turbopack** - Fast development server
- **Git** - Version control with detailed commit history

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/forcedfakelaugh/vintage-photo-app.git
   cd vintage-photo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### **Build for Production**
```bash
npm run build
npm start
```

## 📁 **Project Structure**

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with PWA meta tags
│   └── page.tsx           # Main application component
├── components/            # Reusable UI components
│   ├── ImageUpload.tsx    # File upload & camera capture
│   ├── ImagePreview.tsx   # Photo display component
│   ├── PresetCarousel.tsx # Filter selection carousel
│   └── ActionButtons.tsx  # Download & share buttons
├── data/
│   └── presets.json       # Filter configurations
├── types/
│   └── index.ts          # TypeScript type definitions
public/
├── manifest.json         # PWA manifest
└── [icons]              # PWA icons and assets
```

## 🎯 **Key Algorithms**

### **Filter Processing Pipeline**
1. **Brightness Adjustment** - RGB channel multiplication
2. **Saturation Control** - Grayscale blending with original colors
3. **Sepia Effect** - Classic sepia tone matrix transformation
4. **Film Grain** - Random noise generation for texture
5. **Canvas Rendering** - Efficient pixel manipulation

### **Grain Implementation**
```typescript
if (preset.filters.grain > 0) {
  const grainAmount = preset.filters.grain * 80;
  const grain = (Math.random() - 0.5) * grainAmount;
  r += grain; g += grain; b += grain;
}
```

## 🌟 **Filter Presets**

| Filter | Brightness | Contrast | Saturation | Sepia | Grain | Effect |
|--------|------------|----------|------------|-------|-------|--------|
| **Vintage Film** | 1.1 | 1.2 | 0.8 | 0.3 | 1.0 | Classic film look |
| **Warm Sunset** | 1.15 | 1.1 | 1.3 | 0.1 | 0.8 | Golden hour warmth |
| **Faded Cool** | 1.05 | 0.9 | 0.7 | 0 | 0.9 | Desaturated cool tones |
| **Matte B&W** | 1.1 | 0.8 | 0 | 0 | 1.0 | Film noir aesthetic |

## 🚀 **Deployment**

### **Vercel (Recommended)**
```bash
npm i -g vercel
vercel --prod
```

### **Other Platforms**
- **Netlify**: Connect GitHub repo and deploy
- **GitHub Pages**: Build and deploy static export
- **Docker**: Containerized deployment ready

## 🤝 **Contributing**

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 **License**

This project is open source and available under the [MIT License](LICENSE).

## 🙏 **Acknowledgments**

- **Next.js Team** - For the amazing React framework
- **Vercel** - For seamless deployment platform
- **Tailwind CSS** - For rapid UI development
- **Canvas API** - For powerful browser-native image processing

---

**Built with ❤️ using [Claude Code](https://claude.ai/code)**