# LOOM HOUSE INVENTORY - FULL REBUILD GUIDE
## Complete Step-by-Step From Zero to Finished App
### In Exact Order We Did In Chat - For Practice

This file will teach you EVERY step we took, every state, every function, what each line does, as if you're coding for the first time.

---

# PROJECT: LOOM HOUSE ATELIER INVENTORY
**Theme:** Black & White, premium, boutique
**Goal:** 12 products, table + card view, search, filters, stock +/-, add, edit, delete, localStorage, export

---

## STEP 0: BASE UI - NO FUNCTIONALITY YET

This is where we started. No useState, no functions, just static UI + data array + map.

### 0A - What We Did:
- Changed name to Loom House
- Created 12 mock products (because your screenshot showed 12)
- Format adopted: id, name, sku, category, price, stock, status, date
- Added Export button beside Add Product (UI only, no function yet)
- Made ONE main container div that maps the 12 products
- Made it black & white theme
- Added Table and Card view toggle (mobile always card)
- Added increment/decrement buttons UI, edit/delete UI, colors for categories and status

### 0B - Data Array:

```js
const products = [
  { id: 1, name: "Merino Wool Scarf - Ivory", sku: "LH-MWS-9034", category: "Accessories", price: 145, stock: 16, status: "In Stock", date: "19/10/2026" },
  { id: 2, name: "Canvas Sneaker Low", sku: "LH-CSL-9023", category: "Footwear", price: 118, stock: 38, status: "In Stock", date: "19/10/2026" },
  { id: 3, name: "Rosehip Botanical Oil", sku: "LH-RBO-6645", category: "Beauty", price: 54, stock: 43, status: "In Stock", date: "19/10/2026" },
  { id: 4, name: "Washed Linen Throw", sku: "LH-WLT-1288", category: "Home", price: 142, stock: 14, status: "In Stock", date: "19/10/2026" },
  { id: 5, name: "Linen Blend Shirt - Sand", sku: "LH-LBS-4821", category: "Apparel", price: 88, stock: 3, status: "Low Stock", date: "18/10/2026" },
  { id: 6, name: "Suede Loafers - Tan", sku: "LH-SLT-1129", category: "Footwear", price: 195, stock: 0, status: "Out of Stock", date: "18/10/2026" },
  { id: 7, name: "Organic Cotton Tee - White", sku: "LH-OCT-5521", category: "Apparel", price: 35, stock: 52, status: "In Stock", date: "17/10/2026" },
  { id: 8, name: "Ceramic Mug Set", sku: "LH-CMS-3391", category: "Home", price: 42, stock: 25, status: "In Stock", date: "17/10/2026" },
  { id: 9, name: "Leather Tote Bag - Noir", sku: "LH-LTB-9981", category: "Accessories", price: 210, stock: 9, status: "In Stock", date: "16/10/2026" },
  { id: 10, name: "Shea Butter Body Balm", sku: "LH-SBB-2214", category: "Beauty", price: 28, stock: 0, status: "Out of Stock", date: "16/10/2026" },
  { id: 11, name: "Wide Leg Linen Pants", sku: "LH-WLP-7743", category: "Apparel", price: 96, stock: 2, status: "Low Stock", date: "15/10/2026" },
  { id: 12, name: "Woven Storage Basket", sku: "LH-WSB-4450", category: "Home", price: 62, stock: 18, status: "In Stock", date: "15/10/2026" },
];
```

**First-timer explanation:**
- `const products = [...]` is an ARRAY of OBJECTS
- Each object `{}` is one product with 8 properties
- `id` unique for React key
- `category` = Accessories, Footwear, Beauty, Home, Apparel (5 types)
- `status` = In Stock, Low Stock, Out of Stock (3 types)
- This is STATIC, like writing on paper - can't change yet

### 0C - Component Name:
We changed `function App()` to `function Inventory()` so you can export it to App.jsx:
```js
export default function Inventory() { ... }
```
Then in App.jsx: `import Inventory from "./Inventory"` and `<Inventory />`

### 0D - Key UI Features We Built (No Logic):

1. **Header:** Logo L, Loom House title, ATELIER INVENTORY subtitle, Search UI div, Reset button UI, Export button UI, + Add Product button UI

2. **Stats Section:** 4 cards:
   - TOTAL PRODUCTS (black card, shows 12)
   - INVENTORY VALUE (white with black border, ₦23,268)
   - LOW STOCK (zinc-50, 02)
   - OUT OF STOCK (dashed border, 02)

3. **Filters UI:** All Categories ▼, All Status ▼, Sort: Recent ▼ - just spans, not working yet

4. **Table Header (md/lg only, hidden on mobile):** PRODUCT, CATEGORY, PRICE, STOCK, STATUS, ACTIONS - visible only on md: `hidden md:block` pattern

5. **Category Colors:**
```js
const catStyle = {
  Accessories: "bg-zinc-100 text-zinc-700 border-zinc-200",
  Footwear: "bg-[#EFEEF6] text-[#6B6580] border-[#E2DFEF]",
  Beauty: "bg-[#FDF0F0] text-[#8C6B6B] border-[#F2DCDC]",
  Home: "bg-[#EDF2ED] text-[#5F6F5F] border-[#D9E6D9]",
  Apparel: "bg-[#EFF3F7] text-[#657786] border-[#DDE6EE]",
};
```
This object maps category name to Tailwind classes. So `catStyle[p.category]` gives correct colors.

