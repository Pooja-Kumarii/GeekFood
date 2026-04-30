import { useState, useEffect, useRef } from "react";

const menuItems = [
  { id: 1, name: "Quantum Burger", tag: "Bestseller", price: "$12.99", emoji: "🍔", desc: "Double smash patty, secret sauce, crispy onions, aged cheddar on a brioche bun.", category: "Burgers" },
  { id: 2, name: "Pixel Pizza", tag: "New", price: "$14.99", emoji: "🍕", desc: "Hand-stretched dough, san marzano sauce, fresh mozzarella, fresh basil leaves.", category: "Pizza" },
  { id: 3, name: "Binary Ramen", tag: "Hot", price: "$11.99", emoji: "🍜", desc: "Tonkotsu broth simmered 18hrs, chashu pork belly, soft-boiled egg, nori.", category: "Ramen" },
  { id: 4, name: "Neon Tacos", tag: "Spicy", price: "$9.99", emoji: "🌮", desc: "Al pastor with pineapple salsa, pickled onions, cilantro on corn tortillas.", category: "Tacos" },
  { id: 5, name: "404 Fries", tag: "Crispy", price: "$5.99", emoji: "🍟", desc: "Triple-cooked fries with truffle parmesan, smoked paprika dipping sauce.", category: "Sides" },
  { id: 6, name: "Debug Sushi Roll", tag: "Fresh", price: "$16.99", emoji: "🍣", desc: "Spicy tuna, avocado, cucumber roll topped with sesame and sriracha drizzle.", category: "Sushi" },
  { id: 7, name: "Loop Curry", tag: "Vegan", price: "$13.49", emoji: "🍛", desc: "Creamy coconut red curry with seasonal veggies, jasmine rice, fresh naan.", category: "Curry" },
  { id: 8, name: "Cache Wings", tag: "Popular", price: "$10.99", emoji: "🍗", desc: "Twice-fried wings in honey gochujang glaze, sesame seeds, scallion garnish.", category: "Wings" },
];

const features = [
  { icon: "⚡", title: "Lightning Fast Delivery", desc: "30 minutes or your next order is free. We mean it." },
  { icon: "👨‍🍳", title: "Master Chefs", desc: "Every dish crafted by culinary experts with years of experience." },
  { icon: "🌱", title: "Fresh Ingredients", desc: "Farm-to-table sourcing. No preservatives. Ever." },
  { icon: "📱", title: "Easy Ordering", desc: "Order in seconds from any device, any time of day." },
];

const tagColors = {
  Bestseller: "#f0472a",
  New: "#0ea5e9",
  Hot: "#f97316",
  Spicy: "#ef4444",
  Crispy: "#eab308",
  Fresh: "#22c55e",
  Vegan: "#16a34a",
  Popular: "#8b5cf6",
};

const quotes = [
  {
    quote: "One cannot think well, love well, sleep well, if one has not dined well.",
    author: "Virginia Woolf"
  },
  {
    quote: "Food is symbolic of love when words are inadequate.",
    author: "Alan D. Wolfelt"
  },
  {
    quote: "The only way to get through life is to laugh your way through it. You either have to laugh or cry. I prefer to laugh. Crying gives me a headache.",
    author: "Marjorie Pay Hinckley"
  },
  {
    quote: "Cooking is like love. It should be entered into with abandon or not at all.",
    author: "Harriet Van Horne"
  },
  {
    quote: "Food brings people together on many different levels. It's nourishment of the soul and body; it's truly love.",
    author: "Giada De Laurentiis"
  },
  {
    quote: "The discovery of a new dish does more for the happiness of mankind than the discovery of a new star.",
    author: "Anthelme Brillat-Savarin"
  },
  {
    quote: "Good food is the foundation of genuine happiness.",
    author: "Auguste Escoffier"
  },
  {
    quote: "Cooking is at once child's play and adult joy. And cooking done with care is an act of love.",
    author: "Craig Claiborne"
  }
];

function QuoteCard({ quote, author }) {
  return (
    <div className="card" style={{
      background: "#111",
      border: "1px solid #1e1e1e",
      borderRadius: 20,
      padding: "32px 28px",
      position: "relative",
      overflow: "hidden"
    }}>
      <div style={{
        position: "absolute",
        top: 20,
        left: 20,
        fontSize: 60,
        opacity: 0.1,
        color: "#f0472a"
      }}>"</div>
      <blockquote style={{
        fontSize: 16,
        lineHeight: 1.7,
        color: "#f0ede8",
        fontStyle: "italic",
        marginBottom: 20,
        position: "relative",
        zIndex: 1
      }}>
        {quote}
      </blockquote>
      <cite style={{
        fontSize: 14,
        fontWeight: 700,
        color: "#f0472a",
        fontFamily: "'Space Mono', monospace",
        display: "block",
        textAlign: "right"
      }}>
        — {author}
      </cite>
    </div>
  );
}

