import { describe, it, expect } from 'vitest'
import { Step } from '../index'

describe('Airport任务调度系统', () => {
  describe('Step', () => {
    it('should execute shell command successfully', async () => {
      const step = new Step({
        name: 'Test Step',
        run: 'echo hello',
      })
      const result = await step.execute()
      expect(result).toBe(0)
    })
  })
})