6. **Status Colors:**
```js
const statusStyle = {
  "In Stock": "bg-[#E8F5E9] text-[#1B5E20] border-[#C8E6C9]",
  "Low Stock": "bg-[#FFF8E1] text-[#F57F17] border-[#FFECB3]",
  "Out of Stock": "bg-[#FFEBEE] text-[#B71C1C] border-[#FFCDD2]",
};
```
Green for in, yellow for low, red for out.

7. **Table View:** One container div with `products.map()` inside, each row has product info + minus/plus buttons UI + Edit/Delete UI

8. **Card View:** Grid `grid-cols-2 lg:grid-cols-3`, each card has category pill, status pill, name, price, stock with +/- UI, Edit + Delete buttons at bottom with border top

9. **Mobile View:** `md:hidden` - always card view, with Edit (black) + Delete (×) buttons

**CRITICAL PATTERN:** We used ONE `.map()` per view, but 3 views total:
- Mobile: `products.map` (always card)
- Desktop Table: `products.map`
- Desktop Card: `products.map`
All inside one file. Later we change all 3 to `filtered.map`.

---

## STEP 1: SEARCH

This was the first functionality. We made search box actually work.

### 1A - Add State:

Inside Inventory function, at top, beside view state:
```js
const [view, setView] = useState("Table");
const [search, setSearch] = useState("");
```

**Line-by-line for first timer:**
- `useState` is React hook to create MEMORY
- `useState("")` creates memory box with initial value empty string ""
- `search` = READ, current value in box
- `setSearch` = WRITE, function to update box
- When you call setSearch, React re-renders component with new search value

### 1B - Add Filtering Logic:

Right after products array (or after products state later):
```js
const filtered = products.filter(p => 
  p.name.toLowerCase().includes(search.toLowerCase()) || 
  p.sku.toLowerCase().includes(search.toLowerCase()) ||
  p.category.toLowerCase().includes(search.toLowerCase())
);
```

**Breakdown:**
- `products.filter(p => ...)` loops through all 12 products, p = each product
- `p.name.toLowerCase()` make product name lowercase: "Merino Wool" -> "merino wool"
- `search.toLowerCase()` make search lowercase: "LINEN" -> "linen"
- `.includes()` checks if product name CONTAINS search text: "merino wool scarf - ivory".includes("linen")? false. If you type "scarf", true.
- `||` OR logic: keep product if name OR sku OR category contains search
- Result: `filtered` array = only products matching search

Example:
- products = 12 items
- search = "Beauty"
- filtered = 2 items (Rosehip Oil and Shea Butter Balm) because their category is Beauty

### 1C - Wire Search Input:

BEFORE (UI only):
```jsx
<div className="bg-zinc-100 rounded-full px-4 py-2.5 text-[13px] text-zinc-500">Search products, SKU...</div>
```

AFTER (functional):
```jsx
<input 
  value={search} 
  onChange={(e) => setSearch(e.target.value)} 
  placeholder="Search products, SKU..." 
  className="bg-zinc-100 rounded-full px-4 py-2.5 text-[13px] w-[180px] md:w-[240px] outline-none border border-transparent focus:border-black" 
/>
```

- `value={search}` - Input displays what's in memory (controlled component)
- `onChange={(e) => setSearch(e.target.value)}` - Every keystroke, e.target.value = what user typed, update memory. This triggers re-render, filtered recalculates, UI updates
- `placeholder` shows hint when empty

### 1D - Wire Reset Button:

```jsx
<button onClick={() => setSearch("")} className="...">Reset</button>
```
Click -> set search to empty string -> filtered becomes all 12 again.

### 1E - Change All Maps:

Everywhere you had `products.map`, change to `filtered.map`:
- Mobile: `products.map` -> `filtered.map`
- Desktop Table: `products.map` -> `filtered.map`
- Desktop Card: `products.map` -> `filtered.map`

**Why?** Because now we want to DISPLAY filtered list, not full list. If search empty, filtered = all 12. If search "linen", filtered = 2, so UI shows 2.

**Result:** Type "linen" -> only 2 products show (Washed Linen Throw, Wide Leg Linen Pants). Click Reset -> back to 12.

---

## STEP 2: FILTERS + SORT

We added dropdowns for category, status, and sort.

### 2A - Add 3 States:

Under search state:
```js
const [catFilter, setCatFilter] = useState("All");
const [statusFilter, setStatusFilter] = useState("All");
const [sortBy, setSortBy] = useState("Recent");
```

- `catFilter` remembers selected category: All, Accessories, Footwear, Beauty, Home, Apparel
- `statusFilter` remembers status: All, In Stock, Low Stock, Out of Stock
- `sortBy` remembers sort order: Recent, Price Low, Price High, Stock Low
- All start with "All" or "Recent" = show everything

### 2B - Upgrade Filtered Logic:

Replace Step 1 filtered with this chained version:

```js
const filtered = products
  .filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.sku.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )
  .filter(p => catFilter === "All" || p.category === catFilter)
  .filter(p => statusFilter === "All" || p.status === statusFilter)
  .sort((a, b) => {
    if (sortBy === "Price Low") return a.price - b.price;
    if (sortBy === "Price High") return b.price - a.price;
    if (sortBy === "Stock Low") return a.stock - b.stock;
    return b.id - a.id; // Default: Recent (by ID descending)
  });
```

