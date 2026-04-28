# Lab #7 - React Conditional Rendering & Component Lifecycle

## Lab Title
**Demonstrating Conditional Rendering and Component Lifecycle in React**

## Lab Objectives
By the end of this lab, students will be able to:
- ✅ Implement conditional rendering in React components
- ✅ Understand the lifecycle of functional components using hooks
- ✅ Use useEffect to mimic mounting and unmounting behavior
- ✅ Toggle components on and off based on state changes
- ✅ Create responsive, production-ready React applications

## Software Requirements
- Node.js (v14 or higher)
- npm (comes with Node.js)
- Visual Studio Code
- React 18.2+
- Vite (build tool)

---

## Project Setup Instructions

### 1. Install Dependencies
```bash
cd Day-05
npm install
```

This will install:
- React & ReactDOM
- Vite (dev server & bundler)
- React Icons (for beautiful, consistent icons)
- @vitejs/plugin-react (React support in Vite)

### 2. Start Development Server
```bash
npm run dev
```

The application will open at `http://localhost:5173`

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

---

## Project Structure

```
Day-05/
├── App.jsx                 # Main application component
├── App.css                 # Main application styles (responsive)
├── Login.jsx               # Part A: Conditional Rendering
├── Message.jsx             # Part B: Component Lifecycle
├── ToggleMessage.jsx       # Part D: Exercise 1 & 2
├── Countdown.jsx           # Part D: Exercise 4
├── PropMessage.jsx         # Part D: Exercise 3
├── components.css          # Component-specific styles
├── index.css               # Global styles
├── main.jsx                # Entry point for Vite
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies & scripts
└── README.md               # This file
```

---

## Part A: Conditional Rendering

### Overview
Conditional rendering allows components to display different content based on state or props.

### Components
- **Login.jsx**: Demonstrates login/logout functionality using ternary operators

### Key Concepts
```javascript
// Ternary Operator
{isLoggedIn ? <h2>Welcome!</h2> : <h2>Please Log In</h2>}

// Logical AND
{showMessage && <Message />}

// useState Hook
const [isLoggedIn, setIsLoggedIn] = useState(false);
```

### Features
- Toggle login state
- Dynamic button text
- Responsive card layout
- Icon-based indicators

---

## Part B: Component Lifecycle with Functional Components

### Overview
React components have lifecycle phases: **Mounting** → **Unmounting**

In functional components, we use the `useEffect` hook to handle lifecycle behavior.

### Components
- **Message.jsx**: Demonstrates lifecycle with console logging

### Key Concepts
```javascript
useEffect(() => {
  console.log("Component Mounted");
  
  // Cleanup function runs on unmount
  return () => {
    console.log("Component Unmounted");
  };
}, []); // Empty dependency array: runs once on mount
```

### Features
- Mount/unmount logging
- Console visibility indicator
- Smooth animations
- Demonstrates cleanup functions

### How to Test
1. Click "Hide Message" button
2. Open browser DevTools (F12 or Ctrl+Shift+I)
3. Go to Console tab
4. Watch mount/unmount logs as you toggle the component

---

## Part D: Advanced Exercises

### Exercise 1 & 2: Multiple Messages with Lifecycle Logs

**Component**: `ToggleMessage.jsx`

Features:
- Show/hide multiple messages independently
- Mount/unmount logging for each message
- Remove messages from list
- State management for multiple items

```javascript
const [messages, setMessages] = useState([
  { id: 1, text: "React is awesome!", visible: true },
  // ... more messages
]);
```

---

### Exercise 3: Props + Conditional Rendering

**Component**: `PropMessage.jsx`

Features:
- Pass messages as props to child components
- Toggle display based on parent state
- Demonstrate prop drilling patterns
- Child lifecycle logging when props change

```javascript
// Parent passes message as prop
<MessageDisplay message={msg.text} messageId={msg.id} />

// Child receives and displays
const MessageDisplay = ({ message, messageId }) => { ... }
```

---

