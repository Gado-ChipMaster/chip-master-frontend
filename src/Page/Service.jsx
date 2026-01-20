import React, { useState, useEffect } from 'react';
import { 
    Search, Plus, List, Info, Database, Activity, 
    Camera, Cpu, FileText, Share2, Calculator, 
    ArrowLeftRight, HelpCircle, DollarSign, ExternalLink,
    Zap, Trash2, Save, Download, MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { chipService } from '../services/api';
import Scanner from '../components/Scanner';
import { Link, useNavigate } from 'react-router-dom';

const Service = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('search');
    const [showScanner, setShowScanner] = useState(false);
    const [gbitValue, setGbitValue] = useState('');
    const isLoggedIn = !!localStorage.getItem('token');

    // Stats for the "Operations" feel
    const [stats] = useState({
        scans: 1240,
        updates: 45,
        uptime: '99.9%'
    });

    useEffect(() => {
        if (!isLoggedIn) navigate('/login');
    }, [isLoggedIn, navigate]);

    const performSearch = async (searchTerm) => {
        if (!searchTerm) return;
        setLoading(true);
        try {
            const response = await chipService.search(searchTerm);
            setResults(response.data.results || response.data || []);
        } catch (error) {
            console.error('Search error:', error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleExternalSearch = (suffix, forceImage = false) => {
        if (!query) return alert('Please enter a chip code first!');
        const baseUrl = forceImage ? 'https://www.google.com/search?tbm=isch&q=' : 'https://www.google.com/search?q=';
        window.open(`${baseUrl}${encodeURIComponent(query + ' ' + suffix)}`, '_blank');
    };

    const openWhatsApp = (msg) => {
        const phone = "201080453999";
        const text = encodeURIComponent(query ? `${msg}: ${query}` : "Hello, I need support.");
        window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
    };

    if (!isLoggedIn) return null;

    const tabs = [
        { id: 'search', label: 'Security & Search', icon: Search, color: 'emerald' },
        { id: 'technical', label: 'Technical Tools', icon: Cpu, color: 'blue' },
        { id: 'commerce', label: 'Price Desk', icon: DollarSign, color: 'amber' },
        { id: 'utils', label: 'Lab Utilities', icon: Calculator, color: 'purple' }
    ];

    return (
        <div className="min-h-screen pt-24 px-4 pb-12 bg-[#0a0a0a] text-white selection:bg-emerald-500/30">
            <div className="max-w-6xl mx-auto">
                
                {/* --- HEADER DASHBOARD --- */}
                <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6"
                >
                    <div className="text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-4">
                            <Zap size={14} className="animate-pulse" /> CORE SYSTEM V9.4 ACTIVE
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tight">
                            Operations Center
                        </h1>
                        <p className="text-gray-500 font-medium">Enhanced Web Interface for Chip Master Suite</p>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <StatCard label="Global Scans" value={stats.scans} color="emerald" />
                        <StatCard label="Live Updates" value={stats.updates} color="blue" />
                        <StatCard label="System Health" value={stats.uptime} color="purple" />
                    </div>
                </motion.div>

                {/* --- MASTER SEARCH BAR (Persistent) --- */}
                <div className="sticky top-24 z-30 bg-[#0a0a0a]/80 backdrop-blur-xl py-4 mb-8 border-b border-white/5">
                    <div className="relative group max-w-3xl mx-auto">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value.toUpperCase())}
                            onKeyDown={(e) => e.key === 'Enter' && (activeTab === 'search' ? performSearch(query) : null)}
                            placeholder="Enter Master Chip Code..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-44 text-lg text-white font-mono placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all shadow-2xl"
                        />
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-emerald-400 transition-colors" size={24} />
                        
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                             <button 
                                onClick={() => setShowScanner(true)}
                                className="p-2.5 bg-emerald-500 text-black rounded-xl hover:bg-emerald-400 transition-all hover:scale-105 shadow-lg shadow-emerald-500/20"
                                title="Visual OCR Scanner"
                            >
                                <Camera size={20} />
                            </button>
                            <button 
                                onClick={() => performSearch(query)}
                                className="px-6 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-xl transition-all font-bold uppercase text-xs tracking-widest"
                            >
                                Execute
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- NAVIGATION TABS --- */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all duration-300 font-bold ${
                                activeTab === tab.id 
                                ? `bg-${tab.color}-500/20 border-${tab.color}-500/40 text-${tab.color}-400 shadow-lg shadow-${tab.color}-500/10 scale-105` 
                                : 'bg-white/5 border-white/10 text-gray-500 hover:text-white hover:bg-white/10'
                            }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* --- CONTENT AREA --- */}
                <div className="relative min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {/* 1. SEARCH & INVENTORY */}
                        {activeTab === 'search' && (
                            <motion.div 
                                key="search"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                {loading && (
                                    <div className="flex flex-col items-center justify-center py-20">
                                        <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mb-4" />
                                        <p className="text-emerald-400 font-mono tracking-tighter">PENETRATING DATABASE...</p>
                                    </div>
                                )}

                                {Array.isArray(results) && results.length > 0 ? (
                                    results.map((chip, idx) => (
                                        <div key={idx} className="group relative overflow-hidden bg-white/5 border border-white/5 hover:border-emerald-500/30 rounded-3xl p-8 transition-all duration-500">
                                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                                <Cpu size={120} className="text-emerald-500" />
                                            </div>
                                            <div className="relative flex flex-col md:flex-row gap-8 items-center">
                                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-xl shadow-emerald-500/20">
                                                    <Cpu size={40} className="text-black" />
                                                </div>
                                                <div className="flex-1 text-center md:text-left">
                                                    <div className="flex flex-wrap justify-center md:justify-between items-center gap-4 mb-4">
                                                        <h3 className="text-3xl font-black font-mono tracking-tighter">{chip.code}</h3>
                                                        <div className="flex gap-2">
                                                            <span className="px-4 py-1.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-black rounded-lg border border-emerald-500/20 uppercase tracking-widest">IDENTIFIED</span>
                                                            <span className="px-4 py-1.5 bg-white/10 text-white text-[10px] font-black rounded-lg border border-white/10 uppercase tracking-widest">{chip.source}</span>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                                                        <DetailBox label="Logic size" value={chip.size} />
                                                        <DetailBox label="Manufacturer" value={chip.brand} />
                                                        <DetailBox label="Diagnostic Info" value={chip.description || "Generic Component"} />
                                                        <div className="flex items-end justify-center md:justify-end gap-3">
                                                            <button className="p-3 bg-white/5 hover:bg-emerald-500/20 text-gray-400 hover:text-emerald-400 rounded-xl border border-white/10 hover:border-emerald-500/30 transition-all"><Share2 size={18} /></button>
                                                            <button className="p-3 bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-xl border border-white/10 hover:border-red-500/30 transition-all"><Trash2 size={18} /></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : !loading && query && (
                                    <div className="text-center py-24 bg-white/5 rounded-3xl border border-white/10 border-dashed border-2">
                                        <Database className="mx-auto text-gray-700 mb-6" size={64} />
                                        <h3 className="text-2xl font-bold text-gray-400 mb-2">Zero Matches in Core</h3>
                                        <p className="text-gray-500 mb-8">This component is not yet indexed in our neural network.</p>
                                        <Link to="/contact" className="px-8 py-3 bg-emerald-500 text-black font-black rounded-xl hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20">
                                            Contribute Data
                                        </Link>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* 2. TECHNICAL TOOLS */}
                        {activeTab === 'technical' && (
                            <motion.div 
                                key="tech"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                <TechCard 
                                    title="Datasheet Search" 
                                    desc="Full technical specifications and limit values."
                                    icon={FileText} 
                                    color="blue"
                                    onClick={() => handleExternalSearch('Datasheet')}
                                />
                                <TechCard 
                                    title="ISP & Pinouts" 
                                    desc="Visual schematics for direct memory access."
                                    icon={Zap} 
                                    color="orange"
                                    onClick={() => handleExternalSearch('eMMC Pinout ISP Pin Diagram', true)}
                                />
                                <TechCard 
                                    title="Firmware/Dump" 
                                    desc="Search for bootloader and OS memory images."
                                    icon={Download} 
                                    color="emerald"
                                    onClick={() => handleExternalSearch('eMMC Dump Firmware File Binary')}
                                />
                                <TechCard 
                                    title="Search eBay" 
                                    desc="Locate global supply and donor boards."
                                    icon={DollarSign} 
                                    color="pink"
                                    onClick={() => window.open(`https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(query)}`, '_blank')}
                                />
                                <TechCard 
                                    title="Schematics Pro" 
                                    desc="Advanced circuit mapping for repair."
                                    icon={Activity} 
                                    color="purple"
                                    onClick={() => handleExternalSearch('Repair Schematic BoardView')}
                                />
                                <TechCard 
                                    title="Part Compatibility" 
                                    desc="Internal lookup for physical substitutes."
                                    icon={ArrowLeftRight} 
                                    color="cyan"
                                    onClick={() => setActiveTab('utils')}
                                />
                            </motion.div>
                        )}

                        {/* 3. COMMERCE / PRICE DESK */}
                        {activeTab === 'commerce' && (
                            <motion.div 
                                key="price"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="grid lg:grid-cols-2 gap-8 items-center"
                            >
                                <div className="space-y-6">
                                    <h2 className="text-4xl font-black text-amber-400">Trading Desk</h2>
                                    <p className="text-gray-400 leading-relaxed text-lg">
                                        Market rates fluctuate daily based on global stock levels. 
                                        Connect with our logistics team for the most accurate quote 
                                        for <span className="text-white font-mono font-bold">{query || 'Target Part'}.</span>
                                    </p>
                                    <div className="flex gap-4">
                                        <button 
                                            onClick={() => openWhatsApp('Requesting Daily Price')}
                                            className="px-8 py-4 bg-amber-500 text-black font-black rounded-2xl hover:bg-amber-400 transition-all shadow-2xl shadow-amber-500/20 flex items-center gap-2"
                                        >
                                            <MessageSquare size={20} /> GET QUOTE
                                        </button>
                                        <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all font-bold">
                                            PRICE CHART
                                        </button>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20 rounded-3xl p-8 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-10"><DollarSign size={80} /></div>
                                    <h4 className="text-xs font-black uppercase tracking-widest text-amber-500/60 mb-8 font-mono">Real-time Inquiry</h4>
                                    <div className="bg-black/40 rounded-2xl p-6 border border-white/5 mb-6">
                                        <p className="text-sm text-gray-500 mb-2">Selected Component</p>
                                        <p className="text-2xl font-mono font-black">{query || "---"}</p>
                                    </div>
                                    <div className="flex justify-between items-center text-sm text-amber-400/80 font-mono">
                                        <span>Status: Market Live</span>
                                        <span>Latency: 12ms</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* 4. UTILS / CALCULATORS */}
                        {activeTab === 'utils' && (
                            <motion.div 
                                key="utils"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="grid md:grid-cols-2 gap-8"
                            >
                                {/* CONVERTER */}
                                <div className="bg-white/5 border border-white/10 rounded-3xl p-10 flex flex-col items-center justify-center text-center">
                                    <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
                                        <Calculator size={32} />
                                    </div>
                                    <h3 className="text-2xl font-black mb-2">Bits to Bytes</h3>
                                    <p className="text-gray-500 mb-8">Standard eMMC/UFS storage capacity calculator</p>
                                    
                                    <div className="w-full relative mb-8">
                                        <input 
                                            type="number" 
                                            value={gbitValue}
                                            onChange={(e) => setGbitValue(e.target.value)}
                                            placeholder="Enter Gbit (e.g. 64)"
                                            className="w-full bg-black/50 border border-white/10 py-5 px-6 rounded-2xl text-center text-2xl font-mono text-purple-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all"
                                        />
                                        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-600 font-black">GBit</span>
                                    </div>

                                    <div className="flex flex-col items-center">
                                        <p className="text-xs text-gray-600 uppercase tracking-[0.3em] mb-2">Output Result</p>
                                        <motion.div 
                                            animate={{ scale: gbitValue ? 1.1 : 1 }}
                                            className="text-6xl font-black text-white"
                                        >
                                            {gbitValue ? (parseFloat(gbitValue) / 8) : 0} <span className="text-lg text-purple-600">GB</span>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* COMPATIBILITY (STATIC MOCK) */}
                                <div className="bg-white/5 border border-white/10 rounded-3xl p-10 font-mono">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20"><ArrowLeftRight size={24} /></div>
                                        <div>
                                            <h3 className="text-xl font-black tracking-tighter">Cross-Reference</h3>
                                            <p className="text-xs text-gray-500">P2P SUB LISTING</p>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        {query && Object.prototype.hasOwnProperty.call(CompatibilityData, query) ? (
                                            CompatibilityData[query].map((alt, i) => (
                                                <div key={i} className="flex items-center justify-between p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-xl">
                                                    <span className="text-white font-bold">{alt}</span>
                                                    <span className="text-[10px] text-cyan-400/60 font-black bg-cyan-500/10 px-2 py-1 rounded">MATCH</span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-10 opacity-30">
                                                <p className="text-sm">No cross-ref data for </p>
                                                <p className="text-sm font-bold">{query || "NULL_ST"}</p>
                                            </div>
                                        )}
                                        <p className="pt-4 text-[10px] text-gray-600 uppercase text-center tracking-widest underline decoration-cyan-500/20">Expand Universal List</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* --- SCANNER MODAL --- */}
                <AnimatePresence>
                    {showScanner && (
                        <Scanner 
                            onScanResult={(code) => {
                                setQuery(code);
                                setShowScanner(false);
                                if (activeTab === 'search') performSearch(code);
                            }} 
                            onClose={() => setShowScanner(false)} 
                        />
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
};

// --- HELPER COMPONENTS ---

const StatCard = ({ label, value, color }) => (
    <div className={`p-4 bg-white/5 border border-white/5 rounded-2xl text-center group hover:bg-${color}-500/5 hover:border-${color}-500/20 transition-all`}>
        <div className={`text-xl font-black text-gray-300 group-hover:text-${color}-400 transition-colors font-mono`}>{value}</div>
        <div className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{label}</div>
    </div>
);

const DetailBox = ({ label, value }) => (
    <div className="bg-white/5 rounded-2xl p-4 border border-white/5 hover:bg-white/10 transition-colors">
        <span className="text-[10px] text-gray-600 font-black uppercase tracking-wider block mb-2">{label}</span>
        <span className="text-sm font-mono text-gray-300 break-words">{value || 'N/A'}</span>
    </div>
);

const TechCard = ({ title, desc, icon: Icon, color, onClick }) => (
    <button 
        onClick={onClick}
        className={`flex flex-col items-start p-8 bg-white/5 border border-white/5 hover:border-${color}-500/30 rounded-[2.5rem] text-left transition-all group relative overflow-hidden h-full`}
    >
        <div className={`absolute -right-4 -bottom-4 opacity-5 group-hover:scale-125 transition-transform duration-700`}>
            <Icon size={120} />
        </div>
        <div className={`w-14 h-14 rounded-2xl bg-${color}-500/10 border border-${color}-500/20 flex items-center justify-center text-${color}-400 mb-6 group-hover:scale-110 transition-transform`}>
            <Icon size={24} />
        </div>
        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-emerald-400 transition-colors">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">{desc}</p>
        <div className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-gray-600 group-hover:text-white transition-colors">
            Launch Engine <ExternalLink size={14} />
        </div>
    </button>
);

const CompatibilityData = {
    "KMQ31": ["KMF31", "KLMAG", "H9TQI7"],
    "KLMBG2": ["KMQ21", "KMR31", "SDADL"],
    "KMN5W": ["J9GHP", "H9TP32"]
};

export default Service;