**Step-by-step chain:**

1. Start with 12 products
2. First `.filter()` = search filter (from Step 1)
3. Second `.filter()` = category filter:
   - `catFilter === "All"` ? If All selected, true for all products (show all)
   - `|| p.category === catFilter` : If not All, only keep if product category matches selected
   - Example: catFilter="Beauty" -> only 2 products (Beauty category)
4. Third `.filter()` = status filter:
   - Same logic: All = show all, else only matching status
   - Example: statusFilter="Low Stock" -> only 2 products (Linen Blend Shirt, Wide Leg Pants)
5. `.sort()` = ordering:
   - `(a, b)` are two products being compared
   - `a.price - b.price` : If a price 35, b price 145, result -110 (negative), so a comes first = Price Low to High
   - `b.price - a.price` : Reverse, High to Low
   - `a.stock - b.stock` : Stock Low to High (0, 2, 3, 9...)
   - `b.id - a.id` : Recent = higher ID first (id 12 newest, id 1 oldest), so b.id - a.id sorts descending

**Chaining:** `products` -> filtered by search -> filtered by category -> filtered by status -> sorted -> final `filtered` list. Each step narrows down.

### 2C - Replace Filter Spans with Select Dropdowns:

BEFORE (UI only spans):
```jsx
<div className="flex gap-2">
  <span className="px-3 py-1.5 rounded-full border bg-white text-[11px]">All Categories ▼</span>
  <span className="px-3 py-1.5 rounded-full border bg-white text-[11px]">All Status ▼</span>
  <span className="px-3 py-1.5 rounded-full border bg-white text-[11px]">Sort: Recent ▼</span>
</div>
```

AFTER (functional selects):
```jsx
<div className="flex gap-2">
  <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)} className="px-3 py-1.5 rounded-full border bg-white text-[11px] outline-none">
    <option value="All">All Categories</option>
    <option value="Accessories">Accessories</option>
    <option value="Footwear">Footwear</option>
    <option value="Beauty">Beauty</option>
    <option value="Home">Home</option>
    <option value="Apparel">Apparel</option>
  </select>

  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-1.5 rounded-full border bg-white text-[11px] outline-none">
    <option value="All">All Status</option>
    <option value="In Stock">In Stock</option>
    <option value="Low Stock">Low Stock</option>
    <option value="Out of Stock">Out of Stock</option>
  </select>

  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-1.5 rounded-full border bg-white text-[11px] outline-none">
    <option value="Recent">Sort: Recent</option>
    <option value="Price Low">Price Low</option>
    <option value="Price High">Price High</option>
    <option value="Stock Low">Stock Low</option>
  </select>
</div>
```

- `<select>` dropdown, `value` = current memory, `onChange` updates memory
- `e.target.value` = selected option value (e.g., "Beauty")
- When changed, filtered recalculates

### 2D - Update Reset Button to Clear All Filters:

```jsx
<button onClick={() => { setSearch(""); setCatFilter("All"); setStatusFilter("All"); setSortBy("Recent"); }} className="...">Reset</button>
```

Now Reset clears search + all 3 filters.

### 2E - Update Showing Count:

```jsx
<p className="text-[11px] text-zinc-500">Showing {filtered.length} of {products.length}</p>
```

- `filtered.length` = number after filters (e.g., 2)
- `products.length` = total (12)

**Test:** Select Beauty + Low Stock? No results? That's correct chaining.

---

## STEP 3: DYNAMIC STATS

We made top 4 stat cards calculate real values from data, not hardcoded 02 and ₦23,268.

### 3A - Add Calculations After Filtered:

```js
const InventoryValue = products.reduce((total, p) => total + (p.price * p.stock), 0);  
const LowStockCount = products.filter(p => p.status === "Low Stock").length;
const OutOfStockCount = products.filter(p => p.status === "Out of Stock").length;
```

**Breakdown for first timer:**

1. **InventoryValue - using reduce:**
   - `products.reduce((total, p) => ..., 0)` loops through all products
   - `total` starts at 0, accumulates sum
   - `p` = each product
   - `total + (p.price * p.stock)` : For each product, add price * stock to total
   - Example: Product 1: 145 * 16 = 2320, Product 2: 118 * 38 = 4484, sum all = real inventory value
   - `0` is initial value

2. **LowStockCount - using filter + length:**
   - `products.filter(p => p.status === "Low Stock")` returns array of only Low Stock products (2 items)
   - `.length` counts them: 2

3. **OutOfStockCount:** Same, count Out of Stock (2 items)

### 3B - Replace Stat Cards JSX:

**Card 1 - Total Products (black):**
```jsx
<p className="text-[32px] font-bold leading-none">{filtered.length}</p>
<p className="text-[10px] mt-2 text-zinc-400">{filtered.length} of {products.length} SHOWING</p>
```
- Shows filtered count, not total, so updates when you search/filter

**Card 2 - Inventory Value:**
```jsx
<p className="text-[28px] font-bold leading-none">₦{InventoryValue.toLocaleString()}</p>
```
- `toLocaleString()` adds commas: 23268 -> "23,268"

**Card 3 - Low Stock:**
```jsx
<p className="text-[32px] font-bold leading-none">{String(LowStockCount).padStart(2, '0')}</p>
```
- `String(2).padStart(2, '0')` -> "02" (pad with 0 to make 2 digits)