### Exercise 4: Countdown Timer with Cleanup

**Component**: `Countdown.jsx`

Features:
- Start timer on mount
- Clear timer on unmount (cleanup)
- Pause/resume functionality
- Reset to original value
- Status display

```javascript
useEffect(() => {
  let intervalId;
  
  if (isActive && countdown > 0) {
    intervalId = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);
  }
  
  // Cleanup: clear interval
  return () => clearInterval(intervalId);
}, [isActive, countdown]);
```

---

## Key Concepts Explained

### 1. useState Hook
```javascript
const [state, setState] = useState(initialValue);
```
- Returns state variable and setter function
- Triggers re-render when state changes
- Can be used multiple times in a component

### 2. useEffect Hook
```javascript
useEffect(() => {
  // Side effect code
  return () => {
    // Cleanup code (optional)
  };
}, [dependencies]);
```
- Runs side effects in functional components
- Dependencies array controls when effect runs:
  - `[]` → Runs once on mount/unmount
  - `[dep1, dep2]` → Runs when dependencies change
  - Omitted → Runs after every render

### 3. Conditional Rendering Patterns
```javascript
// Pattern 1: Ternary Operator
{condition ? <ComponentA /> : <ComponentB />}

// Pattern 2: Logical AND
{condition && <Component />}

// Pattern 3: if/else (only outside JSX)
if (condition) {
  return <ComponentA />;
}
return <ComponentB />;
```

### 4. Component Lifecycle
- **Mounting**: Component is being created and added to DOM
- **Updating**: Component is being re-rendered
- **Unmounting**: Component is being removed from DOM

### 5. Props
- Read-only data passed from parent to child
- Used to configure components
- If props change, component re-renders

---

## Responsive Design

All components are fully responsive with:
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly buttons (min 44x44px)
- Readable font sizes at all sizes
- Smooth animations and transitions

### Breakpoints
- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: > 768px

---

## Icons Used (via react-icons)

Project uses Font Awesome icons from `react-icons/fa`:
- `FaSignInAlt` - Login icon
- `FaSignOutAlt` - Logout icon
- `FaEye` - Show icon
- `FaEyeSlash` - Hide icon
- `FaTrash` - Delete icon
- `FaClock` - Timer icon
- `FaPlay` - Play icon
- `FaPause` - Pause icon
- `FaRedoAlt` - Reset icon
- `FaHome` - Home icon
- `FaChevronUp/Down` - Expand/collapse icons
- More...

---

## Console Logging Guide

Open browser DevTools (F12) to see:

1. **Login Component**: Login/logout events
2. **Message Component**: Mount and unmount logs
3. **ToggleMessage**: Per-message lifecycle logs
4. **Countdown**: Timer started/cleared logs
5. **PropMessage**: Message display/hide logs

### Console Output Example
```
✅ Message Component Mounted
📨 Message 1 mounted: "React is awesome!"
⏸️ Paused countdown
🧹 Cleanup: Timer cleared on unmount
🗑️ Message 1 unmounted
```

---

## Best Practices Implemented

✅ **Code Organization**
- Separate components in their own files
- Clear component hierarchy
- Modular CSS files

✅ **Accessibility**
- Focus states for buttons
- Semantic HTML
- Alt text alternatives to emojis/icons

✅ **Performance**
- Efficient state management
- Proper dependency arrays in useEffect
- Cleanup functions to prevent memory leaks

✅ **User Experience**
- Smooth animations and transitions
- Clear visual feedback
- Responsive design
- Intuitive interactions

✅ **Code Quality**
- Clear comments and documentation
- Consistent naming conventions
- Modern React hooks (no class components)
- ESM modules

---

## Testing the Application

### Test Conditional Rendering (Part A)
1. Start the app
2. Click the Login button
3. Verify heading changes from "Please Log In" to "Welcome, User!"
4. Verify button text toggles between "Login" and "Logout"

