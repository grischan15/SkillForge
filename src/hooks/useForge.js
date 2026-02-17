import { useState, useCallback } from 'react'

export function useForge() {
  const [forgedSkills, setForgedSkills] = useState([])

  const addSkill = useCallback((skill) => {
    setForgedSkills(prev => {
      if (prev.some(s => s.id === skill.id)) return prev
      return [...prev, skill]
    })
  }, [])

  const removeSkill = useCallback((skillId) => {
    setForgedSkills(prev => prev.filter(s => s.id !== skillId))
  }, [])

  const clearForge = useCallback(() => {
    setForgedSkills([])
  }, [])

  return { forgedSkills, addSkill, removeSkill, clearForge }
}
