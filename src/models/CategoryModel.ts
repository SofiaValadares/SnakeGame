import CompetenceModel from './CompetenceModel';
import CategoryEnum from '../enums/CategoryEnum';
import CompetenceEnum from '../enums/CompetenceEnum';

interface CategoryModel {
  category: CategoryEnum;
  color: string;
  competences: CompetenceModel[];
}

export const CategorysList: CategoryModel[] = [
  {
    category: CategoryEnum.DESENVOLVIMENTO_WEB_MOBILE,
    color: '#8B5CF6',
    competences: [
      { competence: CompetenceEnum.REACT, color: '#61DAFB' },
      { competence: CompetenceEnum.ANGULAR, color: '#DD0031' },
      { competence: CompetenceEnum.TYPESCRIPT, color: '#3178C6' },
      { competence: CompetenceEnum.JAVASCRIPT, color: '#F7DF1E' },
      { competence: CompetenceEnum.HTML, color: '#E34F26' },
      { competence: CompetenceEnum.CSS, color: '#1572B6' },
      { competence: CompetenceEnum.JAVA, color: '#ED8B00' },
      { competence: CompetenceEnum.SPRING_BOOT, color: '#6DB33F' },
      { competence: CompetenceEnum.KOTLIN, color: '#7F52FF' },
      { competence: CompetenceEnum.API_REST, color: '#00C853' },
      { competence: CompetenceEnum.PYTHON, color: '#3776AB' },
      { competence: CompetenceEnum.SQL, color: '#4479A1' },
      { competence: CompetenceEnum.POSTGRESQL, color: '#336791' },
      { competence: CompetenceEnum.SQLITE, color: '#003B57' },
      { competence: CompetenceEnum.DATABASE_MODELING, color: '#AB47BC' },
    ],
  },
  {
    category: CategoryEnum.LOGICA_E_RESOLUCAO_DE_PROBLEMAS,
    color: '#F59E0B',
    competences: [
      { competence: CompetenceEnum.ALGORITHMS, color: '#FF9800' },
      { competence: CompetenceEnum.DATA_STRUCTURES, color: '#FF6D00' },
      { competence: CompetenceEnum.DEBUGGING, color: '#E65100' },
      { competence: CompetenceEnum.PROBLEM_SOLVING, color: '#F59E0B' },
    ],
  },
  {
    category: CategoryEnum.FERRAMENTAS,
    color: '#10B981',
    competences: [
      { competence: CompetenceEnum.DOCKER, color: '#2496ED' },
      { competence: CompetenceEnum.GIT, color: '#F05032' },
      { competence: CompetenceEnum.GITHUB, color: '#24292F' },
      { competence: CompetenceEnum.POSTMAN, color: '#FF6C37' },
    ],
  },
  {
    category: CategoryEnum.TRABALHO_EM_EQUIPE,
    color: '#EC4899',
    competences: [
      { competence: CompetenceEnum.TEAMWORK, color: '#EC4899' },
      { competence: CompetenceEnum.COMMUNICATION, color: '#DB2777' },
      { competence: CompetenceEnum.ORGANIZATION, color: '#BE185D' },
      { competence: CompetenceEnum.AGILE, color: '#10B981' },
    ],
  },
];

export default CategoryModel;
