import { profileJa, profileEn, hobby } from '../../data/profile'
import { usePortfolio } from '../../lib/PortfolioContext'
import { useLanguage } from '../../i18n/LanguageContext'
import EventsSection from './EventsSection'

export default function ProfileScene() {
  const { setActiveScene } = usePortfolio()
  const { lang, t } = useLanguage()
  const profile = lang === 'ja' ? profileJa : profileEn

  return (
    <div className="h-full overflow-y-auto px-6 py-10 sm:px-12">
      <div className="mx-auto max-w-3xl">
        <p className="font-display text-xs tracking-[0.3em] text-gold">{t('profileScenelabel')}</p>

        <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-start">
          <img
            src={profile.photo}
            alt={profile.name}
            className="h-28 w-28 shrink-0 rounded-md border border-rig-border object-cover sm:h-32 sm:w-32"
          />
          <div>
            <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
              {profile.name}
              <span className="ml-3 text-lg font-normal text-gray-500">{profile.nameJa}</span>
            </h1>
            <p className="mt-2 text-sm text-gray-400">{profile.affiliation}</p>
            <p className="mt-4 text-glow-gold font-display text-xl text-gold">{profile.tagline}</p>
          </div>
        </div>

        <div className="mt-8 space-y-4 text-sm leading-relaxed text-gray-300">
          {profile.bio.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <h2 className="mt-10 font-display text-sm tracking-widest text-gray-500">{t('skillStack')}</h2>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {profile.skills.map((skill) => (
            <div key={skill.label} className="rig-panel rounded-sm border p-3">
              <p className="font-display text-sm font-semibold text-white">{skill.label}</p>
              <p className="mt-1 text-xs text-gray-400">{skill.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 inline-flex items-center gap-3 rig-panel rounded-sm border p-2">
          <img src={hobby.photo} alt={hobby.captionJa} className="h-16 w-16 rounded-sm object-cover" />
          <span className="pr-2 text-xs text-gray-400">{lang === 'ja' ? hobby.captionJa : hobby.captionEn}</span>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {profile.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-sm border border-gold/50 px-4 py-2 text-xs font-semibold text-gold hover:bg-gold/10"
            >
              {link.label} ↗
            </a>
          ))}
          <button
            onClick={() => setActiveScene('timeline')}
            className="rounded-sm bg-gold px-4 py-2 text-xs font-semibold text-black hover:bg-gold/80"
          >
            {t('viewTimeline')}
          </button>
        </div>

        <EventsSection />
      </div>
    </div>
  )
}
