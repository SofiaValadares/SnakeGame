
import CompetenceModel from "./CompetenceModel";
import CategoryEnum from "../enums/CategoryEnum";

interface CategoryModel {
    category: CategoryEnum;
    color: string;
    competences: CompetenceModel[];
}

export const CategorysList: CategoryModel[] = [
    {
        category: CategoryEnum.DESENVOLVIMENTO_WEB_MOBILE,
        color: '#8B5CF6',
        competences: []
    },
    {
        category: CategoryEnum.LOGICA_E_RESOLUCAO_DE_PROBLEMAS,
        color: '#F59E0B',
        competences: []
    },
    {
        category: CategoryEnum.FERRAMENTAS,
        color: '#10B981',
        competences: []
    },
    {
        category: CategoryEnum.TRABALHO_EM_EQUIPE,
        color: '#EC4899',
        competences: []
    },
]

export default CategoryModel;