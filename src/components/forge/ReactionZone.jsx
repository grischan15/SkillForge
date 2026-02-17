import { useDroppable } from '@dnd-kit/core'
import ForgedSkillChip from './ForgedSkillChip'
import ForgePrompt from './ForgePrompt'

export default function ReactionZone({ forgedSkills, onRemove, onClear, reducedMotion, inline = false }) {
  const { isOver, setNodeRef } = useDroppable({ id: 'forge-drop-zone' })

  const hasSkills = forgedSkills.length > 0

  if (inline) {
    return (
      <div>
        {!hasSkills && <ForgePrompt />}
        {hasSkills && (
          <>
            <div className="flex flex-wrap gap-2 mb-3">
              {forgedSkills.map(skill => (
                <ForgedSkillChip
                  key={skill.id}
                  skill={skill}
                  onRemove={onRemove}
                  reducedMotion={reducedMotion}
                />
              ))}
            </div>
            <button
              onClick={onClear}
              className="text-xs text-ink-muted hover:text-p3-red transition-colors cursor-pointer mb-3"
            >
              Alle entfernen
            </button>
          </>
        )}
      </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      className={`
        rounded-xl border-2 border-dashed p-4
        transition-all duration-normal ease-out
        ${isOver
          ? 'border-p3-red bg-p3-red/5 shadow-forge-glow'
          : hasSkills
            ? 'border-forge-border bg-forge-bg'
            : 'border-border bg-white'
        }
      `}
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold text-base text-ink flex items-center gap-2">
          <span role="img" aria-hidden="true">🔨</span>
          Die Schmiede
        </h2>
        {hasSkills && (
          <button
            onClick={onClear}
            className="text-xs text-ink-muted hover:text-p3-red transition-colors cursor-pointer min-h-[32px] px-2"
          >
            Leeren
          </button>
        )}
      </div>

      {!hasSkills && <ForgePrompt />}

      {hasSkills && (
        <div className="flex flex-wrap gap-2">
          {forgedSkills.map(skill => (
            <ForgedSkillChip
              key={skill.id}
              skill={skill}
              onRemove={onRemove}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      )}
    </div>
  )
}
