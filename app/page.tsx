"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BarChart3, BookOpen, Check, ChevronDown, CircleDollarSign, Globe2, Languages, LoaderCircle, Search, ShieldCheck, Sparkles, X } from "lucide-react";
import courses from "../data/courses.json";

type Course = (typeof courses)[number];
type Language = "Spanish" | "Portuguese" | "French";
type Analysis = { score: number; verdict: string; monthlyGross: number; operatorRevenue: number; creatorRevenue: number; monthsToPayback: number | null };
const languages: Language[] = ["Spanish", "Portuguese", "French"];
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

function opportunityScore(course: Course, language: Language) {
  const reviewSignal = Math.min(course.reviews / 50, 100);
  const ratingSignal = Math.max(0, (course.rating - 4) * 100);
  return Math.round(course.targets[language] * 0.75 + reviewSignal * 0.15 + ratingSignal * 0.1);
}

function Flag({ language }: { language: Language }) {
  return <span className={`flag ${language.toLowerCase()}`} aria-hidden="true">{language === "Spanish" ? "ES" : language === "Portuguese" ? "BR" : "FR"}</span>;
}

export default function Home() {
  const [ready, setReady] = useState(false);
  const [language, setLanguage] = useState<Language>("Portuguese");
  const [query, setQuery] = useState("");
  const [shortlist, setShortlist] = useState<string[]>([]);
  const [selected, setSelected] = useState<Course | null>(null);
  const [price, setPrice] = useState(89);
  const [sales, setSales] = useState(100);
  const [share, setShare] = useState(60);
  const [cost, setCost] = useState(12000);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const [view, setView] = useState<"market" | "shortlist">("market");

  useEffect(() => {
    setReady(true);
    try {
      const stored: unknown = JSON.parse(localStorage.getItem("courserelay-shortlist") || "[]");
      if (Array.isArray(stored)) setShortlist(stored.filter((id): id is string => typeof id === "string" && courses.some(course => course.id === id)));
    } catch { setNotice("Browser storage is unavailable. Your shortlist will last for this visit only."); }
  }, []);

  const ranked = useMemo(() => courses
    .filter(course => `${course.title} ${course.category}`.toLowerCase().includes(query.toLowerCase()))
    .filter(course => view === "market" || shortlist.includes(course.id))
    .map(course => ({ course, score: opportunityScore(course, language), served: course.languages.includes(language) }))
    .sort((a, b) => Number(a.served) - Number(b.served) || b.score - a.score), [language, query, shortlist, view]);

  function toggleShortlist(id: string) {
    const next = shortlist.includes(id) ? shortlist.filter(item => item !== id) : [...shortlist, id];
    setShortlist(next);
    try { localStorage.setItem("courserelay-shortlist", JSON.stringify(next)); }
    catch { setNotice("Shortlist updated for this visit; browser storage is unavailable."); }
  }

  function openAnalysis(course: Course) {
    setSelected(course); setAnalysis(null); setNotice("");
  }

  async function runAnalysis() {
    if (!selected) return;
    if (selected.languages.includes(language)) {
      setNotice(`${selected.title} already lists ${language}. Verify exclusivity or choose another market.`); return;
    }
    setLoading(true); setAnalysis(null); setNotice("");
    const payload = { course_id: selected.id, target_language: language, localized_price: price, monthly_sales: sales, operator_share: share, production_cost: cost };
    try {
      if (apiUrl) {
        const response = await fetch(`${apiUrl}/opportunities/analyze`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        if (!response.ok) throw new Error(`analysis_${response.status}`);
        setAnalysis(await response.json());
      } else {
        await new Promise(resolve => setTimeout(resolve, 350));
        const gross = price * sales;
        const operatorRevenue = Math.floor(gross * share / 100);
        const months = operatorRevenue === 0 ? null : Math.round((cost / operatorRevenue) * 10) / 10;
        const score = opportunityScore(selected, language);
        setAnalysis({ score, verdict: score >= 78 && months !== null && months <= 4 ? "Pilot" : "Validate", monthlyGross: gross, operatorRevenue, creatorRevenue: gross - operatorRevenue, monthsToPayback: months });
      }
    } catch { setNotice("The analysis service could not respond. Your inputs are still here; retry when the service is available."); }
    finally { setLoading(false); }
  }

  return <div className="app" inert={!ready} aria-busy={!ready}>
    <a href="#main" className="skip">Skip to analysis workspace</a>
    <header className="topbar">
      <a className="brand" href="#main"><span className="mark"><Languages size={22} /></span>CourseRelay</a>
      <nav aria-label="Workspace views">
        <button className={view === "market" ? "active" : ""} onClick={() => setView("market")}>Market radar</button>
        <button className={view === "shortlist" ? "active" : ""} onClick={() => setView("shortlist")}>Shortlist <span>{shortlist.length}</span></button>
      </nav>
      <div className="demo"><span /> FICTIONAL DEMO DATA</div>
    </header>

    <main id="main">
      {notice && <div className="notice" role="alert"><ShieldCheck size={17} />{notice}<button aria-label="Dismiss message" onClick={() => setNotice("")}><X size={16} /></button></div>}
      <section className="hero">
        <div><div className="eyebrow"><Sparkles size={14} /> LOCALIZATION OPPORTUNITY DESK</div>
          <h1>Find the course<br />worth translating.</h1>
          <p>Rank proven English courses against an underserved language market, then pressure-test the deal before paying for a dub.</p>
        </div>
        <div className="hero-stat"><span>THE WEDGE</span><strong>One course.<br />One market.<br />One paid pilot.</strong><small>Rights approval comes before production.</small></div>
      </section>

      <section className="toolbar" aria-label="Market controls">
        <div className="market-select"><label htmlFor="language">Target market</label><div><Flag language={language} /><select id="language" value={language} onChange={event => { setLanguage(event.target.value as Language); setAnalysis(null); }}>
          {languages.map(item => <option key={item}>{item}</option>)}</select><ChevronDown size={15} /></div></div>
        <label className="search"><Search size={17} /><input aria-label="Search courses" placeholder="Search course or category" value={query} onChange={event => setQuery(event.target.value)} /></label>
        <div className="criteria"><span><Check size={13} /> 1,000+ reviews</span><span><Check size={13} /> Rights-first</span><span><Check size={13} /> Payback modeled</span></div>
      </section>

      <section className="workspace">
        <div className="section-head"><div><span>{view === "market" ? "RANKED CANDIDATES" : "YOUR SHORTLIST"}</span><h2>{language} opportunity board</h2></div><p>Score blends demo demand signal, review proof and rating quality.</p></div>
        <div className="table-head"><span>Course</span><span>Proof</span><span>Market fit</span><span>Signal</span><span /></div>
        <div className="course-list">
          {ranked.map(({ course, score, served }, index) => <article className={served ? "course served" : "course"} key={course.id}>
            <div className="course-name"><span className="rank">{String(index + 1).padStart(2, "0")}</span><div className={`course-icon tone-${index % 4}`}><BookOpen size={20} /></div><div><h3>{course.title}</h3><p>{course.category} · {course.hours} hours</p></div></div>
            <div className="proof"><strong>{course.reviews.toLocaleString()}</strong><span>{course.rating} ★ rating</span></div>
            <div className="fit"><div><i style={{ width: `${score}%` }} /></div><strong>{served ? "Already served" : score >= 85 ? "Strong gap" : score >= 72 ? "Testable" : "Weak gap"}</strong></div>
            <div className="score"><strong>{score}</strong><span>/ 100</span></div>
            <div className="actions"><button className={shortlist.includes(course.id) ? "saved" : "save"} aria-label={`${shortlist.includes(course.id) ? "Remove" : "Add"} ${course.title} ${shortlist.includes(course.id) ? "from" : "to"} shortlist`} aria-pressed={shortlist.includes(course.id)} onClick={() => toggleShortlist(course.id)}>{shortlist.includes(course.id) ? <Check size={16} /> : "+"}</button><button className="analyze" onClick={() => openAnalysis(course)}>Analyze <ArrowRight size={15} /></button></div>
          </article>)}
        </div>
        {!ranked.length && <div className="empty"><Globe2 size={31} /><h3>{view === "shortlist" ? "Nothing shortlisted yet" : "No matching courses"}</h3><p>{view === "shortlist" ? "Return to Market radar and save a candidate." : "Clear the search or try another phrase."}</p><button onClick={() => { setView("market"); setQuery(""); }}>Show market radar</button></div>}
      </section>

      <section className="method"><div><BarChart3 size={23} /><h3>Demand before dubbing</h3><p>Confirm market pull with landing-page deposits and affiliate interviews before production.</p></div><div><ShieldCheck size={23} /><h3>Rights before reach</h3><p>Written localization, derivative-work, update and refund terms are a launch gate.</p></div><div><CircleDollarSign size={23} /><h3>Payback before scale</h3><p>A pilot only advances when a downside-adjusted case repays production in four months.</p></div></section>
    </main>

    {selected && <div className="overlay" role="presentation" onMouseDown={event => { if (event.currentTarget === event.target) setSelected(null); }}><section className="drawer" role="dialog" aria-modal="true" aria-labelledby="analysis-title">
      <button className="close" aria-label="Close analysis" onClick={() => setSelected(null)}><X size={20} /></button>
      <div className="drawer-top"><div className="eyebrow"><Flag language={language} /> {language.toUpperCase()} PILOT</div><h2 id="analysis-title">{selected.title}</h2><p>{selected.note}</p></div>
      <div className="rights"><ShieldCheck size={18} /><div><strong>Rights checkpoint</strong><span>Demo assumes written creator approval. No course is copied, translated or sold by this prototype.</span></div></div>
      <div className="inputs"><label>Localized price <span>{money(price)}</span><input aria-label="Localized price" type="range" min="10" max="250" value={price} onChange={event => { setPrice(Number(event.target.value)); setAnalysis(null); }} /></label><label>Monthly sales <span>{sales}</span><input aria-label="Monthly sales" type="range" min="0" max="500" step="10" value={sales} onChange={event => { setSales(Number(event.target.value)); setAnalysis(null); }} /></label><label>Your revenue share <span>{share}%</span><input aria-label="Operator share" type="range" min="0" max="100" value={share} onChange={event => { setShare(Number(event.target.value)); setAnalysis(null); }} /></label><label>Production cost <span>{money(cost)}</span><input aria-label="Production cost" type="range" min="0" max="50000" step="500" value={cost} onChange={event => { setCost(Number(event.target.value)); setAnalysis(null); }} /></label></div>
      <button className="run" onClick={() => void runAnalysis()} disabled={loading}>{loading ? <><LoaderCircle className="spin" size={18} /> Running demo model…</> : <>Run opportunity check <ArrowRight size={17} /></>}</button>
      <div className="result" aria-live="polite">{analysis ? <><div className="verdict"><span>RECOMMENDATION</span><strong>{analysis.verdict} this market</strong><i>{analysis.score}/100</i></div><div className="economics"><div><span>Monthly gross</span><strong>{money(analysis.monthlyGross)}</strong></div><div><span>Your share</span><strong>{money(analysis.operatorRevenue)}</strong></div><div><span>Creator share</span><strong>{money(analysis.creatorRevenue)}</strong></div><div><span>Payback</span><strong>{analysis.monthsToPayback === null ? "No sales" : `${analysis.monthsToPayback} mo`}</strong></div></div><p>Illustrative only. Verify rights, local demand, taxes, refunds, dubbing quality and partner terms before spending.</p></> : <p>Set a conservative deal case, then run the demo model. No real marketplace or sales data is queried.</p>}</div>
    </section></div>}
    <footer><strong>CourseRelay</strong><p>Prototype opportunity desk · All courses, demand scores and economics are fictional demo fixtures.</p><a href="https://github.com/DrGonzo79/courserelay-localization-20260908">Source & docs <ArrowRight size={14} /></a></footer>
  </div>;
}
