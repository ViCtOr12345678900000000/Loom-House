import { useState, useEffect } from "react";

export default function Inventory() {
  // ===== VIEW & FILTERS STATE =====
  const [view, setView] = useState("Table"); // Table or Card view for desktop
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Recent");

  // ===== ADD PRODUCT STATE =====
  const [showAdd, setShowAdd] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    category: "Accessories",
    price: "",
    stock: "",
    status: "In Stock",
    date: ""
  });

  // ===== EDIT PRODUCT STATE =====
  const [showEdit, setShowEdit] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    sku: "",
    category: "Accessories",
    price: "",
    stock: "",
  });

  // ===== MAIN PRODUCTS STATE - loads from localStorage =====
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

  // ===== AUTO SAVE TO LOCAL STORAGE =====
  useEffect(() => {
    localStorage.setItem("loom_products", JSON.stringify(products));
  }, [products]);

  // ===== FILTERING & SORTING LOGIC =====
  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase()) || 
    p.category.toLowerCase().includes(search.toLowerCase())
  ).filter(p => catFilter === "All" || p.category === catFilter)
   .filter(p => statusFilter === "All" || p.status === statusFilter)
   .sort((a, b) => {
      if (sortBy === "Price Low") return a.price - b.price;
      if (sortBy === "Price High") return b.price - a.price;
      if (sortBy === "Stock Low") return a.stock - b.stock;
      return b.id - a.id;
   });

  // ===== STATS CALCULATION =====
  const InventoryValue = products.reduce((total, p) => total + (p.price * p.stock), 0);  
  const LowStockCount = products.filter(p => p.status === "Low Stock").length;
  const OutOfStockCount = products.filter(p => p.status === "Out of Stock").length; 

  // ===== UPDATE STOCK WITH + / - BUTTONS =====
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

  // ===== ADD NEW PRODUCT =====
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
      date: new Date().toLocaleDateString('en-GB')
    };
    setProducts([productToAdd, ...products]);
    setNewProduct({ name: "", sku: "", category: "Accessories", price: "", stock: "", status: "In Stock", date: "" });
    setShowAdd(false);
  };

  // ===== EDIT PRODUCT =====
  const openEdit = (p) => {
    setEditingId(p.id);
    setEditForm({ name: p.name, sku: p.sku, category: p.category, price: p.price, stock: p.stock });
    setShowEdit(true);
  };

  const handleSaveEdit = () => {
    const stockNum = parseInt(editForm.stock) || 0;
    let status = "In Stock"; 
    if (stockNum === 0) status = "Out of Stock";
    else if (stockNum <= 5) status = "Low Stock";
    setProducts(prev => prev.map(p =>
      p.id === editingId ? { ...p, name: editForm.name, sku: editForm.sku, category: editForm.category, price: parseFloat(editForm.price), stock: stockNum, status: status } : p
    ));
    setShowEdit(false);
    setEditingId(null);
  };

  // ===== DELETE PRODUCT =====
  const handleDelete = (id) => {
    if (!confirm("Delete this product?")) return;
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // ===== EXPORT JSON - respects filters =====
  const handleExport = () => {
    const data = { exportedAt: new Date().toISOString(), total: filtered.length, value: InventoryValue, products: filtered };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `loom-inventory-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ===== BADGE STYLES =====
  const catStyle = {
    Accessories: "bg-zinc-100 text-zinc-700 border-zinc-200",
    Footwear: "bg-[#EFEEF6] text-[#6B6580] border-[#E2DFEF]",
    Beauty: "bg-[#FDF0F0] text-[#8C6B6B] border-[#F2DCDC]",
    Home: "bg-[#EDF2ED] text-[#5F6F5F] border-[#D9E6D9]",
    Apparel: "bg-[#EFF3F7] text-[#657786] border-[#DDE6EE]",
  };
  const statusStyle = {
    "In Stock": "bg-[#E8F5E9] text-[#1B5E20] border-[#C8E6C9]",
    "Low Stock": "bg-[#FFF8E1] text-[#F57F17] border-[#FFECB3]",
    "Out of Stock": "bg-[#FFEBEE] text-[#B71C1C] border-[#FFCDD2]",
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-6 font-sans text-black">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-zinc-200">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-bold">L</div>
          <div>
            <h1 className="font-bold text-[17px] leading-none">Loom House</h1>
            <p className="text-[10px] tracking-[0.2em] text-zinc-500 font-extralight mt-1">ATELIER INVENTORY</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-zinc-100 rounded-full px-4 py-2.5 text-[13px] w-[180px] md:w-[240px]">
            <input type="text" placeholder="Search products, SKU..." className="bg-transparent outline-none w-full" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <button onClick={() => {setSearch(""); setCatFilter("All"); setStatusFilter("All"); setSortBy("Recent");}} className="px-4 py-2.5 rounded-full border bg-white text-[12px]">Reset</button>
          <button onClick={handleExport} className="px-4 py-2.5 rounded-full border bg-white text-[12px]">Export</button>
          <button onClick={() => setShowAdd(true)} className="px-4 py-2.5 rounded-full bg-black text-white text-[12px]">+ Add Product</button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
        <div className="relative bg-black text-white rounded-[24px] p-5 h-[132px] flex flex-col justify-between overflow-hidden">
          <div className="flex justify-between items-start z-10"><p className="text-[10px] tracking-[0.2em] font-bold text-zinc-400">TOTAL PRODUCTS</p><span className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center text-[11px]">↗</span></div>
          <div className="z-10"><p className="text-[39px] font-extralight leading-none">{products.length}</p><p className="text-[10px] mt-2 text-zinc-400">{filtered.length} SHOWING</p></div>
        </div>
        <div className="bg-white border-[1.5px] border-black rounded-[24px] p-5 h-[132px] flex flex-col justify-between">
          <p className="text-[10px] tracking-[0.2em] font-bold text-zinc-500">INVENTORY VALUE</p>
          <div><p className="text-[25px] font-extralight leading-none">₦{InventoryValue.toLocaleString()}</p><p className="text-[11px] text-zinc-500 mt-2">price × stock</p></div>
        </div>
        <div className="bg-zinc-50 border border-zinc-200 rounded-[24px] p-5 h-[132px] flex flex-col justify-between">
          <div className="flex justify-between"><p className="text-[10px] tracking-[0.2em] font-bold text-zinc-500">LOW STOCK</p><span className="px-2 py-1 rounded-full bg-black text-white text-[9px] font-bold">ALERT</span></div>
          <div><p className="text-[32px] font-extralight leading-none">{LowStockCount}</p><p className="text-[11px] text-zinc-500 mt-1">Needs reorder</p></div>
        </div>
        <div className="bg-white border border-dashed border-black rounded-[24px] p-5 h-[132px] flex flex-col justify-between">
          <p className="text-[10px] tracking-[0.2em] font-bold text-zinc-500">OUT OF STOCK</p>
          <div className="flex justify-between items-end"><p className="text-[32px] font-extralight leading-none">{OutOfStockCount}</p><div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold">{OutOfStockCount}/{products.length}</div></div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col md:flex-row justify-between gap-3 mt-6">
        <div className="flex gap-2">
          <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)} className="px-3 py-1.5 rounded-full border bg-white text-[11px] outline-none"><option value="All">All Categories</option><option>Accessories</option><option>Footwear</option><option>Beauty</option><option>Home</option><option>Apparel</option></select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-1.5 rounded-full border bg-white text-[11px] outline-none"><option value="All">All Status</option><option>In Stock</option><option>Low Stock</option><option>Out of Stock</option></select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-1.5 rounded-full border bg-white text-[11px] outline-none"><option value="Recent">Sort: Recent</option><option value="Price Low">Price Low</option><option value="Price High">Price High</option><option value="Stock Low">Stock Low</option></select>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-[11px] text-zinc-500">Showing {filtered.length} of {products.length}</p>
          <div className="flex bg-zinc-100 rounded-full p-1">
            <button onClick={() => setView("Table")} className={`px-3 py-1 rounded-full text-[11px] font-medium ${view === "Table" ? "bg-black text-white" : "text-zinc-500"}`}>Table</button>
            <button onClick={() => setView("Card")} className={`px-3 py-1 rounded-full text-[11px] font-medium ${view === "Card" ? "bg-black text-white" : "text-zinc-500"}`}>Card</button>
          </div>
        </div>
      </div>

      {/* ===== SINGLE RESPONSIVE LIST - Mobile first, no duplicate ===== */}
      <div className="mt-4">
        {/* Table header - only on desktop when view is Table */}
        {view === "Table" && (
          <div className="hidden md:grid grid-cols-12 gap-2 px-6 py-3 bg-zinc-50 border text-[10px] tracking-widest text-zinc-500 font-bold rounded-t-2xl">
            <div className="col-span-4">PRODUCT</div><div className="col-span-2">CATEGORY</div><div className="col-span-1">PRICE</div><div className="col-span-2">STOCK</div><div className="col-span-1">STATUS</div><div className="col-span-2 text-right">ACTIONS</div>
          </div>
        )}

        {filtered.length === 0 && <div className="py-16 text-center text-zinc-500 text-[13px] border rounded-2xl">No products found.</div>}

        <div className={view === "Table" ? "flex flex-col gap-3 md:gap-0 md:border-x md:border-b rounded-b-2xl overflow-hidden" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
          {filtered.map((p) => (
            <div key={p.id} className={view === "Table" ? "bg-white border md:border-0 md:border-b rounded-2xl md:rounded-none p-4 md:px-6 md:py-4 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-2 items-center" : "bg-white border rounded-2xl p-5 flex flex-col justify-between"}>
              {/* Product info */}
              <div className={view === "Table" ? "md:col-span-4 flex justify-between md:justify-start gap-3 items-center" : "flex justify-between"}>
                <div className="flex gap-3 items-center"><div className="w-10 h-10 rounded-xl bg-zinc-50 border flex items-center justify-center">◍</div><div><p className="text-[13px] font-bold">{p.name}</p><p className="text-[10px] text-zinc-500">{p.sku} • {p.date}</p></div></div>
                <span className={`px-2 py-1 rounded-full text-[10px] border ${statusStyle[p.status]} ${view === "Table" ? "md:hidden" : ""}`}>{p.status}</span>
              </div>
              {/* Category + Price */}
              <div className={view === "Table" ? "md:col-span-2 flex justify-between md:block items-center" : "flex justify-between items-center mt-3"}>
                <span className={`px-2.5 py-1 rounded-full text-[11px] border ${catStyle[p.category]}`}>{p.category}</span>
                <span className="font-bold text-[14px] md:hidden">₦{p.price}</span>
                {view !== "Table" && <span className="font-extralight text-[16px]">₦{p.price}</span>}
              </div>
              {/* Desktop Price */}
              {view === "Table" && <div className="hidden md:block md:col-span-1 font-bold text-[13px]">₦{p.price}</div>}
              {/* Stock controls */}
              <div className={view === "Table" ? "md:col-span-2 flex justify-between md:justify-start items-center gap-2" : "flex justify-between items-center mt-3"}>
                <span className="text-[11px] text-zinc-500 md:hidden">Stock</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateStock(p.id, -1)} className="w-8 h-8 rounded-full border flex items-center justify-center">−</button>
                  <span className="w-6 text-center text-[13px] font-bold">{p.stock}</span>
                  <button onClick={() => updateStock(p.id, 1)} className="w-8 h-8 rounded-full border flex items-center justify-center">+</button>
                </div>
              </div>
              {/* Status desktop only */}
              {view === "Table" && <div className="hidden md:block md:col-span-1"><span className={`px-2.5 py-1 rounded-full text-[10px] border ${statusStyle[p.status]}`}>● {p.status}</span></div>}
              {/* Actions */}
              <div className={view === "Table" ? "md:col-span-2 flex gap-2 justify-end border-t md:border-0 pt-3 md:pt-0" : "flex gap-2 mt-4 pt-4 border-t"}>
                <button onClick={() => openEdit(p)} className="flex-1 md:flex-none px-4 py-2 rounded-full bg-black text-white md:bg-white md:text-black md:border text-[11px]">Edit</button>
                <button onClick={() => handleDelete(p.id)} className="px-4 py-2 rounded-full border text-[11px]">{view === "Table" ? "×" : "Delete"}</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ADD MODAL */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] w-full max-w-[440px] p-6">
            <div className="flex justify-between items-center mb-6"><h2 className="text-[18px] font-bold">Add Product</h2><button onClick={() => setShowAdd(false)} className="w-8 h-8 rounded-full border flex items-center justify-center">×</button></div>
            <div className="flex flex-col gap-3">
              <input value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} placeholder="Product name *" className="w-full px-4 py-3 rounded-full border text-[13px] outline-none" />
              <div className="grid grid-cols-2 gap-3">
                <input value={newProduct.sku} onChange={e => setNewProduct({...newProduct, sku: e.target.value})} placeholder="SKU (auto)" className="w-full px-4 py-3 rounded-full border text-[13px] outline-none" />
                <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="w-full px-4 py-3 rounded-full border text-[13px] outline-none">
                    <option>Accessories</option>
                    <option>Footwear</option>
                    <option>Beauty</option>
                    <option>Home</option>
                    <option>Apparel</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input type="number" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} placeholder="Price *" className="w-full px-4 py-3 rounded-full border text-[13px] outline-none" />
                <input type="number" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} placeholder="Stock" className="w-full px-4 py-3 rounded-full border text-[13px] outline-none" />
              </div>
            </div>
            <div className="flex gap-2 mt-6"><button onClick={() => setShowAdd(false)} className="flex-1 py-3 rounded-full border text-[13px]">Cancel</button><button onClick={handleAddProduct} className="flex-1 py-3 rounded-full bg-black text-white text-[13px]">Add Product</button></div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] w-full max-w-[440px] p-6">
            <div className="flex justify-between items-center mb-6"><h2 className="text-[18px] font-bold">Edit Product</h2><button onClick={() => setShowEdit(false)} className="w-8 h-8 rounded-full border flex items-center justify-center">×</button></div>
            <div className="flex flex-col gap-3">
              <input value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full px-4 py-3 rounded-full border text-[13px] outline-none" />
              <div className="grid grid-cols-2 gap-3">
                <input value={editForm.sku} onChange={e => setEditForm({...editForm, sku: e.target.value})} className="w-full px-4 py-3 rounded-full border text-[13px] outline-none" />
                <select value={editForm.category} onChange={e => setEditForm({...editForm, category: e.target.value})} className="w-full px-4 py-3 rounded-full border text-[13px] outline-none">
                    <option>Accessories</option>
                    <option>Footwear</option>
                    <option>Beauty</option>
                    <option>Home</option>
                    <option>Apparel</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input type="number" value={editForm.price} onChange={e => setEditForm({...editForm, price: e.target.value})} className="w-full px-4 py-3 rounded-full border text-[13px] outline-none" />
                <input type="number" value={editForm.stock} onChange={e => setEditForm({...editForm, stock: e.target.value})} className="w-full px-4 py-3 rounded-full border text-[13px] outline-none" />
              </div>
            </div>
            <div className="flex gap-2 mt-6"><button onClick={() => setShowEdit(false)} className="flex-1 py-3 rounded-full border text-[13px]">Cancel</button><button onClick={handleSaveEdit} className="flex-1 py-3 rounded-full bg-black text-white text-[13px]">Save</button></div>
          </div>
        </div>
      )}
    </div>
  );
}