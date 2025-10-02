import Silvia from '@assets/images/1-silvia.webp'
import Luis from '@assets/images/2-luis.webp'
import Matias from '@assets/images/3-matias.webp'
import Sabrina from '@assets/images/4-sabrina.webp'
import { TalentLabTeam } from '@ui'

const Exercise03_1 = () => {
  const team = [
    { name: 'Silvia', role: 'Product Owner', image: Silvia },
    { name: 'Luis', role: 'Diseñador UX/UI', image: Luis },
    { name: 'Matias', role: 'Desarrollador', image: Matias },
    { name: 'Sabrina', role: 'Desarrolladora', image: Sabrina },
  ]
  
  return (
    <TalentLabTeam
      team={team}
      cardWidth='350px'
      cardHeight='150px'
    />
  )
}

export { Exercise03_1 }