**Card 4 - Out of Stock:**
```jsx
<p className="text-[32px] font-bold leading-none">{String(OutOfStockCount).padStart(2, '0')}</p>
<div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold">{OutOfStockCount}/{products.length}</div>
```
- Shows "02" and circle "2/12"

**Result:** Search "Beauty" -> Total Products card shows 2, not 12. Value recalculates if you later change stock.

---

## STEP 4: STOCK +/- BUTTONS ACTUALLY WORK

This is where we made products STATEFUL so stock can change.

### 4A - Change const products to State:

BEFORE:
```js
const products = [
  { id: 1, ... },
];
```

AFTER:
```js
const [products, setProducts] = useState([
  { id: 1, ... },
]);
```

**First-timer explanation:**
- BEFORE: `const products = [...]` is like writing on paper in PEN - can't erase, can't change
- AFTER: `const [products, setProducts] = useState([...])` is like writing on WHITEBOARD - `products` is what's currently on board, `setProducts` is eraser + marker to change it
- When you call setProducts, React sees whiteboard changed and redraws screen
- This is REQUIRED for any data that changes (stock, add, edit, delete)

### 4B - Add Stock Update Function:

After stats calculations:
```js
const updateStock = (id, change) => {
  setProducts(prev => prev.map(p => { 
    if (p.id !== id) return p;
    const newStock = Math.max(0, p.stock + change);
    let newStatus = "In Stock";
    if (newStock === 0) newStatus = "Out of Stock";
    else if (newStock <= 5) newStatus = "Low Stock";
    return { ...p, stock: newStock, status: newStatus };
  }));
};
```

**Line-by-line:**

1. `const updateStock = (id, change) => {` Function receives id of product to update and change (+1 or -1)
2. `setProducts(prev => prev.map(p => {` - prev = current products array, .map loops through all
3. `if (p.id !== id) return p;` - If this product is NOT the one we clicked, return it unchanged
4. `const newStock = Math.max(0, p.stock + change);` - Calculate new stock: current stock + change. Math.max(0, ...) ensures never below 0. If stock 0 and change -1, Math.max(0, -1) = 0, so stays 0.
5. `let newStatus = "In Stock"; if (newStock === 0) newStatus = "Out of Stock"; else if (newStock <= 5) newStatus = "Low Stock";` - Decide status based on new stock number:
   - 0 = Out of Stock
   - 1-5 = Low Stock
   - 6+ = In Stock
6. `return { ...p, stock: newStock, status: newStatus };` - Return UPDATED product: copy all old properties `...p`, but overwrite stock and status with new values
7. `}));` - setProducts replaces entire array with new mapped array

**This is UPDATE using .map() + spread, same pattern as Contacts favorite toggle.**

### 4C - Wire Buttons:

Find EVERY minus and plus button (3 places: Mobile card, Desktop Table, Desktop Card) and add onClick:

BEFORE:
```jsx
<button className="w-7 h-7 rounded-full border">−</button>
<span>{p.stock}</span>
<button className="w-7 h-7 rounded-full border">+</button>
```

AFTER:
```jsx
<button onClick={() => updateStock(p.id, -1)} className="w-7 h-7 rounded-full border">−</button>
<span className="w-6 text-center">{p.stock}</span>
<button onClick={() => updateStock(p.id, 1)} className="w-7 h-7 rounded-full border">+</button>
```

- `onClick={() => updateStock(p.id, -1)}` - When minus clicked, call updateStock with this product's id and -1
- `onClick={() => updateStock(p.id, 1)}` - Plus with +1
- Arrow function prevents auto-call on render

**Result:** Click - on Linen Blend Shirt (stock 3) -> becomes 2 -> status stays Low Stock. Click - again -> 1 -> Low. Click - again -> 0 -> automatically becomes Out of Stock (red pill). Top stats cards auto-update, inventory value auto-recalculates, because they all read from products state.

---

## STEP 5: ADD PRODUCT MODAL

We added ability to create new products.

### 5A - Add 2 New States:

At top with other useStates:
```js
const [showAdd, setShowAdd] = useState(false);
const [newProduct, setNewProduct] = useState({ name: "", sku: "", category: "Accessories", price: "", stock: "" });
```

- `showAdd` boolean: false = modal closed, true = modal open
- `newProduct` object: holds form inputs, starts empty except category default Accessories

### 5B - Add handleAddProduct Function:

After updateStock:

```js
const handleAddProduct = () => {
  if (!newProduct.name || !newProduct.price) return;
  const stockNum = parseInt(newProduct.stock) || 0;
  let status = "In Stock";
  if (stockNum === 0) status = "Out of Stock";
  else if (stockNum <= 5) status = "Low Stock";
  
  const productToAdd = {
    id: products.length ? Math.max(...products.map(p => p.id)) + 1 : 1,
    name: newProduct.name,
    sku: newProduct.sku || `LH-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.floor(1000+Math.random()*9000)}`,
    category: newProduct.category || "Accessories",
    price: parseFloat(newProduct.price),
    stock: stockNum,
    status: status,
    date: new Date().toLocaleDateString('en-GB'),
  };
  setProducts([productToAdd, ...products]);
  setNewProduct({ name: "", sku: "", category: "Accessories", price: "", stock: "" });
  setShowAdd(false);
};
```

**Breakdown:**

