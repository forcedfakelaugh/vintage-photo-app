# 📸 Vintage Photo Editor

A professional-grade web application that transforms your photos with **authentic film emulation**. Features advanced algorithms that recreate the distinctive characteristics of legendary film stocks like Kodachrome, Portra, and Tri-X.

![Vintage Photo Editor](https://img.shields.io/badge/PWA-Ready-blue) ![Next.js](https://img.shields.io/badge/Next.js-15-black) ![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue) ![Film Emulation](https://img.shields.io/badge/Film_Emulation-Advanced-red)

## ✨ Features

### 🎞️ **Professional Film Emulation**
- **8 Authentic Film Stocks**: Kodachrome 64, Tri-X Push, Portra 400, Velvia 50, Polaroid SX-70, Ektachrome E100, Cross Process, Expired Film
- **Advanced Color Grading**: Separate shadow/midtone/highlight adjustments
- **RGB Curves Processing**: Non-linear tone mapping that mimics film response
- **Channel Mixing**: Cross-channel color bleeding like real film stocks
- **One-Click Toggle**: Tap to apply, tap again to remove filters
- **Real-time Preview**: Instant processing using optimized Canvas API

### 📱 **Minimalistic UI Design**
- **Badge-Style Presets**: Clean, compact filter selection in responsive grid
- **Icon-Only Actions**: Minimalistic download button overlay within image
- **No Scrolling Needed**: All 8 film presets visible at once
- **PWA Support**: Install on home screen like a native app

### 📷 **Image Handling**
- **Multiple Input Methods**: Upload files or capture with device camera
- **Smart Camera Integration**: Prefers rear camera for better photo quality
- **High-Quality Processing**: Canvas-based image manipulation
- **Efficient Downloads**: JPEG compression for optimal file sizes

### 🔄 **Export**
- **High-Quality Downloads**: JPEG compression with 90% quality
- **Icon-Only Interface**: Minimalistic download button positioned within image
- **Cross-Platform**: Works on iOS, Android, and desktop

## 🛠️ **Tech Stack**

### **Frontend Framework**
- **[Next.js 15](https://nextjs.org)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org)** - Type safety and better DX
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first styling

### **Advanced Image Processing**
- **Canvas API** - Browser-native image manipulation
- **Professional Film Emulation** - RGB curves, color grading, channel mixing
- **Mathematical Film Modeling** - Algorithms based on real film response curves
- **Real-time Processing** - Optimized pixel-level transformations

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
│   ├── ImagePreview.tsx   # Photo display with download overlay
│   ├── PresetCarousel.tsx # Film preset selection grid
│   └── ActionButtons.tsx  # Minimalistic action buttons
├── data/
│   └── presets.json       # Professional film stock configurations
├── lib/
│   └── filmEmulation.ts   # Advanced film processing algorithms
├── types/
│   └── index.ts          # TypeScript interfaces with film data
public/
├── manifest.json         # PWA manifest
└── [icons]              # PWA icons and assets
```

## 🎯 **Advanced Film Emulation**

### **Professional Processing Pipeline**
1. **RGB Curves** - Non-linear tone mapping with interpolation
2. **Individual Channel Curves** - Separate red, green, blue adjustments
3. **Color Grading** - Luminance-based shadow/midtone/highlight control
4. **Channel Mixing** - Cross-channel color bleeding simulation
5. **Saturation & Sepia** - Traditional color adjustments
6. **Film Grain** - Authentic texture generation

### **Curve Processing Implementation**
```typescript
function applyCurve(value: number, curve: number[]): number {
  const normalizedValue = Math.max(0, Math.min(1, value / 255));
  const index = normalizedValue * (curve.length - 1);
  const lowerIndex = Math.floor(index);
  const upperIndex = Math.min(lowerIndex + 1, curve.length - 1);
  const factor = index - lowerIndex;
  
  const lowerValue = curve[lowerIndex];
  const upperValue = curve[upperIndex];
  
  return (lowerValue + (upperValue - lowerValue) * factor) * 255;
}
```

## 🎞️ **Authentic Film Stocks**

| Film Stock | Characteristics | Best For |
|------------|-----------------|----------|
| **Kodachrome 64** | Rich reds/magentas, high contrast, fine grain | Portraits, vivid colors |
| **Tri-X Push** | High contrast B&W, heavy grain | Street photography, documentary |
| **Portra 400** | Natural skin tones, neutral colors | Portrait photography |
| **Velvia 50** | Ultra-saturated, landscape-focused | Nature, landscapes |
| **Polaroid SX-70** | Soft contrast, faded aesthetic | Instant film nostalgia |
| **Ektachrome E100** | Clean, precise slide film look | Professional photography |
| **Cross Process** | Unusual color shifts, high contrast | Experimental, artistic |
| **Expired Film** | Color degradation, unpredictable shifts | Vintage, aged aesthetic |

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