### Test Component Lifecycle (Part B)
1. Open DevTools Console
2. Click "Hide Message" / "Show Message"
3. Verify console logs appear:
   - `✅ Message Component Mounted` (when shown)
   - `❌ Message Component Unmounted` (when hidden)

### Test Multiple Messages (Exercise 1 & 2)
1. Scroll to "Exercise 1 & 2"
2. Toggle each message independently
3. Watch console for individual mount/unmount logs
4. Remove messages and see list update

### Test Props + Conditional Rendering (Exercise 3)
1. Scroll to "Exercise 3"
2. Toggle each message display
3. Verify child components mount/unmount as parent toggles

### Test Countdown Timer (Exercise 4)
1. Scroll to "Exercise 4"
2. Watch countdown decrement every second
3. Click Pause - countdown stops
4. Click Resume - countdown continues
5. Click Reset - countdown returns to 10
6. Let countdown complete - watch "Time's Up!" message

---

## Common Issues & Solutions

### Issue: Modules not found
```
Error: Cannot find module...
```
**Solution**: Run `npm install` to install dependencies

### Issue: Port already in use
```
Error: EADDRINUSE: address already in use :::5173
```
**Solution**: 
```bash
# Use a different port
npm run dev -- --port 3000
```

### Issue: React Fast Refresh not working
**Solution**: Make sure you're not using `.js` files for JSX. Use `.jsx` extension.

### Issue: Console logs not appearing
**Solution**: Open DevTools (F12 → Console tab) before interacting with components

---

## Development Tips

### Hot Module Replacement (HMR)
Vite provides instant feedback when you save files:
1. Edit a component
2. Save the file (Ctrl+S)
3. Browser auto-updates without losing state

### Debug useEffect Issues
1. Add console logs in useEffect
2. Check the dependency array
3. Verify cleanup functions are called

### Track State Changes
```javascript
// Add this in useEffect to see all state changes
console.log('State updated:', variableName);
```

---

## Learning Resources

### Official Documentation
- [React Hooks Documentation](https://react.dev/reference/react)
- [useEffect Hook Guide](https://react.dev/reference/react/useEffect)
- [Conditional Rendering](https://react.dev/learn/conditional-rendering)

### React Icons
- [react-icons GitHub](https://github.com/react-icons/react-icons)
- Font Awesome, Feather, Bootstrap Icons library

### Vite
- [Vite Documentation](https://vitejs.dev/)
- [Vite + React Guide](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)

---

## Assessment Criteria

Students will be evaluated on:

✅ **Functionality** (40%)
- Components render correctly
- State changes trigger appropriate updates
- Lifecycle hooks work as intended
- Conditional rendering functions properly

✅ **Code Quality** (30%)
- Clean, readable code
- Proper use of React patterns
- Comments and documentation
- No console errors/warnings

✅ **Responsive Design** (20%)
- Works on mobile (< 480px)
- Works on tablet (480px - 768px)
- Works on desktop (> 768px)
- Touch-friendly buttons

✅ **Features & Enhancements** (10%)
- All exercises completed
- Icons used instead of emojis
- Smooth animations
- User-friendly UI

---

## Submission Checklist

Before submitting:
- [ ] All components created and working
- [ ] npm install successful
- [ ] npm run dev starts without errors
- [ ] All lifecycle logs appear in console
- [ ] Responsive design works on mobile
- [ ] No console errors/warnings
- [ ] All buttons and interactions work
- [ ] Code is properly commented
- [ ] README.md is included

---

## Author Notes

This lab demonstrates core React concepts using modern best practices:
- Functional components with hooks (not class components)
- Proper state management
- Lifecycle handling
- Clean, maintainable code
- Professional styling with responsive design

All components follow React best practices and are production-ready!

---

## License

This is an educational project for Web Engineering Lab.

---

## Questions?

If you encounter any issues:
1. Check the console (F12) for error messages
2. Review the comments in the component files
3. Refer to the React documentation links above
4. Debug using React DevTools browser extension

**Happy Learning! 🚀**
