import { describe, it, expect } from 'vitest'
import { Step, exec } from '../index'


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

  describe('Exec', () => {
    it('test exec', async () => {
      expect(exec('echo hello')).toBe('hello\n')
    })
  })
})
