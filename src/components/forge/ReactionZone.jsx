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
        rounded-xl border-2 p-5 min-h-[200px]
        transition-all duration-normal ease-out
        ${isOver
          ? 'border-p3-red bg-p3-red/5 shadow-forge-glow'
          : hasSkills
            ? 'border-forge-border bg-forge-bg'
            : 'border-border-light bg-container'
        }
      `}
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold text-lg text-ink flex items-center gap-2">
          <img src="images/P3_Logo_RZ_Bild_rot.png" alt="" className="w-6 h-6 object-contain" />
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