export default function GeekFoods() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [addedId, setAddedId] = useState(null);
  const heroRef = useRef(null);

  const categories = ["All", ...new Set(menuItems.map((i) => i.category))];
  const filtered = activeCategory === "All" ? menuItems : menuItems.filter((i) => i.category === activeCategory);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + parseFloat(i.price.replace("$", "")) * i.qty, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...item, qty: 1 }];
    });
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 800);
  };

  const removeFromCart = (id) =>
    setCart((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item.qty === 1) return prev.filter((i) => i.id !== id);
      return prev.map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i));
    });

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div style={{ fontFamily: "'Syne', sans-serif", background: "#0a0a0a", color: "#f0ede8", minHeight: "100vh", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: #f0472a; color: #fff; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #f0472a; border-radius: 2px; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.08); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes pop { 0% { transform: scale(1); } 50% { transform: scale(1.25); } 100% { transform: scale(1); } }

        .hero-title { animation: fadeUp 0.9s cubic-bezier(.16,1,.3,1) both; }
        .hero-sub { animation: fadeUp 0.9s 0.18s cubic-bezier(.16,1,.3,1) both; }
        .hero-cta { animation: fadeUp 0.9s 0.3s cubic-bezier(.16,1,.3,1) both; }
        .hero-badge { animation: fadeUp 0.9s 0.45s cubic-bezier(.16,1,.3,1) both; }

        .card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(240,71,42,0.15); }

        .btn-primary { background: #f0472a; color: #fff; border: none; padding: 14px 32px; border-radius: 50px; font-family: inherit; font-size: 15px; font-weight: 700; cursor: pointer; letter-spacing: 0.02em; transition: background 0.2s, transform 0.15s; }
        .btn-primary:hover { background: #d13621; transform: scale(1.03); }
        .btn-primary:active { transform: scale(0.97); }

        .btn-outline { background: transparent; color: #f0ede8; border: 1.5px solid #f0ede8; padding: 14px 32px; border-radius: 50px; font-family: inherit; font-size: 15px; font-weight: 600; cursor: pointer; transition: background 0.2s, color 0.2s; }
        .btn-outline:hover { background: #f0ede8; color: #0a0a0a; }

        .nav-link { background: none; border: none; font-family: inherit; font-size: 14px; font-weight: 600; color: #a09a90; cursor: pointer; letter-spacing: 0.04em; text-transform: uppercase; transition: color 0.2s; padding: 4px 0; }
        .nav-link:hover { color: #f0ede8; }

        .category-btn { background: transparent; border: 1px solid #2a2a2a; color: #a09a90; padding: 8px 20px; border-radius: 50px; font-family: inherit; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .category-btn:hover { border-color: #f0472a; color: #f0472a; }
        .category-btn.active { background: #f0472a; border-color: #f0472a; color: #fff; }

        .add-btn { background: #f0472a; color: #fff; border: none; width: 36px; height: 36px; border-radius: 50%; font-size: 20px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s, transform 0.15s; flex-shrink: 0; }
        .add-btn:hover { background: #d13621; }
        .add-btn.popped { animation: pop 0.4s ease; }

        .marquee-track { display: flex; width: max-content; animation: marquee 20s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: "0 5%",
        background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #1e1e1e" : "none",
        transition: "all 0.35s ease",
        height: 72, display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, background: "#f0472a", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🍔</div>
          <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em" }}>Geek<span style={{ color: "#f0472a" }}>Foods</span></span>
        </div>

        <div style={{ display: "flex", gap: 36, alignItems: "center" }} className="desktop-nav">
          {["home", "menu", "quotes", "features", "footer"].map((s) => (
            <button key={s} className="nav-link" onClick={() => scrollTo(s)}>{s === "footer" ? "contact" : s}</button>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button
            onClick={() => setCartOpen(true)}
            style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 50, padding: "8px 18px", color: "#f0ede8", fontFamily: "inherit", fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "background 0.2s" }}
          >
            🛒 {cartCount > 0 && <span style={{ background: "#f0472a", color: "#fff", borderRadius: 50, width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800 }}>{cartCount}</span>}
          </button>
          <button className="btn-primary" style={{ padding: "10px 22px", fontSize: 13 }} onClick={() => scrollTo("menu")}>Order Now</button>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "120px 5% 80px" }}>
        {/* BG grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(240,71,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(240,71,42,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
        {/* Glow */}
        <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 700, height: 700, background: "radial-gradient(circle, rgba(240,71,42,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ textAlign: "center", maxWidth: 820, zIndex: 1 }}>
          <div className="hero-badge" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(240,71,42,0.1)", border: "1px solid rgba(240,71,42,0.3)", borderRadius: 50, padding: "6px 18px", fontSize: 13, fontWeight: 600, color: "#f0472a", marginBottom: 32 }}>
            <span style={{ width: 8, height: 8, background: "#f0472a", borderRadius: "50%", animation: "pulse 2s infinite" }} />
            Now Delivering in Your City
          </div>

          <h1 className="hero-title" style={{ fontSize: "clamp(52px, 9vw, 96px)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.04em", marginBottom: 28 }}>
            Food for the<br />
            <span style={{ color: "#f0472a", fontStyle: "italic" }}>Curious Mind.</span>
          </h1>

          <p className="hero-sub" style={{ fontSize: "clamp(16px, 2vw, 19px)", color: "#a09a90", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 44px", fontFamily: "'Space Mono', monospace", fontWeight: 400 }}>
            Where silicon valley meets street food. Geeky menu, real flavors, delivered faster than your CI/CD pipeline.
          </p>

          <div className="hero-cta" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-primary" style={{ fontSize: 16, padding: "16px 40px" }} onClick={() => scrollTo("menu")}>Explore Menu →</button>
            <button className="btn-outline" style={{ fontSize: 16, padding: "16px 40px" }} onClick={() => scrollTo("features")}>How it works</button>
          </div>

          <div style={{ marginTop: 64, display: "flex", gap: 40, justifyContent: "center", flexWrap: "wrap" }}>
            {[["10K+", "Happy Customers"], ["4.9★", "Average Rating"], ["30min", "Avg Delivery"], ["50+", "Menu Items"]].map(([val, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em" }}>{val}</div>
                <div style={{ fontSize: 12, color: "#a09a90", fontFamily: "'Space Mono', monospace", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a", overflow: "hidden", padding: "14px 0", background: "#f0472a" }}>
        <div className="marquee-track">
          {[...Array(2)].map((_, idx) => (
            <span key={idx} style={{ display: "flex", alignItems: "center", gap: 0 }}>
              {["🍔 Quantum Burger", "🍕 Pixel Pizza", "🍜 Binary Ramen", "🌮 Neon Tacos", "🍟 404 Fries", "🍣 Debug Sushi", "🍛 Loop Curry", "🍗 Cache Wings"].map((item) => (
                <span key={item} style={{ whiteSpace: "nowrap", fontSize: 14, fontWeight: 700, color: "#fff", padding: "0 28px", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  {item} <span style={{ opacity: 0.5, marginLeft: 28 }}>·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section id="features" style={{ padding: "100px 5%" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 64 }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#f0472a", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>// why geekfoods</div>
            <h2 style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, maxWidth: 500 }}>Built different.<br />Served fresh.</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {features.map((f, i) => (
              <div key={i} className="card" style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 20, padding: "32px 28px" }}>
                <div style={{ fontSize: 40, marginBottom: 20 }}>{f.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, letterSpacing: "-0.02em" }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: "#706a60", lineHeight: 1.7, fontFamily: "'Space Mono', monospace" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTES */}
      <section id="quotes" style={{ padding: "100px 5%", background: "#0a0a0a" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 64, textAlign: "center" }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#f0472a", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>// food wisdom</div>
            <h2 style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 }}>Inspiring quotes from<br />culinary legends.</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32 }}>
            {quotes.map((quote, i) => (
              <QuoteCard key={i} quote={quote.quote} author={quote.author} />
            ))}
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" style={{ padding: "100px 5%", background: "#050505" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 48 }}>
            <div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#f0472a", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>// our menu</div>
              <h2 style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 }}>The full stack<br />food lineup.</h2>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {categories.map((cat) => (
                <button key={cat} className={`category-btn ${activeCategory === cat ? "active" : ""}`} onClick={() => setActiveCategory(cat)}>{cat}</button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
            {filtered.map((item) => (
              <div key={item.id} className="card" style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 20, overflow: "hidden" }}>
                <div style={{ background: "#181818", fontSize: 56, display: "flex", alignItems: "center", justifyContent: "center", height: 120, borderBottom: "1px solid #1e1e1e" }}>
                  {item.emoji}
                </div>
                <div style={{ padding: "20px 20px 20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <h3 style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.2, flex: 1 }}>{item.name}</h3>
                    <span style={{ background: tagColors[item.tag] || "#333", color: "#fff", fontSize: 10, fontWeight: 800, padding: "3px 10px", borderRadius: 50, letterSpacing: "0.05em", textTransform: "uppercase", flexShrink: 0, marginLeft: 8 }}>{item.tag}</span>
                  </div>
                  <p style={{ fontSize: 13, color: "#706a60", lineHeight: 1.6, fontFamily: "'Space Mono', monospace", marginBottom: 18 }}>{item.desc}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em" }}>{item.price}</span>
                    <button
                      className={`add-btn ${addedId === item.id ? "popped" : ""}`}
                      onClick={() => addToCart(item)}
                      title="Add to cart"
                    >+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="footer" style={{ borderTop: "1px solid #1a1a1a", padding: "80px 5% 40px", background: "#0a0a0a" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 48, marginBottom: 60 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ width: 34, height: 34, background: "#f0472a", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🍔</div>
                <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em" }}>Geek<span style={{ color: "#f0472a" }}>Foods</span></span>
              </div>
              <p style={{ fontSize: 13, color: "#706a60", lineHeight: 1.8, fontFamily: "'Space Mono', monospace", maxWidth: 220 }}>
                Food crafted for curious minds. Delivered fast. Eaten happy.
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                {["𝕏", "ig", "fb"].map((s) => (
                  <div key={s} style={{ width: 36, height: 36, background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, cursor: "pointer", fontWeight: 700, transition: "border-color 0.2s" }}>
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {[
              { title: "Menu", links: ["Burgers", "Pizza", "Ramen", "Tacos", "Sides"] },
              { title: "Company", links: ["About Us", "Careers", "Press", "Blog"] },
              { title: "Support", links: ["Track Order", "FAQ", "Contact", "Refunds"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#a09a90", marginBottom: 20 }}>{col.title}</h4>
                <ul style={{ listStyle: "none" }}>
                  {col.links.map((l) => (
                    <li key={l} style={{ marginBottom: 12 }}>
                      <a href="#" style={{ fontSize: 14, color: "#706a60", textDecoration: "none", fontFamily: "'Space Mono', monospace", transition: "color 0.2s" }}
                        onMouseEnter={(e) => (e.target.style.color = "#f0ede8")}
                        onMouseLeave={(e) => (e.target.style.color = "#706a60")}
                      >{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h4 style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#a09a90", marginBottom: 20 }}>Newsletter</h4>
              <p style={{ fontSize: 13, color: "#706a60", fontFamily: "'Space Mono', monospace", lineHeight: 1.7, marginBottom: 16 }}>Get weekly drops of new menu items.</p>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  style={{ flex: 1, background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 10, padding: "10px 14px", color: "#f0ede8", fontFamily: "inherit", fontSize: 13, outline: "none", minWidth: 0 }}
                />
                <button className="btn-primary" style={{ padding: "10px 16px", borderRadius: 10, fontSize: 13 }}>→</button>
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <p style={{ fontSize: 12, color: "#504a40", fontFamily: "'Space Mono', monospace" }}>© 2025 GeekFoods. All rights reserved.</p>
            <p style={{ fontSize: 12, color: "#504a40", fontFamily: "'Space Mono', monospace" }}>Made with 🍔 + ReactJS</p>
          </div>
        </div>
      </footer>

      {/* CART DRAWER */}
      {cartOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 2000, display: "flex" }}>
          <div onClick={() => setCartOpen(false)} style={{ flex: 1, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }} />
          <div style={{ width: 400, maxWidth: "90vw", background: "#111", borderLeft: "1px solid #1e1e1e", display: "flex", flexDirection: "column", animation: "fadeUp 0.3s ease" }}>
            <div style={{ padding: "24px 24px 20px", borderBottom: "1px solid #1e1e1e", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em" }}>Cart ({cartCount})</h2>
              <button onClick={() => setCartOpen(false)} style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#f0ede8", fontSize: 18, fontFamily: "inherit" }}>×</button>
            </div>

            <div style={{ flex: 1, overflow: "auto", padding: "16px 24px" }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 20px", color: "#504a40" }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>🛒</div>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 13 }}>Your cart is empty.<br />Add some food!</p>
                </div>
              ) : cart.map((item) => (
                <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: "1px solid #1a1a1a" }}>
                  <div style={{ fontSize: 30, width: 48, height: 48, background: "#1a1a1a", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{item.emoji}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</div>
                    <div style={{ fontSize: 13, color: "#f0472a", fontWeight: 700 }}>{item.price}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button onClick={() => removeFromCart(item.id)} style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 6, width: 28, height: 28, cursor: "pointer", color: "#f0ede8", fontSize: 16, fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                    <span style={{ fontSize: 14, fontWeight: 700, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                    <button onClick={() => addToCart(item)} style={{ background: "#f0472a", border: "none", borderRadius: 6, width: 28, height: 28, cursor: "pointer", color: "#fff", fontSize: 16, fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                  </div>
                </div>
              ))}
            </div>

            {cart.length > 0 && (
              <div style={{ padding: "20px 24px", borderTop: "1px solid #1e1e1e" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: "#a09a90" }}>Total</span>
                  <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em" }}>${cartTotal.toFixed(2)}</span>
                </div>
                <button className="btn-primary" style={{ width: "100%", padding: "16px", fontSize: 15, borderRadius: 14 }}>
                  Checkout →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}