import { getScene, paths } from './scenes.js'

export const initialNarrativeState = { path: null, currentSceneId: null, history: [], visitedHotspots: [], choices: [], complete: false, error: null }

export function narrativeReducer(state, action) {
  if (action.type === 'START') {
    if (!paths[action.path]) return { ...state, error: `Unknown path: ${action.path}` }
    return { ...initialNarrativeState, path: action.path, currentSceneId: paths[action.path].start }
  }
  if (!state.path || !state.currentSceneId) return { ...state, error: 'Story has not started' }
  const scene = getScene(state.path, state.currentSceneId)
  if (!scene) return { ...state, error: `Unknown scene: ${state.currentSceneId}` }
  if (action.type === 'OPEN_HOTSPOT') {
    if (scene.hotspot?.id !== action.id) return { ...state, error: `Unknown hotspot: ${action.id}` }
    return { ...state, visitedHotspots: [...new Set([...state.visitedHotspots, action.id])], error: null }
  }
  if (action.type === 'SELECT_CHOICE') {
    const choice = scene.choices?.find(item => item.id === action.id)
    if (!choice || !getScene(state.path, choice.next)) return { ...state, error: `Unknown choice: ${action.id}` }
    return { ...state, history: [...state.history, state.currentSceneId], currentSceneId: choice.next, choices: [...state.choices, choice.id], error: null }
  }
  if (action.type === 'NEXT') {
    if (scene.end) return { ...state, complete: true, error: null }
    if (!scene.next || !getScene(state.path, scene.next)) return { ...state, error: 'No valid next scene' }
    return { ...state, history: [...state.history, state.currentSceneId], currentSceneId: scene.next, error: null }
  }
  if (action.type === 'PREVIOUS') {
    const previous = state.history.at(-1)
    if (!previous) return { ...state, error: 'No previous scene' }
    return { ...state, currentSceneId: previous, history: state.history.slice(0, -1), complete: false, error: null }
  }
  return { ...state, error: `Unknown action: ${action.type}` }
}
