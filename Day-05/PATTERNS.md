# 📚 Code Patterns & Best Practices Guide

## Overview of Patterns Used in Lab #7

This guide explains the React patterns and best practices implemented in this lab.

---

## 1. React Hooks

### useState Hook

**Purpose**: Manage component state in functional components

**Syntax**:
```javascript
const [state, setState] = useState(initialValue);
```

**Example**:
```javascript
// Simple state
const [isLoggedIn, setIsLoggedIn] = useState(false);

// Multiple state variables
const [count, setCount] = useState(0);
const [name, setName] = useState('');
```

**In Our Lab**:
- **Login.jsx**: Tracks login state
- **Countdown.jsx**: Tracks countdown value and isActive status
- **ToggleMessage.jsx**: Tracks array of messages with visibility

---

### useEffect Hook

**Purpose**: Perform side effects in functional components

**Syntax**:
```javascript
useEffect(() => {
  // Side effect code
  return () => {
    // Cleanup code (optional)
  };
}, [dependencies]);
```

**Dependency Array Options**:

| What | When it runs |
|------|-------------|
| `[]` (empty) | Once on mount, cleanup on unmount |
| `[dep1, dep2]` | When dependencies change |
| Omitted | After every render |

**Example - Message.jsx**:
```javascript
useEffect(() => {
  console.log("Message Component Mounted");

  return () => {
    console.log("Message Component Unmounted");
  };
}, []); // Empty array = mount/unmount only
```

**Example - Countdown.jsx**:
```javascript
useEffect(() => {
  let intervalId;
  
  if (isActive && countdown > 0) {
    intervalId = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
  }

  return () => {
    clearInterval(intervalId); // Cleanup
  };
}, [isActive, countdown]); // Dependencies
```

**In Our Lab**:
- **Message.jsx**: Demonstrates basic mount/unmount
- **Countdown.jsx**: Shows dependency array usage and cleanup
- **MessageItem.jsx**: Shows how children log their own lifecycle

---

## 2. Conditional Rendering

### Pattern 1: Ternary Operator

**Syntax**:
```javascript
{condition ? <ComponentA /> : <ComponentB />}
```

**Example - Login.jsx**:
```javascript
{isLoggedIn ? (
  <h2>Welcome, User!</h2>
) : (
  <h2>Please Log In</h2>
)}
```

**Advantages**:
- Clear if/true/false logic
- Best for two-way conditions

---

### Pattern 2: Logical AND (&& Operator)

**Syntax**:
```javascript
{condition && <Component />}
```

**Example - App.jsx**:
```javascript
{showMessage && <Message />}
```

**How it works**:
- If `condition` is `true` → renders component
- If `condition` is `false` → renders nothing (null/undefined)

**Advantages**:
- Simpler than ternary for on/off
- Cleaner code

---

### Pattern 3: If/Else (Outside JSX)

**Syntax**:
```javascript
if (condition) {
  return <ComponentA />;
}
return <ComponentB />;
```

**When to use**:
- Complex logic
- Multiple conditions
- Return early pattern

---

## 3. State Management Patterns

### Lifting State Up

**Pattern**: Pass state to parent, modify via callbacks

**Example - Countdown.jsx**:
```javascript
// State in component
const [countdown, setCountdown] = useState(10);

// Handlers modify state
const handleReset = () => {
  setCountdown(10);
};

// Pass to button
<button onClick={handleReset}>Reset</button>
```

### Managing Array State

**Pattern**: Use map/filter to update array items

**Example - ToggleMessage.jsx**:
```javascript
const [messages, setMessages] = useState([...]);

// Toggle visibility
const toggleMessage = (id) => {
  setMessages(
    messages.map((msg) =>
      msg.id === id ? { ...msg, visible: !msg.visible } : msg
    )
  );
};

// Remove item
const removeMessage = (id) => {
  setMessages(messages.filter((msg) => msg.id !== id));
};
```

**Key Points**:
- Never mutate state directly
- Create new arrays/objects
- Use `.map()` and `.filter()`

---

## 4. Props Pattern

### Passing Props from Parent to Child

**Parent - App.jsx**:
```javascript
<MessageDisplay message={msg.text} messageId={msg.id} />
```

**Child - PropMessage.jsx**:
```javascript
const MessageDisplay = ({ message, messageId }) => {
  // Use props
  return <p>{message}</p>;
};
```

### Props with Event Handlers

**Parent**:
```javascript
<MessageItem id={msg.id} text={msg.text} onRemove={removeMessage} />
```

**Child**:
```javascript
const MessageItem = ({ id, text, onRemove }) => {
  return <button onClick={() => onRemove(id)}>Remove</button>;
};
```

---

## 5. Component Lifecycle Patterns

### Component Mounting

**What happens**:
1. Component function is called
2. useEffect with `[]` runs
3. JSX is rendered

**Example**:
```javascript
useEffect(() => {
  console.log("Component mounted");
}, []);
```

### Component Unmounting

**What happens**:
1. Component is being removed
2. useEffect cleanup runs
3. Component removed from DOM

**Example**:
```javascript
useEffect(() => {
  return () => {
    console.log("Component unmounting");
  };
}, []);
```

### State Change Causing Re-render

**What happens**:
1. setState is called
2. Component function runs again
3. New JSX is rendered with new state

**Example**:
```javascript
const handleClick = () => {
  setCount(count + 1); // Triggers re-render
};
```

---

