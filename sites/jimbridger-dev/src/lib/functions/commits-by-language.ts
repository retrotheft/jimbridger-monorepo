type LanguageEntry = {
   name: string,
   color: string,
   size: number,
   percentage: string
}

interface Repository {
   name: string,
   url: string,
   stars: number
   commitCount: number
   languages: LanguageEntry[]

}

// hardcoded as it's unlikely to change in the near future
const selectoplasm = {
   Svelte: 681,
   TypeScript: 496,
   CSS: 175,
   JavaScript: 102,
   HTML: 27
}

export function calculateCommitsByLanguage(repos: Repository[]) {
   const languages: Record<string, number> = {}
   repos.forEach(repo => {
      repo.languages.forEach(language => {
         const commits = +language.percentage / 100 * repo.commitCount
         languages[language.name] = (languages[language.name] ?? 0) + commits
      })
   })
   for (const [name, commits] of Object.entries(selectoplasm)) {
      languages[name] = (languages[name] ?? 0) + commits
   }
   console.log(languages)
   return languages;
}

export function calculateTotalStars(repos: Repository[]) {
   return repos.reduce((acc, repo) => acc += repo.stars, 0)
}
