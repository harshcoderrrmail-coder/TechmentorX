# 🏥 AI Health Report Simplifier

An AI-powered web application that transforms complex medical reports into simple, patient-friendly explanations.

Built for a college-level hackathon to reduce confusion, anxiety, and misunderstanding caused by technical medical terminology.

---

## 🚀 Problem Statement

Patients often struggle to understand medical reports due to complex terminology.  
This leads to:

- Confusion
- Anxiety
- Poor health decisions

Our solution simplifies medical reports into clear language, highlights important health indicators, shows risk levels, and provides general lifestyle suggestions — without replacing professional medical advice.

---

## ✨ Features

### 🔐 Authentication System
- Secure Sign Up / Login
- User-specific dashboard
- Protected routes
- Report history stored per user

---

### 📄 Medical Report Upload
- Upload PDF medical reports
- Manual text input option
- Automatic text extraction
- AI-powered simplification

---

### 🧠 AI Processing
The AI system:
- Simplifies complex medical terms
- Identifies key health indicators
- Classifies risk levels (Low / Moderate / High)
- Generates:
  - Summary
  - Structured health indicators
  - Lifestyle suggestions
  - Doctor consultation recommendation
- Includes responsible medical disclaimer

---

### 📊 Risk Level Indicator
Visual color-coded risk meter:

- 🟢 Low Risk  
- 🟡 Moderate Risk  
- 🔴 High Risk  

Designed for quick understanding.

---

### 📚 Report History (ChatGPT-Style Sidebar)
- All previously analyzed reports saved
- Sidebar layout similar to ChatGPT
- Click any previous report to reload results
- No reprocessing required

---

### 🌐 Multi-Language Support
- English
- Hindi
- Full UI toggle
- AI output translation support

---

### 📈 Health Literacy Score
Compares:
- Original report complexity
- Simplified report clarity

Visually demonstrates improvement.

---

### 🎨 UI Design
Custom theme:

- Primary Green: `#4E9F3D`
- Dark Background: `#191A19`
- Clean, minimal medical-tech aesthetic
- Responsive design
- Smooth animations

---

## 🏗 Tech Stack

**Frontend**
- React (Vite)
- TypeScript
- Tailwind CSS

**Backend & Database**
- Supabase (Authentication + Database)

**AI Integration**
- LLM API (for medical simplification & translation)

---

## 🔐 Responsible AI

This tool:
- Does NOT provide medical diagnosis
- Does NOT prescribe treatment
- Provides educational assistance only
- Encourages consultation with healthcare professionals

---