## 6. Common Patterns in This Lab

### Pattern: Toggle Component Visibility

**Pattern**:
```javascript
const [showComponent, setShowComponent] = useState(true);

return (
  <>
    <button onClick={() => setShowComponent(!showComponent)}>
      {showComponent ? "Hide" : "Show"}
    </button>
    {showComponent && <Component />}
  </>
);
```

**Found in**:
- App.jsx (Message toggle)
- PropMessage.jsx (message visibility)

---

### Pattern: Counter/Timer

**Pattern**:
```javascript
const [count, setCount] = useState(10);

useEffect(() => {
  if (count > 0) {
    const timer = setTimeout(() => setCount(count - 1), 1000);
    return () => clearTimeout(timer);
  }
}, [count]);
```

**Found in**:
- Countdown.jsx (countdown timer)

---

### Pattern: List Management

**Pattern**:
```javascript
const [items, setItems] = useState([
  { id: 1, text: "Item 1", visible: true },
  { id: 2, text: "Item 2", visible: true },
]);

// Toggle
const toggle = (id) => {
  setItems(items.map(item =>
    item.id === id ? { ...item, visible: !item.visible } : item
  ));
};

// Remove
const remove = (id) => {
  setItems(items.filter(item => item.id !== id));
};

// Map and render
{items.map(item => (
  item.visible && <ItemComponent key={item.id} {...item} />
))}
```

**Found in**:
- ToggleMessage.jsx (message list)
- PropMessage.jsx (message grid)

---

## 7. Best Practices Implemented

### ✅ Use Keys in Lists
```javascript
{messages.map((msg) => (
  <div key={msg.id}>...</div>
))}
```

### ✅ Cleanup Functions in useEffect
```javascript
useEffect(() => {
  const timer = setInterval(...);
  return () => clearInterval(timer); // Cleanup!
}, []);
```

### ✅ Avoid Inline Objects in Dependencies
```javascript
// ❌ Bad
useEffect(() => {...}, [obj]); // New object every render

// ✅ Good
useEffect(() => {...}, [obj.id]); // Specific value
```

### ✅ Use Proper Event Handler Naming
```javascript
// ✅ Good names
const handleClick = () => {};
const toggleMessage = () => {};
const removeItem = () => {};
```

### ✅ JSX Comments
```javascript
{/* This is a JSX comment */}
```

### ✅ Destructuring Props
```javascript
// ✅ Good
const Component = ({ name, age, email }) => {
  return <div>{name} - {age}</div>;
};

// ❌ Less clean
const Component = (props) => {
  return <div>{props.name} - {props.age}</div>;
};
```

---

## 8. React Rules & Warnings to Avoid

### ✅ Only call hooks at the top level
```javascript
// ✅ Correct
useEffect(() => {...}, []);
const [state, setState] = useState(0);

// ❌ Wrong - inside if statement
if (condition) {
  useEffect(() => {...}, []); // Don't do this!
}
```

### ✅ Don't mutate state directly
```javascript
// ❌ Wrong
state.name = "New Name";

// ✅ Correct
setState({ ...state, name: "New Name" });
```

### ✅ Set proper dependencies
```javascript
// ✅ Correct - all dependencies listed
useEffect(() => {
  console.log(count);
}, [count]);

// ❌ Wrong - missing dependency
useEffect(() => {
  console.log(count); // Uses count but not in dependencies
}, []);
```

---

## 9. CSS & Styling Patterns

### Mobile-First Responsive Design
```css
/* Base styles for mobile */
.container {
  padding: 1rem;
  font-size: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
    font-size: 1.1rem;
  }
}
```

### Using CSS Grid for Responsive Layouts
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}
```

### Smooth Transitions
```css
button {
  transition: all 0.3s ease;
}

button:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
```

---

## 10. Common Mistakes & How to Avoid Them

### Mistake 1: Missing Dependency Array
```javascript
// ❌ Runs after every render (infinite loop possible)
useEffect(() => {
  setState(newValue);
});

// ✅ Run once on mount
useEffect(() => {
  setState(newValue);
}, []);
```

### Mistake 2: Forgetting Cleanup
```javascript
// ❌ Leaks memory
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
}, []);

// ✅ Clean up resources
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  return () => clearInterval(timer);
}, []);
```

### Mistake 3: Using Index as Key
```javascript
// ❌ Bad for lists that change
{items.map((item, index) => <div key={index}>{item}</div>)}

// ✅ Use unique ID
{items.map((item) => <div key={item.id}>{item}</div>)}
```

### Mistake 4: Unnecessary State
```javascript
// ❌ Don't store derived values in state
const [fullName, setFullName] = useState('');

// ✅ Calculate from other state
const fullName = firstName + lastName;
```

---

## Summary

This lab covers:
- ✅ useState for state management
- ✅ useEffect for lifecycle
- ✅ Conditional rendering patterns
- ✅ List rendering and manipulation
- ✅ Props and component communication
- ✅ Cleanup and memory management
- ✅ Responsive design

Master these patterns, and you're well on your way to React expertise! 🎉

---

## Additional Resources

- [React Hooks API Reference](https://react.dev/reference/react)
- [Conditional Rendering](https://react.dev/learn/conditional-rendering)
- [Component Lifecycle](https://react.dev/learn/lifecycle-of-reactive-effects)
- [Lists and Keys](https://react.dev/learn/rendering-lists)

---

**Practice makes perfect! Experiment with these patterns!** 💻