1. `if (!newProduct.name || !newProduct.price) return;` Validation: if name or price empty, stop, don't add
2. `const stockNum = parseInt(newProduct.stock) || 0;` Convert stock string to number, if empty or invalid, 0
3. Status logic same as updateStock: 0=Out, 1-5=Low, 6+=In
4. `id: products.length ? Math.max(...products.map(p => p.id)) + 1 : 1` - Generate new id: find max id in current products, +1. If no products, 1. Example: max id is 12, new id 13.
5. `sku: newProduct.sku || LH-...` - If user typed SKU, use it, else auto-generate random: `LH-` + 4 random chars + `-` + 4 random digits. `Math.random().toString(36).substr(2,4)` generates random letters/numbers.
6. `price: parseFloat(newProduct.price)` Convert price string to float number
7. `date: new Date().toLocaleDateString('en-GB')` Today's date in DD/MM/YYYY format
8. `setProducts([productToAdd, ...products]);` CREATE using spread: new product at top, old products after. `[new, old1, old2...]`
9. Clear form and close modal

### 5C - Wire Add Button in Header:

BEFORE:
```jsx
<button className="...">+ Add Product</button>
```

AFTER:
```jsx
<button onClick={() => setShowAdd(true)} className="...">+ Add Product</button>
```

Click -> set showAdd true -> modal appears (because of conditional rendering below)

### 5D - Add Modal at Bottom of Return:

Just before final `</div>`:

```jsx
{/* ADD MODAL */}
{showAdd && (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-[24px] w-full max-w-[440px] p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[18px] font-bold">Add Product</h2>
        <button onClick={() => setShowAdd(false)} className="w-8 h-8 rounded-full border flex items-center justify-center">×</button>
      </div>
      <div className="flex flex-col gap-3">
        <input value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} placeholder="Product name *" className="w-full px-4 py-3 rounded-full border border-zinc-300 text-[13px] outline-none" />
        <div className="grid grid-cols-2 gap-3">
          <input value={newProduct.sku} onChange={e => setNewProduct({...newProduct, sku: e.target.value})} placeholder="SKU (auto if empty)" className="w-full px-4 py-3 rounded-full border border-zinc-300 text-[13px] outline-none" />
          <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="w-full px-4 py-3 rounded-full border border-zinc-300 text-[13px] outline-none">
            <option>Accessories</option><option>Footwear</option><option>Beauty</option><option>Home</option><option>Apparel</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input type="number" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} placeholder="Price *" className="w-full px-4 py-3 rounded-full border border-zinc-300 text-[13px] outline-none" />
          <input type="number" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} placeholder="Stock" className="w-full px-4 py-3 rounded-full border border-zinc-300 text-[13px] outline-none" />
        </div>
      </div>
      <div className="flex gap-2 mt-6">
        <button onClick={() => setShowAdd(false)} className="flex-1 py-3 rounded-full border text-[13px]">Cancel</button>
        <button onClick={handleAddProduct} className="flex-1 py-3 rounded-full bg-black text-white text-[13px]">Add Product</button>
      </div>
    </div>
  </div>
)}
```

**First-timer explanation of modal pattern:**

- `{showAdd && ( <div>...modal...</div> )}` = Conditional rendering: If showAdd true, show modal div, if false show nothing
- `fixed inset-0 bg-black/50 z-50 flex items-center justify-center` = Full screen overlay, semi-transparent black, centered
- Each input: `value={newProduct.name}` shows memory, `onChange={e => setNewProduct({...newProduct, name: e.target.value})}` updates ONE field while keeping others: `...newProduct` copies all fields, `name: e.target.value` overwrites name field
- This pattern `{...object, field: newValue}` is how you update object state

**Flow:** Click + Add Product -> showAdd true -> modal shows -> type name/price -> click Add Product inside modal -> handleAddProduct creates product -> adds to products state -> clears form -> closes modal -> table re-renders with new product at top

### Bug We Fixed:

You had:
```js
id: product.length // BUG: product without S
```
Correct:
```js
id: products.length // with S, because state is products
```

And:
```js
const handleAddProduct = () => {{ // double braces = crash
```
Correct: single `{`

And initial newProduct had `category: ""` causing blank select, fixed to `category: "Accessories"`

---

## STEP 6: EDIT + DELETE

Final CRUD operations.

### 6A - Add 3 New States:

```js
const [showEdit, setShowEdit] = useState(false);
const [editingId, setEditingId] = useState(null);
const [editForm, setEditForm] = useState({ name: "", sku: "", category: "Accessories", price: "", stock: "" });
```

- `showEdit` boolean for edit modal
- `editingId` number: which product id we're editing, null if not editing
- `editForm` object: holds edit form values, separate from newProduct

### 6B - Add 3 Functions:

After handleAddProduct:

```js
// EDIT
const openEdit = (p) => {
  setEditingId(p.id);
  setEditForm({ name: p.name, sku: p.sku, category: p.category, price: String(p.price), stock: String(p.stock) });
  setShowEdit(true);
};

const handleSaveEdit = () => {
  const stockNum = parseInt(editForm.stock) || 0;
  let status = "In Stock";
  if (stockNum === 0) status = "Out of Stock";
  else if (stockNum <= 5) status = "Low Stock";
  
  setProducts(prev => prev.map(p => 
    p.id === editingId 
      ? { ...p, name: editForm.name, sku: editForm.sku, category: editForm.category, price: parseFloat(editForm.price), stock: stockNum, status }
      : p
  ));
  setShowEdit(false);
  setEditingId(null);
};

// DELETE
const handleDelete = (id) => {
  if (!confirm("Delete this product?")) return;
  setProducts(prev => prev.filter(p => p.id !== id));
};
```

