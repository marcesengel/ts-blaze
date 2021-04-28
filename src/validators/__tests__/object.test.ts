import { number, object, optional, string } from '../../ts-blaze'

describe('object', () => {
  it('fails for null', () => {
    const validate = object({})

    expect(validate(null)).toBe(false)
  })

  describe('basic shapes', () => {
    const isHuman = object({
      name: string(),
      age: number()
    })

    it('accepts matching objects', () => {
      const betty: any = {
        name: 'Betty',
        age: 21
      }

      expect(isHuman(betty)).toBe(true)

      if (isHuman(betty)) { // test type inference
        expect(true).toBe(true)
      }
    })

    it('rejects matching objects', () => {
      const rx7 = {
        make: 'Mazda',
        engine: 'Otto-Wankel'
      }

      expect(isHuman(rx7)).toBe(false)
    })
  })

  it('ignores additional keys', () => {
    const validate = object({})

    expect(validate({ test: true })).toBe(true)
  })

  describe('exact', () => {
    const isHuman = object({
      name: string(),
      age: number()
    }).exact()

    it('accepts matching objects', () => {
      const betty: any = {
        name: 'Betty',
        age: 21
      }

      expect(isHuman(betty)).toBe(true)
    })

    it('rejects when missing keys', () => {
      const betty: any = {
        name: 'Betty'
      }

      expect(isHuman(betty)).toBe(false)
    })

    it('rejects when there are additional keys', () => {
      const betty: any = {
        name: 'Betty',
        age: 21,
        city: 'Berlin'
      }

      expect(isHuman(betty)).toBe(false)
    })

    it('allows optional properties to be missing', () => {
      const isEntity = object({
        id: string(),
        name: optional(string())
      })

      expect(isEntity({
        id: '123'
      })).toBe(true)
    })
  })
})
