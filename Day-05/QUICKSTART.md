# 🚀 Quick Start Guide - Lab #7

## One Minute Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

➡️ **App opens automatically at `http://localhost:5173`**

---

## 📁 What's Inside

| File | Purpose |
|------|---------|
| `App.jsx` | Main application component |
| `Login.jsx` | Part A: Conditional Rendering |
| `Message.jsx` | Part B: Component Lifecycle (useEffect) |
| `ToggleMessage.jsx` | Exercise 1 & 2: Multiple messages |
| `PropMessage.jsx` | Exercise 3: Props + Conditional Rendering |
| `Countdown.jsx` | Exercise 4: Timer with Cleanup |

---

## 🧪 Key Features to Test

### 1. **Login Component** (Part A)
```
✅ Click Login button → Message changes
✅ Click Logout button → Message changes back
✅ Status indicator updates
```

### 2. **Message Component** (Part B)
```
✅ Click "Hide Message" → Component removed
✅ Open DevTools (F12) → Console shows "Unmounted"
✅ Click "Show Message" → Component added back
✅ Console shows "Mounted" again
```

### 3. **Toggle Messages** (Exercise 1 & 2)
```
✅ Hide/show each message independently
✅ Remove messages from list
✅ Watch console for per-message logs
```

### 4. **Props Demo** (Exercise 3)
```
✅ Toggle 3 messages with passed props
✅ Child components mount/unmount as needed
```

### 5. **Countdown Timer** (Exercise 4)
```
✅ Timer counts down automatically
✅ Click Pause to stop
✅ Click Resume to continue
✅ Click Reset to restart
✅ Clears timer on unmount
```

---

## 🔍 Console Debugging

Open **DevTools** to see logs:
```
Press: F12 (Windows/Linux) or Cmd+Option+I (Mac)
Go to: Console tab
```

You'll see messages like:
```
✅ Message Component Mounted
📨 Message 1 mounted: "React is awesome!"
⏸️ Paused countdown
🧹 Cleanup: Timer cleared on unmount
```

---

## 📱 Responsive Design

The app works great on:
- 📱 Mobile phones (< 480px)
- 📊 Tablets (480px - 768px)
- 🖥️ Desktop computers (> 768px)

Try resizing your browser to see it adapt!

---

## 🎨 Styling

- **Colors**: Purple gradient theme
- **Icons**: React Icons (Font Awesome)
- **Animations**: Smooth transitions
- **Responsive**: Mobile-first design

---

## 🛑 Stop the Development Server

Press `Ctrl+C` in your terminal

---

## 📦 Build for Production

```bash
npm run build
```

Creates optimized files in `dist/` folder

---

## ⚡ Common Commands

| Command | What it does |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

## 💡 Pro Tips

1. **Hot Reload**: Changes save instantly - no need to refresh!
2. **Console is Your Friend**: Open DevTools to see lifecycle logs
3. **Responsive Testing**: Press F12 → Ctrl+Shift+M to toggle mobile view
4. **React DevTools**: Install React Developer Tools extension for better debugging

---

## 🆘 Troubleshooting

### Port 5173 already in use?
```bash
npm run dev -- --port 3000
```

### Still not working?
1. Delete `node_modules` folder
2. Delete `package-lock.json`
3. Run `npm install` again
4. Run `npm run dev`

---

## ✅ Lab Checklist

- [ ] App runs without errors
- [ ] All components display correctly
- [ ] Console shows lifecycle logs
- [ ] Responsive design works
- [ ] All buttons are clickable
- [ ] Icons display properly
- [ ] No console errors/warnings

---

## 📚 Learn More

Check `README.md` for complete documentation, explanations, and learning resources!

---

**Ready to go? Run `npm install && npm run dev` and start exploring!** 🎉