**Breakdown:**

**openEdit:**
1. Receives product `p` to edit (e.g., id 5 Linen Blend Shirt)
2. `setEditingId(p.id)` Remember which id we're editing
3. `setEditForm({ name: p.name, ... })` Fill form with current product data, convert price/stock to String for input value
4. `setShowEdit(true)` Open edit modal

**handleSaveEdit:**
1. Convert stock string to number, decide status same logic
2. `setProducts(prev => prev.map(...))` Loop all products
3. `p.id === editingId ? { ...p, updatedFields } : p` If id matches editingId, return updated product (copy old + overwrite with form values), else return unchanged
4. This is UPDATE using .map() + spread, same as Contacts edit
5. Close modal, clear editingId

**handleDelete:**
1. `if (!confirm("Delete this product?")) return;` Browser confirm dialog, if Cancel (false), stop
2. `setProducts(prev => prev.filter(p => p.id !== id))` Filter keeps all products where id NOT equal to deleted id, removes the one with matching id
3. This is DELETE using .filter(), same as Contacts

### 6C - Wire Buttons:

Find EVERY Edit and Delete button (3 places: Mobile, Table, Card):

BEFORE:
```jsx
<button className="...">Edit</button>
<button className="...">×</button>
```

AFTER:
```jsx
<button onClick={() => openEdit(p)} className="...">Edit</button>
<button onClick={() => handleDelete(p.id)} className="...">×</button>
```

For Card view Delete button:
```jsx
<button onClick={() => handleDelete(p.id)} className="...">Delete</button>
```

- `onClick={() => openEdit(p)}` Pass entire product object to open edit
- `onClick={() => handleDelete(p.id)}` Pass id to delete

### 6D - Add Edit Modal:

Below Add Modal, paste:

```jsx
{/* EDIT MODAL */}
{showEdit && (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-[24px] w-full max-w-[440px] p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[18px] font-bold">Edit Product</h2>
        <button onClick={() => setShowEdit(false)} className="w-8 h-8 rounded-full border flex items-center justify-center">×</button>
      </div>
      <div className="flex flex-col gap-3">
        <input value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full px-4 py-3 rounded-full border border-zinc-300 text-[13px] outline-none" />
        <div className="grid grid-cols-2 gap-3">
          <input value={editForm.sku} onChange={e => setEditForm({...editForm, sku: e.target.value})} className="w-full px-4 py-3 rounded-full border text-[13px] outline-none" />
          <select value={editForm.category} onChange={e => setEditForm({...editForm, category: e.target.value})} className="w-full px-4 py-3 rounded-full border text-[13px] outline-none">
            <option>Accessories</option><option>Footwear</option><option>Beauty</option><option>Home</option><option>Apparel</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input type="number" value={editForm.price} onChange={e => setEditForm({...editForm, price: e.target.value})} className="w-full px-4 py-3 rounded-full border text-[13px] outline-none" />
          <input type="number" value={editForm.stock} onChange={e => setEditForm({...editForm, stock: e.target.value})} className="w-full px-4 py-3 rounded-full border text-[13px] outline-none" />
        </div>
      </div>
      <div className="flex gap-2 mt-6">
        <button onClick={() => setShowEdit(false)} className="flex-1 py-3 rounded-full border text-[13px]">Cancel</button>
        <button onClick={handleSaveEdit} className="flex-1 py-3 rounded-full bg-black text-white text-[13px]">Save</button>
      </div>
    </div>
  </div>
)}
```

Same structure as Add modal, but uses editForm state and handleSaveEdit.

**Flow:** Click Edit on product 5 -> openEdit fills form with product 5 data -> modal shows -> change name/price -> click Save -> handleSaveEdit updates product in array -> modal closes -> table shows updated product

---

## STEP 7: LOCALSTORAGE - PERSISTENCE

Problem: When you refresh page, added/edited products disappear, because state resets to initial 12.

Solution: Save to browser's localStorage.

### 7A - Add useEffect to Import:

BEFORE:
```js
import { useState } from "react";
```

AFTER:
```js
import { useState, useEffect } from "react";
```

- `useEffect` is hook for side effects (saving to storage, timers, etc.)

### 7B - Replace Products useState with Smart Version:

BEFORE:
```js
const [products, setProducts] = useState([
  { id: 1, ... },
  ...
]);
```

