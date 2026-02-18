import SkillCard from './SkillCard'

export default function SkillGrid({ skills, forgedSkillIds, onTapAdd, reducedMotion }) {
  return (
    <div className="max-h-[50vh] lg:max-h-none overflow-y-auto lg:overflow-visible pb-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
        {skills.map((skill, index) => (
          <SkillCard
            key={skill.id}
            skill={skill}
            isForged={forgedSkillIds.includes(skill.id)}
            onTapAdd={onTapAdd}
            reducedMotion={reducedMotion}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}
