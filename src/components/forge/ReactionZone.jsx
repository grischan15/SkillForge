import { useDroppable } from '@dnd-kit/core'
import ForgedSkillChip from './ForgedSkillChip'
import ForgePrompt from './ForgePrompt'
import { useLang } from '../../i18n/LanguageContext'

export default function ReactionZone({ forgedSkills, onRemove, onClear, reducedMotion, inline = false }) {
  const { isOver, setNodeRef } = useDroppable({ id: 'forge-drop-zone' })

  const hasSkills = forgedSkills.length > 0
  const { lang } = useLang()
  const en = lang === 'en'

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
              className="text-xs text-ink-muted hover:text-terrakotta transition-colors cursor-pointer mb-3"
            >
              {en ? 'Remove all' : 'Alle entfernen'}
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
        p3-cut-box p-5 min-h-[200px]
        transition-colors duration-normal
        ${isOver
          ? 'bg-salbei-tint shadow-[inset_0_0_0_3px_var(--p3-moosgruen)]'
          : hasSkills
            ? 'bg-white'
            : 'bg-white shadow-[inset_0_0_0_2px_var(--p3-gray-300)]'
        }
      `}
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-black text-xl text-ink flex items-center gap-2">
          <img src="images/bildmark-terrakotta.svg" alt="" className="w-6 h-6 object-contain" />
          {en ? 'The Forge' : 'Die Schmiede'}
        </h2>
        {hasSkills && (
          <button
            onClick={onClear}
            className="text-sm font-semibold text-moosgruen underline underline-offset-2 hover:text-tannenblau transition-colors cursor-pointer min-h-[48px] px-2"
          >
            {en ? 'Clear' : 'Leeren'}
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