AFTER:
```js
const [products, setProducts] = useState(() => {
  const saved = localStorage.getItem("loom_products");
  if (saved) return JSON.parse(saved);
  return [
    { id: 1, name: "Merino Wool Scarf - Ivory", sku: "LH-MWS-9034", category: "Accessories", price: 145, stock: 16, status: "In Stock", date: "19/10/2026" },
    { id: 2, name: "Canvas Sneaker Low", sku: "LH-CSL-9023", category: "Footwear", price: 118, stock: 38, status: "In Stock", date: "19/10/2026" },
    { id: 3, name: "Rosehip Botanical Oil", sku: "LH-RBO-6645", category: "Beauty", price: 54, stock: 43, status: "In Stock", date: "19/10/2026" },
    { id: 4, name: "Washed Linen Throw", sku: "LH-WLT-1288", category: "Home", price: 142, stock: 14, status: "In Stock", date: "19/10/2026" },
    { id: 5, name: "Linen Blend Shirt - Sand", sku: "LH-LBS-4821", category: "Apparel", price: 88, stock: 3, status: "Low Stock", date: "18/10/2026" },
    { id: 6, name: "Suede Loafers - Tan", sku: "LH-SLT-1129", category: "Footwear", price: 195, stock: 0, status: "Out of Stock", date: "18/10/2026" },
    { id: 7, name: "Organic Cotton Tee - White", sku: "LH-OCT-5521", category: "Apparel", price: 35, stock: 52, status: "In Stock", date: "17/10/2026" },
    { id: 8, name: "Ceramic Mug Set", sku: "LH-CMS-3391", category: "Home", price: 42, stock: 25, status: "In Stock", date: "17/10/2026" },
    { id: 9, name: "Leather Tote Bag - Noir", sku: "LH-LTB-9981", category: "Accessories", price: 210, stock: 9, status: "In Stock", date: "16/10/2026" },
    { id: 10, name: "Shea Butter Body Balm", sku: "LH-SBB-2214", category: "Beauty", price: 28, stock: 0, status: "Out of Stock", date: "16/10/2026" },
    { id: 11, name: "Wide Leg Linen Pants", sku: "LH-WLP-7743", category: "Apparel", price: 96, stock: 2, status: "Low Stock", date: "15/10/2026" },
    { id: 12, name: "Woven Storage Basket", sku: "LH-WSB-4450", category: "Home", price: 62, stock: 18, status: "In Stock", date: "15/10/2026" },
  ];
});
```

**Breakdown for first timer:**

- `useState(() => { ... })` with function inside = lazy initial state, function runs ONLY ONCE on first load, not every render
- `localStorage.getItem("loom_products")` checks browser storage for key "loom_products", returns string or null
- `if (saved) return JSON.parse(saved);` If saved exists, parse JSON string back to array and USE IT as initial state. So if you added products before and refreshed, it loads saved products.
- `return [ ... default 12 ... ]` If no saved (first time user), use default 12
- localStorage is like browser's own little database that stays even after refresh/close tab

### 7C - Add Auto-Save Effect:

After stats calculations (after InventoryValue etc):

```js
// AUTO SAVE TO LOCAL STORAGE
useEffect(() => {
  localStorage.setItem("loom_products", JSON.stringify(products));
}, [products]);
```

- `useEffect(() => { ... }, [products])` = Run this function EVERY TIME products changes
- `localStorage.setItem("loom_products", JSON.stringify(products))` = Save products array as JSON string to localStorage with key "loom_products"
- `JSON.stringify(products)` converts array to string because localStorage only stores strings
- `[products]` dependency array means effect watches products variable

**Flow:**
1. User adds product -> setProducts called -> products changes -> useEffect runs -> saves to localStorage
2. User refreshes page -> useState lazy function checks localStorage -> finds saved data -> uses saved data -> products include added product -> still there!

**Test:** Add product "Test Product", refresh page (F5), Test Product should still be there.

**Bonus Reset to Clear Storage:**
If you ever want to clear and go back to default 12:
```js
<button onClick={() => { localStorage.removeItem("loom_products"); window.location.reload(); }}>Reset to default</button>
```

---

## STEP 8: LAST STEP - EXPORT + EMPTY STATE

Final polish: Make Export button download CSV and show message when no products found.

### 8A - Add Export Function:

After handleDelete:

