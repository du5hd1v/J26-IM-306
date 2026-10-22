import { describe, expect, it } from 'vitest'
import { initialNarrativeState, narrativeReducer } from '../src/story/engine.js'

const reduce = (state, action) => narrativeReducer(state, action)

describe('narrative engine', () => {
  it('starts Path A at its first scene and completes in order', () => {
    let state = reduce(initialNarrativeState, { type: 'START', path: 'A' })
    expect(state.currentSceneId).toBe('a_arrival')
    state = reduce(state, { type: 'NEXT' })
    expect(state.currentSceneId).toBe('a_gateway')
    state = reduce(state, { type: 'NEXT' })
    expect(state.currentSceneId).toBe('a_legacy')
    state = reduce(state, { type: 'NEXT' })
    expect(state.complete).toBe(true)
  })

  it.each([['follow_walls', 'b_walls'], ['seek_stories', 'b_stories']])('rejoins Path B branch %s', (choice, branch) => {
    let state = reduce(initialNarrativeState, { type: 'START', path: 'B' })
    state = reduce(state, { type: 'SELECT_CHOICE', id: choice })
    expect(state.currentSceneId).toBe(branch)
    state = reduce(state, { type: 'NEXT' })
    expect(state.currentSceneId).toBe('b_rejoin')
  })

  it('records a hotspot only once', () => {
    let state = reduce(initialNarrativeState, { type: 'START', path: 'B' })
    state = reduce(state, { type: 'OPEN_HOTSPOT', id: 'gateway_symbol' })
    state = reduce(state, { type: 'OPEN_HOTSPOT', id: 'gateway_symbol' })
    expect(state.visitedHotspots).toEqual(['gateway_symbol'])
  })

  it('returns explicit errors for invalid identifiers', () => {
    const badPath = reduce(initialNarrativeState, { type: 'START', path: 'Z' })
    expect(badPath.error).toMatch(/Unknown path/)
    const started = reduce(initialNarrativeState, { type: 'START', path: 'B' })
    expect(reduce(started, { type: 'SELECT_CHOICE', id: 'missing' }).error).toMatch(/Unknown choice/)
  })
})
