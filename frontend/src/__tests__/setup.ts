import { vi } from 'vitest'

if (!window.matchMedia) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation(() => ({
      matches: false,
      media: '',
      onchange: null,
      addListener: vi.fn<() => void>(),
      removeListener: vi.fn<() => void>(),
      addEventListener: vi.fn<() => void>(),
      removeEventListener: vi.fn<() => void>(),
      dispatchEvent: vi.fn<() => boolean>().mockReturnValue(true),
    })),
  )
}

if (!window.IntersectionObserver) {
  class MockIntersectionObserver {
    observe() {}
    disconnect() {}
    unobserve() {}
  }

  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
}