```js
// EXPORT CSV
const handleExport = () => {
  const headers = ["Name", "SKU", "Category", "Price", "Stock", "Status", "Date"];
  const rows = filtered.map(p => 
    [p.name, p.sku, p.category, p.price, p.stock, p.status, p.date].map(v => `"${v}"`).join(",")
  );
  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `loom-inventory-${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
};
```

**Line-by-line:**

1. `headers` array of column names
2. `rows = filtered.map(p => ...)` For each filtered product, create CSV row:
   - `[p.name, p.sku, ...]` array of values
   - `.map(v => `"${v}"`)` Wrap each value in quotes: `"Merino Wool Scarf"` - handles commas in names
   - `.join(",")` Join with commas: `"name","sku","category"...`
3. `csv = [headers.join(","), ...rows].join("\n")` Join headers + rows with newline: first line headers, then each product on new line
4. `new Blob([csv], { type: "text/csv" })` Create file-like object from CSV string
5. `URL.createObjectURL(blob)` Create temporary URL for blob
6. `document.createElement("a")` Create invisible link element
7. `a.href = url; a.download = filename; a.click();` Set link to blob URL, set download filename with today's date, programmatically click it -> browser downloads file

**Example filename:** `loom-inventory-2026-10-23.csv`

### 8B - Wire Export Button:

BEFORE:
```jsx
<button className="...">Export</button>
```

AFTER:
```jsx
<button onClick={handleExport} className="...">Export</button>
```

### 8C - Add Empty State:

When search/filter returns no products, show friendly message instead of empty table.

**Desktop Table View:**
Find:
```jsx
<div>
  {filtered.map((p) => (
```
Replace:
```jsx
<div>
  {filtered.length === 0 && (
    <div className="py-16 text-center text-zinc-500 text-[13px]">No products found. Try changing search or filters.</div>
  )}
  {filtered.map((p) => (
```

**Mobile View:**
```jsx
<div className="grid grid-cols-1 gap-3 mt-4 md:hidden">
  {filtered.length === 0 && <div className="py-12 text-center text-zinc-500 text-[13px] bg-white border rounded-2xl">No products found.</div>}
  {filtered.map...
```

**Desktop Card View:**
```jsx
<div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
  {filtered.length === 0 && <div className="col-span-full py-12 text-center text-zinc-500 text-[13px]">No products found.</div>}
  {filtered.map...
```

- `filtered.length === 0 && <div>...</div>` = If filtered empty, show message, else show nothing for this line, then map shows nothing anyway

---

## OTHER EXPORT WAYS (Bonus):

### JSON Export (Backup):
```js
const handleExportJSON = () => {
  const blob = new Blob([JSON.stringify(filtered, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `loom-inventory.json`;
  a.click();
};
```
- Keeps all data perfect, good for re-import later

### Excel Export (Needs library):
```bash
npm install xlsx
```
```js
import * as XLSX from "xlsx";
const handleExportExcel = () => {
  const ws = XLSX.utils.json_to_sheet(filtered);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Inventory");
  XLSX.writeFile(wb, "loom-inventory.xlsx");
};
```
- Opens perfectly in Excel, what clients want

### PDF Export (Needs library):
```bash
npm install jspdf jspdf-autotable
```
```js
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
const handleExportPDF = () => {
  const doc = new jsPDF();
  doc.text("Loom House Inventory", 14, 20);
  autoTable(doc, {
    head: [["Name", "SKU", "Category", "Price", "Stock", "Status"]],
    body: filtered.map(p => [p.name, p.sku, p.category, p.price, p.stock, p.status]),
  });
  doc.save("loom-inventory.pdf");
};
```
- Pretty printable report

**Recommendation:** Use CSV for now (no library), add Excel later for professionalism.

---

## FINAL SUMMARY - ALL CRUD OPERATIONS

- **CREATE:** `setProducts([newProduct, ...products])` - spread operator, new at top
- **READ:** `products.map()` and `filtered.map()` - display list
- **UPDATE STOCK:** `products.map(p => p.id === id ? { ...p, stock: newStock, status: newStatus } : p)` - map + spread
- **UPDATE EDIT:** Same pattern, overwrite with editForm values
- **DELETE:** `products.filter(p => p.id !== id)` - filter out deleted id
- **SEARCH:** `.filter()` + `.includes()` + `.toLowerCase()`
- **CATEGORY/STATUS FILTER:** `.filter(p => filter === "All" || p.category === filter)`
- **SORT:** `.sort((a,b) => a.price - b.price)` for low, `b.price - a.price` for high, `b.id - a.id` for recent
- **CHAIN:** `.filter().filter().filter().sort()` - real-world pattern, same as Gmail, Notion, Shopify
- **STATS:** `.reduce()` for sum, `.filter().length` for counts
- **PERSISTENCE:** `localStorage.getItem` + `setItem` + `useEffect` with `[products]` dependency
- **EXPORT:** Blob + URL.createObjectURL + invisible <a> click

---

## PRACTICE ORDER - REBUILD FROM SCRATCH

Follow this exact order to practice same as chat:

1. Create file `Inventory.jsx`, paste 12 products array with catStyle + statusStyle
2. Build static header UI (logo, title, search div UI, Reset UI, Export UI, Add Product UI)
3. Build stats section UI with hardcoded numbers (4 cards black/white)
4. Build filters UI spans (All Categories ▼ etc)
5. Build table header (PRODUCT CATEGORY PRICE STOCK STATUS ACTIONS) - hidden on mobile
6. Build mobile card view with `products.map()` (md:hidden)
7. Build desktop table view with `products.map()` (hidden md:block)
8. Build desktop card view with `products.map()` (toggle with view state)
9. Add view state `const [view, setView] = useState("Table")` + wire Table/Card buttons
10. STEP 1: Add search state, filtered logic (search only), wire input, change all 3 maps to filtered.map, wire Reset
11. STEP 2: Add catFilter, statusFilter, sortBy states, upgrade filtered to chain filter+sort, replace spans with selects, update Reset and showing count
12. STEP 3: Add InventoryValue, LowStockCount, OutOfStockCount calculations, replace stat cards to use dynamic values + filtered.length
13. STEP 4: Change `const products = [...]` to `const [products, setProducts] = useState([...])`, add updateStock function, wire all +/- buttons
14. STEP 5: Add showAdd + newProduct states, add handleAddProduct, wire Add button, add Add Modal at bottom
15. Fix bugs: products.length not product.length, single { not {{
16. STEP 6: Add showEdit + editingId + editForm states, add openEdit + handleSaveEdit + handleDelete functions, wire all Edit/Delete buttons, add Edit Modal
17. STEP 7: Import useEffect, change products useState to lazy with localStorage.getItem check, add useEffect auto-save with setItem
18. STEP 8: Add handleExport CSV function, wire Export button, add empty state checks `filtered.length === 0 && ...` in all 3 views
19. Test everything: Search "linen" -> 2 items, Filter Beauty -> 2 items, Sort Price Low -> cheapest first, +/- stock -> status changes + stats update, Add product -> appears top + stays after refresh, Edit -> updates, Delete -> removes + confirm, Export -> downloads CSV, No results -> shows message

If you follow this 19-step order, you rebuild exactly same as we did in chat.

Good luck practicing! This is intermediate level, harder than Task Manager (level 1) and Contacts (level 2) - this is level 3 real-world dashboard.

