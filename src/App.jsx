import { useReducer, useState } from 'react'
import { copy } from './i18n.js'
import { getScene } from './story/scenes.js'
import { initialNarrativeState, narrativeReducer } from './story/engine.js'

function Header({ language, setLanguage, onHome }) {
  return <header className="topbar">
    <button className="brand" onClick={onHome} aria-label="Kadhai home"><span>கதை</span><small>KADHAI</small></button>
    <button className="language" onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}>{copy[language].languageName}<span aria-hidden="true">↗</span></button>
  </header>
}

function Welcome({ t, next }) {
  return <main className="welcome page"><section className="hero-copy"><p className="kicker">{t.kicker}</p><h1>{t.welcome}</h1><p className="lead">{t.intro}</p><button className="primary" onClick={next}>{t.begin}<span>→</span></button><p className="demo-note">● {t.demo}</p></section><div className="hero-art" aria-hidden="true"><div className="sun"/><div className="arch arch-one"/><div className="arch arch-two"/><div className="story-mark">க</div><div className="ground"/></div></main>
}

function Consent({ t, next, back }) {
  return <main className="center-page page"><section className="paper-card"><p className="step">01 / 03</p><h1>{t.consentTitle}</h1><p>{t.consentBody}</p><div className="notice"><strong>DEMO</strong><span>No real responses are stored.</span></div><button className="primary wide" onClick={next}>{t.agree}<span>→</span></button><button className="text-button" onClick={back}>← {t.back}</button></section></main>
}

function PathSelect({ t, start, back }) {
  const [selected, setSelected] = useState('A')
  return <main className="center-page page"><section className="select-wrap"><p className="step">02 / 03</p><h1>{t.choosePath}</h1><div className="path-grid">
    {['A','B'].map(path => <button key={path} className={`path-card ${selected === path ? 'selected' : ''}`} onClick={() => setSelected(path)} aria-pressed={selected === path}><span className="path-letter">{path}</span><strong>{t[`path${path}`]}</strong><small>{t[`path${path}Detail`]}</small><span className="radio">{selected === path ? '●' : '○'} {t.select}</span></button>)}
  </div><button className="primary" onClick={() => start(selected)}>{t.start}<span>→</span></button><button className="text-button" onClick={back}>← {t.back}</button></section></main>
}

function Story({ t, state, dispatch, finish }) {
  const scene = getScene(state.path, state.currentSceneId)
  const total = state.path === 'A' ? 3 : 3
  const current = Math.min(state.history.length + 1, total)
  const opened = scene.hotspot && state.visitedHotspots.includes(scene.hotspot.id)
  return <main className="story-page page"><aside className={`media-panel ${scene.tone}`}><div className="media-label">{t.placeholder}</div><div className="constellation">✦</div><div className="media-caption"><span>{scene.eyebrow}</span><strong>KADHAI / {state.path}</strong></div></aside><section className="story-copy">
    <div className="progress-line"><span>{t.progress}</span><strong>{current} / {total}</strong><i style={{width: `${(current/total)*100}%`}} /></div><p className="kicker">{scene.eyebrow}</p><h1>{scene.title}</h1><p className="lead">{scene.body}</p>
    {scene.hotspot && <button className={`hotspot ${opened ? 'opened' : ''}`} onClick={() => dispatch({type:'OPEN_HOTSPOT', id:scene.hotspot.id})}><span>✦</span>{opened ? t.hotspotOpened : scene.hotspot.label}</button>}
    {opened && <p className="detail">{scene.hotspot.detail}</p>}
    {scene.choices && <div className="choices">{scene.choices.map(choice => <button key={choice.id} onClick={() => dispatch({type:'SELECT_CHOICE', id:choice.id})}>{choice.label}<span>↗</span></button>)}</div>}
    {state.error && <p className="error" role="alert">{t.error}: {state.error}</p>}
    <div className="story-actions">{state.history.length > 0 && <button className="secondary" onClick={() => dispatch({type:'PREVIOUS'})}>← {t.previous}</button>}{!scene.choices && <button className="primary" onClick={scene.end ? finish : () => dispatch({type:'NEXT'})}>{scene.end ? t.finish : t.continue}<span>→</span></button>}</div>
  </section></main>
}

function Checkpoint({ t, next }) {
  const [rating, setRating] = useState(null)
  return <main className="center-page page"><section className="paper-card checkpoint"><p className="step">03 / 03</p><h1>{t.checkpoint}</h1><p>{t.checkpointBody}</p><fieldset><legend>{t.question}</legend><div className="rating">{[1,2,3,4,5].map(n => <button type="button" className={rating === n ? 'active' : ''} key={n} onClick={() => setRating(n)} aria-label={`${n} out of 5`}>{n}</button>)}</div></fieldset><button className="primary wide" disabled={!rating} onClick={next}>{t.done}<span>→</span></button></section></main>
}

function Done({ t, restart }) { return <main className="center-page page"><section className="done-card"><div className="seal">க</div><h1>{t.thanks}</h1><p>{t.demo}</p><button className="primary" onClick={restart}>{t.restart}<span>↺</span></button></section></main> }

export default function App() {
  const [language, setLanguage] = useState('en')
  const [screen, setScreen] = useState('welcome')
  const [story, dispatch] = useReducer(narrativeReducer, initialNarrativeState)
  const t = copy[language]
  const home = () => setScreen('welcome')
  const start = path => { dispatch({type:'START', path}); setScreen('story') }
  return <div className="app" lang={language}><Header language={language} setLanguage={setLanguage} onHome={home}/>{screen === 'welcome' && <Welcome t={t} next={() => setScreen('consent')}/>} {screen === 'consent' && <Consent t={t} next={() => setScreen('paths')} back={home}/>} {screen === 'paths' && <PathSelect t={t} start={start} back={() => setScreen('consent')}/>} {screen === 'story' && <Story t={t} state={story} dispatch={dispatch} finish={() => setScreen('checkpoint')}/>} {screen === 'checkpoint' && <Checkpoint t={t} next={() => setScreen('done')}/>} {screen === 'done' && <Done t={t} restart={home}/>}</div>
}
